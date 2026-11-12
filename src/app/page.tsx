import Link from "next/link";
import { Gajian } from "@/components/beranda/Gajian";
import { IstilahHariIni, TahukahKamu } from "@/components/beranda/Harian";
import styles from "@/components/beranda/beranda.module.css";
import { Ikon, type NamaIkon } from "@/components/Ikon";
import { aset, situs } from "@/lib/situs";

/** Screenshot dari aplikasi demo berdata palsu (sama dengan halaman Perjalanan). */
const layar = (file: string) => aset(`/perjalanan/1.0.0/${file}`);

const janji: { ikon: NamaIkon; teks: string }[] = [
  { ikon: "hadiah", teks: "Gratis" },
  { ikon: "tanpaIklan", teks: "Tanpa iklan" },
  { ikon: "tanpaAkun", teks: "Tanpa akun" },
  { ikon: "kunci", teks: "Data di HP" },
];

const alatCepat: {
  href: string;
  ikon: NamaIkon;
  judul: string;
  isi: string;
  kuning?: boolean;
}[] = [
  { href: "/kalkulator/gaji", ikon: "uang", judul: "Gaji bersih", isi: "手取り setelah potongan" },
  { href: "/kalkulator/lembur", ikon: "jam", judul: "Upah lembur", isi: "残業, malam & libur", kuning: true },
  { href: "/kalkulator/kurs", ikon: "tukar", judul: "Kurs ¥ → Rp", isi: "Hitung sebelum kirim" },
  { href: "/istilah", ikon: "buku", judul: "Istilah Jepang", isi: "43 kata di slip gaji", kuning: true },
];

const fitur = [
  {
    judul: "Slip gaji (給与明細)",
    isi: "Foto slip kertas, angkanya terisi sendiri. Setiap istilah Jepang ada artinya.",
    gambar: "slip-potongan.webp",
    alt: "Rincian potongan slip gaji dengan arti tiap istilah",
  },
  {
    judul: "Yen & Rupiah",
    isi: "Yucho, PayPay, tunai, sampai rekening di Indonesia. Totalnya terpisah.",
    gambar: "rekening.webp",
    alt: "Daftar dompet dan rekening Yen serta Rupiah",
  },
  {
    judul: "Kiriman ke rumah",
    isi: "Kurs dan biaya tiap kiriman. Total biaya setahun langsung kelihatan.",
    gambar: "kiriman.webp",
    alt: "Daftar kiriman uang ke Indonesia",
  },
  {
    judul: "Target pulang",
    isi: "Lebaran, DP rumah, modal usaha, lengkap dengan saran sisihan per bulan.",
    gambar: "target.webp",
    alt: "Target tabungan pulang dan Lebaran",
  },
  {
    judul: "Tagihan & cicilan",
    isi: "Listrik, sewa, cicilan HP, arisan. Diingatkan sebelum jatuh tempo.",
    gambar: "tagihan.webp",
    alt: "Daftar tagihan bulanan",
  },
  {
    judul: "Dokumen penting",
    isi: "在留カード dan paspor terenkripsi, diingatkan sebelum habis.",
    gambar: "dokumen.webp",
    alt: "Daftar dokumen penting",
  },
];

