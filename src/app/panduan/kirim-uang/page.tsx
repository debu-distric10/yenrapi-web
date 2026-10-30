import type { Metadata } from "next";
import Link from "next/link";
import { afiliasiUntuk } from "@/lib/afiliasi";
import { infoPanduan } from "@/lib/panduan";

const info = infoPanduan("kirim-uang");
const afiliasi = afiliasiUntuk("kirim-uang");

export const metadata: Metadata = {
  title: info.judul,
  description: info.ringkas,
};

export default function KirimUangPage() {
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
            <strong>Ringkasnya:</strong> pakai layanan yang berizin resmi,
            bandingkan berapa Rupiah yang benar-benar diterima keluarga (bukan
            hanya biaya kirimnya), dan jangan pernah memakai jasa titip tanpa
            izin.
          </div>

          <h2>Yang perlu disiapkan</h2>
          <ul>
            <li>
              <strong>Kartu izin tinggal (在留カード)</strong> untuk verifikasi
              identitas.
            </li>
            <li>
              <strong>My Number (マイナンバー).</strong> Menurut aturan Jepang
              tentang laporan kiriman ke luar negeri (国外送金等調書法), bank dan
              perusahaan pengiriman uang wajib meminta My Number sebelum kamu
              bisa mengirim ke luar negeri.
            </li>
            <li>Rekening bank Jepang dan nomor HP Jepang untuk kode SMS.</li>
            <li>
              Data penerima: nama <strong>persis seperti di buku tabungan</strong>,
              nama bank, nomor rekening, dan kadang kode SWIFT bank tujuan.
            </li>
          </ul>

          <h2>Tiga jenis layanan</h2>
          <ul>
            <li>
              <strong>Perusahaan pengiriman uang lewat aplikasi.</strong> Biasanya
              paling murah dan cepat, sering sampai di hari yang sama. Pastikan
              terdaftar sebagai 資金移動業者 (lihat bagian &ldquo;Hati-hati&rdquo;
              di bawah).
            </li>
            <li>
              <strong>Transfer bank biasa.</strong> Dari bank besar Jepang atau
              Yucho. Lebih lama dan biasanya paling mahal: ada biaya kirim, selisih
              kurs, dan kadang potongan bank perantara.
            </li>
            <li>
              <strong>Kiriman tunai lewat ATM atau loket.</strong> Cocok untuk
              keadaan darurat karena cepat diambil, tetapi biayanya biasanya lebih
              tinggi.
            </li>
          </ul>

          <h2>Menghitung biaya sebenarnya</h2>
          <p>
            Banyak layanan menulis &ldquo;biaya ¥0&rdquo;, tetapi mengambil
            untung dari <strong>kurs yang lebih rendah</strong>. Jadi yang perlu
            dibandingkan adalah berapa Rupiah yang diterima keluarga dari jumlah
            Yen yang sama.
          </p>
          <ol>
            <li>Cek kurs tengah hari itu (misalnya di Google atau situs bank sentral).</li>
            <li>
              Hitung: Rupiah yang diterima ÷ kurs tengah = nilai Yen yang benar-benar
              sampai.
            </li>
            <li>
              Biaya sebenarnya = Yen yang kamu bayar − nilai Yen yang sampai.
            </li>
          </ol>
          <p>
            Contoh dengan angka bulat: kamu membayar ¥50.000, kurs tengah Rp100 per
            Yen, keluarga menerima Rp4.900.000. Nilai yang sampai ¥49.000, jadi
            biaya sebenarnya ¥1.000 (2%), walaupun biaya kirimnya tertulis ¥0.
          </p>
          <p>
            <Link href="/kalkulator/kurs">Kalkulator kurs</Link> di situs ini bisa
            membantu menghitungnya.
          </p>

          <h2>Hati-hati: jasa kirim ilegal</h2>
          <ul>
            <li>
              Di Jepang, mengirim uang ke luar negeri sebagai usaha hanya boleh
              dilakukan oleh bank atau perusahaan yang terdaftar sebagai 資金移動業者.
              Jasa titip dari grup media sosial yang &ldquo;kursnya lebih bagus&rdquo;
              sering kali adalah 地下銀行 (bank gelap). Itu melanggar hukum, dan
              uangmu bisa hilang tanpa bisa dituntut.
            </li>
            <li>
              Cek nama perusahaannya di daftar 資金移動業者 yang terdaftar di situs
              金融庁 (Badan Jasa Keuangan Jepang).
            </li>
            <li>
              <strong>Jangan pernah menjual atau meminjamkan rekening, buku
              tabungan, atau kartu ATM</strong>, termasuk saat akan pulang ke
              Indonesia. Itu termasuk tindak pidana di Jepang, dan rekeningnya
              sering dipakai untuk penipuan.
            </li>
          </ul>

          <h2>Tips supaya lebih hemat</h2>
          <ul>
            <li>
              Kalau biayanya tetap per kiriman, mengirim sebulan sekali lebih hemat
              daripada beberapa kali dalam jumlah kecil.
            </li>
            <li>Bandingkan dua atau tiga layanan setiap beberapa bulan, karena biaya dan kurs berubah.</li>
            <li>Simpan bukti kiriman sampai uangnya benar-benar diterima.</li>
            <li>
              Catat setiap kiriman beserta kurs dan biayanya. Di aplikasi YenRapi,
              total biaya kirim setahun langsung kelihatan.
            </li>
          </ul>

          {afiliasi.length > 0 && (
            <>
              <h2>Layanan yang bisa dicoba</h2>
              <ul>
                {afiliasi.map((t) => (
                  <li key={t.url}>
                    <a href={t.url} rel="sponsored noopener">
                      {t.nama}
                    </a>{" "}
                    — {t.catatan}
                  </li>
                ))}
              </ul>
              <p className="muted">
                Tautan di atas adalah tautan afiliasi: YenRapi mendapat komisi
                kecil bila kamu mendaftar lewat tautan itu, tanpa biaya tambahan
                untukmu. Tetap bandingkan dengan layanan lain.
              </p>
            </>
          )}

          <p className="muted">
            Panduan ini tidak disponsori dan bukan nasihat keuangan resmi. Syarat
            dan biaya bisa berubah, jadi selalu cek lagi di situs resmi
            layanannya.
          </p>
        </article>
      </div>
    </div>
  );
}
