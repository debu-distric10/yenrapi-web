"use client";

import { simpan, useNomorHari, useSimpanan } from "@/lib/klien";
import styles from "./beranda.module.css";

const pilihan = [
  { hari: 15, label: "15日" },
  { hari: 20, label: "20日" },
  { hari: 25, label: "25日" },
  { hari: 0, label: "月末" },
] as const;

const kunci = "gajian";
const bawaan = 25;

/** Tanggal gajian di bulan tertentu (0 = akhir bulan). */
function tanggalGajian(tahun: number, bulan: number, hari: number): Date {
  const akhir = new Date(tahun, bulan + 1, 0).getDate();
  return new Date(tahun, bulan, hari === 0 ? akhir : Math.min(hari, akhir));
}

const sehari = 24 * 60 * 60 * 1000;

/** Sisa hari ke gajian berikutnya dan porsi bulan gaji yang sudah lewat. */
export function hitungGajian(hariIni: Date, hari: number) {
  const awal = new Date(hariIni.getFullYear(), hariIni.getMonth(), hariIni.getDate());
  let berikut = tanggalGajian(awal.getFullYear(), awal.getMonth(), hari);
  if (berikut < awal) {
    berikut = tanggalGajian(awal.getFullYear(), awal.getMonth() + 1, hari);
  }
  const sebelum = tanggalGajian(berikut.getFullYear(), berikut.getMonth() - 1, hari);
  const sisa = Math.round((berikut.getTime() - awal.getTime()) / sehari);
  const panjang = Math.round((berikut.getTime() - sebelum.getTime()) / sehari);
  return { sisa, porsi: sisa === 0 ? 1 : 1 - sisa / panjang };
}

function pesan(sisa: number): string {
  if (sisa === 0) return "Hari ini gajian! Otsukaresama. Jangan lupa catat dan sisihkan dulu tabungannya.";
  if (sisa === 1) return "Besok gajian. Tahan dulu jajan konbini-nya.";
  if (sisa <= 7) return "Minggu ini gajian. Sedikit lagi, semangat!";
  return `Sabar ya, tinggal ${sisa} kali bekal onigiri lagi.`;
}

/**
 * Hitung mundur gajian. Tanggal yang dipilih disimpan di browser ini saja;
 * tidak ada yang dikirim.
 */
export function Gajian() {
  const tersimpan = useSimpanan(kunci);
  const hari = pilihan.some((p) => String(p.hari) === tersimpan)
    ? Number(tersimpan)
    : bawaan;
  const nomor = useNomorHari();
  const hariIni =
    nomor === null
      ? null
      : (() => {
          const u = new Date(nomor * sehari);
          return new Date(u.getUTCFullYear(), u.getUTCMonth(), u.getUTCDate());
        })();

  function pilih(h: number) {
    simpan(kunci, String(h));
  }

  const hasil = hariIni ? hitungGajian(hariIni, hari) : null;
  const tanggal = hariIni?.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  return (
    <section className={styles.gajian} aria-label="Hitung mundur gajian">
      <div className={styles.gajianAtas}>
        <span>Hitung mundur gajian</span>
        <span>{tanggal ?? " "}</span>
      </div>
      <p className={styles.gajianAngka} aria-live="polite">
        {hasil ? (
          hasil.sisa === 0 ? (
            <strong>Hari ini!</strong>
          ) : (
            <>
              <strong>{hasil.sisa}</strong> hari lagi gajian
            </>
          )
        ) : (
          <strong>…</strong>
        )}
      </p>
      <div className={styles.gajianBar} aria-hidden="true">
        <span style={{ width: `${Math.round((hasil?.porsi ?? 0) * 100)}%` }} />
      </div>
      <div className={styles.gajianPilih}>
        <span>Tanggal gajianmu (給料日):</span>
        <div>
          {pilihan.map((p) => (
            <button
              key={p.hari}
              type="button"
              aria-pressed={hari === p.hari}
              onClick={() => pilih(p.hari)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <p className={styles.gajianPesan}>{hasil ? pesan(hasil.sisa) : " "}</p>
    </section>
  );
}
