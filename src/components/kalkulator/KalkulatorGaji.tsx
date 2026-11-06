"use client";

import { useState } from "react";
import { jamKeMenit, monthlyFromHourly } from "@/lib/kalkulator/hitung";
import { bacaAngka, BidangAngka, BidangYen, SetaraOnigiri } from "./Bidang";
import { Potongan } from "./Potongan";
import styles from "./kalkulator.module.css";

/** Kalkulator Gaji: gaji kotor → potongan → gaji bersih. */
export function KalkulatorGaji() {
  const [perJam, setPerJam] = useState(false);
  const [bulanan, setBulanan] = useState("");
  const [upah, setUpah] = useState("");
  const [jamSehari, setJamSehari] = useState("8");
  const [hari, setHari] = useState("21");
  const [lembur, setLembur] = useState("");
  const [tunjangan, setTunjangan] = useState("");
  const [transport, setTransport] = useState("");

  const base = perJam
    ? monthlyFromHourly(
        bacaAngka(upah) ?? 0,
        jamKeMenit(jamSehari) ?? 0,
        Number(hari || 0),
      )
    : (bacaAngka(bulanan) ?? 0);
  const commute = bacaAngka(transport) ?? 0;
  const gross =
    base + (bacaAngka(lembur) ?? 0) + (bacaAngka(tunjangan) ?? 0) + commute;

  function isiContoh() {
    setPerJam(false);
    setBulanan("220,000");
    setLembur("32,400");
    setTunjangan("10,000");
    setTransport("8,000");
  }

  return (
    <div className="stack">
      <div className={styles.form}>
        <div className={styles.formHead}>
          <h2>Penghasilan bulan ini</h2>
          <button type="button" className={styles.tombolKecil} onClick={isiContoh}>
            Isi contoh
          </button>
        </div>
        <div className={styles.segmented} role="group" aria-label="Jenis gaji">
          <button
            type="button"
            aria-pressed={!perJam}
            onClick={() => setPerJam(false)}
          >
            Gaji bulanan
          </button>
          <button
            type="button"
            aria-pressed={perJam}
            onClick={() => setPerJam(true)}
          >
            Upah per jam
          </button>
        </div>
        {perJam ? (
          <>
            <BidangYen label="Upah per jam (時給)" value={upah} onChange={setUpah} />
            <div className={styles.twoCol}>
              <BidangAngka
                label="Jam per hari"
                value={jamSehari}
                onChange={setJamSehari}
                desimal
                suffix="jam"
              />
              <BidangAngka
                label="Hari kerja"
                value={hari}
                onChange={setHari}
                suffix="hari"
              />
            </div>
          </>
        ) : (
          <BidangYen
            label="Gaji pokok (基本給)"
            value={bulanan}
            onChange={setBulanan}
          />
        )}
        <BidangYen
          label="Upah lembur (残業手当)"
          value={lembur}
          onChange={setLembur}
        />
        <SetaraOnigiri
          yen={bacaAngka(lembur) ?? 0}
          awalan="Lemburmu setara"
          akhiran="Jangan lupa istirahat."
        />
        <BidangYen
          label="Tunjangan lain (手当)"
          value={tunjangan}
          onChange={setTunjangan}
        />
        <BidangYen
          label="Tunjangan transport (通勤手当)"
          value={transport}
          onChange={setTransport}
          helper="Tidak kena pajak, tetapi kena iuran asuransi."
        />
      </div>
      <Potongan grossPay={gross} nonTaxableCommute={commute} />
    </div>
  );
}

/** Pajak & Potongan: langsung dari gaji kotor. */
export function KalkulatorPotongan() {
  const [kotor, setKotor] = useState("");
  const [transport, setTransport] = useState("");
  const commute = bacaAngka(transport) ?? 0;
  return (
    <div className="stack">
      <div className={styles.form}>
        <BidangYen
          label="Gaji kotor bulan ini (総支給額)"
          value={kotor}
          onChange={setKotor}
          helper="Termasuk lembur dan tunjangan transport."
        />
        <BidangYen
          label="Bagian tunjangan transport (通勤手当)"
          value={transport}
          onChange={setTransport}
          helper="Tidak kena pajak, tetapi kena iuran asuransi."
        />
      </div>
      <Potongan grossPay={bacaAngka(kotor) ?? 0} nonTaxableCommute={commute} />
    </div>
  );
}
