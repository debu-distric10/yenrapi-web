"use client";

import { useState } from "react";
import { aturan2026, prefekturBawaan } from "@/lib/kalkulator/aturan2026";
import { calculateDeductions, calculateResidentTax } from "@/lib/kalkulator/hitung";
import {
  cekTanggungan,
  hitungCuti,
  type AnggotaKeluarga,
  type Hubungan,
} from "@/lib/kalkulator/tambahan";
import {
  bacaAngka,
  Baris,
  BidangAngka,
  BidangYen,
  bulanIni,
  CatatanPerkiraan,
  KartuHasil,
  Pilihan,
  Saklar,
} from "./Bidang";
import styles from "./kalkulator.module.css";

// =============================================================================
// Tanggungan keluarga di Indonesia (扶養控除)
// =============================================================================

const pilihanHubungan: { value: Hubungan; label: string }[] = [
  { value: "orangtua", label: "Orang tua / mertua" },
  { value: "pasangan", label: "Suami / istri" },
  { value: "anak", label: "Anak" },
  { value: "saudara", label: "Saudara kandung" },
  { value: "lainnya", label: "Kakek, nenek, atau kerabat lain" },
];

type Isian = {
  hubungan: Hubungan;
  umur: string;
  kiriman: string;
  pelajar: boolean;
  disabilitas: boolean;
  penghasilanRendah: boolean;
};

const isianBaru = (): Isian => ({
  hubungan: "orangtua",
  umur: "",
  kiriman: "",
  pelajar: false,
  disabilitas: false,
  penghasilanRendah: true,
});

function keAnggota(i: Isian): AnggotaKeluarga | null {
  if (i.umur === "" && i.hubungan !== "pasangan") return null;
  return {
    hubungan: i.hubungan,
    umur: Number(i.umur || 0),
    pelajar: i.pelajar,
    disabilitas: i.disabilitas,
    kirimanSetahun: bacaAngka(i.kiriman) ?? 0,
    penghasilanRendah: i.penghasilanRendah,
  };
}

