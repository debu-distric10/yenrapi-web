/**
 * Rumus kalkulator — SALINAN dari aplikasi:
 *   payroll_calculator.dart, bonus_pension_resident_2026.dart,
 *   remittance_models.dart (kurs).
 * Semua uang dalam yen/rupiah bulat. `idiv` meniru `~/` Dart (bagi lalu
 * buang pecahan ke arah nol).
 */
import { aturan2026 as R } from "./aturan2026";

export const idiv = (a: number, b: number): number => Math.trunc(a / b);

/** Bulan sebagai angka: tahun*12 + (bulan-1). */
export const bulanKe = (year: number, month: number) => year * 12 + month - 1;

// =============================================================================
// Lembur dan gaji per jam
// =============================================================================

export type OvertimeRates = {
  overtime: number;
  overtimeOver60: number;
  lateNight: number;
  holiday: number;
};

export const defaultOvertimeRates: OvertimeRates = {
  overtime: R.overtimePercent,
  overtimeOver60: R.overtimeOver60Percent,
  lateNight: R.lateNightPercent,
  holiday: R.holidayPercent,
};

export function belowLegalMinimum(r: OvertimeRates): boolean {
  return (
    r.overtime < R.overtimePercent ||
    r.overtimeOver60 < R.overtimeOver60Percent ||
    r.lateNight < R.lateNightPercent ||
    r.holiday < R.holidayPercent
  );
}

export type OvertimePay = {
  overtimeUpTo60: number;
  overtimeOver60: number;
  holiday: number;
  lateNightPremium: number;
  total: number;
};

/** Pembulatan ke yen terdekat (0,5 ke atas). */
const roundHalfUp = (num: number, den: number) => idiv(num * 2 + den, den * 2);

export function calculateOvertime({
  hourlyWage,
  overtimeMinutes = 0,
  holidayMinutes = 0,
  lateNightMinutes = 0,
  rates = defaultOvertimeRates,
}: {
  hourlyWage: number;
  overtimeMinutes?: number;
  holidayMinutes?: number;
  lateNightMinutes?: number;
  rates?: OvertimeRates;
}): OvertimePay {
  const limit = 60 * 60;
  const upTo60 = overtimeMinutes < limit ? overtimeMinutes : limit;
  const over60 = overtimeMinutes - upTo60;
  const pay = (minutes: number, percent: number) =>
    roundHalfUp(hourlyWage * minutes * percent, 60 * 100);
  const r = {
    overtimeUpTo60: pay(upTo60, 100 + rates.overtime),
    overtimeOver60: pay(over60, 100 + rates.overtimeOver60),
    holiday: pay(holidayMinutes, 100 + rates.holiday),
    lateNightPremium: pay(lateNightMinutes, rates.lateNight),
  };
  return {
    ...r,
    total: r.overtimeUpTo60 + r.overtimeOver60 + r.holiday + r.lateNightPremium,
  };
}

export function hourlyFromMonthly(
  monthlyBase: number,
  scheduledMinutesPerMonth: number,
): number {
  return roundHalfUp(monthlyBase * 60, scheduledMinutesPerMonth);
}

/** Gaji bulanan dari upah per jam (sama dengan Kalkulator Gaji aplikasi). */
export function monthlyFromHourly(
  wage: number,
  minutesPerDay: number,
  days: number,
): number {
  return idiv(wage * minutesPerDay * days * 2 + 60, 120);
}

// =============================================================================
// Potongan gaji
// =============================================================================

export type DeductionInput = {
  grossPay: number;
  nonTaxableCommute?: number;
  healthRate: number;
  age: number;
  /** bulanKe(tahun, bulan) gaji. */
  payMonth: number;
  dependents?: number;
  employmentInsurance?: boolean;
};

export type DeductionResult = {
  grossPay: number;
  standardHealth: number;
  standardPension: number;
  health: number;
  care: number;
  childSupport: number;
  pension: number;
  employment: number;
  incomeTax: number;
  socialInsurance: number;
  totalDeductions: number;
  takeHome: number;
};

export function standardHealthFor(pay: number): number {
  let standard: number = R.healthGrades[0][0];
  for (const [value, lowerBound] of R.healthGrades) {
    if (pay >= lowerBound) standard = value;
  }
  return standard;
}

export function standardPensionFor(pay: number): number {
  const s = standardHealthFor(pay);
  if (s < R.pensionMinStandard) return R.pensionMinStandard;
  if (s > R.pensionMaxStandard) return R.pensionMaxStandard;
  return s;
}

/** Separuh bagian pekerja; pecahan ≤ 0,50 yen dibuang, > 0,50 naik. */
export function employeeHalf(base: number, rate: number): number {
  const numerator = base * rate;
  const denominator = 100000 * 2;
  const whole = idiv(numerator, denominator);
  const remainder = numerator % denominator;
  return remainder * 2 > denominator ? whole + 1 : whole;
}

