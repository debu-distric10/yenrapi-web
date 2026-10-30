import type { Metadata } from "next";
import Link from "next/link";
import { infoPanduan } from "@/lib/panduan";

const info = infoPanduan("pulang");

export const metadata: Metadata = {
  title: info.judul,
  description: info.ringkas,
};

export default function PulangPage() {
  return (
    <div className="wrap page">
      <div className="prose">
        <article>
          <Link className="crumb" href="/panduan">
            ← Panduan
          </Link>
          <h1>{info.judul}</h1>
          <p className="meta">Diperbarui {info.diperbarui}</p>

          <div className="note">
            <strong>Ringkasnya:</strong> lunasi 住民税 atau tunjuk 納税管理人
            sebelum pulang, urus 転出届, lalu klaim 脱退一時金 dari Indonesia
            paling lambat 2 tahun setelah pindah dari Jepang.
          </div>

          <h2>1–2 bulan sebelum pulang</h2>
          <ul>
            <li>
              <strong>Hitung uang yang dibawa pulang.</strong> Tabungan, gaji dan
              bonus terakhir, ditambah perkiraan 脱退一時金. Tanyakan ke perusahaan
              kapan gaji terakhir dibayar dan ke rekening mana.
            </li>
            <li>
              <strong>住民税 tetap harus dibayar.</strong> Pajak ini dihitung dari
              penghasilan tahun lalu untuk orang yang tinggal di Jepang pada 1 Januari,
              jadi pulang di tengah tahun tidak menghapusnya. Tanyakan ke perusahaan
              apakah sisanya dipotong sekaligus dari gaji terakhir. Kalau tidak, bayar
              lunas di kantor kota sebelum pulang, atau tunjuk 納税管理人.
            </li>
            <li>
              <strong>Tunjuk 納税管理人</strong> (orang di Jepang yang mengurus pajakmu)
              bila perlu. Orang yang sama bisa membantu meminta kembali pajak 20,42%
              dari 脱退一時金 nanti.
            </li>
            <li>
              <strong>Putus kontrak</strong> HP, internet, listrik, gas, dan air. Cek
              dulu denda putus kontrak dan sisa cicilan HP.
            </li>
          </ul>

          <h2>Minggu terakhir</h2>
          <ul>
            <li>
              <strong>転出届 di kantor kota.</strong> Lapor pindah ke luar negeri.
              Sekalian urus 国民健康保険 dan 国民年金 kalau kamu ikut keduanya.
            </li>
            <li>
              <strong>Rekening bank.</strong> Tanyakan ke bank apakah rekening harus
              ditutup atau boleh dipakai sampai gaji terakhir masuk. Pindahkan sisa
              uang ke Indonesia lewat layanan resmi (lihat{" "}
              <Link href="/panduan/kirim-uang">panduan kirim uang</Link>).
            </li>
            <li>
              <strong>Jangan menjual atau meminjamkan rekening, buku tabungan, atau
              kartu ATM</strong> kepada siapa pun, walaupun ditawari uang. Itu tindak
              pidana di Jepang.
            </li>
            <li>
              Simpan salinan slip gaji, 源泉徴収票, dan ねんきん定期便 atau nomor
              pensiun (基礎年金番号). Semuanya dibutuhkan untuk klaim nanti.
            </li>
            <li>
              Saat keluar dari Jepang, 在留カード diserahkan di bandara kalau kamu
              tidak berencana kembali.
            </li>
          </ul>

          <h2>Setelah sampai di Indonesia: klaim 脱退一時金</h2>
          <p>
            脱退一時金 adalah pengembalian sebagian iuran pensiun Jepang untuk orang
            asing yang pulang. Syarat utamanya:
          </p>
          <ul>
            <li>Bukan warga negara Jepang.</li>
            <li>Sudah membayar iuran 厚生年金 atau 国民年金 minimal 6 bulan.</li>
            <li>Masa iuran belum mencapai 10 tahun.</li>
            <li>Sudah tidak punya alamat di Jepang.</li>
            <li>
              Diklaim <strong>paling lambat 2 tahun</strong> sejak tidak punya alamat
              di Jepang.
            </li>
          </ul>
          <p>
            Masa iuran yang dihitung paling lama 60 bulan (5 tahun). Dari 厚生年金,
            pajak 20,42% langsung dipotong, tetapi bisa diminta kembali lewat
            納税管理人. Formulir dan alamat pengiriman ada di situs resmi{" "}
            <a
              href="https://www.nenkin.go.jp/service/jukyu/seido/sonota-kyufu/dattai-ichiji/20150406.html"
              rel="noopener"
            >
              日本年金機構
            </a>
            .
          </p>
          <p>
            Perlu diingat: setelah mengklaim, seluruh masa iuranmu di Jepang hilang
            dan tidak bisa digabung lagi untuk pensiun nanti. Kalau kamu berencana
            kembali bekerja di Jepang, pikirkan dulu.
          </p>
          <p>
            Hitung perkiraannya di{" "}
            <Link href="/kalkulator/nenkin">kalkulator nenkin</Link>.
          </p>

          <h2>Supaya tidak kaget</h2>
          <ul>
            <li>
              Siapkan dana darurat untuk 3 sampai 6 bulan pertama di Indonesia
              sebelum memakai tabungan untuk modal usaha atau membeli aset.
            </li>
            <li>
              Halaman Rencana Pulang di aplikasi YenRapi menghitung apakah uangmu
              cukup, termasuk 脱退一時金 setelah pajak.
            </li>
          </ul>

          <p className="muted">
            Panduan ini bukan nasihat resmi. Aturan bisa berbeda per kota dan bisa
            berubah, jadi selalu cek ke kantor kota, perusahaan, dan 日本年金機構.
          </p>
        </article>
      </div>
    </div>
  );
}