export function KalkulatorTanggungan() {
  const [gaji, setGaji] = useState("");
  const [keluarga, setKeluarga] = useState<Isian[]>([isianBaru()]);
  const ubah = (i: number, isian: Partial<Isian>) =>
    setKeluarga((k) => k.map((x, j) => (j === i ? { ...x, ...isian } : x)));

  const hasil = keluarga.map((i) => {
    const a = keAnggota(i);
    return a ? cekTanggungan(a) : null;
  });
  const diterima = hasil.flatMap((h, i) => (h?.bisa ? [{ h, i }] : []));
  const pasangan = diterima.some(({ i }) => keluarga[i].hubungan === "pasangan");
  const khusus = diterima.filter(({ h }) => h.jenis === "特定扶養").length;
  const umum = diterima.length - khusus - (pasangan ? 1 : 0);

  const gross = bacaAngka(gaji) ?? 0;
  const potongan = (dependents: number) =>
    calculateDeductions({
      grossPay: gross,
      healthRate: aturan2026.healthRateByPrefecture[prefekturBawaan],
      age: 30,
      payMonth: bulanIni(),
      dependents,
    });
  const tanpa = gross > 0 ? potongan(0) : null;
  const dengan = gross > 0 ? potongan(diterima.length) : null;
  const hematBulanan = tanpa && dengan ? tanpa.incomeTax - dengan.incomeTax : 0;
  const juminzei = (withFamily: boolean) =>
    calculateResidentTax({
      lastYearSalary: gross * 12,
      lastYearSocialInsurance: (tanpa?.socialInsurance ?? 0) * 12,
      hasSpouse: withFamily && pasangan,
      dependents: withFamily ? umum : 0,
      specificDependents: withFamily ? khusus : 0,
    }).annual;
  const hematJuminzei = gross > 0 ? juminzei(false) - juminzei(true) : 0;

  return (
    <div className="stack">
      <div className={styles.form}>
        <BidangYen
          label="Gaji kotor per bulan"
          value={gaji}
          onChange={setGaji}
          helper="Untuk memperkirakan berapa pajak yang dihemat."
        />
      </div>

      {keluarga.map((isian, i) => {
        const h = hasil[i];
        return (
          <div key={i} className={styles.form}>
            <Pilihan
              label={`Anggota keluarga ${i + 1}`}
              value={isian.hubungan}
              options={pilihanHubungan}
              onChange={(v) => ubah(i, { hubungan: v })}
            />
            <BidangAngka
              label="Umur per 31 Desember tahun ini"
              value={isian.umur}
              onChange={(v) => ubah(i, { umur: v })}
              suffix="tahun"
            />
            <BidangYen
              label="Total kiriman ke orang ini setahun"
              value={isian.kiriman}
              onChange={(v) => ubah(i, { kiriman: v })}
              helper="Hanya kiriman yang ditujukan ke orang ini sendiri."
            />
            <Saklar
              label="Penghasilannya sendiri ≤ ¥580.000 setahun"
              checked={isian.penghasilanRendah}
              onChange={(v) => ubah(i, { penghasilanRendah: v })}
            />
            {isian.hubungan !== "pasangan" && (
              <>
                <Saklar
                  label="Sedang sekolah atau kuliah di luar negeri"
                  helper="Hanya berpengaruh untuk umur 30–69"
                  checked={isian.pelajar}
                  onChange={(v) => ubah(i, { pelajar: v })}
                />
                <Saklar
                  label="Penyandang disabilitas"
                  checked={isian.disabilitas}
                  onChange={(v) => ubah(i, { disabilitas: v })}
                />
              </>
            )}
            {h && (
              <p className={h.bisa ? undefined : styles.warning} style={{ margin: 0 }}>
                <strong>{h.bisa ? `✓ Bisa: ${h.jenis}` : "✗ Tidak bisa"}</strong>
                {" · "}
                {h.alasan}
                {h.dokumenTambahan && <> Dokumen tambahan: {h.dokumenTambahan}.</>}
                {h.perluKiriman && <> Perlu bukti kiriman ke orang ini.</>}
              </p>
            )}
            {keluarga.length > 1 && (
              <button
                type="button"
                className="btn"
                style={{ justifySelf: "start", minHeight: 40 }}
                onClick={() => setKeluarga((k) => k.filter((_, j) => j !== i))}
              >
                Hapus
              </button>
            )}
          </div>
        );
      })}
      {keluarga.length < 8 && (
        <button
          type="button"
          className="btn btn-accent"
          style={{ justifySelf: "start" }}
          onClick={() => setKeluarga((k) => [...k, isianBaru()])}
        >
          + Tambah anggota keluarga
        </button>
      )}

      <KartuHasil>
        <h2>Perkiraan pajak yang dihemat</h2>
        {diterima.length === 0 ? (
          <p className={styles.empty}>Belum ada anggota keluarga yang bisa jadi tanggungan.</p>
        ) : gross === 0 ? (
          <p className={styles.empty}>
            {diterima.length} orang bisa jadi tanggungan. Isi gaji untuk melihat perkiraannya.
          </p>
        ) : (
          <>
            <p className="muted" style={{ marginTop: 0 }}>
              {diterima.length} orang bisa didaftarkan sebagai tanggungan.
            </p>
            <Baris label="所得税 per bulan berkurang" nilai={hematBulanan} />
            <Baris label="≈ setahun" nilai={hematBulanan * 12} tebal />
            <Baris
              label="住民税 tahun berikutnya berkurang"
              nilai={hematJuminzei}
              catatan="Mulai tagihan Juni tahun depan"
            />
          </>
        )}
        <CatatanPerkiraan
          butir={[
            "Sumber: 国税庁 dan 練馬区 「国外居住親族に係る扶養控除」 (berlaku sejak 令和5年分). Umur 30–69 hanya bisa jika pelajar di luar negeri, disabilitas, atau menerima kiriman ≥ ¥380.000 setahun.",
            "Daftarkan lewat 扶養控除等申告書 di perusahaan, dengan 親族関係書類 (mis. Kartu Keluarga, akta lahir, atau buku nikah, plus terjemahan Jepang) dan 送金関係書類 (bukti transfer bank atau layanan kirim uang) untuk setiap orang.",
            "Kiriman ke satu orang (mis. istri) hanya dihitung untuk orang itu, bukan untuk anak atau orang tua yang lain.",
            "Hitungan memakai tabel potongan bulanan 2026 dan asuransi 協会けんぽ Tokyo. Tambahan untuk 特定扶養 dan 老人扶養 baru terasa saat 年末調整.",
          ]}
        />
      </KartuHasil>
    </div>
  );
}

