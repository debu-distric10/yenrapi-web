"use client";

import { useState } from "react";
import { aturan2026 as R } from "@/lib/kalkulator/aturan2026";
import {
  belowLegalMinimum,
  calculateOvertime,
  hourlyFromMonthly,
  jamKeMenit,
} from "@/lib/kalkulator/hitung";
import {
  bacaAngka,
  Baris,
  BidangAngka,
  BidangYen,
  CatatanPerkiraan,
  Garis,
  KartuHasil,
} from "./Bidang";
import styles from "./kalkulator.module.css";

export function KalkulatorLembur() {
  const [dariBulanan, setDariBulanan] = useState(false);
  const [upah, setUpah] = useState("");
  const [bulanan, setBulanan] = useState("");
  const [jamTerjadwal, setJamTerjadwal] = useState("160");
  const [lembur, setLembur] = useState("");
  const [libur, setLibur] = useState("");
  const [malam, setMalam] = useState("");
  const [tarif, setTarif] = useState({
    overtime: String(R.overtimePercent),
    overtimeOver60: String(R.overtimeOver60Percent),
    lateNight: String(R.lateNightPercent),
    holiday: String(R.holidayPercent),
  });

  let wage: number | null = null;
  if (dariBulanan) {
    const base = bacaAngka(bulanan);
    const minutes = jamKeMenit(jamTerjadwal);
    if (base !== null && minutes) wage = hourlyFromMonthly(base, minutes);
  } else {
    wage = bacaAngka(upah);
  }
  const m = {
    overtime: jamKeMenit(lembur),
    holiday: jamKeMenit(libur),
    night: jamKeMenit(malam),
  };
  const rates = {
    overtime: Number(tarif.overtime || 0),
    overtimeOver60: Number(tarif.overtimeOver60 || 0),
    lateNight: Number(tarif.lateNight || 0),
    holiday: Number(tarif.holiday || 0),
  };
  const result =
    wage !== null &&
    wage > 0 &&
    m.overtime !== null &&
    m.holiday !== null &&
    m.night !== null
      ? calculateOvertime({
          hourlyWage: wage,
          overtimeMinutes: m.overtime,
          holidayMinutes: m.holiday,
          lateNightMinutes: m.night,
          rates,
        })
      : null;

  const ubahTarif = (key: keyof typeof tarif) => (v: string) =>
    setTarif({ ...tarif, [key]: v });

  return (
    <div className="stack">
      <div className={styles.form}>
        <div className={styles.segmented} role="group" aria-label="Dasar upah">
          <button
            type="button"
            aria-pressed={!dariBulanan}
            onClick={() => setDariBulanan(false)}
          >
            Upah per jam
          </button>
          <button
            type="button"
            aria-pressed={dariBulanan}
            onClick={() => setDariBulanan(true)}
          >
            Dari gaji bulanan
          </button>
        </div>
        {dariBulanan ? (
          <>
            <BidangYen
              label="Gaji pokok bulanan (基本給)"
              value={bulanan}
              onChange={setBulanan}
              helper="Tanpa tunjangan keluarga, transport, dan lembur"
            />
            <BidangAngka
              label="Jam kerja terjadwal per bulan"
              value={jamTerjadwal}
              onChange={setJamTerjadwal}
              desimal
              suffix="jam"
              helper="Rata-rata 所定労働時間, biasanya 160–175 jam"
            />
            {wage !== null && wage > 0 && (
              <Baris label="Upah per jam" nilai={wage} />
            )}
          </>
        ) : (
          <BidangYen label="Upah per jam (時給)" value={upah} onChange={setUpah} />
        )}
        <BidangAngka
          label="Lembur (時間外)"
          value={lembur}
          onChange={setLembur}
          desimal
          suffix="jam"
          helper="Di luar 8 jam/hari atau 40 jam/minggu. Contoh: 12.5 atau 12:30"
        />
        <BidangAngka
          label="Kerja di hari libur resmi (法定休日)"
          value={libur}
          onChange={setLibur}
          desimal
          suffix="jam"
        />
        <BidangAngka
          label="Jam kerja malam 22:00–05:00 (深夜)"
          value={malam}
          onChange={setMalam}
          desimal
          suffix="jam"
          helper="Semua jam malam, lembur maupun bukan"
        />
        <details>
          <summary>Tarif lembur (%)</summary>
          <div className={styles.twoCol} style={{ marginTop: 10 }}>
            <BidangAngka label="Lembur" value={tarif.overtime} onChange={ubahTarif("overtime")} suffix="%" />
            <BidangAngka label="Lembur > 60 jam" value={tarif.overtimeOver60} onChange={ubahTarif("overtimeOver60")} suffix="%" />
            <BidangAngka label="Malam" value={tarif.lateNight} onChange={ubahTarif("lateNight")} suffix="%" />
            <BidangAngka label="Hari libur" value={tarif.holiday} onChange={ubahTarif("holiday")} suffix="%" />
          </div>
          {belowLegalMinimum(rates) && (
            <p className={styles.warning}>
              Tarif di bawah minimum hukum (25% / 50% / 25% / 35%).
            </p>
          )}
        </details>
      </div>

      <KartuHasil>
        <h2>Upah lembur bulan ini</h2>
        {result ? (
          <>
            <Baris label="Lembur s/d 60 jam" nilai={result.overtimeUpTo60} />
            {result.overtimeOver60 > 0 && (
              <Baris label="Lembur di atas 60 jam" nilai={result.overtimeOver60} />
            )}
            {result.holiday > 0 && (
              <Baris label="Hari libur resmi" nilai={result.holiday} />
            )}
            {result.lateNightPremium > 0 && (
              <Baris label="Tambahan malam" nilai={result.lateNightPremium} />
            )}
            <Garis />
            <Baris label="Total (残業手当)" nilai={result.total} tebal />
          </>
        ) : (
          <p className={styles.empty}>Isi upah dan jam lembur.</p>
        )}
        <CatatanPerkiraan
          butir={[
            "Tarif minimum menurut hukum (厚生労働省): lembur 25%, di atas 60 jam/bulan 50% (sejak April 2023 untuk semua perusahaan), malam 22:00–05:00 +25%, hari libur resmi 35%.",
            "Perusahaan boleh membayar lebih; ubah tarif jika kontrakmu berbeda.",
            "Jam di hari libur resmi tidak dihitung dalam batas 60 jam.",
            "Upah per jam dari gaji bulanan tidak termasuk tunjangan keluarga, transport, dan sejenisnya.",
          ]}
        />
      </KartuHasil>
    </div>
  );
}
