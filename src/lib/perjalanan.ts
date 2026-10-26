/**
 * Perjalanan YenRapi: riwayat versi dan rencana ke depan.
 * Versi baru ditambahkan di ATAS daftar `versi` (halaman menampilkan yang
 * terbaru lebih dulu). Gambar layar disimpan di public/perjalanan/<versi>/
 * (WebP, lebar 540 px, dari aplikasi demo berdata palsu — jangan pernah
 * memakai data pribadi).
 */

export type StatusVersi = "rilis" | "uji" | "segera";

export type JenisPerubahan = "baru" | "perbaikan";

export type Layar = {
  /** Nama file di public/perjalanan/<folder>/. */
  gambar: string;
  judul: string;
  keterangan: string;
};

/** Sekelompok fitur yang ditampilkan sebagai galeri geser. */
export type Kelompok = {
  ikon: string;
  judul: string;
  ringkasan: string;
  layar: Layar[];
};

export type Versi = {
  /** Dipakai juga sebagai id tautan (#v1-0-0). */
  versi: string;
  nama: string;
  status: StatusVersi;
  waktu: string;
  /** Kalimat manfaat utama versi ini. */
  judul: string;
  ringkasan: string;
  /** Angka singkat di kartu versi, mis. "7 kalkulator". */
  sorotan?: string[];
  /** Folder gambar untuk `kelompok`. */
  folder?: string;
  kelompok?: Kelompok[];
  /** Untuk versi kecil: daftar perubahan singkat tanpa galeri. */
  perubahan?: { jenis: JenisPerubahan; teks: string }[];
};

export type LajurRencana = {
  ikon: string;
  judul: string;
  item: { judul: string; isi: string }[];
};

export const labelStatus: Record<StatusVersi, string> = {
  rilis: "Sudah rilis",
  uji: "Uji tertutup",
  segera: "Segera",
};

export const labelPerubahan: Record<JenisPerubahan, string> = {
  baru: "✨ Baru",
  perbaikan: "🔧 Perbaikan",
};

