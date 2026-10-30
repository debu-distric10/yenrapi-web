import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/components/kalkulator/kalkulator.module.css";
import { daftarKalkulator } from "@/lib/kalkulator/daftar";

export const metadata: Metadata = {
  title: "Kalkulator gaji, lembur, pajak & nenkin Jepang",
  description:
    "Kalkulator gratis untuk orang Indonesia di Jepang: gaji bersih, lembur, pajak & potongan, bonus, 住民税, nenkin lump-sum, kurs Yen–Rupiah, tanggungan keluarga (扶養控除), dan cuti berbayar. Aturan resmi 2026.",
};

export default function KalkulatorPage() {
  return (
    <div className="wrap page">
      <h1>Kalkulator</h1>
      <p className="muted">
        Perkiraan berdasarkan aturan resmi Jepang 2026. Tujuh kalkulator pertama
        sama dengan kalkulator di aplikasi YenRapi. Semua hitungan dilakukan di
        browser-mu; tidak ada data yang dikirim.
      </p>
      <div className={styles.list}>
        {daftarKalkulator.map((k) => (
          <Link key={k.slug} className={styles.listItem} href={`/kalkulator/${k.slug}`}>
            <strong>{k.judul}</strong>
            <span>{k.ringkas}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
