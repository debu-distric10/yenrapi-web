import type { Metadata } from "next";
import Link from "next/link";
import { situs } from "@/lib/situs";

export const metadata: Metadata = situs.playStore
  ? {
      title: "Pasang YenRapi",
      description:
        "YenRapi sudah ada di Google Play. Gratis, tanpa akun, dan datanya tersimpan di HP sendiri.",
    }
  : {
      title: "Coba YenRapi duluan",
      description:
        "YenRapi masih uji tertutup di Google Play. Gabung grup penguji, lalu pasang aplikasinya dari Play Store seperti biasa.",
    };

export default function CobaPage() {
  return situs.playStore ? <SudahTayang play={situs.playStore} /> : <UjiTertutup />;
}

/** Tampil setelah YenRapi tayang di Google Play. */
function SudahTayang({ play }: { play: string }) {
  return (
    <div className="wrap page prose">
      <h1>YenRapi sudah ada di Google Play 📱</h1>
      <p>
        Alhamdulillah, sekarang YenRapi bisa dipasang semua orang langsung dari{" "}
        <strong>Play Store</strong>. Gratis, tanpa akun, dan catatanmu tersimpan
        di HP sendiri.
      </p>
      <p className="muted">
        Untuk sekarang baru HP <strong>Android</strong>. Versi iPhone belum ada.
      </p>
      <p>
        <a className="btn btn-accent" href={play} rel="noopener">
          Buka di Google Play
        </a>
      </p>

      <h2>Sudah jadi penguji?</h2>
      <ul>
        <li>
          Tidak perlu melakukan apa-apa. Aplikasimu tetap diperbarui otomatis dan{" "}
          <strong>catatanmu tetap ada</strong>.
        </li>
        <li>
          Terima kasih sudah mencoba lebih dulu. Masukan kalian banyak membantu
          YenRapi sampai di titik ini.
        </li>
      </ul>

      <h2>Yang perlu kamu tahu</h2>
      <ul>
        <li>
          Foto slip gaji masih <strong>beta</strong>. Hasilnya selalu dicek
          dulu sebelum disimpan.
        </li>
        <li>
          Datamu hanya tersimpan di HP. Lihat{" "}
          <Link href="/privasi">Kebijakan Privasi</Link>.
        </li>
      </ul>

      <p>
        Ada pertanyaan atau masukan? Kirim ke{" "}
        <a href={`mailto:${situs.email}`}>{situs.email}</a> atau DM Instagram{" "}
        <a href="https://www.instagram.com/yenrapi.app/" rel="noopener">
          @yenrapi.app
        </a>
        .
      </p>
    </div>
  );
}

/** Tampil selama YenRapi masih uji tertutup. */
function UjiTertutup() {
  return (
    <div className="wrap page prose">
      <h1>Coba YenRapi duluan 📱</h1>
      <p>
        YenRapi sedang <strong>uji tertutup</strong> di Google Play sebelum bisa
        diunduh semua orang. Kalau mau mencoba sekarang, kamu bisa ikut jadi
        penguji. Caranya tiga langkah, dan aplikasinya tetap dipasang dari{" "}
        <strong>Play Store</strong>, bukan file dari luar.
      </p>
      <p className="muted">
        Untuk sekarang baru HP <strong>Android</strong>. Versi iPhone belum ada.
      </p>

      <article>
        <h2 style={{ marginTop: 0 }}>1. Gabung grup penguji</h2>
        <p>
          Buka grup di bawah, lalu tekan <strong>Gabung ke grup</strong>. Pakai
          akun Gmail yang <strong>sama</strong> dengan akun Play Store di HP-mu.
        </p>
        <a className="btn btn-accent" href={situs.ujiCoba.grup} rel="noopener">
          Gabung grup penguji
        </a>
      </article>

      <article>
        <h2 style={{ marginTop: 0 }}>2. Daftar jadi penguji</h2>
        <p>
          Setelah bergabung, buka halaman uji coba lalu tekan{" "}
          <strong>Jadi penguji</strong>. Kalau muncul tulisan belum tersedia,
          tunggu beberapa menit lalu buka lagi.
        </p>
        <a className="btn btn-accent" href={situs.ujiCoba.play} rel="noopener">
          Buka halaman uji coba
        </a>
      </article>

      <article>
        <h2 style={{ marginTop: 0 }}>3. Pasang dari Play Store</h2>
        <p>
          Di halaman yang sama ada tautan ke Play Store. Pasang seperti aplikasi
          biasa. Pembaruan berikutnya datang otomatis.
        </p>
      </article>

      <h2>Yang perlu kamu tahu</h2>
      <ul>
        <li>
          Ini versi uji coba, jadi mungkin masih ada yang kurang. Kalau ketemu
          masalah, kabari saya. Itu sangat membantu.
        </li>
        <li>
          Saat YenRapi rilis resmi, aplikasimu ikut diperbarui otomatis.{" "}
          <strong>Tidak perlu dihapus dan dipasang ulang</strong>, catatanmu tetap
          ada.
        </li>
        <li>
          Datamu tetap tersimpan di HP saja, sama seperti versi resmi. Lihat{" "}
          <Link href="/privasi">Kebijakan Privasi</Link>.
        </li>
        <li>
          Alamat Gmail-mu hanya terlihat oleh pengelola grup, dipakai supaya Play
          Store tahu kamu penguji.
        </li>
        <li>
          Mau berhenti? Keluar dari grup dan dari halaman uji coba, lalu hapus
          aplikasinya.
        </li>
      </ul>

      <p>
        Ada pertanyaan atau masukan? Kirim ke{" "}
        <a href={`mailto:${situs.email}`}>{situs.email}</a> atau DM Instagram{" "}
        <a href="https://www.instagram.com/yenrapi.app/" rel="noopener">
          @yenrapi.app
        </a>
        .
      </p>
    </div>
  );
}
