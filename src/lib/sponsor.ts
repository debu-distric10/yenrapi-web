/**
 * Data halaman Jadi Sponsor. Harga tidak ditulis di situs: calon sponsor
 * menghubungi lewat email, lalu harga dan angka pengguna dikirim langsung.
 */
export type PaketSponsor = {
  ikon: string;
  nama: string;
  isi: string;
  tempat: string;
};

export const paketSponsor: PaketSponsor[] = [
  {
    ikon: "🤝",
    nama: "Mitra YenRapi",
    isi: "Nama dan logo di daftar “Didukung oleh” pada halaman Dukung, dengan satu kalimat tentang layanan dan tautan ke situs Anda.",
    tempat: "Website, per bulan",
  },
  {
    ikon: "📖",
    nama: "Panduan bersponsor",
    isi: "Satu panduan praktis (misalnya cara kirim uang ke Indonesia atau persiapan pulang) bertanda “Disponsori oleh”. Isi tetap ditulis YenRapi dan tetap jujur, termasuk soal pilihan lain.",
    tempat: "Website, satu artikel",
  },
  {
    ikon: "🧮",
    nama: "Sponsor kalkulator",
    isi: "Tulisan “Kalkulator ini didukung oleh” di bawah salah satu kalkulator, misalnya kalkulator kurs atau gaji bersih.",
    tempat: "Website, per bulan",
  },
];

/** Aturan yang sama untuk semua sponsor. */
export const aturanSponsor: string[] = [
  "Sponsor hanya tampil di website. Aplikasi YenRapi tetap tanpa iklan dan tanpa sponsor.",
  "Tidak ada skrip, piksel pelacak, atau cookie dari sponsor. Logo disimpan di situs ini dan tautan diberi tanda sponsor.",
  "Tidak ada data pengguna yang dibagikan. YenRapi memang tidak punya data itu: semua catatan keuangan hanya ada di HP pengguna.",
  "Setiap tampilan sponsor diberi label yang jelas. Isi panduan dan hasil kalkulator tidak bisa dibeli.",
];

/** Bidang yang tidak diterima sebagai sponsor. */
export const sponsorDitolak: string[] = [
  "pinjaman online dan kredit berbunga tinggi",
  "judi dan taruhan",
  "investasi atau kripto yang menjanjikan untung pasti",
  "MLM dan arisan berantai",
  "agen kerja yang memungut biaya di luar aturan resmi",
];

/** Sponsor yang sedang aktif; tampil di halaman Dukung. */
export type SponsorAktif = { nama: string; url: string; kalimat: string };

export const sponsorAktif: SponsorAktif[] = [];
