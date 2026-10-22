/**
 * Hasil kalkulator web harus SAMA dengan aplikasi. Contoh angka dibuat dari
 * rumus aplikasi oleh YenRapi/tool/export_calculator_cases_test.dart.
 */
import { describe, expect, it } from "vitest";
import kasus from "./kasus-aplikasi.json";
import { aturan2026 } from "./aturan2026";
import {
  bulanKe,
  calculateBonus,
  calculateDeductions,
  calculateLumpSum,
  calculateOvertime,
  calculateResidentTax,
  estimateIdr,
  estimateYen,
  hourlyFromMonthly,
  jamKeMenit,
  monthlyIncomeTax2026,
  nationalPensionLumpSum,
  parseRate,
} from "./hitung";

describe("sama dengan aplikasi", () => {
  it("versi aturan sama", () => {
    expect(aturan2026.label).toBe(kasus.rulesLabel);
  });

  it(`lembur (${kasus.overtime.length} contoh)`, () => {
    for (const { input, expected } of kasus.overtime) {
      expect(calculateOvertime(input), JSON.stringify(input)).toEqual(expected);
    }
  });

  it(`upah per jam (${kasus.hourly.length} contoh)`, () => {
    for (const c of kasus.hourly) {
      expect(hourlyFromMonthly(c.monthlyBase, c.scheduledMinutesPerMonth)).toBe(
        c.expected,
      );
    }
  });

  it(`potongan gaji (${kasus.deductions.length} contoh)`, () => {
    for (const { input, expected } of kasus.deductions) {
      const r = calculateDeductions({
        ...input,
        payMonth: bulanKe(input.payYear, input.payMonth),
      });
      const actual = Object.fromEntries(
        Object.keys(expected).map((k) => [k, r[k as keyof typeof r]]),
      );
      expect(actual, JSON.stringify(input)).toEqual(expected);
    }
  });

  it(`pajak bulanan (${kasus.incomeTax.length} contoh)`, () => {
    for (const c of kasus.incomeTax) {
      expect(monthlyIncomeTax2026(c.afterInsurance, c.dependents)).toBe(
        c.expected,
      );
    }
  });

  it(`bonus (${kasus.bonus.length} contoh)`, () => {
    for (const { input, expected } of kasus.bonus) {
      const r = calculateBonus({
        ...input,
        payMonth: bulanKe(input.payYear, input.payMonth),
      });
      const actual = Object.fromEntries(
        Object.keys(expected).map((k) => [k, r[k as keyof typeof r]]),
      );
      expect(actual, JSON.stringify(input)).toEqual(expected);
    }
  });

  it(`脱退一時金 (${kasus.lumpSum.length} contoh)`, () => {
    for (const c of kasus.lumpSum) {
      const r = calculateLumpSum(c.averageStandardPay, c.months);
      expect(
        r && { rateTenths: r.rateTenths, gross: r.gross, tax: r.tax },
      ).toEqual(c.expected);
      expect(nationalPensionLumpSum(c.months)).toBe(c.national);
    }
  });

  it(`住民税 (${kasus.residentTax.length} contoh)`, () => {
    for (const { input, expected } of kasus.residentTax) {
      expect(calculateResidentTax(input), JSON.stringify(input)).toEqual(
        expected,
      );
    }
  });

  it("kurs", () => {
    for (const c of kasus.parseRate) {
      expect(parseRate(c.text), c.text).toBe(c.expected);
    }
    for (const c of kasus.conversions) {
      expect(estimateIdr(c.yen, c.rateMicros)).toBe(c.expectedIdr);
      expect(estimateYen(c.idr, c.rateMicros)).toBe(c.expectedYen);
    }
  });

  it("isian jam", () => {
    for (const c of kasus.hours) {
      expect(jamKeMenit(c.text), c.text).toBe(c.expected);
    }
  });
});
