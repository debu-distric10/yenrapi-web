import { describe, expect, it } from "vitest";
import data from "@/lib/istilah.json";
import { cocok } from "./CariIstilah";

const find = (q: string) =>
  data.terms.filter((t) => cocok(t, q)).map((t) => t.japanese);

describe("cari istilah", () => {
  it("sama dengan tes aplikasi: 手取り, TEDORI, gaji bersih", () => {
    expect(find("手取り")).toContain("手取り");
    expect(find("TEDORI")).toContain("手取り");
    expect(find("gaji bersih")).toContain("手取り");
  });

  it("tanpa tanda panjang tetap ketemu (kyuyo → 給与明細)", () => {
    expect(find("kyuyo meisai")).toContain("給与明細");
  });

  it("kosong menampilkan semua", () => {
    expect(find("")).toHaveLength(data.terms.length);
  });
});
