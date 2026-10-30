/** Daftar panduan di /panduan. Tambahkan yang terbaru di atas. */
export type Panduan = {
  slug: string;
  ikon: string;
  judul: string;
  ringkas: string;
  /** Tanggal terakhir diperiksa, YYYY-MM-DD. */
  diperbarui: string;
};

export const daftarPanduan: Panduan[] = [
  {
    slug: "pulang",
    ikon: "🧳",
    judul: "Persiapan keuangan sebelum pulang ke Indonesia",
    ringkas:
      "Urutan yang perlu diurus: 住民税, tagihan, 転出届, rekening, sampai klaim 脱退一時金 nenkin setelah sampai di Indonesia.",
    diperbarui: "2026-10-30",
  },
  {
    slug: "kirim-uang",
    ikon: "📮",
    judul: "Cara kirim uang ke Indonesia dari Jepang",
    ringkas:
      "Syarat, jenis layanan, cara menghitung biaya sebenarnya, dan cara menghindari jasa kirim ilegal.",
    diperbarui: "2026-10-30",
  },
];

export function infoPanduan(slug: string): Panduan {
  const p = daftarPanduan.find((x) => x.slug === slug);
  if (!p) throw new Error(`Panduan tidak dikenal: ${slug}`);
  return p;
}