export function employmentInsuranceFor(
  pay: number,
  rate: number = R.employmentInsuranceRate,
): number {
  const numerator = pay * rate;
  const denominator = 100000;
  const whole = idiv(numerator, denominator);
  const remainder = numerator % denominator;
  return remainder * 2 > denominator ? whole + 1 : whole;
}

/** Pajak bulanan 月額表 甲欄 (電算機計算の特例 令和8年分). */
export function monthlyIncomeTax2026(
  afterInsurance: number,
  dependents = 0,
): number {
  const a = afterInsurance;
  if (a <= 0) return 0;
  const ceilPercent = (value: number, percent: number) =>
    idiv(value * percent + 99, 100);
  const employmentDeduction =
    a <= 158333
      ? 54167
      : a <= 299999
        ? ceilPercent(a, 30) + 6667
        : a <= 549999
          ? ceilPercent(a, 20) + 36667
          : a <= 708330
            ? ceilPercent(a, 10) + 91667
            : 162500;
  const basicDeduction =
    a <= 2120833
      ? 48334
      : a <= 2162499
        ? 40000
        : a <= 2204166
          ? 26667
          : a <= 2245833
            ? 13334
            : 0;
  const dependentDeduction = R.dependentDeduction * dependents;
  const b = a - employmentDeduction - basicDeduction - dependentDeduction;
  if (b <= 0) return 0;
  const [rate, subtract] =
    b <= 162500
      ? [5105, 0]
      : b <= 275000
        ? [10210, 8296]
        : b <= 579166
          ? [20420, 36374]
          : b <= 750000
            ? [23483, 54113]
            : b <= 1500000
              ? [33693, 130688]
              : b <= 3333333
                ? [40840, 237893]
                : [45945, 408061];
  const taxTimes100k = b * rate - subtract * 100000;
  if (taxTimes100k <= 0) return 0;
  return idiv(taxTimes100k + 500000, 1000000) * 10;
}

export function calculateDeductions(input: DeductionInput): DeductionResult {
  const {
    grossPay,
    nonTaxableCommute = 0,
    healthRate,
    age,
    payMonth,
    dependents = 0,
    employmentInsurance = true,
  } = input;
  const standardHealth = standardHealthFor(grossPay);
  const standardPension = standardPensionFor(grossPay);
  const withCare = age >= 40 && age < 65;
  const withChildSupport = payMonth >= R.childSupportFromMonth;

  const healthAndCare = employeeHalf(
    standardHealth,
    healthRate + (withCare ? R.careRate : 0),
  );
  const healthOnly = employeeHalf(standardHealth, healthRate);
  const care = withCare ? healthAndCare - healthOnly : 0;
  const childSupport = withChildSupport
    ? employeeHalf(standardHealth, R.childSupportRate)
    : 0;
  const pension = employeeHalf(standardPension, R.pensionRate);
  const employment = employmentInsurance ? employmentInsuranceFor(grossPay) : 0;

  const insurance = healthAndCare + childSupport + pension + employment;
  const taxable = grossPay - nonTaxableCommute - insurance;
  const incomeTax = monthlyIncomeTax2026(taxable, dependents);

  const socialInsurance = healthOnly + care + childSupport + pension + employment;
  const totalDeductions = socialInsurance + incomeTax;
  return {
    grossPay,
    standardHealth,
    standardPension,
    health: healthOnly,
    care,
    childSupport,
    pension,
    employment,
    incomeTax,
    socialInsurance,
    totalDeductions,
    takeHome: grossPay - totalDeductions,
  };
}

// =============================================================================
// Bonus (賞与)
// =============================================================================

export const bonusHealthYearlyCap = 5730000;
export const bonusPensionCap = 1500000;

const bonusTaxRates = [
  0, 2042, 4084, 6126, 8168, 10210, 12252, 14294, 16336, 18378, 20420, 22462,
  24504, 26546, 28588, 30630, 32672, 35735, 38798, 41861, 45945,
];

