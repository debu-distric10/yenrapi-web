"use client";

import Link from "next/link";
import { useState } from "react";
import { Ikon, Onigiri } from "@/components/Ikon";
import styles from "./kuis.module.css";

export const soal = [
  {
    label: "差引支給額 · 総支給額 · 控除合計",
    tanya: "Di slip gaji, mana yang artinya gaji bersih yang masuk rekening?",
    opsi: ["総支給額", "差引支給額", "控除合計"],
    benar: 1,
    jelas:
      "差引支給額 = setelah dipotong. 総支給額 itu gaji kotor, 控除合計 total potongannya.",
  },
  {
    label: "厚生年金",
    tanya: "Potongan 厚生年金 di slip itu untuk apa?",
    opsi: ["Asuransi kesehatan", "Pensiun", "Pajak penduduk"],
    benar: 1,
    jelas:
      "Itu iuran pensiun. Saat pulang ke Indonesia, sebagian bisa diminta kembali lewat 脱退一時金.",
  },
  {
    label: "住民税",
    tanya: "Pajak penduduk (住民税) dihitung dari gaji kapan?",
    opsi: ["Bulan ini", "Tahun lalu", "Tahun depan"],
    benar: 1,
    jelas:
      "Dari gaji tahun lalu. Makanya tahun pertama di Jepang biasanya belum ada potongan ini.",
  },
] as const;

const huruf = ["A", "B", "C"];

const hasil = [
  ["Masih pemanasan", "Wajar, istilah slip gaji memang bikin pusing. Pelan-pelan, yang penting rapi."],
  ["Lumayan!", "Satu dua istilah lagi, kamu sudah bisa baca slip sendiri."],
  ["Hampir ahli", "Tinggal sedikit lagi. Coba lihat daftar istilahnya."],
  ["Ahli slip gaji!", "Tiga onigiri untukmu. Ajak teman yang masih bingung baca slip untuk mencoba."],
] as const;

/** Kuis 3 soal. Tidak ada yang disimpan atau dikirim. */
export function Kuis() {
  const [no, setNo] = useState(0);
  const [pilihan, setPilihan] = useState<number | null>(null);
  const [skor, setSkor] = useState(0);
  const [selesai, setSelesai] = useState(false);

  if (selesai) {
    const [judul, pesan] = hasil[skor];
    return (
      <section className={styles.hasil} aria-live="polite">
        <div className={styles.piala} aria-hidden="true">
          {soal.map((_, i) => (
            <Onigiri key={i} ukuran={64} kosong={i >= skor} />
          ))}
        </div>
        <span className={styles.skor}>Skor {skor} dari {soal.length}</span>
        <h2>{judul}</h2>
        <p>{pesan}</p>
        <Link href="/istilah" className="btn">
          Pelajari 43 istilah
        </Link>
        <button
          type="button"
          className={styles.ulang}
          onClick={() => {
            setNo(0);
            setPilihan(null);
            setSkor(0);
            setSelesai(false);
          }}
        >
          Ulangi kuis
        </button>
      </section>
    );
  }

  const s = soal[no];
  const dijawab = pilihan !== null;

  return (
    <section className={styles.kuis}>
      <div className={styles.kemajuan}>
        <span>
          Soal {no + 1} dari {soal.length}
        </span>
        <div aria-hidden="true">
          {soal.map((_, i) => (
            <span key={i} className={i <= no ? styles.titikAktif : undefined} />
          ))}
        </div>
      </div>

      <div className={styles.pertanyaan}>
        <span lang="ja">{s.label}</span>
        <h2>{s.tanya}</h2>
      </div>

      <div className={styles.opsi}>
        {s.opsi.map((teks, i) => {
          const status = !dijawab
            ? undefined
            : i === s.benar
              ? "benar"
              : i === pilihan
                ? "salah"
                : "redup";
          return (
            <button
              key={teks}
              type="button"
              data-status={status}
              disabled={dijawab}
              onClick={() => {
                setPilihan(i);
                if (i === s.benar) setSkor(skor + 1);
              }}
            >
              <span className={styles.huruf}>
                {status === "benar" ? (
                  <Ikon nama="centang" ukuran={16} tebal={3} />
                ) : status === "salah" ? (
                  <Ikon nama="silang" ukuran={14} tebal={3.2} />
                ) : (
                  huruf[i]
                )}
              </span>
              {teks}
            </button>
          );
        })}
      </div>

      {dijawab && (
        <>
          <div className={styles.penjelasan} aria-live="polite">
            <Onigiri ukuran={40} />
            <div>
              <strong>{pilihan === s.benar ? "Betul!" : "Hampir!"}</strong>
              <span>{s.jelas}</span>
            </div>
          </div>
          <button
            type="button"
            className="btn"
            onClick={() => {
              if (no < soal.length - 1) {
                setNo(no + 1);
                setPilihan(null);
              } else {
                setSelesai(true);
              }
            }}
          >
            {no < soal.length - 1 ? "Soal berikutnya" : "Lihat hasil"}
          </button>
        </>
      )}
    </section>
  );
}