export default function BerandaPage() {
  return (
    <div className={`wrap ${styles.beranda}`}>
      <section className={styles.hero}>
        <div className={styles.heroTeks}>
          <span className={styles.chip}>
            <Ikon nama="jam" ukuran={14} tebal={2.4} />
            {situs.playStore ? "Android · Gratis" : "Uji tertutup · Android"}
          </span>
          <h1>
            Gaji dalam Yen, keluarga dalam Rupiah.{" "}
            <span>Catatannya rapi di satu HP.</span>
          </h1>
          <p className={styles.lead}>
            Aplikasi keuangan gratis untuk orang Indonesia yang kerja di Jepang.
          </p>
          <Link
            className={styles.tombolUtama}
            href={situs.playStore ?? "/coba"}
          >
            {situs.playStore ? "Unduh di Google Play" : "Coba duluan di Android"}
            <Ikon nama="panah" ukuran={18} tebal={2.4} />
          </Link>
          <ul className={styles.janji} aria-label="Janji YenRapi">
            {janji.map((j) => (
              <li key={j.teks}>
                <Ikon nama={j.ikon} />
                {j.teks}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.hp}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={layar("beranda.webp")}
            alt="Beranda aplikasi YenRapi dengan saldo dan ringkasan bulan ini"
            width={540}
            height={1230}
            fetchPriority="high"
          />
          <span className={`${styles.stiker} ${styles.stikerKiri}`}>
            <Ikon nama="slip" ukuran={16} tebal={2.2} />
            Foto slip → terisi sendiri
          </span>
          <span className={`${styles.stiker} ${styles.stikerKanan}`}>
            <Ikon nama="kunci" ukuran={16} tebal={2.2} />
            Terkunci sidik jari
          </span>
        </div>
      </section>

      <div className={styles.duaKolom}>
        <Gajian />

        <section className={styles.bagian}>
          <h2>Alat cepat</h2>
          <div className={styles.alat}>
            {alatCepat.map((a) => (
              <Link key={a.href} href={a.href}>
                <span className={a.kuning ? styles.ikonKuning : styles.ikonBiru}>
                  <Ikon nama={a.ikon} ukuran={22} />
                </span>
                <strong>{a.judul}</strong>
                <small>{a.isi}</small>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <TahukahKamu />

      <section className={styles.bagian}>
        <div className={styles.judulBaris}>
          <h2>Apa saja yang dicatat?</h2>
          <span aria-hidden="true">Geser →</span>
        </div>
        <div className={styles.geser} tabIndex={0} aria-label="Fitur aplikasi">
          {fitur.map((f, i) => (
            <article key={f.judul} className={styles.fitur}>
              <div className={i % 2 ? styles.fiturGambarKuning : styles.fiturGambar}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={layar(f.gambar)}
                  alt={f.alt}
                  width={540}
                  height={1230}
                  loading="lazy"
                />
              </div>
              <h3>{f.judul}</h3>
              <p>{f.isi}</p>
            </article>
          ))}
        </div>
        <Link href="/perjalanan" className={styles.tautan}>
          Lihat semua layar & riwayat versi
          <Ikon nama="kanan" ukuran={16} tebal={2.4} />
        </Link>
      </section>

      <section className={styles.duaKecil}>
        <IstilahHariIni />
        <Link href="/kuis" className={styles.kuis}>
          <span className={styles.label}>Kuis 1 menit</span>
          <strong>Bisa baca slip gajimu?</strong>
          <small>3 soal, tanpa daftar</small>
          <span className={styles.kuisMulai}>
            Mulai <Ikon nama="panah" ukuran={16} tebal={2.4} />
          </span>
        </Link>
      </section>

      <section className={styles.privasi}>
        <div className={styles.privasiJudul}>
          <span>
            <Ikon nama="perisai" ukuran={22} />
          </span>
          <h2>Datamu hanya di HP-mu</h2>
        </div>
        <ul>
          <li>
            <Ikon nama="centang" ukuran={18} tebal={2.6} />
            Disimpan terenkripsi di HP, bukan di server.
          </li>
          <li>
            <Ikon nama="centang" ukuran={18} tebal={2.6} />
            Internet hanya untuk kurs ¥ → Rp, bisa dimatikan.
          </li>
          <li>
            <Ikon nama="centang" ukuran={18} tebal={2.6} />
            Tanpa akun, tanpa iklan, tanpa pelacakan.
          </li>
          <li>
            <Ikon nama="centang" ukuran={18} tebal={2.6} />
            Backup ke file berpassword untuk pindah HP.
          </li>
        </ul>
        <Link href="/privasi">Baca kebijakan privasi</Link>
      </section>

      <section className={styles.pembuat}>
        <span className={styles.pembuatIkon}>
          <Ikon nama="helm" ukuran={28} tebal={1.8} />
        </span>
        <div>
          <span className={styles.label}>Dari pembuat</span>
          <p>
            Saya pekerja konstruksi di Jepang, bukan programmer. YenRapi saya
            buat dibantu AI, awalnya untuk mengatur gaji sendiri.
          </p>
          <p className={styles.semboyan}>Pelan-pelan, yang penting rapi.</p>
          <Link href="/tentang">Cerita lengkap & peran AI</Link>
        </div>
      </section>
    </div>
  );
}
