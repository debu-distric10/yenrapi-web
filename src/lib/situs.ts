/** Data situs yang dipakai di banyak halaman. */
export const situs = {
  nama: "YenRapi",
  slogan: "Keuangan rapi untuk orang Indonesia di Jepang",
  email: "yenrapi.app@gmail.com",
  /** Diisi setelah aplikasi tayang di Google Play. */
  playStore: null as string | null,
  /** Halaman Trakteer. */
  trakteer: "https://trakteer.id/yen_rapi" as string | null,
};

/** Awalan alamat untuk file di folder public/ (next/link menambah sendiri). */
export const basePath = process.env.BASE_PATH ?? "";

export function aset(path: string): string {
  return `${basePath}${path}`;
}
