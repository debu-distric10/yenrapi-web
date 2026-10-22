"use client";

import { useState } from "react";
import {
  calculateBonus,
  calculateLumpSum,
  calculateResidentTax,
  estimateIdr,
  estimateYen,
  nationalPensionLumpSum,
  parseRate,
} from "@/lib/kalkulator/hitung";
import {
  asuransiBawaan,
  bacaAngka,
  Baris,
  BidangAngka,
  BidangYen,
  bulanIni,
  CatatanPerkiraan,
  formatRupiah,
  formatYen,
  Garis,
  KartuHasil,
  persen,
  PilihAsuransi,
  Pilihan,
  pilihanTanggungan,
  Saklar,
  tarifAsuransi,
} from "./Bidang";
import styles from "./kalkulator.module.css";

// =============================================================================
// Bonus
// =============================================================================

export function KalkulatorBonus() {
  const [bonus, setBonus] = useState("");
  const [bulanLalu, setBulanLalu] = useState("");
  const [asuransi, setAsuransi] = useState(asuransiBawaan);
  const [manual, setManual] = useState("");
  const [umur, setUmur] = useState("30");
  const [tanggungan, setTanggungan] = useState(0);
  const [koyo, setKoyo] = useState(true);
  const [sebelumnya, setSebelumnya] = useState("");

  const amount = bacaAngka(bonus) ?? 0;
  const rate = tarifAsuransi(asuransi, manual);
  const age = umur === "" ? null : Number(umur);
  const r =
    amount > 0 && age !== null && rate !== null
      ? calculateBonus({
          bonus: amount,
          previousMonthAfterInsurance: bacaAngka(bulanLalu) ?? 0,
          healthRate: rate,
          age,
          payMonth: bulanIni(),
          dependents: tanggungan,
          bonusSoFarThisYear: bacaAngka(sebelumnya) ?? 0,
          employmentInsurance: koyo,
        })
      : null;

  return (
    <div className="stack">
      <div className={styles.form}>
        <BidangYen label="Bonus kotor (賞与)" value={bonus} onChange={setBonus} />
        <BidangYen
          label="Gaji bulan lalu setelah iuran asuransi"
          value={bulanLalu}
          onChange={setBulanLalu}
          helper="Gaji kotor bulan lalu − 社会保険料 (lihat slip gaji)"
        />
        <PilihAsuransi
          pilihan={asuransi}
          manual={manual}
          onChange={(p, m) => {
            setAsuransi(p);
            setManual(m);
          }}
        />
        <div className={styles.twoCol}>
          <BidangAngka label="Umur" value={umur} onChange={setUmur} suffix="tahun" />
          <Pilihan
            label="Tanggungan"
            value={tanggungan}
            options={pilihanTanggungan}
            onChange={setTanggungan}
          />
        </div>
        <Saklar label="Ikut 雇用保険 (asuransi kerja)" checked={koyo} onChange={setKoyo} />
        <BidangYen
          label="Total bonus sebelumnya sejak April (opsional)"
          value={sebelumnya}
          onChange={setSebelumnya}
          helper="Untuk batas 健康保険 ¥5,73 juta per tahun"
        />
      </div>
      <KartuHasil>
        <h2>Perkiraan bonus bersih</h2>
        {r ? (
          <>
            <Baris label="Bonus kotor" nilai={r.bonus} tebal />
            <Garis />
            <Baris label="健康保険" nilai={r.health} kurang catatan={`標準賞与額 ¥${r.standardBonus.toLocaleString("en-US")}`} />
            {r.care > 0 && <Baris label="介護保険" nilai={r.care} kurang />}
            {r.childSupport > 0 && (
              <Baris label="子ども・子育て支援金" nilai={r.childSupport} kurang />
            )}
            <Baris label="厚生年金" nilai={r.pension} kurang />
            {koyo && <Baris label="雇用保険" nilai={r.employment} kurang />}
            {r.incomeTax !== null && r.taxRate !== null ? (
              <Baris
                label={`所得税 (tarif ${persen(r.taxRate)})`}
                nilai={r.incomeTax}
                kurang
              />
            ) : (
              <p className={styles.warning}>
                Pajak bonus tidak bisa dihitung dengan tabel: isi gaji bulan
                lalu, atau bonus lebih dari 10× gaji bulan lalu (dihitung
                dengan cara lain oleh perusahaan).
              </p>
            )}
            <Garis />
            <Baris label="Perkiraan bonus bersih" nilai={r.takeHome} tebal />
          </>
        ) : (
          <p className={styles.empty}>Isi bonus dan umur.</p>
        )}
        <CatatanPerkiraan
          butir={[
            "Sumber: 国税庁 賞与に対する源泉徴収税額の算出率の表（令和8年分）, tarif 協会けんぽ 令和8年度, 厚生年金 18,3%, 雇用保険 0,5%.",
            "Iuran dihitung dari 標準賞与額 (bonus dibulatkan ke bawah per ¥1.000). 厚生年金 dibatasi ¥1,5 juta per bonus; 健康保険 ¥5,73 juta per tahun (April–Maret).",
            "Pajak memakai 甲欄 (sudah menyerahkan 扶養控除等申告書).",
          ]}
        />
      </KartuHasil>
    </div>
  );
}

