"use client";

import Link from "next/link";
import { useState } from "react";
import { Onigiri } from "@/components/Ikon";
import data from "@/lib/istilah.json";
import { fakta } from "@/lib/fakta";
import { useNomorHari } from "@/lib/klien";
import styles from "./beranda.module.css";

/** Kartu "Tahukah kamu?" dengan tombol fakta lain. */
export function TahukahKamu() {
  const nomor = useNomorHari();
  // Fakta pertama ikut hari; tombol "Fakta lain" menggeser dari situ.
  const [geser, setGeser] = useState(0);
  const i = ((nomor ?? 0) + geser) % fakta.length;

  return (
    <section className={styles.tahukah} aria-label="Tahukah kamu?">
      <Onigiri ukuran={64} />
      <div>
        <span className={styles.label}>Tahukah kamu?</span>
        <p aria-live="polite">{fakta[i]}</p>
        <div className={styles.tahukahBawah}>
          <span>
            Fakta {i + 1} dari {fakta.length}
          </span>
          <button type="button" onClick={() => setGeser(geser + 1)}>
            Fakta lain
          </button>
        </div>
      </div>
    </section>
  );
}

/** Kartu kecil "Istilah hari ini" yang berganti setiap hari. */
export function IstilahHariIni() {
  const nomor = useNomorHari();
  // Sebelum tanggal HP terbaca, tampilkan 手取り.
  const i = nomor === null ? 5 : nomor % data.terms.length;
  const t = data.terms[i];

  return (
    <Link href="/istilah" className={styles.istilahKecil}>
      <span className={styles.label}>Istilah hari ini</span>
      <span className={styles.istilahJp} lang="ja">
        {t.japanese}
      </span>
      <em>{t.reading}</em>
      <strong>{t.meaning}</strong>
    </Link>
  );
}
