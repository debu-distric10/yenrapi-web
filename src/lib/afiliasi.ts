/**
 * Tautan afiliasi yang dipasang di panduan. YenRapi mendapat komisi bila
 * pembaca mendaftar lewat tautan ini, jadi selalu tampil dengan label.
 * Contoh: { panduan: "kirim-uang", nama: "Wise", url: "https://...", catatan: "Kirim lewat aplikasi, kurs tengah + biaya kecil." }
 */
export type TautanAfiliasi = {
  panduan: string;
  nama: string;
  url: string;
  catatan: string;
};

export const tautanAfiliasi: TautanAfiliasi[] = [];

export function afiliasiUntuk(panduan: string): TautanAfiliasi[] {
  return tautanAfiliasi.filter((t) => t.panduan === panduan);
}