// =============================================================================
// 脱退一時金
// =============================================================================

const pilihanBulan = Array.from({ length: 61 }, (_, i) => ({
  value: i,
  label: i === 60 ? "60 bulan atau lebih" : `${i} bulan`,
}));

export function KalkulatorNenkin() {
  const [rata, setRata] = useState("");
  const [bulan, setBulan] = useState(36);
  const [bulanNasional, setBulanNasional] = useState(0);
  const average = bacaAngka(rata) ?? 0;
  const r = average > 0 ? calculateLumpSum(average, bulan) : null;
  const nasional = nationalPensionLumpSum(bulanNasional);
  return (
    <div className="stack">
      <div className={styles.form}>
        <BidangYen
          label="Rata-rata 標準報酬額"
          value={rata}
          onChange={setRata}
          helper="Kira-kira rata-rata gaji bulanan (termasuk bonus dibagi jumlah bulan). Angka resmi ada di ねんきん定期便."
        />
        <Pilihan label="Lama ikut 厚生年金" value={bulan} options={pilihanBulan} onChange={setBulan} />
      </div>
      <KartuHasil>
        <h2>脱退一時金 厚生年金</h2>
        {average > 0 && bulan > 0 && r === null && (
          <p className={styles.warning}>Belum bisa diklaim: minimal 6 bulan iuran.</p>
        )}
        {r ? (
          <>
            <p className="muted" style={{ marginTop: 0 }}>
              {formatYen(average)} × 支給率 {(r.rateTenths / 10).toFixed(1)}
            </p>
            <Baris label="Jumlah kotor" nilai={r.gross} />
            <Baris label="Pajak 20,42%" nilai={r.tax} kurang />
            <Garis />
            <Baris label="Perkiraan diterima" nilai={r.net} tebal />
          </>
        ) : (
          bulan === 0 && <p className={styles.empty}>Isi rata-rata gaji dan lama iuran.</p>
        )}
      </KartuHasil>
      <div className={styles.form}>
        <Pilihan
          label="Bulan iuran 国民年金 yang dibayar (jika pernah)"
          value={bulanNasional}
          options={pilihanBulan}
          onChange={setBulanNasional}
        />
        {nasional > 0 && <Baris label="脱退一時金 国民年金 (令和8年度)" nilai={nasional} tebal />}
      </div>
      <CatatanPerkiraan
        butir={[
          "Sumber: 日本年金機構 「脱退一時金の制度」 (diperbarui 1 April 2026). 支給率 = 18,3% × ½ × jumlah bulan (kelipatan 6, maks 60).",
          "Syarat: bukan WNJ, ikut ≥ 6 bulan, belum 10 tahun, sudah tidak punya alamat di Jepang. Klaim paling lambat 2 tahun setelah pindah dari Jepang.",
          "Mengklaim berarti seluruh masa kepesertaan pensiun di Jepang hilang (tidak bisa digabung untuk pensiun nanti).",
          "Pajak 20,42% bisa diminta kembali lewat 「退職所得の選択課税」 dengan menunjuk 納税管理人 sebelum meninggalkan Jepang.",
        ]}
      />
    </div>
  );
}

// =============================================================================
// 住民税
// =============================================================================

