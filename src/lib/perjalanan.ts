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

/** Waktu untuk versi yang masuk uji tertutup bersama 1.6.0. */
const ujiNovember = "Uji tertutup sejak November 2026";

/** Waktu untuk versi yang tayang di Google Play bersama 1.11.0. */
const rilisPublik = "Tayang di Google Play, November 2026";

export const versi: Versi[] = [
  {
    versi: "2.0.0",
    nama: "Wajah baru",
    status: "rilis",
    waktu: "Tayang di Google Play, 13 November 2026",
    judul: "Tampilan baru, lebih rapi dan enak dilihat",
    ringkasan:
      "Semua menu didesain ulang dengan animasi halus dan mode gelap yang lebih rapi. Beranda menyapa dengan namamu, kartu akun bisa dihias, dan laporan bisa disimpan sebagai PDF atau Excel. Kurs ¥ → Rp kini otomatis: internet hanya dipakai untuk kurs dan bisa dimatikan.",
    sorotan: ["Desain baru semua menu", "Kartu akun bergaya", "Laporan PDF & Excel"],
    folder: "2.0.0",
    kelompok: [
      {
        ikon: "✨",
        judul: "Desain baru di semua menu",
        ringkasan: "Beranda menyapa dengan namamu, ada tombol cepat Keluar, Masuk, Scan slip, dan Kirim, dan grafiknya lebih mudah dibaca.",
        layar: [
          { gambar: "beranda.webp", judul: "Beranda", keterangan: "Sapaan, kartu akun, total saldo, dan tombol cepat." },
          { gambar: "keuangan-statistik.webp", judul: "Keuangan", keterangan: "Pengeluaran per kategori dan rasio menabung." },
          { gambar: "slip-gaji.webp", judul: "Slip gaji", keterangan: "Istilah Jepang beserta artinya, sampai 手取り." },
          { gambar: "kiriman-ke-indonesia.webp", judul: "Kiriman ke Indonesia", keterangan: "Kurs dan biaya setiap kiriman." },
          { gambar: "rencana-pulang.webp", judul: "Rencana Pulang", keterangan: "Perkiraan uang saat pulang, termasuk 脱退一時金." },
        ],
      },
      {
        ikon: "💳",
        judul: "Kartu akun sesukamu",
        ringkasan: "Pakai warna bank, pilih warna sendiri, gambar bawaan, atau fotomu. Foto disimpan terenkripsi dan ikut backup.",
        layar: [
          { gambar: "tampilan-kartu.webp", judul: "Tampilan kartu", keterangan: "Senja, Laut, Sakura, Hutan, atau foto sendiri." },
        ],
      },
      {
        ikon: "📄",
        judul: "Laporan PDF & Excel",
        ringkasan: "Laporan A4 siap cetak atau file Excel lengkap dengan grafik, enak dibagikan ke keluarga.",
        layar: [
          { gambar: "ekspor-pdf-excel.webp", judul: "Ekspor", keterangan: "Pilih periode dan isi laporannya." },
        ],
      },
    ],
  },
  {
    versi: "1.11.0",
    nama: "Mulai dari sini",
    status: "rilis",
    waktu: rilisPublik,
    judul: "Langsung tahu harus mulai dari mana",
    ringkasan:
      "Rilis pertama di Google Play. Langkah awal menyesuaikan kondisimu, foto slip gaji lebih akurat, dan menu Dana Talangan untuk yang berangkat lewat LPK.",
    sorotan: ["Alur awal per kondisi", "Foto slip lebih akurat", "Dana Talangan LPK"],
    folder: "1.11.0",
    kelompok: [
      {
        ikon: "🧭",
        judul: "Langkah awal baru",
        ringkasan: "Pilih kondisimu dulu: masih di Indonesia, baru di Jepang, atau sudah lama di Jepang. Langkah berikutnya menyesuaikan.",
        layar: [
          { gambar: "layar-pembuka.webp", judul: "Layar pembuka", keterangan: "Mulai, coba dengan data contoh, atau pulihkan backup." },
          { gambar: "kamu-di-mana.webp", judul: "Kamu sekarang di mana?", keterangan: "Tiga pilihan, bisa diganti nanti di Pengaturan." },
          { gambar: "uangmu-ada-di-mana.webp", judul: "Uangmu ada di mana?", keterangan: "Centang tunai, bank, e-money, dan rekening Rupiah, lalu isi saldonya." },
          { gambar: "mulai-dari-sini.webp", judul: "Mulai dari sini", keterangan: "Kartu langkah awal di Beranda sampai semuanya beres." },
          { gambar: "beranda.webp", judul: "Beranda", keterangan: "Saldo, pulang berapa bulan lagi, dan dana talangan." },
        ],
      },
      {
        ikon: "📸",
        judul: "Foto slip gaji (beta)",
        ringkasan: "Angka slip terbaca lebih lengkap, ada panduan cara memfoto, dan hasilnya dicek bersama dalam bahasa Indonesia.",
        layar: [
          { gambar: "panduan-foto-slip.webp", judul: "Cara memfoto slip", keterangan: "Di meja, tempat terang, HP sejajar kertas." },
        ],
      },
      {
        ikon: "🏦",
        judul: "Dana Talangan LPK",
        ringkasan: "Sisa utang ke LPK, jadwal cicilan, pengingat, dan bayar langsung lewat Kiriman.",
        layar: [
          { gambar: "dana-talangan.webp", judul: "Dana Talangan", keterangan: "Sisa, cicilan berikutnya, dan rincian biaya." },
        ],
      },
    ],
  },
  {
    versi: "1.9.0",
    nama: "Catat lebih cepat",
    status: "rilis",
    waktu: rilisPublik,
    judul: "Catat pengeluaran dalam satu ketukan",
    ringkasan:
      "Widget di layar utama HP, kotak kategori yang paling sering dipakai, PIN untuk dokumen, sembunyikan saldo, simulasi tabungan, dan tombol ? di setiap halaman.",
    sorotan: ["Widget layar utama", "PIN Dokumen", "Simulasi Tabungan"],
    folder: "1.9.0",
    kelompok: [
      {
        ikon: "⚡",
        judul: "Catat lebih cepat",
        ringkasan: "Sekali ketuk dari layar utama, keyboard angka langsung terbuka. Kategori yang sering dipakai muncul paling depan.",
        layar: [
          { gambar: "widget-dan-menu-ikon.webp", judul: "Widget & menu ikon", keterangan: "Ilustrasi. Tahan ikon YenRapi untuk pintasan." },
          { gambar: "catat-kotak-kategori.webp", judul: "Kotak kategori", keterangan: "7 kategori yang paling sering kamu pakai." },
          { gambar: "semua-kategori.webp", judul: "Semua kategori", keterangan: "Lewat kotak \"Lainnya\", bisa tambah kategori." },
        ],
      },
      {
        ikon: "🔒",
        judul: "Dokumen aman & saldo tersembunyi",
        ringkasan: "Dokumen penting dikunci PIN 4 angka. Saldo di Beranda bisa disembunyikan dengan tombol mata.",
        layar: [
          { gambar: "pin-dokumen.webp", judul: "PIN Dokumen", keterangan: "Lupa PIN? Buka dengan kunci HP." },
          { gambar: "saldo-disembunyikan.webp", judul: "Saldo disembunyikan", keterangan: "Aman kalau HP dilihat orang lain." },
        ],
      },
      {
        ikon: "🐷",
        judul: "Simulasi tabungan & panduan",
        ringkasan: "Hitung hasil menabung rutin lalu jadikan target. Tombol ? menjelaskan setiap halaman.",
        layar: [
          { gambar: "simulasi-tabungan.webp", judul: "Simulasi Tabungan", keterangan: "Hasil akhir atau setoran per bulan." },
          { gambar: "panduan-aplikasi.webp", judul: "Panduan aplikasi", keterangan: "Semua panduan di satu tempat." },
        ],
      },
    ],
  },
  {
    versi: "1.6.0",
    nama: "Rencana Pulang & Usaha",
    status: "uji",
    waktu: ujiNovember,
    judul: "Cukupkah uangku saat pulang nanti?",
    ringkasan:
      "Hitung uang yang kamu bawa pulang: tabungan, kiriman untuk masa depan, dan perkiraan 脱退一時金, dibandingkan dengan dana darurat dan modal usaha.",
    sorotan: ["Rencana Pulang", "脱退一時金 dari slip", "Kiriman \"untuk apa?\""],
    folder: "1.6.0",
    kelompok: [
      {
        ikon: "✈️",
        judul: "Rencana Pulang",
        ringkasan: "Atur bulan pulang, lalu lihat apakah uangnya cukup. Kalau kurang, ada saran tambahan tabungan per bulan.",
        layar: [
          { gambar: "target-rencana-pulang.webp", judul: "Kartu di tab Target", keterangan: "\"Cukupkah uangku saat pulang?\"" },
          { gambar: "atur-rencana.webp", judul: "Atur rencana", keterangan: "Bulan pulang, rekening yang dihitung, dana darurat, modal usaha." },
          { gambar: "rencana-pulang.webp", judul: "Belum cukup", keterangan: "Kurang berapa, dan saran menabung per bulan." },
          { gambar: "rencana-pulang-cukup.webp", judul: "Sudah cukup", keterangan: "Lebih berapa saat pulang nanti." },
          { gambar: "rencana-pulang-rincian.webp", judul: "Rincian", keterangan: "Rekening, tabungan sampai pulang, 脱退一時金, kebutuhan di Indonesia." },
          { gambar: "beranda-pulang.webp", judul: "Di Beranda", keterangan: "Kartu kecil \"Pulang N bulan lagi\"." },
        ],
      },
      {
        ikon: "📮",
        judul: "Kiriman & nenkin",
        ringkasan: "Kiriman bisa ditandai untuk apa, dan perkiraan nenkin dihitung dari slip gaji.",
        layar: [
          { gambar: "kiriman-untuk-apa.webp", judul: "Untuk apa?", keterangan: "Kebutuhan keluarga, tabungan, atau modal usaha." },
          { gambar: "atur-nenkin.webp", judul: "脱退一時金 otomatis", keterangan: "Dihitung dari potongan 厚生年金 di slip gaji." },
        ],
      },
    ],
  },
  {
    versi: "1.5.0",
    nama: "Cari & aman",
    status: "uji",
    waktu: ujiNovember,
    judul: "Cari transaksi lama dalam hitungan detik",
    ringkasan:
      "Cari lewat catatan, kategori, rekening, atau nominal di semua bulan. Ditambah pengingat backup supaya data tidak hilang saat ganti HP.",
    folder: "1.5.0",
    kelompok: [
      {
        ikon: "🔍",
        judul: "Cari transaksi",
        ringkasan: "Ketik \"ramen\" atau \"1500\", lalu saring per jenis, rekening, atau batas nominal.",
        layar: [
          { gambar: "cari-transaksi.webp", judul: "Kotak cari", keterangan: "Mencari di semua bulan sekaligus." },
          { gambar: "cari-hasil.webp", judul: "Hasil pencarian", keterangan: "Dikelompokkan per tanggal." },
          { gambar: "cari-batas-nominal.webp", judul: "Batas nominal", keterangan: "Minimal dan maksimal." },
          { gambar: "cari-hasil-saring.webp", judul: "Hasil tersaring", keterangan: "Hanya yang sesuai saringan." },
        ],
      },
      {
        ikon: "💾",
        judul: "Pengingat backup",
        ringkasan: "Kartu di Beranda kalau sudah 30 hari belum backup. Tanpa notifikasi, tanpa izin baru.",
        layar: [
          { gambar: "pengingat-backup.webp", judul: "Kartu pengingat", keterangan: "\"Backup sekarang\" atau \"Nanti saja\"." },
        ],
      },
    ],
  },
  {
    versi: "1.4.0",
    nama: "Ekspor data",
    status: "uji",
    waktu: ujiNovember,
    judul: "Datamu bisa dibawa ke Excel",
    ringkasan:
      "Ekspor transaksi, slip gaji, kiriman, utang, dan target ke satu file Excel. Statistik bisa memakai tanggal sendiri dan dibagikan sebagai gambar.",
    folder: "1.4.0",
    kelompok: [
      {
        ikon: "📊",
        judul: "Ekspor ke Excel",
        ringkasan: "Pilih sendiri bagian dan rentang tanggalnya. Foto dokumen tidak pernah ikut.",
        layar: [
          { gambar: "pengaturan-ekspor.webp", judul: "Di Pengaturan", keterangan: "Data → Ekspor ke Excel." },
          { gambar: "ekspor-excel.webp", judul: "Pilih isi", keterangan: "Satu sheet per bagian." },
          { gambar: "ekspor-excel-simpan.webp", judul: "Simpan atau bagikan", keterangan: "Ada peringatan: file Excel tidak dikunci password." },
        ],
      },
      {
        ikon: "📅",
        judul: "Statistik lebih leluasa",
        ringkasan: "Pilih tanggal sendiri, lalu bagikan ringkasannya sebagai gambar dengan nominal tersembunyi.",
        layar: [
          { gambar: "statistik-pilih-tanggal.webp", judul: "Pilih tanggal", keterangan: "Rentang bebas lewat kalender." },
          { gambar: "statistik-tanggal-sendiri.webp", judul: "Hasilnya", keterangan: "Sampai 31 hari ditampilkan per hari." },
          { gambar: "bagikan-nominal-tersembunyi.webp", judul: "Bagikan gambar", keterangan: "Nominal disembunyikan sebagai bawaan." },
          { gambar: "bagikan-nominal-tampil.webp", judul: "Atau tampilkan", keterangan: "Kalau memang mau menunjukkan angkanya." },
        ],
      },
    ],
  },
  {
    versi: "1.3.0",
    nama: "Rupiah lebih lengkap",
    status: "uji",
    waktu: ujiNovember,
    judul: "Utang dan target tabungan dalam Rupiah",
    ringkasan:
      "Cicilan di Indonesia atau tabungan DP rumah bisa dicatat dalam Rupiah, dibayar dari rekening Rupiah. Total yen dan Rupiah dipisah, plus perkiraan gabungan.",
    folder: "1.3.0",
    kelompok: [
      {
        ikon: "🇮🇩",
        judul: "Yen atau Rupiah",
        ringkasan: "Pilih mata uangnya saat membuat. Kekayaan bersih ikut menghitung semuanya.",
        layar: [
          { gambar: "utang-rupiah.webp", judul: "Utang & cicilan", keterangan: "Total per mata uang." },
          { gambar: "utang-form-rupiah.webp", judul: "Catat utang Rupiah", keterangan: "Pilih ¥ atau Rp." },
          { gambar: "target-yen-rupiah.webp", judul: "Target tabungan", keterangan: "Ringkasan terpisah untuk yen dan Rupiah." },
          { gambar: "target-form-rupiah.webp", judul: "Target dalam Rupiah", keterangan: "Mis. DP rumah di Indonesia." },
          { gambar: "kekayaan-bersih.webp", judul: "Kekayaan bersih", keterangan: "Ikut menghitung utang dan piutang Rupiah." },
        ],
      },
    ],
  },
  {
    versi: "1.2.0",
    nama: "Statistik & grafik",
    status: "uji",
    waktu: ujiNovember,
    judul: "Uangmu habis ke mana, kelihatan dalam grafik",
    ringkasan:
      "Pemasukan vs pengeluaran, kategori terbesar, rincian potongan gaji Jepang, rasio menabung, dan tren saldo. Ketuk grafik untuk melihat transaksinya.",
    folder: "1.2.0",
    kelompok: [
      {
        ikon: "📈",
        judul: "Statistik",
        ringkasan: "Rentang 1 minggu sampai 1 tahun. Hanya menghitung yen.",
        layar: [
          { gambar: "keuangan-statistik.webp", judul: "Tab Keuangan baru", keterangan: "Kartu Statistik di paling atas." },
          { gambar: "statistik-ringkasan.webp", judul: "Ringkasan", keterangan: "Analisis singkat bulan ini." },
          { gambar: "statistik-1-minggu.webp", judul: "1 minggu", keterangan: "Pemasukan vs pengeluaran per hari." },
          { gambar: "statistik-1-bulan.webp", judul: "1 bulan", keterangan: "Tampilan bawaan untuk pengguna baru." },
          { gambar: "statistik-kategori.webp", judul: "Per kategori", keterangan: "Pengeluaran terbesar ke mana." },
          { gambar: "statistik-gaji.webp", judul: "Rincian gaji", keterangan: "Pajak 所得税 + 住民税 dan asuransi 社会保険." },
          { gambar: "statistik-saldo.webp", judul: "Tren saldo", keterangan: "Saldo dan kekayaan dari bulan ke bulan." },
          { gambar: "statistik-harian-anggaran.webp", judul: "Harian & anggaran", keterangan: "Pengeluaran harian dan sisa anggaran." },
          { gambar: "statistik-rincian.webp", judul: "Rincian transaksi", keterangan: "Ketuk grafik, muncul transaksinya." },
        ],
      },
      {
        ikon: "🧮",
        judul: "Kalkulator dari slip",
        ringkasan: "Kalkulator pajak, gaji, lembur, dan bonus bisa diisi dari slip gaji terbaru.",
        layar: [
          { gambar: "kalkulator-isi-dari-slip.webp", judul: "Isi dari slip", keterangan: "Satu ketukan, angka terisi." },
          { gambar: "keuangan-modul.webp", judul: "Angka di tiap menu", keterangan: "Ringkasan terkini langsung di menu Keuangan." },
        ],
      },
    ],
  },
  {
    versi: "1.1.0",
    nama: "Belajar tanpa takut",
    status: "uji",
    waktu: ujiNovember,
    judul: "Coba dulu dengan data contoh, ada panduannya",
    ringkasan:
      "Mode latihan berisi data contoh 6 bulan tanpa menyentuh data asli, panduan 13 langkah, dan sapaan dengan nama panggilanmu.",
    folder: "1.1.0",
    kelompok: [
      {
        ikon: "🧪",
        judul: "Mode latihan",
        ringkasan: "Coba semua fitur dengan data contoh. Data asli aman.",
        layar: [
          { gambar: "mode-latihan.webp", judul: "Mode latihan", keterangan: "Ditandai pita kuning di atas layar." },
          { gambar: "kartu-baru.webp", judul: "Baru di YenRapi", keterangan: "Kartu untuk pengguna lama, boleh dilewati." },
        ],
      },
      {
        ikon: "🧭",
        judul: "Panduan & nama panggilan",
        ringkasan: "Panduan menyorot tombol-tombol penting. Bisa diulang dari Pengaturan.",
        layar: [
          { gambar: "pembuka-nama.webp", judul: "Mau dipanggil siapa?", keterangan: "Di layar pembuka, boleh dilewati." },
          { gambar: "panduan-sapaan.webp", judul: "Selamat datang", keterangan: "Langkah pertama panduan." },
          { gambar: "panduan-saldo.webp", judul: "Total saldo", keterangan: "Penjelasan tiap bagian Beranda." },
          { gambar: "panduan-tombol.webp", judul: "Tombol cepat", keterangan: "Keluar, Masuk, Kirim, Transfer." },
          { gambar: "panduan-slip.webp", judul: "Slip gaji", keterangan: "Menjelaskan menu slip gaji." },
          { gambar: "pengaturan-profil.webp", judul: "Pengaturan", keterangan: "Ubah nama, ulangi panduan, mode latihan." },
        ],
      },
    ],
  },
  {
    versi: "1.0.1",
    nama: "Perbaikan baca slip gaji",
    status: "uji",
    waktu: ujiNovember,
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
      { judul: "Kamera foto slip", isi: "Bingkai di dalam kamera supaya seluruh tabel slip masuk dan angkanya terbaca lengkap." },
    ],
  },
  {
    ikon: "⏭️",
    judul: "Berikutnya",
    item: [
      { judul: "Banyak profil", isi: "Satu HP untuk beberapa catatan terpisah." },
      { judul: "Backup versi baru", isi: "Pindah HP dan memulihkan data jadi lebih mudah." },
    ],
  },
  {
    ikon: "💭",
    judul: "Nanti",
    item: [
      { judul: "Versi iPhone", isi: "Setelah versi Android stabil." },
    ],
  },
];
