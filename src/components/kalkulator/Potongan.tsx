"use client";

import { useState } from "react";
import { aturan2026 } from "@/lib/kalkulator/aturan2026";
import { calculateDeductions } from "@/lib/kalkulator/hitung";
import {
  asuransiBawaan,
  bacaAngka,
  Baris,
  BidangAngka,
  BidangYen,
  bulanIni,
  CatatanPerkiraan,
  Garis,
  KartuHasil,
  PilihAsuransi,
  Pilihan,
  pilihanTanggungan,
  Saklar,
  tarifAsuransi,
} from "./Bidang";
import styles from "./kalkulator.module.css";

/**
 * Bagian "Potongan dan gaji bersih" (sama dengan deductions_section.dart):
 * dipakai Kalkulator Gaji dan Pajak & Potongan.
 */
export function Potongan({
  grossPay,
  nonTaxableCommute,
}: {
  grossPay: number;
  nonTaxableCommute: number;
}) {
  const [asuransi, setAsuransi] = useState(asuransiBawaan);
  const [manual, setManual] = useState("");
  const [umur, setUmur] = useState("30");
  const [tanggungan, setTanggungan] = useState(0);
  const [koyo, setKoyo] = useState(true);
  const [juminzei, setJuminzei] = useState("");

  const rate = tarifAsuransi(asuransi, manual);
  const age = umur === "" ? null : Number(umur);
  const residentTax = bacaAngka(juminzei) ?? 0;
  const result =
    rate !== null && age !== null && grossPay > 0
      ? calculateDeductions({
          grossPay,
          nonTaxableCommute,
          healthRate: rate,
          age,
          payMonth: bulanIni(),
          dependents: tanggungan,
          employmentInsurance: koyo,
        })
      : null;

  return (
    <>
      <div className={styles.form}>
        <PilihAsuransi
          pilihan={asuransi}
          manual={manual}
          onChange={(p, m) => {
            setAsuransi(p);
            setManual(m);
          }}
        />
        <div className={styles.twoCol}>
          <BidangAngka
            label="Umur"
            value={umur}
            onChange={setUmur}
            suffix="tahun"
            helper="40–64: + 介護保険"
          />
          <Pilihan
            label="Tanggungan"
            value={tanggungan}
            options={pilihanTanggungan}
            onChange={setTanggungan}
          />
        </div>
        <Saklar
          label="Ikut 雇用保険 (asuransi kerja)"
          checked={koyo}
          onChange={setKoyo}
        />
        <BidangYen
          label="住民税 per bulan (opsional)"
          value={juminzei}
          onChange={setJuminzei}
          helper="Lihat slip gaji atau 住民税決定通知書; bisa diperkirakan di kalkulator Pajak Penduduk."
        />
      </div>

      <KartuHasil>
        <h2>Potongan dan gaji bersih</h2>
        {result ? (
          <>
            <Baris label="Gaji kotor (総支給額)" nilai={result.grossPay} tebal />
            <Garis />
            <Baris
              label="健康保険"
              nilai={result.health}
              kurang
              catatan={`標準報酬月額 ¥${result.standardHealth.toLocaleString("en-US")}`}
            />
            {result.care > 0 && (
              <Baris label="介護保険" nilai={result.care} kurang />
            )}
            {result.childSupport > 0 && (
              <Baris
                label="子ども・子育て支援金"
                nilai={result.childSupport}
                kurang
              />
            )}
            <Baris
              label="厚生年金"
              nilai={result.pension}
              kurang
              catatan={`標準報酬月額 ¥${result.standardPension.toLocaleString("en-US")}`}
            />
            {koyo && <Baris label="雇用保険" nilai={result.employment} kurang />}
            <Baris
              label="所得税 (pajak bulanan)"
              nilai={result.incomeTax}
              kurang
            />
            {residentTax > 0 && (
              <Baris label="住民税" nilai={residentTax} kurang />
            )}
            <Garis />
            <Baris
              label="Total potongan"
              nilai={result.totalDeductions + residentTax}
              kurang
            />
            <Baris
              label="Perkiraan gaji bersih (手取り)"
              nilai={result.takeHome - residentTax}
              tebal
            />
          </>
        ) : (
          <p className={styles.empty}>
            Isi gaji dan umur untuk melihat perkiraan potongan.
          </p>
        )}
        <CatatanPerkiraan
          butir={[
            `${aturan2026.label}. Sumber: 協会けんぽ 令和8年度, 日本年金機構, 厚生労働省, 国税庁 令和8年分 電算機計算の特例.`,
            "Iuran asuransi dihitung dari 標準報酬月額 (tingkat gaji). Perusahaan menetapkannya dari rata-rata April–Juni, jadi bisa berbeda dari gaji bulan ini.",
            "子ども・子育て支援金 0,23% mulai gaji April 2026.",
            "Pajak memakai 甲欄 (sudah menyerahkan 扶養控除等申告書). Tanggungan di Indonesia hanya dihitung jika dokumennya diterima perusahaan. Pajak sebenarnya disesuaikan saat 年末調整.",
            "住民税 hanya dikurangkan jika diisi. Tahun pertama di Jepang biasanya belum ada 住民税.",
          ]}
        />
      </KartuHasil>
    </>
  );
}