export function KalkulatorPajakPenduduk() {
  const [gaji, setGaji] = useState("");
  const [iuran, setIuran] = useState("");
  const [pasangan, setPasangan] = useState(false);
  const [tanggungan, setTanggungan] = useState(0);
  const [khusus, setKhusus] = useState(0);
  const [kota, setKota] = useState("5,000");
  const salary = bacaAngka(gaji) ?? 0;
  const r =
    salary > 0
      ? calculateResidentTax({
          lastYearSalary: salary,
          lastYearSocialInsurance: bacaAngka(iuran) ?? 0,
          hasSpouse: pasangan,
          dependents: tanggungan,
          specificDependents: khusus,
          perCapita: bacaAngka(kota) ?? 0,
        })
      : null;
  return (
    <div className="stack">
      <div className={styles.form}>
        <BidangYen
          label="Total gaji tahun lalu (Jan–Des)"
          value={gaji}
          onChange={setGaji}
          helper="Lihat 源泉徴収票: 支払金額"
        />
        <BidangYen
          label="Total iuran asuransi tahun lalu"
          value={iuran}
          onChange={setIuran}
          helper="源泉徴収票: 社会保険料等の金額"
        />
        <Saklar
          label="Menanggung pasangan"
          helper="Penghasilan pasangan ≤ ¥580.000 setahun"
          checked={pasangan}
          onChange={setPasangan}
        />
        <div className={styles.twoCol}>
          <Pilihan label="Tanggungan 16+ tahun" value={tanggungan} options={pilihanTanggungan.slice(0, 6)} onChange={setTanggungan} />
          <Pilihan label="Tanggungan 19–22 tahun" value={khusus} options={pilihanTanggungan.slice(0, 6)} onChange={setKhusus} />
        </div>
        <BidangYen
          label="均等割 + 森林環境税 per tahun"
          value={kota}
          onChange={setKota}
          helper="Standar ¥5.000; beberapa kota sedikit lebih tinggi"
        />
      </div>
      <KartuHasil>
        <h2>住民税 (令和8年度)</h2>
        {r ? (
          <>
            <Baris label="給与所得" nilai={r.income} />
            <Baris label="課税所得" nilai={r.taxableIncome} />
            <Garis />
            <Baris label="所得割 (10%)" nilai={r.incomeLevy} />
            <Baris label="均等割 + 森林環境税" nilai={r.perCapita} />
            <Garis />
            <Baris label="Setahun" nilai={r.annual} tebal />
            <Baris label="≈ per bulan (Juni–Mei)" nilai={r.monthly} tebal />
          </>
        ) : (
          <p className={styles.empty}>Isi total gaji tahun lalu.</p>
        )}
        <CatatanPerkiraan
          butir={[
            "Sumber: 総務省 個人住民税; 堺市 dan 鹿児島市 (令和8年度). Tarif 10%, 基礎控除 ¥430.000, 給与所得控除 minimal ¥650.000.",
            "住民税 tahun ini dihitung dari penghasilan tahun lalu dan ditagih kota tempat tinggal pada 1 Januari. Tahun pertama di Jepang biasanya belum ada 住民税.",
            "Batas bebas pajak memakai standar kota besar; kota lain bisa sedikit berbeda.",
            "Belum termasuk ふるさと納税, iDeCo, potongan biaya medis, dan tanggungan di luar negeri tanpa dokumen.",
          ]}
        />
      </KartuHasil>
    </div>
  );
}

// =============================================================================
// Kurs
// =============================================================================

const angka = new Intl.NumberFormat("en-US");

export function KalkulatorKurs() {
  const [kurs, setKurs] = useState("");
  const [yen, setYen] = useState("");
  const [rupiah, setRupiah] = useState("");
  const [biaya, setBiaya] = useState("");
  const rate = parseRate(kurs);
  const kursSalah = kurs.trim() !== "" && rate === null;

  const dariYen = (v: string) => {
    setYen(v);
    const n = bacaAngka(v);
    setRupiah(rate !== null && n !== null ? angka.format(estimateIdr(n, rate)) : "");
  };
  const dariRupiah = (v: string) => {
    setRupiah(v);
    const n = bacaAngka(v);
    setYen(rate !== null && n !== null ? angka.format(estimateYen(n, rate)) : "");
  };
  const amountYen = bacaAngka(yen);
  const fee = bacaAngka(biaya) ?? 0;
  const amountIdr = bacaAngka(rupiah);

  return (
    <div className="stack">
      <div className={styles.form}>
        <BidangAngka
          label="Kurs (1 Yen = … Rupiah)"
          value={kurs}
          onChange={(v) => {
            setKurs(v);
            setYen("");
            setRupiah("");
          }}
          desimal
          helper={kursSalah ? "Contoh: 107.25" : "Lihat kurs di aplikasi pengiriman (SMILES, Wise, dll.)."}
        />
        <BidangYen label="Yen" value={yen} onChange={dariYen} />
        <BidangYen label="Rupiah" value={rupiah} onChange={dariRupiah} prefix="Rp" />
        <BidangYen label="Biaya kirim (opsional)" value={biaya} onChange={setBiaya} />
      </div>
      <KartuHasil>
        <h2>Ringkasan</h2>
        {rate !== null && amountYen !== null ? (
          <>
            <Baris label="Dikirim" nilai={amountYen} />
            {fee > 0 && <Baris label="Biaya kirim" nilai={fee} />}
            {fee > 0 && <Baris label="Total uang keluar" nilai={amountYen + fee} tebal />}
            {amountIdr !== null && (
              <p style={{ margin: "8px 0 0", fontWeight: 800, fontSize: 18 }}>
                ≈ {formatRupiah(amountIdr)} diterima
              </p>
            )}
          </>
        ) : (
          <p className={styles.empty}>Isi kurs lalu jumlah Yen atau Rupiah.</p>
        )}
        <CatatanPerkiraan
          butir={[
            "Hasil adalah perkiraan. Kurs dan rupiah yang benar-benar diterima mengikuti layanan pengiriman saat transaksi.",
            "Kalkulator ini menghitung di browser-mu; tidak ada data yang dikirim.",
          ]}
        />
      </KartuHasil>
    </div>
  );
}
