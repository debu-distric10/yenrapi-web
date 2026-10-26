import Link from "next/link";
import { aset, situs } from "@/lib/situs";
import styles from "./beranda.module.css";

/** Screenshot dari aplikasi demo berdata palsu (sama dengan halaman Perjalanan). */
const layar = (file: string) => aset(`/perjalanan/1.0.0/${file}`);

const kepercayaan = [
  "✓ Gratis",
  "✓ Tanpa iklan",
  "✓ Tanpa akun",
  "🔒 Tanpa internet",
];

type Bento = {
  ikon: string;
  judul: string;
  isi: string;
  gambar?: string;
  alt?: string;
  /** besar = 2 kolom dengan gambar; gelap = kartu tema gelap. */
  ukuran?: "besar" | "gelap";
};

const bento: Bento[] = [
  {
    ikon: "🧾",
    judul: "Slip gaji (給与明細)",
    isi: "Foto slip kertas, angka langsung terisi — dibaca di HP. Setiap istilah Jepang ada artinya.",
    gambar: "slip-potongan.webp",
    alt: "Rincian potongan slip gaji dengan istilah Jepang dan artinya",
    ukuran: "besar",
  },
  {
    ikon: "💴",
    judul: "Yen & Rupiah",
    isi: "Yucho, PayPay, tunai, sampai rekening Rupiah. Total ¥ dan Rp terpisah, plus perkiraan gabungan.",
    gambar: "rekening.webp",
    alt: "Daftar dompet dan rekening Yen dan Rupiah",
    ukuran: "besar",
  },
  {
    ikon: "📮",
    judul: "Kiriman ke Indonesia",
    isi: "Kurs dan biaya tiap kiriman, total biaya setahun langsung kelihatan.",
  },
  {
    ikon: "🎯",
    judul: "Target tabungan",
    isi: "Pulang Lebaran, DP rumah — dengan saran berapa disisihkan per bulan.",
  },
  {
    ikon: "🧮",
    judul: "7 kalkulator",
    isi: "Gaji bersih, lembur, pajak, bonus, 住民税, dan nenkin — aturan resmi 2026.",
    gambar: "kalk-gaji.webp",
    alt: "Hasil kalkulator gaji bersih",
    ukuran: "besar",
  },
  {
    ikon: "📁",
    judul: "Dokumen penting",
    isi: "在留カード dan paspor terenkripsi, diingatkan sebelum habis.",
  },
  {
    ikon: "📅",
    judul: "Tagihan & cicilan",
    isi: "Listrik, sewa, cicilan HP, arisan — diingatkan sebelum jatuh tempo.",
  },
  {
    ikon: "🌙",
    judul: "Mode gelap",
    isi: "Nyaman dipakai setelah shift malam.",
    gambar: "beranda-gelap.webp",
    alt: "Beranda aplikasi dalam mode gelap",
    ukuran: "gelap",
  },
];

export default function BerandaPage() {
  return (
    <>
      <section className={`wrap ${styles.hero}`}>
        <div className={styles.heroTeks}>
          <p className={styles.eyebrow}>Aplikasi Android · Bahasa Indonesia</p>
          <h1>{situs.slogan}</h1>
          <p className={styles.lead}>
            Gaji dalam Yen, keluarga dan tabungan di Indonesia dalam Rupiah —
            semuanya rapi di satu aplikasi.
          </p>
          <div className={styles.actions}>
            {situs.playStore ? (
              <a className="btn btn-accent" href={situs.playStore}>
                Unduh di Google Play
              </a>
            ) : (
              <span className="btn btn-accent" aria-disabled="true">
                Segera di Google Play
              </span>
            )}
            <Link className="btn" href="/kalkulator">
              Coba kalkulator gaji
            </Link>
          </div>
          <ul className={styles.kepercayaan} aria-label="Janji YenRapi">
            {kepercayaan.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
        </div>

        <div className={styles.tumpukan} aria-hidden="true">
          {/* eslint-disable @next/next/no-img-element */}
          <img
            className={`${styles.hp} ${styles.hpKiri}`}
            src={layar("slip.webp")}
            alt=""
            width={540}
            height={1230}
          />
          <img
            className={`${styles.hp} ${styles.hpKanan}`}
            src={layar("kiriman.webp")}
            alt=""
            width={540}
            height={1230}
          />
          <img
            className={`${styles.hp} ${styles.hpTengah}`}
            src={layar("beranda.webp")}
            alt=""
            width={540}
            height={1230}
            fetchPriority="high"
          />
          {/* eslint-enable @next/next/no-img-element */}
        </div>
      </section>

      <section className="wrap">
        <h2 className={styles.sectionTitle}>Apa saja yang bisa dicatat?</h2>
        <div className={styles.bento}>
          {bento.map((b) => (
            <article
              key={b.judul}
              className={`${styles.kotak} ${b.ukuran ? styles[b.ukuran] : ""}`}
            >
              <div className={styles.kotakTeks}>
                <span className={styles.icon} aria-hidden="true">
                  {b.ikon}
                </span>
                <h3>{b.judul}</h3>
                <p>{b.isi}</p>
              </div>
              {b.gambar && (
                <div className={styles.intip}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={layar(b.gambar)}
                    alt={b.alt ?? b.judul}
                    width={540}
                    height={1230}
                    loading="lazy"
                  />
                </div>
              )}
            </article>
          ))}
        </div>

        <Link href="/perjalanan" className={styles.ajakan}>
          <span>
            <strong>Lihat semua 28 layar</strong>
            <span>Fitur lengkap tiap versi dan rencana ke depan</span>
          </span>
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className="wrap">
        <div className={styles.privacy}>
          <h2>🔒 Datamu hanya di HP-mu</h2>
          <ul>
            <li>Semua data disimpan terenkripsi di HP, bukan di server.</li>
            <li>
              Aplikasi tidak meminta izin internet — tidak ada yang bisa
              dikirim keluar.
            </li>
            <li>Tanpa akun, tanpa iklan, tanpa pelacakan.</li>
            <li>Backup ke file berpassword, bisa dipulihkan di HP baru.</li>
          </ul>
          <Link href="/privasi">Baca kebijakan privasi →</Link>
        </div>
      </section>
    </>
  );
}