const bonusTaxBounds: number[][] = [
  [0, 82, 94, 260, 309, 342, 372, 402, 433, 520, 605, 684, 715, 752, 795, 854, 922, 1318, 1521, 2621, 3495],
  [0, 107, 250, 289, 346, 373, 401, 430, 463, 520, 621, 705, 739, 778, 821, 882, 952, 1342, 1526, 2645, 3527],
  [0, 143, 276, 321, 377, 400, 426, 457, 492, 525, 636, 728, 764, 804, 848, 910, 983, 1367, 1526, 2669, 3559],
  [0, 181, 300, 354, 405, 424, 452, 484, 517, 550, 651, 751, 788, 830, 876, 938, 1013, 1391, 1538, 2693, 3590],
  [0, 218, 300, 387, 431, 452, 477, 509, 540, 577, 666, 774, 813, 856, 903, 966, 1044, 1416, 1555, 2716, 3622],
  [0, 251, 304, 412, 457, 479, 503, 531, 564, 604, 681, 798, 838, 881, 930, 994, 1074, 1440, 1555, 2740, 3654],
  [0, 284, 343, 438, 483, 505, 527, 553, 589, 630, 697, 821, 862, 907, 957, 1022, 1104, 1464, 1555, 2764, 3685],
  [0, 317, 383, 463, 508, 529, 552, 578, 614, 657, 708, 845, 887, 933, 985, 1051, 1135, 1489, 1583, 2788, 3717],
];

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(Math.max(v, lo), hi);

export function bonusTaxRate(
  previousMonthAfterInsurance: number,
  dependents = 0,
): number {
  const bounds = bonusTaxBounds[clamp(dependents, 0, 7)];
  let index = 0;
  for (let i = 0; i < bounds.length; i++) {
    if (previousMonthAfterInsurance >= bounds[i] * 1000) index = i;
  }
  return bonusTaxRates[index];
}

export type BonusResult = {
  bonus: number;
  standardBonus: number;
  health: number;
  care: number;
  childSupport: number;
  pension: number;
  employment: number;
  taxRate: number | null;
  incomeTax: number | null;
  socialInsurance: number;
  takeHome: number;
};

export function calculateBonus({
  bonus,
  previousMonthAfterInsurance,
  healthRate,
  age,
  payMonth,
  dependents = 0,
  bonusSoFarThisYear = 0,
  employmentInsurance = true,
}: {
  bonus: number;
  previousMonthAfterInsurance: number;
  healthRate: number;
  age: number;
  payMonth: number;
  dependents?: number;
  bonusSoFarThisYear?: number;
  employmentInsurance?: boolean;
}): BonusResult {
  const standard = idiv(bonus, 1000) * 1000;
  const healthRoom = bonusHealthYearlyCap - bonusSoFarThisYear;
  const healthBase = clamp(standard, 0, healthRoom < 0 ? 0 : healthRoom);
  const pensionBase = standard < bonusPensionCap ? standard : bonusPensionCap;
  const withCare = age >= 40 && age < 65;
  const withChildSupport = payMonth >= R.childSupportFromMonth;

  const healthAndCare = employeeHalf(
    healthBase,
    healthRate + (withCare ? R.careRate : 0),
  );
  const healthOnly = employeeHalf(healthBase, healthRate);
  const childSupport = withChildSupport
    ? employeeHalf(healthBase, R.childSupportRate)
    : 0;
  const pension = employeeHalf(pensionBase, R.pensionRate);
  const employment = employmentInsurance ? employmentInsuranceFor(bonus) : 0;
  const insurance = healthAndCare + childSupport + pension + employment;

  const afterInsurance = bonus - insurance;
  const tableApplies =
    previousMonthAfterInsurance > 0 &&
    afterInsurance <= previousMonthAfterInsurance * 10;
  const taxRate = tableApplies
    ? bonusTaxRate(previousMonthAfterInsurance, dependents)
    : null;
  const incomeTax =
    taxRate === null
      ? null
      : afterInsurance <= 0
        ? 0
        : idiv(afterInsurance * taxRate, 100000);

  const care = withCare ? healthAndCare - healthOnly : 0;
  const socialInsurance = healthOnly + care + childSupport + pension + employment;
  return {
    bonus,
    standardBonus: standard,
    health: healthOnly,
    care,
    childSupport,
    pension,
    employment,
    taxRate,
    incomeTax,
    socialInsurance,
    takeHome: bonus - socialInsurance - (incomeTax ?? 0),
  };
}

// =============================================================================
// 脱退一時金
// =============================================================================

export function lumpSumRateTenths(months: number): number | null {
  if (months < 6) return null;
  const capped = months > 60 ? 60 : months;
  const bucket = idiv(capped, 6) * 6;
  return idiv(9150 * bucket + 5000, 10000);
}

export const lumpSumTaxRate = 20420;
export const nationalPensionLumpSumStep = 53760;

export type LumpSumResult = {
  rateTenths: number;
  gross: number;
  tax: number;
  net: number;
};

export function calculateLumpSum(
  averageStandardPay: number,
  months: number,
): LumpSumResult | null {
  const rate = lumpSumRateTenths(months);
  if (rate === null) return null;
  const gross = idiv(averageStandardPay * rate, 10);
  const tax = idiv(gross * lumpSumTaxRate, 100000);
  return { rateTenths: rate, gross, tax, net: gross - tax };
}

