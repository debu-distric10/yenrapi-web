import type { Metadata } from "next";
import Link from "next/link";
import { Ikon, type NamaIkon } from "@/components/Ikon";
import styles from "@/components/kalkulator/kalkulator.module.css";
import { daftarKalkulator, type SlugKalkulator } from "@/lib/kalkulator/daftar";

export const metadata: Metadata = {
  title: "Kalkulator gaji, lembur, pajak & nenkin Jepang",
  description:
    "Kalkulator gratis untuk orang Indonesia di Jepang: gaji bersih, lembur, pajak & potongan, bonus, 住民税, nenkin lump-sum, dan kurs Yen–Rupiah. Aturan resmi 2026.",
};

const ikon: Record<SlugKalkulator, NamaIkon> = {
  gaji: "uang",
  lembur: "jam",
  pajak: "dokumen",
  bonus: "hadiah",
  "pajak-penduduk": "rumah",
  nenkin: "pesawat",
  kurs: "tukar",
};

export default function KalkulatorPage() {
  return (
    <div className="wrap page">
      <h1>Kalkulator</h1>
      <p className="muted">
        Aturan resmi Jepang 2026, sama dengan kalkulator di aplikasi YenRapi.
        Dihitung di browser-mu, tidak ada data yang dikirim.
      </p>
      <div className={styles.list}>
        {daftarKalkulator.map((k, i) => (
          <Link
            key={k.slug}
            className={`${styles.listItem} ${i === 0 ? styles.listUtama : ""}`}
            href={`/kalkulator/${k.slug}`}
          >
            <span className={i % 2 ? styles.listIkonKuning : styles.listIkon}>
              <Ikon nama={ikon[k.slug]} ukuran={22} />
            </span>
            <span className={styles.listTeks}>
              <strong>
                {k.judul}
                {i === 0 && <em className={styles.lencana}>Paling dicari</em>}
              </strong>
              <span>{k.ringkas}</span>
            </span>
            <Ikon nama="kanan" ukuran={18} />
          </Link>
        ))}
      </div>
    </div>
  );
}
