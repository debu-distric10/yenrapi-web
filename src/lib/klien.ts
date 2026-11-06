"use client";

import { useSyncExternalStore } from "react";

/**
 * Nilai yang hanya ada di browser (tanggal hari ini, pilihan yang disimpan).
 * Saat halaman dibuat (build) nilainya null, lalu terisi setelah halaman
 * tampil di HP pengunjung, tanpa salah cocok saat hidrasi.
 */

const tanpaLangganan = () => () => {};

/** Nomor hari sejak 1970 menurut jam HP (berganti tiap tengah malam). */
export function nomorHari(d = new Date()): number {
  return Math.floor(
    Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000,
  );
}

export function useNomorHari(): number | null {
  return useSyncExternalStore(tanpaLangganan, nomorHari, () => null);
}

const pendengar = new Set<() => void>();

function langganan(ubah: () => void) {
  pendengar.add(ubah);
  window.addEventListener("storage", ubah);
  return () => {
    pendengar.delete(ubah);
    window.removeEventListener("storage", ubah);
  };
}

function baca(kunci: string): string | null {
  try {
    return localStorage.getItem(kunci);
  } catch {
    return null;
  }
}

/** Isian localStorage; null bila kosong atau browser menolak penyimpanan. */
export function useSimpanan(kunci: string): string | null {
  return useSyncExternalStore(
    langganan,
    () => baca(kunci),
    () => null,
  );
}

export function simpan(kunci: string, nilai: string | null) {
  try {
    if (nilai === null) localStorage.removeItem(kunci);
    else localStorage.setItem(kunci, nilai);
  } catch {}
  pendengar.forEach((ubah) => ubah());
}
