"use client";

import { useState, useSyncExternalStore } from "react";
import { Ikon } from "@/components/Ikon";
import data from "@/lib/istilah.json";
import { useNomorHari } from "@/lib/klien";
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

/**
 * Suara Jepang bawaan HP/komputer saja (localService). Suara "online" milik
 * browser mengirim teks ke server lain, jadi tidak dipakai.
 */
function suaraJepang(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return null;
  }
  return (
    window.speechSynthesis
      .getVoices()
      .find((v) => v.lang.toLowerCase().startsWith("ja") && v.localService) ??
    null
  );
}

function langgananSuara(ubah: () => void) {
  if (!("speechSynthesis" in window)) return () => {};
  window.speechSynthesis.addEventListener("voiceschanged", ubah);
  return () => window.speechSynthesis.removeEventListener("voiceschanged", ubah);
}

function useAdaSuara(): boolean {
  return useSyncExternalStore(
    langgananSuara,
    () => suaraJepang() !== null,
    () => false,
  );
}

function TombolDengar({ teks, besar }: { teks: string; besar?: boolean }) {
  return (
    <button
      type="button"
      className={besar ? styles.dengarBesar : styles.dengar}
      aria-label={`Dengar cara baca ${teks}`}
      onClick={() => {
        const suara = suaraJepang();
        if (!suara) return;
        const u = new SpeechSynthesisUtterance(teks);
        u.voice = suara;
        u.lang = suara.lang;
        u.rate = 0.85;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      }}
    >
      <Ikon nama="suara" ukuran={besar ? 20 : 18} tebal={2.2} />
    </button>
  );
}

export function CariIstilah() {
  const [query, setQuery] = useState("");
  const [grup, setGrup] = useState<string | null>(null);
  const nomor = useNomorHari();
  const hariIni = nomor === null ? 5 : nomor % data.terms.length;
  const adaSuara = useAdaSuara();

  const shown = data.terms.filter(
    (t) => cocok(t, query) && (grup === null || t.group === grup),
  );
  const unggulan = data.terms[hariIni];
  const mencari = query.trim() !== "" || grup !== null;

  return (
    <>
      <div className={styles.saring}>
        <label className={styles.cari}>
          <Ikon nama="cari" ukuran={18} tebal={2.2} />
          <input
            type="search"
            placeholder="Cari: tedori, 手取り, gaji bersih…"
            aria-label="Cari istilah"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className={styles.chips} role="group" aria-label="Kategori">
          <button
            type="button"
            aria-pressed={grup === null}
            onClick={() => setGrup(null)}
          >
            Semua
          </button>
          {data.groups.map((g) => (
            <button
              key={g}
              type="button"
              aria-pressed={grup === g}
              onClick={() => setGrup(grup === g ? null : g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {!mencari && (
        <section className={styles.unggulan} aria-label="Istilah hari ini">
          <span className={styles.unggulanLabel}>Istilah hari ini</span>
          <div className={styles.unggulanKepala}>
            <span lang="ja">{unggulan.japanese}</span>
            <em>{unggulan.reading}</em>
            {adaSuara && <TombolDengar teks={unggulan.japanese} besar />}
          </div>
          <strong>{unggulan.meaning}</strong>
          <p>{unggulan.explanation}</p>
        </section>
      )}

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
                    <div className={styles.headTeks}>
                      <span className={styles.jp} lang="ja">
                        {t.japanese}
                      </span>
                      <span className={styles.reading}>{t.reading}</span>
                    </div>
                    {adaSuara && <TombolDengar teks={t.japanese} />}
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
