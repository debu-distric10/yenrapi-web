import type { Metadata } from "next";
import {
  labelPerubahan,
  labelStatus,
  rencana,
  versi,
  type Kelompok,
} from "@/lib/perjalanan";
import { aset } from "@/lib/situs";
import styles from "./perjalanan.module.css";

export const metadata: Metadata = {
  title: "Perjalanan YenRapi",
  description:
    "Riwayat versi YenRapi lengkap dengan tampilan dan fitur tiap versi, serta rencana ke depan.",
};

function idVersi(v: string): string {
  return `v${v.replace(/[^0-9a-z]+/gi, "-")}`;
}

function Galeri({ kelompok, folder }: { kelompok: Kelompok; folder: string }) {
  return (
    <section className={styles.kelompok}>
      <h3>
        <span aria-hidden="true">{kelompok.ikon}</span> {kelompok.judul}
      </h3>
      <p className={styles.kelompokRingkas}>{kelompok.ringkasan}</p>
      {kelompok.layar.length > 1 && (
        <p className={styles.petunjuk} aria-hidden="true">
          Geser untuk lihat {kelompok.layar.length} layar →
        </p>
      )}
      <ul className={styles.galeri} aria-label={`Tampilan ${kelompok.judul}`}>
        {kelompok.layar.map((l) => (
          <li key={l.gambar} className={styles.layar}>
            <div className={styles.bingkai}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={aset(`/perjalanan/${folder}/${l.gambar}`)}
                alt={`${l.judul}: ${l.keterangan}`}
                width={540}
                height={1230}
                loading="lazy"
              />
            </div>
            <strong>{l.judul}</strong>
            <span>{l.keterangan}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function PerjalananPage() {
  return (
    <div className="wrap page">
      <header className={styles.head}>
        <h1>Perjalanan YenRapi</h1>
        <p className="muted">
          Apa saja yang baru di setiap versi, dan apa yang sedang disiapkan.
          Semua gambar diambil dari aplikasi berisi data contoh.
        </p>
      </header>

      <nav aria-label="Pilih versi" className={styles.chips}>
        {versi.map((v) => (
          <a key={v.versi} href={`#${idVersi(v.versi)}`}>
            v{v.versi}
          </a>
        ))}
        <a href="#rencana">Rencana</a>
      </nav>

      {versi.map((v, i) => (
        <article
          key={v.versi}
          id={idVersi(v.versi)}
          className={styles.versi}
        >
          <header
            className={`${styles.kartuVersi} ${i === 0 ? styles.terbaru : ""}`}
          >
            <div className={styles.label}>
              {i === 0 && <span className={styles.badgeTerbaru}>Terbaru</span>}
              <span className={`${styles.badge} ${styles[v.status]}`}>
                {labelStatus[v.status]}
              </span>
            </div>
            <p className={styles.nomor}>
              Versi {v.versi} · {v.nama}
            </p>
            <h2>{v.judul}</h2>
            <p className={styles.waktu}>{v.waktu}</p>
            <p>{v.ringkasan}</p>
            {v.sorotan && (
              <ul className={styles.sorotan}>
                {v.sorotan.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            )}
            {v.perubahan && (
              <ul className={styles.perubahan}>
                {v.perubahan.map((p) => (
                  <li key={p.teks}>
                    <span className={styles.jenis}>
                      {labelPerubahan[p.jenis]}
                    </span>
                    {p.teks}
                  </li>
                ))}
              </ul>
            )}
          </header>

          {v.kelompok &&
            v.folder &&
            v.kelompok.map((k) => (
              <Galeri key={k.judul} kelompok={k} folder={v.folder!} />
            ))}
        </article>
      ))}

      <section id="rencana" className={styles.rencana}>
        <h2>Rencana ke depan</h2>
        <p className="muted">
          Tanpa janji tanggal — urutan dan isinya bisa berubah mengikuti
          masukan pengguna.
        </p>
        <div className={styles.lajur}>
          {rencana.map((l) => (
            <div key={l.judul} className={styles.lajurKartu}>
              <h3>
                <span aria-hidden="true">{l.ikon}</span> {l.judul}
              </h3>
              <ul>
                {l.item.map((it) => (
                  <li key={it.judul}>
                    <strong>{it.judul}</strong>
                    <span>{it.isi}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
