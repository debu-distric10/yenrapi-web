import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cara Pakai",
  description:
    "Langkah-langkah memakai YenRapi: mengarsipkan akun atau tabungan yang tidak dipakai, dan kenapa Dompet Utama tidak bisa dihapus.",
};

export default function PakaiPage() {
  return (
    <div className="wrap page">
      <div className="prose">
        <article>
          <h1>Cara Pakai 🧭</h1>
          <p>
            Langkah singkat untuk hal-hal yang sering ditanyakan. Berawal dari
            pertanyaan pengguna, jadi daftarnya akan bertambah pelan-pelan.
          </p>
          <p className="meta">Diperbarui 2026-11-18, berlaku untuk YenRapi 2.2</p>

          <div className="note">
            <strong>Isi halaman ini:</strong>{" "}
            <a href="#arsip">Menghapus (mengarsipkan) akun</a> ·{" "}
            <a href="#dompet-utama">Kenapa Dompet Utama tidak bisa dihapus</a>
          </div>

          <h2 id="arsip">Menghapus (mengarsipkan) akun atau tabungan</h2>
          <p>
            Di YenRapi akun yang tidak dipakai lagi <strong>diarsipkan</strong>,
            bukan dihapus. Akunnya hilang dari daftar, tetapi riwayat
            transaksinya tetap utuh, jadi statistik dan laporan lama tidak
            berubah. Contoh: Tabungan BRI yang sudah tidak dipakai.
          </p>
          <ol>
            <li>
              Buka tab <strong>Keuangan</strong>, lalu{" "}
              <strong>Dompet &amp; Rekening</strong>.
            </li>
            <li>Ketuk kartu akun yang mau disembunyikan.</li>
            <li>
              Di halaman edit akun, ketuk ikon <strong>Arsipkan</strong> di
              pojok kanan atas (gambar kotak dengan panah ke bawah), lalu
              konfirmasi.
            </li>
          </ol>
          <div className="note">
            <strong>Syaratnya saldo akun harus 0.</strong> Kalau masih ada
            sisa, pindahkan dulu ke akun lain lewat transfer di Dompet &amp;
            Rekening, baru diarsipkan. Aturan ini ada supaya uangmu tidak
            tiba-tiba hilang dari total.
          </div>

          <h2 id="dompet-utama">Kenapa Dompet Utama tidak bisa dihapus</h2>
          <p>
            <strong>Dompet Utama</strong> adalah akun uang tunai bawaan
            aplikasi. Karena dipakai sebagai tempat catatan baru sebelum kamu
            memilih akun, untuk sekarang ia tidak bisa diarsipkan.
          </p>
          <p>
            Kalau kamu hanya memakai satu bank, misalnya Yucho, biarkan Dompet
            Utama di ¥0. Saldo 0 tidak memengaruhi total, dan kamu tetap bisa
            mencatat semuanya di akun banknya: pilih akun itu di kolom
            &ldquo;Akun&rdquo; saat menambah transaksi.
          </p>
          <p>
            Kemampuan menyembunyikan Dompet Utama sedang direncanakan untuk
            versi berikutnya.
          </p>

          <p className="meta">
            Ada hal lain yang membingungkan? Tulis lewat DM Instagram{" "}
            <a href="https://www.instagram.com/yenrapi.app/">@yenrapi.app</a>,
            nanti dijawab dan dimasukkan ke halaman ini. Untuk panduan uang di
            Jepang, lihat <Link href="/panduan">Panduan</Link>.
          </p>
        </article>
      </div>
    </div>
  );
}
