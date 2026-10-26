/**
 * Perjalanan YenRapi: riwayat versi dan rencana ke depan.
 * Versi baru ditambahkan di ATAS daftar; halaman menampilkannya dari yang
 * terlama (1.0.0) ke rencana ke depan. Gambar layar disimpan di
 * public/perjalanan/<versi>/ (WebP, lebar 540 px, dari aplikasi demo
 * berdata palsu — jangan pernah memakai data pribadi).
 */

export type StatusVersi = "rilis" | "uji" | "segera" | "rencana";

export type Fitur = {
  judul: string;
  /** Nama file di public/perjalanan/<versi>/ (tanpa folder). */
  gambar?: string;
  alt?: string;
  poin: string[];
};

export type Versi = {
  /** Dipakai juga sebagai id tautan (#v1-0-0). */
  versi: string;
  nama: string;
  status: StatusVersi;
  waktu: string;
  ringkasan: string;
  /** Folder gambar; kosong jika versi ini belum punya gambar. */
  folder?: string;
  fitur: Fitur[];
};

export const labelStatus: Record<StatusVersi, string> = {
  rilis: "Sudah rilis",
  uji: "Uji tertutup",
  segera: "Segera",
  rencana: "Rencana",
};

export const perjalanan: Versi[] = [
  {
    versi: "Berikutnya",
    nama: "Rencana ke depan",
    status: "rencana",
    waktu: "Setelah rilis di Google Play",
    ringkasan:
      "Ide yang sudah disepakati untuk versi-versi berikutnya. Urutan dan isinya masih bisa berubah mengikuti masukan pengguna.",
    fitur: [
      {
        judul: "Utang & cicilan dalam Rupiah",
        poin: [
          "Utang, cicilan, piutang, dan arisan bisa dalam ¥ atau Rp.",
          "Mata uang tetap sejak dibuat; cicilan Rp dibayar dari rekening Rupiah.",
          "Total per mata uang, plus perkiraan gabungan.",
        ],
      },
      {
        judul: "Target tabungan dalam Rupiah",
        poin: [
          "Target bisa dalam ¥ atau Rp, mis. DP rumah di Indonesia.",
          "Setoran Rp diambil dari rekening Rupiah.",
          "Ringkasan progres dipisah per mata uang.",
        ],
      },
      {
        judul: "Mode Latihan",
        poin: [
          "Coba semua fitur dengan data contoh tanpa mengganggu data asli.",
          "Data latihan terpisah dan bisa dihapus kapan saja.",
        ],
      },
      {
        judul: "Grafik & Laporan",
        poin: [
          "Grafik pemasukan dan pengeluaran di Beranda.",
          "Halaman Laporan: tren bulanan dan kategori terbesar.",
        ],
      },
      {
        judul: "Ekspor data",
        poin: [
          "Ekspor transaksi ke CSV/Excel untuk diolah sendiri.",
        ],
      },
      {
        judul: "Sinkronisasi cloud (opsional)",
        poin: [
          "Data di beberapa HP tetap sama, dienkripsi di HP sebelum dikirim.",
          "Server tidak bisa membaca isi data; foto dokumen tidak ikut.",
          "Tetap opsional — tanpa login aplikasi tetap bisa dipakai penuh.",
        ],
      },
      {
        judul: "Versi iPhone",
        poin: ["Dipertimbangkan setelah versi Android stabil."],
      },
    ],
  },
  {
    versi: "1.0.1",
    nama: "Perbaikan baca slip gaji",
    status: "segera",
    waktu: "Akhir Oktober 2026",
    ringkasan:
      "Pembaruan kecil untuk penguji: memperbaiki fitur foto slip gaji dan screenshot SMILES yang gagal di versi 1.0.0.",
    fitur: [
      {
        judul: "Foto slip gaji kembali berfungsi",
        poin: [
          "Di 1.0.0, membaca foto slip gaji dan screenshot SMILES bisa gagal.",
          "Penyebabnya ada di proses pengemasan aplikasi untuk Play Store, bukan di HP pengguna.",
          "Sudah diuji ulang di HP sungguhan dengan versi rilis.",
        ],
      },
      {
        judul: "Semua fitur 1.0.0 tetap ada",
        poin: [
          "Data yang sudah dicatat tidak berubah saat memperbarui.",
          "Tidak ada izin baru — tetap tanpa internet.",
        ],
      },
    ],
  },
  {
    versi: "1.0.0",
    nama: "Rilis pertama",
    status: "uji",
    waktu: "Uji tertutup sejak 23 Oktober 2026",
    ringkasan:
      "Versi pertama YenRapi: pencatatan keuangan lengkap untuk pekerja Indonesia di Jepang — gaji dalam Yen, keluarga dan tabungan dalam Rupiah. Gratis, tanpa iklan, tanpa akun, tanpa internet.",
    folder: "1.0.0",
    fitur: [
      {
        judul: "Beranda",
        gambar: "beranda.webp",
        alt: "Beranda: total saldo Yen dan Rupiah, ringkasan bulan ini",
        poin: [
          "Total saldo ¥ dan Rp terpisah, plus perkiraan gabungan.",
          "Tombol cepat: Keluar, Masuk, Kirim, Transfer.",
          "Sisa uang bulan ini dan persen pemasukan yang terpakai.",
          "Pengingat tagihan dan pengeluaran terbesar bulan ini.",
        ],
      },
      {
        judul: "Menu Keuangan",
        gambar: "keuangan.webp",
        alt: "Daftar modul keuangan",
        poin: [
          "Semua modul dikelompokkan: Sehari-hari, Gaji & Kewajiban, Indonesia, Rencana.",
          "Sembilan modul dalam satu aplikasi.",
        ],
      },
      {
        judul: "Transaksi",
        gambar: "transaksi.webp",
        alt: "Riwayat transaksi per bulan",
        poin: [
          "Riwayat per bulan, dikelompokkan per hari.",
          "Saring: semua, pengeluaran, pemasukan, transfer.",
          "Kategori khas kehidupan di Jepang, bisa ditambah sendiri.",
        ],
      },
      {
        judul: "Catat transaksi",
        gambar: "catat.webp",
        alt: "Formulir catat transaksi",
        poin: [
          "Pengeluaran atau pemasukan dalam beberapa ketukan.",
          "Kategori: makanan, konbini, tempat tinggal, kiriman, arisan, dll.",
          "Pilih akun asal, tanggal, dan catatan.",
        ],
      },
      {
        judul: "Transfer & menabung",
        gambar: "transfer.webp",
        alt: "Formulir transfer antar-akun",
        poin: [
          "Pindah uang antar-akun sendiri, mis. ke tabungan.",
          "Transfer tidak dihitung sebagai pemasukan atau pengeluaran.",
          "Transfer ¥ → Rp mencatat jumlah Rupiah yang diterima.",
        ],
      },
      {
        judul: "Dompet & Rekening",
        gambar: "rekening.webp",
        alt: "Daftar dompet dan rekening",
        poin: [
          "Tunai, bank (Yucho, dll.), e-money (PayPay), dan rekening Rupiah.",
          "Mata uang akun ¥ atau Rp ditentukan saat dibuat.",
          "Saldo dihitung otomatis dari transaksi.",
        ],
      },
      {
        judul: "Slip gaji (給与明細)",
        gambar: "slip.webp",
        alt: "Daftar slip gaji",
        poin: [
          "Riwayat slip: 支給 (penghasilan), 控除 (potongan), dan gaji bersih.",
          "Gaji bersih bisa langsung tercatat sebagai pemasukan.",
          "Slip lama bisa dicatat sebagai arsip tanpa mengubah saldo.",
        ],
      },
      {
        judul: "Isi slip dari foto",
        gambar: "slip-edit.webp",
        alt: "Formulir slip gaji dengan tombol foto slip",
        poin: [
          "Foto slip kertas, angka terisi otomatis — dibaca di HP, tanpa internet.",
          "Bisa juga tempel teks hasil salinan.",
          "Foto slip disimpan terenkripsi bersama slipnya.",
        ],
      },
      {
        judul: "Rincian potongan",
        gambar: "slip-potongan.webp",
        alt: "Rincian potongan slip gaji",
        poin: [
          "Setiap baris berlabel Jepang + arti bahasa Indonesia.",
          "健康保険, 厚生年金, 雇用保険, 所得税, 住民税, sewa asrama.",
          "Peringatan jika total tidak cocok dengan slip.",
        ],
      },
      {
        judul: "Tagihan",
        gambar: "tagihan.webp",
        alt: "Daftar tagihan bulanan",
        poin: [
          "Listrik, gas, air, internet, sewa — dengan jatuh tempo.",
          "Tagihan belum dibayar bukan pengeluaran; dicatat saat dibayar.",
          "Muncul sebagai pengingat di Beranda.",
        ],
      },
      {
        judul: "Utang, cicilan & arisan",
        gambar: "utang.webp",
        alt: "Daftar utang dan cicilan",
        poin: [
          "Empat jenis: utang saya, cicilan, piutang, arisan.",
          "Progres terbayar dan sisa, nominal per bulan.",
          "Pisah tab Aktif dan Selesai.",
        ],
      },
      {
        judul: "Bayar cicilan",
        gambar: "utang-detail.webp",
        alt: "Detail cicilan dengan riwayat pembayaran",
        poin: [
          "Catat pembayaran, sekaligus jadi pengeluaran jika mau.",
          "Riwayat pembayaran bisa dihapus jika salah.",
        ],
      },
      {
        judul: "Kiriman ke Indonesia",
        gambar: "kiriman.webp",
        alt: "Ringkasan kiriman ke Indonesia",
        poin: [
          "Total kiriman setahun dan seumur pemakaian.",
          "Total biaya transfer selama ini langsung kelihatan.",
          "Rupiah diterima dan kurs tiap kiriman.",
        ],
      },
      {
        judul: "Catat kiriman",
        gambar: "kiriman-form.webp",
        alt: "Formulir catat kiriman",
        poin: [
          "Isi otomatis dari screenshot SMILES (dibaca di HP).",
          "SMILES, SBI Remit, Wise, atau layanan lain.",
          "Kirim ke orang lain atau ke rekening Rupiah sendiri.",
        ],
      },
      {
        judul: "Aset & kekayaan bersih",
        gambar: "aset.webp",
        alt: "Aset dan kekayaan bersih",
        poin: [
          "Catat emas, NISA, investasi, tabungan di Indonesia.",
          "Kekayaan bersih = saldo rekening + nilai aset.",
        ],
      },
      {
        judul: "Anggaran",
        gambar: "anggaran.webp",
        alt: "Anggaran bulanan per kategori",
        poin: [
          "Batas total bulanan dan per kategori.",
          "Bar progres dan sisa anggaran per kategori.",
          "Anggaran berlaku terus setiap bulan sampai diubah.",
        ],
      },
      {
        judul: "Kalender keuangan",
        gambar: "kalender.webp",
        alt: "Kalender gajian dan jatuh tempo",
        poin: [
          "Gajian, jatuh tempo tagihan dan cicilan dalam satu kalender.",
          "Notifikasi pengingat jam 9 pagi (bisa dinyalakan).",
        ],
      },
      {
        judul: "Kalkulator",
        gambar: "kalkulator.webp",
        alt: "Daftar kalkulator",
        poin: [
          "Kurs, gaji, lembur, pajak & potongan, bonus, 住民税, nenkin.",
          "Aturan resmi 2026 (国税庁, 協会けんぽ, 日本年金機構).",
          "Semua dihitung di HP, tanpa internet.",
        ],
      },
      {
        judul: "Kalkulator gaji",
        gambar: "kalk-gaji.webp",
        alt: "Hasil kalkulator gaji bersih",
        poin: [
          "Gaji kotor → potongan → perkiraan gaji bersih (手取り).",
          "協会けんぽ untuk 47 prefektur, umur, dan tanggungan.",
        ],
      },
      {
        judul: "Konversi Yen ⇄ Rupiah",
        gambar: "kalk-kurs.webp",
        alt: "Kalkulator kurs Yen ke Rupiah",
        poin: [
          "Kurs otomatis dari kiriman terakhir, bisa diubah.",
          "Bisa dihitung bolak-balik, plus biaya kirim.",
        ],
      },
      {
        judul: "Nenkin lump-sum (脱退一時金)",
        gambar: "kalk-nenkin.webp",
        alt: "Kalkulator pengembalian nenkin",
        poin: [
          "Perkiraan uang nenkin yang kembali saat pulang.",
          "Termasuk pajak 20,42% dan cara memintanya kembali.",
        ],
      },
      {
        judul: "Panduan istilah Jepang",
        gambar: "istilah.webp",
        alt: "Panduan istilah Jepang",
        poin: [
          "Istilah slip gaji, pajak, dan asuransi dengan cara baca.",
          "Bisa dicari dengan huruf Jepang atau bahasa Indonesia.",
        ],
      },
      {
        judul: "Target tabungan",
        gambar: "target.webp",
        alt: "Daftar target tabungan",
        poin: [
          "Dana darurat, pulang Lebaran, DP rumah, dll.",
          "Saran berapa yang perlu disisihkan per bulan agar tepat waktu.",
          "Menabung = pindah uang, bukan pengeluaran.",
        ],
      },
      {
        judul: "Dokumen penting",
        gambar: "dokumen.webp",
        alt: "Dokumen penting terenkripsi",
        poin: [
          "Foto 在留カード, paspor, kontrak — terenkripsi di HP.",
          "Pengingat sebelum kedaluwarsa, mis. kartu izin tinggal.",
        ],
      },
      {
        judul: "Pengaturan & keamanan",
        gambar: "pengaturan.webp",
        alt: "Halaman pengaturan",
        poin: [
          "Kunci aplikasi dengan sidik jari, wajah, atau PIN HP.",
          "Database terenkripsi; aplikasi tanpa izin internet.",
          "Opsi blokir screenshot dan hapus semua data.",
        ],
      },
      {
        judul: "Backup & pulihkan",
        gambar: "backup.webp",
        alt: "Backup dan pulihkan data",
        poin: [
          "Satu file .yenrapi berpassword, termasuk foto dokumen.",
          "Simpan di Google Drive atau komputer, pulihkan di HP baru.",
        ],
      },
      {
        judul: "Mode gelap",
        gambar: "beranda-gelap.webp",
        alt: "Beranda dalam mode gelap",
        poin: [
          "Tema Terang, Gelap, atau Ikuti HP.",
          "Nyaman dipakai malam hari setelah shift.",
        ],
      },
      {
        judul: "Tampilan gelap di semua layar",
        gambar: "target-gelap.webp",
        alt: "Target tabungan dalam mode gelap",
        poin: ["Warna Yen (biru) dan Rupiah (kunyit) tetap jelas dibedakan."],
      },
    ],
  },
];