export const versi: Versi[] = [
  {
    versi: "1.0.1",
    nama: "Perbaikan baca slip gaji",
    status: "segera",
    waktu: "Akhir Oktober 2026",
    judul: "Foto slip gaji kembali terbaca otomatis",
    ringkasan:
      "Pembaruan kecil untuk penguji. Semua fitur dan data dari 1.0.0 tetap sama.",
    perubahan: [
      {
        jenis: "perbaikan",
        teks: "Membaca foto slip gaji dan screenshot SMILES bisa gagal di 1.0.0 — sekarang sudah berfungsi lagi.",
      },
      {
        jenis: "perbaikan",
        teks: "Sudah diuji ulang di HP sungguhan dengan versi yang sama seperti di Play Store.",
      },
    ],
  },
  {
    versi: "1.0.0",
    nama: "Rilis pertama",
    status: "uji",
    waktu: "Uji tertutup sejak 23 Oktober 2026",
    judul: "Gaji dalam Yen, keluarga di Indonesia — rapi di satu aplikasi",
    ringkasan:
      "Pencatatan keuangan lengkap untuk pekerja Indonesia di Jepang. Gratis, tanpa iklan, tanpa akun, dan tanpa internet.",
    sorotan: ["9 modul keuangan", "7 kalkulator", "43 istilah Jepang", "0 iklan"],
    folder: "1.0.0",
    kelompok: [
      {
        ikon: "💴",
        judul: "Uang harian",
        ringkasan: "Saldo Yen dan Rupiah, pemasukan, pengeluaran, dan transfer — semuanya dalam beberapa ketukan.",
        layar: [
          { gambar: "beranda.webp", judul: "Beranda", keterangan: "Total ¥ dan Rp, sisa uang bulan ini, pengingat tagihan." },
          { gambar: "keuangan.webp", judul: "Menu Keuangan", keterangan: "Sembilan modul dalam empat kelompok." },
          { gambar: "transaksi.webp", judul: "Transaksi", keterangan: "Riwayat per bulan, bisa disaring per jenis." },
          { gambar: "catat.webp", judul: "Catat transaksi", keterangan: "Kategori khas hidup di Jepang, bisa ditambah." },
          { gambar: "transfer.webp", judul: "Transfer", keterangan: "Menabung = pindah uang, bukan pengeluaran." },
          { gambar: "rekening.webp", judul: "Dompet & rekening", keterangan: "Tunai, Yucho, PayPay, sampai rekening Rupiah." },
        ],
      },
      {
        ikon: "🧾",
        judul: "Gaji & slip gaji (給与明細)",
        ringkasan: "Foto slip kertas, angka langsung terisi. Semua istilah Jepang ada artinya.",
        layar: [
          { gambar: "slip.webp", judul: "Riwayat slip", keterangan: "支給, 控除, dan gaji bersih tiap bulan." },
          { gambar: "slip-edit.webp", judul: "Isi dari foto", keterangan: "Dibaca di HP, tanpa internet. Foto disimpan terenkripsi." },
          { gambar: "slip-potongan.webp", judul: "Rincian potongan", keterangan: "健康保険, 厚生年金, 所得税, 住民税 — dengan arti." },
        ],
      },
      {
        ikon: "📅",
        judul: "Tagihan, utang & kalender",
        ringkasan: "Tidak ada lagi jatuh tempo yang terlewat.",
        layar: [
          { gambar: "tagihan.webp", judul: "Tagihan", keterangan: "Listrik, gas, internet, sewa — dicatat saat dibayar." },
          { gambar: "utang.webp", judul: "Utang & cicilan", keterangan: "Utang, cicilan HP, piutang, dan arisan." },
          { gambar: "utang-detail.webp", judul: "Bayar cicilan", keterangan: "Progres dan riwayat pembayaran." },
          { gambar: "kalender.webp", judul: "Kalender", keterangan: "Gajian dan jatuh tempo, dengan notifikasi pengingat." },
        ],
      },
      {
        ikon: "📮",
        judul: "Kiriman ke Indonesia",
        ringkasan: "Tahu persis berapa yang sudah dikirim dan berapa habis untuk biaya.",
        layar: [
          { gambar: "kiriman.webp", judul: "Ringkasan kiriman", keterangan: "Total setahun dan total biaya selama ini." },
          { gambar: "kiriman-form.webp", judul: "Catat kiriman", keterangan: "Isi otomatis dari screenshot SMILES." },
        ],
      },
      {
        ikon: "🎯",
        judul: "Tabungan, anggaran & aset",
        ringkasan: "Tujuan jelas, batas belanja jelas, kekayaan bersih kelihatan.",
        layar: [
          { gambar: "target.webp", judul: "Target tabungan", keterangan: "Saran berapa disisihkan per bulan agar tepat waktu." },
          { gambar: "anggaran.webp", judul: "Anggaran", keterangan: "Batas belanja bulanan per kategori." },
          { gambar: "aset.webp", judul: "Aset & kekayaan", keterangan: "Emas, NISA, tabungan di Indonesia." },
        ],
      },
      {
        ikon: "🧮",
        judul: "Kalkulator & istilah",
        ringkasan: "Perkiraan gaji, pajak, dan nenkin dengan aturan resmi 2026.",
        layar: [
          { gambar: "kalkulator.webp", judul: "7 kalkulator", keterangan: "Kurs, gaji, lembur, pajak, bonus, 住民税, nenkin." },
          { gambar: "kalk-gaji.webp", judul: "Gaji bersih", keterangan: "Dari gaji kotor sampai 手取り, 47 prefektur." },
          { gambar: "kalk-kurs.webp", judul: "Yen ⇄ Rupiah", keterangan: "Kurs otomatis dari kiriman terakhir." },
          { gambar: "kalk-nenkin.webp", judul: "Nenkin lump-sum", keterangan: "Perkiraan uang nenkin yang kembali saat pulang." },
          { gambar: "istilah.webp", judul: "Istilah Jepang", keterangan: "Cara baca dan arti, bisa dicari." },
        ],
      },
      {
        ikon: "🔒",
        judul: "Aman & nyaman",
        ringkasan: "Data terenkripsi dan hanya di HP. Aplikasi bahkan tidak punya izin internet.",
        layar: [
          { gambar: "dokumen.webp", judul: "Dokumen penting", keterangan: "在留カード dan paspor, dengan pengingat kedaluwarsa." },
          { gambar: "pengaturan.webp", judul: "Kunci aplikasi", keterangan: "Sidik jari, wajah, atau PIN HP." },
          { gambar: "backup.webp", judul: "Backup", keterangan: "Satu file berpassword, pulihkan di HP baru." },
          { gambar: "beranda-gelap.webp", judul: "Mode gelap", keterangan: "Terang, Gelap, atau ikuti HP." },
          { gambar: "target-gelap.webp", judul: "Gelap di semua layar", keterangan: "Nyaman dipakai setelah shift malam." },
        ],
      },
    ],
  },
];

/** Rencana tanpa tanggal; urutan dan isi bisa berubah. */
export const rencana: LajurRencana[] = [
  {
    ikon: "🔨",
    judul: "Sedang dikerjakan",
    item: [
      { judul: "Rilis publik di Google Play", isi: "Uji tertutup bersama penguji sebelum bisa diunduh semua orang." },
      { judul: "Pembaruan 1.0.1", isi: "Perbaikan baca foto slip gaji untuk para penguji." },
    ],
  },
  {
    ikon: "⏭️",
    judul: "Berikutnya",
    item: [
      { judul: "Utang & cicilan dalam Rupiah", isi: "Dibayar dari rekening Rupiah, total per mata uang." },
      { judul: "Target tabungan dalam Rupiah", isi: "Mis. DP rumah di Indonesia, progres dipisah per mata uang." },
      { judul: "Mode Latihan", isi: "Coba semua fitur dengan data contoh tanpa mengganggu data asli." },
      { judul: "Grafik & Laporan", isi: "Tren bulanan dan kategori terbesar." },
    ],
  },
  {
    ikon: "💭",
    judul: "Nanti",
    item: [
      { judul: "Ekspor ke CSV/Excel", isi: "Olah sendiri data transaksi." },
      { judul: "Sinkronisasi cloud (opsional)", isi: "Terenkripsi di HP sebelum dikirim; tanpa login tetap bisa dipakai penuh." },
      { judul: "Versi iPhone", isi: "Setelah versi Android stabil." },
    ],
  },
];
