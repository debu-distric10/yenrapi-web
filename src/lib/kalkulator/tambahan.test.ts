import { describe, expect, it } from "vitest";
import { cekTanggungan, hitungCuti, type AnggotaKeluarga } from "./tambahan";

const dasar: AnggotaKeluarga = {
  hubungan: "orangtua",
  umur: 55,
  pelajar: false,
  disabilitas: false,
  kirimanSetahun: 0,
  penghasilanRendah: true,
};

describe("tanggungan di luar negeri", () => {
  it("orang tua 30–69 tanpa pengecualian tidak bisa", () => {
    expect(cekTanggungan({ ...dasar, kirimanSetahun: 379999 }).bisa).toBe(false);
  });

  it("orang tua 30–69 dengan kiriman ≥ ¥380.000 bisa", () => {
    const r = cekTanggungan({ ...dasar, kirimanSetahun: 380000 });
    expect(r).toMatchObject({ bisa: true, jenis: "一般扶養", potongan: 380000 });
    expect(r.dokumenTambahan).toContain("38万円");
  });

  it("orang tua 70+ menjadi 老人扶養", () => {
    expect(cekTanggungan({ ...dasar, umur: 70, kirimanSetahun: 100000 })).toMatchObject({
      jenis: "老人扶養",
      potongan: 480000,
      perluKiriman: false,
    });
  });

  it("anak 19–22 menjadi 特定扶養, di bawah 16 tidak", () => {
    expect(cekTanggungan({ ...dasar, hubungan: "anak", umur: 20 }).jenis).toBe("特定扶養");
    expect(cekTanggungan({ ...dasar, hubungan: "anak", umur: 15 }).bisa).toBe(false);
    expect(cekTanggungan({ ...dasar, hubungan: "anak", umur: 16 }).jenis).toBe("一般扶養");
  });

  it("pasangan tidak terkena batas umur, tapi perlu bukti kiriman", () => {
    expect(cekTanggungan({ ...dasar, hubungan: "pasangan", umur: 45 })).toMatchObject({
      bisa: true,
      jenis: "配偶者控除",
      perluKiriman: true,
    });
  });

  it("penghasilan sendiri terlalu besar tidak bisa", () => {
    expect(cekTanggungan({ ...dasar, umur: 20, penghasilanRendah: false }).bisa).toBe(false);
  });
});

describe("cuti berbayar", () => {
  const penuh = { hariPerMinggu: 5, jamPerMinggu: 40 };

  it("belum 6 bulan belum dapat cuti", () => {
    expect(hitungCuti({ lamaBulan: 5, ...penuh })).toMatchObject({
      hari: 0,
      pemberianBerikutBulan: 6,
      hariBerikut: 10,
    });
  });

  it("tabel penuh", () => {
    expect(hitungCuti({ lamaBulan: 6, ...penuh }).hari).toBe(10);
    expect(hitungCuti({ lamaBulan: 18, ...penuh }).hari).toBe(11);
    expect(hitungCuti({ lamaBulan: 42, ...penuh }).hari).toBe(14);
    expect(hitungCuti({ lamaBulan: 120, ...penuh })).toMatchObject({
      hari: 20,
      hariBerikut: 20,
      wajib5Hari: true,
    });
  });

  it("paruh waktu 4 hari/minggu memakai tabel proporsional", () => {
    expect(hitungCuti({ lamaBulan: 6, hariPerMinggu: 4, jamPerMinggu: 24 })).toMatchObject({
      hari: 7,
      proporsional: true,
      wajib5Hari: false,
    });
    expect(hitungCuti({ lamaBulan: 30, hariPerMinggu: 4, jamPerMinggu: 32 }).hari).toBe(12);
  });
});
