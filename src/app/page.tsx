import Link from "next/link";
import { Logo } from "@/components/Logo";
import { aset, situs } from "@/lib/situs";
import styles from "./beranda.module.css";

const fitur = [
  {
    ikon: "🧾",
    judul: "Slip gaji (給与明細)",
    isi: "Foto slip gaji, angka langsung terisi — dibaca di HP. Setiap istilah Jepang dijelaskan dalam bahasa Indonesia.",
  },
  {
    ikon: "💴",
    judul: "Yen & Rupiah",
    isi: "Rekening Yucho, PayPay, BRI, BCA, tunai. Transfer Yen → Rupiah dengan kurs, total ¥ dan Rp terpisah.",
  },
  {
    ikon: "📮",
    judul: "Kiriman ke Indonesia",
    isi: "Catat kiriman SMILES dan lainnya lengkap dengan kurs dan biaya. Total biaya setahun langsung kelihatan.",
  },
  {
    ikon: "🎯",
    judul: "Target tabungan",
    isi: "Dana darurat, pulang Lebaran, DP rumah — lengkap dengan saran berapa yang perlu disisihkan per bulan.",
  },
  {
    ikon: "🧮",
    judul: "Kalkulator",
    isi: "Perkiraan gaji bersih, lembur, pajak & potongan, bonus, pajak penduduk, dan pengembalian nenkin.",
  },
  {
    ikon: "📁",
    judul: "Dokumen penting",
    isi: "Foto 在留カード, paspor, kontrak — terenkripsi, dengan pengingat sebelum kedaluwarsa.",
  },
];

const layar = [
  { file: "layar-1.png", alt: "Beranda: total saldo Yen dan Rupiah" },
  { file: "layar-2.png", alt: "Slip gaji dengan istilah Jepang" },
  { file: "layar-3.png", alt: "Riwayat kiriman ke Indonesia" },
  { file: "layar-4.png", alt: "Target tabungan" },
  { file: "layar-5.png", alt: "Kalkulator pajak dan potongan" },
  { file: "layar-6.png", alt: "Dokumen penting terenkripsi" },
];

export default function BerandaPage() {
  return (
    <>
      <section className={`wrap ${styles.hero}`}>
        <Logo size={96} />
        <h1>{situs.slogan}</h1>
        <p className={styles.lead}>
          Gaji dalam Yen, keluarga dan tabungan di Indonesia dalam Rupiah —
          semuanya rapi di satu aplikasi. Gratis, tanpa iklan, tanpa akun.
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
      </section>

      <section aria-label="Tampilan aplikasi" className={styles.shots}>
        <div className={styles.shotsTrack}>
          {layar.map((l) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={l.file}
              src={aset(`/gambar/${l.file}`)}
              alt={l.alt}
              width={1080}
              height={1920}
              loading="lazy"
            />
          ))}
        </div>
      </section>

      <section className="wrap">
        <h2 className={styles.sectionTitle}>Apa saja yang bisa dicatat?</h2>
        <div className={styles.grid}>
          {fitur.map((f) => (
            <article key={f.judul} className="card">
              <div className={styles.icon} aria-hidden="true">
                {f.ikon}
              </div>
              <h3>{f.judul}</h3>
              <p className="muted">{f.isi}</p>
            </article>
          ))}
        </div>
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
