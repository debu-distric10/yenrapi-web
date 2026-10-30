/**
 * Kalkulator yang hanya ada di website (belum ada di aplikasi), jadi tidak
 * dibandingkan dengan kasus-aplikasi.json.
 */

// =============================================================================
// Tanggungan keluarga di luar negeri (国外居住親族の扶養控除)
// =============================================================================

export type Hubungan = "pasangan" | "anak" | "orangtua" | "saudara" | "lainnya";

export type AnggotaKeluarga = {
  hubungan: Hubungan;
  /** Umur per 31 Desember tahun pajak. */
  umur: number;
  pelajar: boolean;
  disabilitas: boolean;
  /** Total kiriman ke orang ini dalam setahun (yen). */
  kirimanSetahun: number;
  /** Penghasilan sendiri setahun ≤ ¥580.000 (合計所得金額 58万円). */
  penghasilanRendah: boolean;
};

export type JenisPotongan = "配偶者控除" | "一般扶養" | "特定扶養" | "老人扶養";

export type HasilAnggota = {
  bisa: boolean;
  jenis: JenisPotongan | null;
  /** Potongan 所得税 setahun (yen). */
  potongan: number;
  alasan: string;
  /** Dokumen tambahan selain 親族関係書類 dan 送金関係書類. */
  dokumenTambahan: string | null;
  /** Bukti kiriman ke orang ini belum ada. */
  perluKiriman: boolean;
};

/** Minimal kiriman setahun untuk tanggungan umur 30–69 (令和5年分 ke atas). */
export const kirimanMinimal30sd69 = 380000;

const potonganPerJenis: Record<JenisPotongan, number> = {
  配偶者控除: 380000,
  一般扶養: 380000,
  特定扶養: 630000,
  老人扶養: 480000,
};

function hasil(
  jenis: JenisPotongan,
  alasan: string,
  a: AnggotaKeluarga,
  dokumenTambahan: string | null = null,
): HasilAnggota {
  return {
    bisa: true,
    jenis,
    potongan: potonganPerJenis[jenis],
    alasan,
    dokumenTambahan,
    perluKiriman: a.kirimanSetahun <= 0,
  };
}

function tidak(alasan: string): HasilAnggota {
  return {
    bisa: false,
    jenis: null,
    potongan: 0,
    alasan,
    dokumenTambahan: null,
    perluKiriman: false,
  };
}

export function cekTanggungan(a: AnggotaKeluarga): HasilAnggota {
  if (!a.penghasilanRendah) {
    return tidak(
      a.hubungan === "pasangan"
        ? "Penghasilan pasangan di atas ¥580.000 setahun. Mungkin masih bisa 配偶者特別控除; tanyakan ke perusahaan."
        : "Penghasilannya sendiri di atas ¥580.000 setahun.",
    );
  }
  if (a.hubungan === "pasangan") {
    return hasil("配偶者控除", "Pasangan tidak terkena batas umur.", a);
  }
  if (a.umur < 16) {
    return tidak(
      "Di bawah 16 tahun tidak mengurangi pajak penghasilan, tetapi tetap dicatat di 扶養控除等申告書 untuk 住民税.",
    );
  }
  if (a.umur >= 70) {
    return hasil("老人扶養", "Umur 70 tahun ke atas.", a);
  }
  if (a.umur < 30) {
    return a.umur >= 19 && a.umur <= 22
      ? hasil("特定扶養", "Umur 19–22 tahun.", a)
      : hasil("一般扶養", "Umur 16–29 tahun.", a);
  }
  // 30–69 tahun: hanya dengan salah satu pengecualian.
  if (a.pelajar) {
    return hasil(
      "一般扶養",
      "Umur 30–69 tetapi sedang belajar di luar negeri.",
      a,
      "留学ビザ等書類 (bukti status pelajar)",
    );
  }
  if (a.disabilitas) {
    return hasil(
      "一般扶養",
      "Umur 30–69 dengan disabilitas.",
      a,
      "Bukti disabilitas",
    );
  }
  if (a.kirimanSetahun >= kirimanMinimal30sd69) {
    return hasil(
      "一般扶養",
      "Umur 30–69 dan menerima kiriman ¥380.000 atau lebih setahun.",
      a,
      "38万円送金書類 (bukti total kiriman ≥ ¥380.000)",
    );
  }
  return tidak(
    `Umur 30–69 hanya bisa jika pelajar, disabilitas, atau menerima kiriman minimal ¥${kirimanMinimal30sd69.toLocaleString("id-ID")} setahun.`,
  );
}

// =============================================================================
// Cuti berbayar (年次有給休暇)
// =============================================================================

/** Hari cuti per masa kerja 0,5 · 1,5 · … · 6,5+ tahun (労働基準法 39条). */
const tabelPenuh = [10, 11, 12, 14, 16, 18, 20];
/** 比例付与: kerja < 30 jam/minggu dan ≤ 4 hari/minggu. Indeks = hari/minggu. */
const tabelProporsional: Record<number, number[]> = {
  4: [7, 8, 9, 10, 12, 13, 15],
  3: [5, 6, 6, 8, 9, 10, 11],
  2: [3, 4, 4, 5, 6, 6, 7],
  1: [1, 2, 2, 2, 3, 3, 3],
};

export type HasilCuti = {
  /** Hari cuti yang diberikan pada pemberian terakhir. */
  hari: number;
  /** Bulan kerja saat pemberian berikutnya. */
  pemberianBerikutBulan: number;
  /** Hari pada pemberian berikutnya. */
  hariBerikut: number;
  proporsional: boolean;
  /** Wajib dipakai minimal 5 hari setahun (年5日の時季指定義務). */
  wajib5Hari: boolean;
};

function hariUntuk(tahunKe: number, proporsional: boolean, hariPerMinggu: number) {
  const i = Math.min(tahunKe, 6);
  if (!proporsional) return tabelPenuh[i];
  return tabelProporsional[hariPerMinggu]?.[i] ?? 0;
}

export function hitungCuti({
  lamaBulan,
  hariPerMinggu,
  jamPerMinggu,
}: {
  lamaBulan: number;
  hariPerMinggu: number;
  jamPerMinggu: number;
}): HasilCuti {
  const proporsional = hariPerMinggu <= 4 && jamPerMinggu < 30;
  // Pemberian ke-0 di bulan 6, lalu setiap 12 bulan.
  const tahunKe = lamaBulan < 6 ? -1 : Math.floor((lamaBulan - 6) / 12);
  const hari = tahunKe < 0 ? 0 : hariUntuk(tahunKe, proporsional, hariPerMinggu);
  const berikut = tahunKe + 1;
  return {
    hari,
    pemberianBerikutBulan: 6 + berikut * 12,
    hariBerikut: hariUntuk(berikut, proporsional, hariPerMinggu),
    proporsional,
    wajib5Hari: hari >= 10,
  };
}
