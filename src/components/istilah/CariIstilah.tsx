"use client";

import { useState } from "react";
import data from "@/lib/istilah.json";
import styles from "./istilah.module.css";

/** Huruf kecil dan tanpa tanda panjang (kyūryō → kyuryo). */
function normal(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function cocok(
  term: (typeof data.terms)[number],
  query: string,
): boolean {
  const q = normal(query.trim());
  if (q === "") return true;
  return [term.japanese, term.reading, term.meaning, term.explanation].some(
    (t) => normal(t).includes(q),
  );
}

export function CariIstilah() {
  const [query, setQuery] = useState("");
  const shown = data.terms.filter((t) => cocok(t, query));
  return (
    <>
      <input
        className={styles.search}
        type="search"
        placeholder="Cari: tedori, 手取り, gaji bersih…"
        aria-label="Cari istilah"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {shown.length === 0 && (
        <p className="muted">Tidak ada istilah yang cocok.</p>
      )}
      {data.groups.map((group) => {
        const terms = shown.filter((t) => t.group === group);
        if (terms.length === 0) return null;
        return (
          <section key={group}>
            <h2 className={styles.group}>{group}</h2>
            <div className={styles.list}>
              {terms.map((t) => (
                <article key={t.japanese} className={styles.term} lang="id">
                  <div className={styles.head}>
                    <span className={styles.jp} lang="ja">
                      {t.japanese}
                    </span>
                    <span className={styles.reading}>{t.reading}</span>
                  </div>
                  <strong>{t.meaning}</strong>
                  <p>{t.explanation}</p>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
