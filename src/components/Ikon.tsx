/**
 * Ikon garis sederhana (24×24, ikut warna teks). Digambar sendiri agar
 * situs tidak memuat pustaka ikon dari server lain.
 */
const jalur = {
  beranda: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z",
  kalkulator:
    "M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8 7h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 18h.01M12 18h4",
  buku: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 21V5M9 8h6M9 12h4",
  kompas: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM15.5 8.5l-2 5-5 2 2-5z",
  lainnya: "M5 12h.01M12 12h.01M19 12h.01",
  uang: "M5 6h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM12 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM6 9v.01M18 15v.01",
  jam: "M12 5a8 8 0 1 1 0 16 8 8 0 0 1 0-16zM12 9v4l2.5 2M9 2h6",
  dokumen: "M4 4h16v16H4zM8 9h8M8 13h8M8 17h4",
  hadiah: "M20 12v9H4v-9M2 7h20v5H2zM12 21V7",
  rumah: "M3 21h18M5 21V10l7-5 7 5v11M10 21v-6h4v6",
  pesawat: "M2 16l20-6-3 9H5zM12 4v6",
  tukar: "M4 8h13l-3-3M20 16H7l3 3",
  kunci: "M7 11h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2zM8 11V7a4 4 0 0 1 8 0v4",
  perisai: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4",
  centang: "M5 12l5 5L20 7",
  silang: "M6 6l12 12M18 6L6 18",
  panah: "M5 12h14M13 6l6 6-6 6",
  kanan: "M9 6l6 6-6 6",
  kiri: "M15 6l-6 6 6 6",
  cari: "M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zM20 20l-4-4",
  suara: "M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11",
  orang: "M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM4 21c1-4 4-6 8-6s7 2 8 6",
  gedung: "M3 21h18M5 21V8l7-5 7 5v13M9 13h6",
  surat: "M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM3 7l9 6 9-6",
  grafik: "M3 12h4l3-8 4 16 3-8h4",
  hp: "M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2",
  slip: "M4 4h16v16H4zM8 9h8M8 13h5",
  tanpaIklan: "M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM4 4l16 16",
  tanpaAkun: "M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM4 21c1-4 4-6 8-6s7 2 8 6M3 3l18 18",
  bulan: "M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z",
  helm: "M4 14a8 8 0 0 1 16 0zM2 14h20M12 6v3",
} as const;

export type NamaIkon = keyof typeof jalur;

export function Ikon({
  nama,
  ukuran = 20,
  tebal = 2,
  className,
}: {
  nama: NamaIkon;
  ukuran?: number;
  tebal?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={ukuran}
      height={ukuran}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={nama === "lainnya" ? 3.4 : tebal}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={jalur[nama]} />
    </svg>
  );
}

/** Maskot onigiri kecil (dipakai di "Tahukah kamu?", kuis, dan dukung). */
export function Onigiri({
  ukuran = 56,
  senyum = true,
  kosong = false,
}: {
  ukuran?: number;
  senyum?: boolean;
  kosong?: boolean;
}) {
  const nasi =
    "M32 6c4 0 7 3 10 8l14 25c3 6 0 13-8 13H16c-8 0-11-7-8-13l14-25c3-5 6-8 10-8z";
  if (kosong) {
    return (
      <svg width={ukuran} height={ukuran} viewBox="0 0 64 64" aria-hidden="true">
        <path
          d={nasi}
          fill="var(--line)"
          stroke="var(--muted)"
          strokeWidth="2.5"
          strokeDasharray="5 4"
        />
      </svg>
    );
  }
  return (
    <svg width={ukuran} height={ukuran} viewBox="0 0 64 64" aria-hidden="true">
      <path d={nasi} fill="#fff" stroke="#1c2433" strokeWidth="2.5" />
      <rect x="20" y="38" width="24" height="16" rx="3" fill="#1c2433" />
      <circle cx="25" cy="29" r="2.4" fill="#1c2433" />
      <circle cx="39" cy="29" r="2.4" fill="#1c2433" />
      {senyum && (
        <path
          d="M28 33c2 2 6 2 8 0"
          fill="none"
          stroke="#1c2433"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
      <circle cx="20" cy="33" r="2.6" fill="#f2b8a0" />
      <circle cx="44" cy="33" r="2.6" fill="#f2b8a0" />
    </svg>
  );
}