export function nationalPensionLumpSum(months: number): number {
  if (months < 6) return 0;
  const capped = months > 60 ? 60 : months;
  return idiv(capped, 6) * nationalPensionLumpSumStep;
}

// =============================================================================
// 住民税 (令和8年度)
// =============================================================================

export function residentSalaryIncome(salary: number): number {
  if (salary < 651000) return 0;
  if (salary < 1900000) return salary - 650000;
  const rounded = idiv(salary, 4000) * 4000;
  if (salary < 3600000) return idiv(rounded * 7, 10) - 80000;
  if (salary < 6600000) return idiv(rounded * 8, 10) - 440000;
  if (salary < 8500000) return idiv(salary * 9, 10) - 1100000;
  return salary - 1950000;
}

export type ResidentTaxResult = {
  income: number;
  taxableIncome: number;
  incomeLevy: number;
  perCapita: number;
  annual: number;
  monthly: number;
};

export function calculateResidentTax({
  lastYearSalary,
  lastYearSocialInsurance,
  hasSpouse = false,
  dependents = 0,
  specificDependents = 0,
  perCapita = 5000,
}: {
  lastYearSalary: number;
  lastYearSocialInsurance: number;
  hasSpouse?: boolean;
  dependents?: number;
  specificDependents?: number;
  perCapita?: number;
}): ResidentTaxResult {
  const income = residentSalaryIncome(lastYearSalary);
  const people = (hasSpouse ? 1 : 0) + dependents + specificDependents;

  const incomeLevyFree =
    income <= (people === 0 ? 450000 : 350000 * (people + 1) + 100000 + 320000);
  const perCapitaFree =
    income <= (people === 0 ? 450000 : 350000 * (people + 1) + 100000 + 210000);

  const deductions =
    430000 +
    lastYearSocialInsurance +
    (hasSpouse ? 330000 : 0) +
    330000 * dependents +
    450000 * specificDependents;
  const rawTaxable = income - deductions;
  const taxable = rawTaxable <= 0 ? 0 : idiv(rawTaxable, 1000) * 1000;

  let levy = 0;
  if (!incomeLevyFree && taxable > 0) {
    const difference =
      50000 +
      (hasSpouse ? 50000 : 0) +
      50000 * dependents +
      180000 * specificDependents;
    let adjustment: number;
    if (taxable <= 2000000) {
      adjustment = idiv((difference < taxable ? difference : taxable) * 5, 100);
    } else {
      const base = idiv((difference - (taxable - 2000000)) * 5, 100);
      adjustment = base < 2500 ? 2500 : base;
    }
    const value = idiv(taxable * 10, 100) - adjustment;
    levy = value <= 0 ? 0 : idiv(value, 100) * 100;
  }

  const pc = perCapitaFree ? 0 : perCapita;
  const annual = levy + pc;
  return {
    income,
    taxableIncome: taxable,
    incomeLevy: levy,
    perCapita: pc,
    annual,
    monthly: idiv(annual, 12),
  };
}

// =============================================================================
// Kurs Yen ⇄ Rupiah
// =============================================================================

export const rateScale = 1000000;

/** "107,25" / "107.25" → 107250000 (×1.000.000), atau null. */
export function parseRate(text: string): number | null {
  let t = text.trim().replaceAll(" ", "");
  if (t === "") return null;
  if (t.includes(",") && !t.includes(".")) t = t.replaceAll(",", ".");
  const m = /^(\d{1,6})(?:\.(\d{1,6}))?$/.exec(t);
  if (!m) return null;
  const micros = Number(m[1]) * rateScale + Number((m[2] ?? "").padEnd(6, "0"));
  return micros > 0 ? micros : null;
}

export function estimateIdr(amountYen: number, rateMicros: number): number {
  return idiv(amountYen * rateMicros + idiv(rateScale, 2), rateScale);
}

export function estimateYen(amountIdr: number, rateMicros: number): number {
  return idiv(amountIdr * rateScale + idiv(rateMicros, 2), rateMicros);
}

// =============================================================================
// Isian jam (calculator_widgets.dart parseHoursToMinutes)
// =============================================================================

/** "8", "7.5", "7,25", "7:30" → menit; kosong → 0; tidak valid → null. */
export function jamKeMenit(text: string): number | null {
  const t = text.trim();
  if (t === "") return 0;
  const clock = /^(\d{1,3}):([0-5]\d)$/.exec(t);
  if (clock) return Number(clock[1]) * 60 + Number(clock[2]);
  const decimal = /^(\d{1,3})(?:[.,](\d{1,2}))?$/.exec(t);
  if (!decimal) return null;
  const hours = Number(decimal[1]);
  if (decimal[2] === undefined) return hours * 60;
  const scaled = Number(decimal[2].padEnd(2, "0"));
  return hours * 60 + idiv(scaled * 60 + 50, 100);
}