// =============================================================================
// Cuti berbayar (年次有給休暇)
// =============================================================================

const pilihanHari = [5, 4, 3, 2, 1].map((h) => ({
  value: h,
  label: h === 5 ? "5 hari atau lebih" : `${h} hari`,
}));

export function KalkulatorCuti() {
  const [tahun, setTahun] = useState("1");
  const [bulan, setBulan] = useState("0");
  const [hari, setHari] = useState(5);
  const [jam, setJam] = useState("40");

  const lamaBulan = Number(tahun || 0) * 12 + Number(bulan || 0);
  const jamPerMinggu = Number(jam || 0);
  const r = hitungCuti({ lamaBulan, hariPerMinggu: hari, jamPerMinggu });
  const sisaBulan = r.pemberianBerikutBulan - lamaBulan;

  return (
    <div className="stack">
      <div className={styles.form}>
        <div className={styles.twoCol}>
          <BidangAngka label="Lama bekerja" value={tahun} onChange={setTahun} suffix="tahun" />
          <BidangAngka label="ditambah" value={bulan} onChange={setBulan} suffix="bulan" />
        </div>
        <div className={styles.twoCol}>
          <Pilihan label="Hari kerja per minggu" value={hari} options={pilihanHari} onChange={setHari} />
          <BidangAngka label="Jam kerja per minggu" value={jam} onChange={setJam} suffix="jam" />
        </div>
      </div>
      <KartuHasil>
        <h2>Hak cuti berbayar (有給休暇)</h2>
        {r.hari > 0 ? (
          <p style={{ margin: "0 0 8px", fontWeight: 800, fontSize: 22 }}>{r.hari} hari per tahun</p>
        ) : (
          <p className={styles.empty} style={{ marginTop: 0 }}>
            Cuti pertama diberikan setelah 6 bulan bekerja.
          </p>
        )}
        <p className="muted" style={{ margin: 0 }}>
          {r.proporsional
            ? "Memakai tabel paruh waktu (比例付与) karena kerja ≤ 4 hari dan < 30 jam per minggu."
            : "Memakai tabel pekerja penuh waktu."}
        </p>
        {r.hariBerikut > 0 && (
          <p style={{ marginBottom: 0 }}>
            Pemberian berikutnya: <strong>{r.hariBerikut} hari</strong>, sekitar {sisaBulan} bulan lagi.
          </p>
        )}
        <CatatanPerkiraan
          butir={[
            "Sumber: 労働基準法 第39条; 栃木労働局 「年次有給休暇」. Berlaku juga untuk 技能実習 dan 特定技能.",
            "Syarat: hadir minimal 80% dari hari kerja yang dijadwalkan.",
            "Cuti yang tidak dipakai hangus setelah 2 tahun sejak diberikan.",
            "Kalau mendapat 10 hari atau lebih, perusahaan wajib memastikan kamu memakai minimal 5 hari setahun.",
            "Saat cuti berbayar, gaji tetap dibayar. Perusahaan tidak boleh memotong gaji atau bonus karena kamu memakai cuti.",
          ]}
        />
      </KartuHasil>
    </div>
  );
}
