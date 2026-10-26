import type { Metadata } from "next";
import { labelStatus, perjalanan } from "@/lib/perjalanan";
import { aset } from "@/lib/situs";
import styles from "./perjalanan.module.css";

export const metadata: Metadata = {
  title: "Perjalanan YenRapi",
  description:
    "Riwayat versi YenRapi dari 1.0.0, lengkap dengan tampilan dan fitur tiap versi, serta rencana ke depan.",
};

function idVersi(versi: string): string {
  return `v${versi.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

export default function PerjalananPage() {
  // Data disimpan terbaru di atas; halaman bercerita dari versi pertama.
  const urut = [...perjalanan].reverse();

  return (
    <div className="wrap page">
      <header className={styles.head}>
        <h1>Perjalanan YenRapi</h1>
        <p className="muted">
          Dari versi pertama sampai rencana ke depan. Semua gambar diambil dari
          aplikasi berisi data contoh, bukan data siapa pun.
        </p>
        <nav aria-label="Pilih versi" className={styles.chips}>
          {urut.map((v) => (
            <a key={v.versi} href={`#${idVersi(v.versi)}`}>
              {v.status === "rencana" ? v.nama : `v${v.versi}`}
            </a>
          ))}
        </nav>
      </header>

      <ol className={styles.timeline}>
        {urut.map((v) => (
          <li key={v.versi} id={idVersi(v.versi)} className={styles.versi}>
            <div className={styles.versiHead}>
              <span className={`${styles.badge} ${styles[v.status]}`}>
                {labelStatus[v.status]}
              </span>
              <h2>
                {v.status === "rencana" ? v.nama : `Versi ${v.versi}`}
                {v.status !== "rencana" && (
                  <span className={styles.nama}> · {v.nama}</span>
                )}
              </h2>
              <p className={styles.waktu}>{v.waktu}</p>
              <p>{v.ringkasan}</p>
            </div>

            <div className={styles.grid}>
              {v.fitur.map((f) => (
                <article key={f.judul} className={styles.kartu}>
                  {f.gambar && v.folder && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={aset(`/perjalanan/${v.folder}/${f.gambar}`)}
                      alt={f.alt ?? f.judul}
                      width={540}
                      height={1230}
                      loading="lazy"
                    />
                  )}
                  <div className={styles.isi}>
                    <h3>{f.judul}</h3>
                    <ul>
                      {f.poin.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
