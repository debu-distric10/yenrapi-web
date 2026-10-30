/** Daftar kalkulator (urutan sama dengan aplikasi). */
export const daftarKalkulator = [
  {
    slug: "gaji",
    judul: "Kalkulator Gaji",
    ringkas: "Perkiraan gaji kotor dan gaji bersih (手取り).",
    deskripsi:
      "Hitung perkiraan gaji bersih (手取り) di Jepang dari gaji pokok atau upah per jam, lengkap dengan potongan 健康保険, 厚生年金, 雇用保険, dan 所得税 2026.",
  },
  {
    slug: "lembur",
    judul: "Kalkulator Lembur",
    ringkas: "Perkiraan upah lembur (残業 zangyō).",
    deskripsi:
      "Hitung upah lembur (残業手当) di Jepang: lembur 25%, di atas 60 jam 50%, kerja malam, dan hari libur resmi.",
  },
  {
    slug: "pajak",
    judul: "Pajak & Potongan",
    ringkas: "Perkiraan pajak dan iuran sosial dari gaji kotor.",
    deskripsi:
      "Perkiraan potongan gaji di Jepang 2026: 健康保険 per prefektur, 介護保険, 子ども・子育て支援金, 厚生年金, 雇用保険, dan 所得税.",
  },
  {
    slug: "bonus",
    judul: "Kalkulator Bonus",
    ringkas: "Perkiraan bonus (賞与) bersih.",
    deskripsi:
      "Hitung perkiraan bonus bersih (賞与) di Jepang: iuran asuransi dan pajak bonus menurut tabel 令和8年分.",
  },
  {
    slug: "pajak-penduduk",
    judul: "Pajak Penduduk (住民税)",
    ringkas: "Perkiraan 住民税 dari gaji tahun lalu.",
    deskripsi:
      "Perkiraan pajak penduduk (住民税 jūminzei) 令和8年度 dari gaji dan iuran asuransi tahun lalu.",
  },
  {
    slug: "nenkin",
    judul: "Nenkin Lump-sum (脱退一時金)",
    ringkas: "Perkiraan pengembalian 年金 saat pulang.",
    deskripsi:
      "Hitung perkiraan 脱退一時金 (pengembalian nenkin) 厚生年金 dan 国民年金 untuk pekerja asing yang pulang dari Jepang.",
  },
  {
    slug: "kurs",
    judul: "Konversi Yen ⇄ Rupiah",
    ringkas: "Hitung JPY ke IDR dengan kurs pilihan.",
    deskripsi:
      "Konversi Yen ke Rupiah dan sebaliknya dengan kurs pilihanmu, plus total biaya kirim.",
  },
  // Dua kalkulator berikut hanya ada di website.
  {
    slug: "tanggungan",
    judul: "Tanggungan Keluarga (扶養控除)",
    ringkas: "Cek keluarga di Indonesia yang bisa jadi tanggungan pajak.",
    deskripsi:
      "Cek apakah orang tua, pasangan, atau anak di Indonesia bisa didaftarkan sebagai tanggungan pajak (扶養控除), dokumen yang dibutuhkan, dan perkiraan pajak yang dihemat.",
  },
  {
    slug: "cuti",
    judul: "Cuti Berbayar (有給休暇)",
    ringkas: "Berapa hari cuti berbayar yang menjadi hakmu.",
    deskripsi:
      "Hitung hak cuti berbayar (年次有給休暇) menurut lama kerja dan jadwal kerja per minggu, sesuai 労働基準法.",
  },
] as const;

export type SlugKalkulator = (typeof daftarKalkulator)[number]["slug"];

export function infoKalkulator(slug: SlugKalkulator) {
  return daftarKalkulator.find((k) => k.slug === slug)!;
}
