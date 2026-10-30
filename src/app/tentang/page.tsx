import type { Metadata } from "next";
import Link from "next/link";
import { situs } from "@/lib/situs";

export const metadata: Metadata = {
  title: "Tentang & AI",
  description:
    "Apakah YenRapi dibuat dengan AI? Penjelasan jujur tentang siapa yang membuat, apa peran AI, dan apa yang tetap dikerjakan manusia.",
};

export default function TentangPage() {
  return (
    <div className="wrap page">
      <div className="prose">
        <article>
          <h1>Tentang YenRapi &amp; AI</h1>
          <p className="meta">Dibuat oleh satu orang pekerja Indonesia di Jepang</p>

          <div className="note">
            <strong>Jawaban singkat:</strong> ya, sebagian kode YenRapi ditulis dengan bantuan AI
            sebagai asisten pemrograman. Ide, aturan keuangan, pilihan fitur, dan pengujian di HP
            tetap dikerjakan oleh pengembangnya sendiri.
          </div>

          <h2>Siapa yang membuat</h2>
          <p>
            YenRapi dibuat oleh satu orang pekerja Indonesia yang sudah lebih dari dua tahun
            bekerja di Jepang. Aplikasi ini lahir dari masalah yang dialami sendiri: gaji dalam
            Yen, keluarga di Rupiah, dan slip gaji yang penuh huruf Jepang.
          </p>

          <h2>Apa peran AI</h2>
          <ul>
            <li>
              Membantu menulis sebagian kode aplikasi dan website, misalnya layar, perhitungan,
              dan tata letak. AI yang dipakai adalah Claude, buatan Anthropic.
            </li>
            <li>
              Membantu merapikan teks dan menyusun materi. Tulisan tetap diperiksa ulang oleh
              pengembangnya.
            </li>
          </ul>

          <h2>Apa yang tetap dikerjakan manusia</h2>
          <ul>
            <li>Menentukan apa saja yang dibuat, dan aturan keuangan yang dipakai.</li>
            <li>
              Membandingkan aturan pajak, asuransi, dan pensiun dengan sumber resmi Jepang,
              seperti 国税庁, 協会けんぽ, dan 日本年金機構.
            </li>
            <li>
              Menguji aplikasi langsung di HP sungguhan, termasuk membandingkan hasil kalkulator
              dan memeriksa data yang disimpan.
            </li>
            <li>Bertanggung jawab atas setiap fitur yang dirilis.</li>
          </ul>

          <h2>Yang bisa kamu periksa sendiri</h2>
          <ul>
            <li>
              Aplikasinya <strong>tidak meminta izin internet</strong>. Ini bisa dicek di halaman
              izin aplikasi di Google Play atau di pengaturan HP.
            </li>
            <li>
              Semua hitungan kalkulator dilakukan di HP (atau di browser untuk versi website),
              tanpa mengirim data ke server.
            </li>
            <li>
              Hasil kalkulator adalah <strong>perkiraan</strong>. Angka resmi tetap berasal dari
              perusahaan, kantor pajak, atau kantor nenkin.
            </li>
          </ul>

          <h2>Kalau AI keliru</h2>
          <p>
            AI bisa saja salah. Karena itu setiap angka dan aturan dicek ulang oleh pengembang.
            Kalau kamu menemukan kesalahan, tolong kabari lewat{" "}
            <a href={`mailto:${situs.email}`}>{situs.email}</a>. Masukanmu akan diperbaiki.
          </p>

          <h2>Website ini</h2>
          <p>
            Website ini juga dibuat dengan bantuan AI dengan cara yang sama. Tidak ada iklan
            dan tidak ada pelacak.{" "}
            {situs.goatcounter
              ? "Jumlah pengunjung dihitung tanpa cookie. "
              : "Tidak ada analitik. "}
            Kebijakan lengkapnya ada di{" "}
            <Link href="/privasi">kebijakan privasi</Link>.
          </p>
        </article>
      </div>
    </div>
  );
}
