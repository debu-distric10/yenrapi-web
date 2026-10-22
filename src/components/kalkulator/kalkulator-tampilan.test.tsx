// @vitest-environment jsdom
/**
 * Tampilan kalkulator memakai rumus yang sudah diuji, dan angkanya terlihat.
 */
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { calculateDeductions, bulanKe } from "@/lib/kalkulator/hitung";
import { formatYen } from "./Bidang";
import { KalkulatorGaji } from "./KalkulatorGaji";
import { KalkulatorKurs, KalkulatorNenkin } from "./KalkulatorLain";

afterEach(cleanup);

function barisHasil(label: string): string {
  const row = screen.getByText(label).closest("div")!;
  return within(row).getAllByText(/¥/).at(-1)!.textContent!;
}

describe("Kalkulator Gaji", () => {
  it("gaji pokok ¥250,000 di Tokyo, umur 30", async () => {
    const user = userEvent.setup();
    render(<KalkulatorGaji />);
    await user.type(screen.getByLabelText("Gaji pokok (基本給)"), "250000");
    expect(
      (screen.getByLabelText("Gaji pokok (基本給)") as HTMLInputElement).value,
    ).toBe("250,000");

    const now = new Date();
    const expected = calculateDeductions({
      grossPay: 250000,
      healthRate: 9850,
      age: 30,
      payMonth: bulanKe(now.getFullYear(), now.getMonth() + 1),
    });
    expect(barisHasil("Perkiraan gaji bersih (手取り)")).toBe(
      formatYen(expected.takeHome),
    );
  });

  it("tunjangan transport tidak kena pajak", async () => {
    const user = userEvent.setup();
    render(<KalkulatorGaji />);
    await user.type(screen.getByLabelText("Gaji pokok (基本給)"), "250000");
    const pajakTanpa = barisHasil("所得税 (pajak bulanan)");
    await user.type(
      screen.getByLabelText("Tunjangan transport (通勤手当)"),
      "10000",
    );
    // Gaji kotor naik, tetapi pajak tidak ikut naik karena transport.
    expect(barisHasil("Gaji kotor (総支給額)")).toBe("¥260,000");
    expect(barisHasil("所得税 (pajak bulanan)")).toBe(pajakTanpa);
  });
});

describe("Kurs", () => {
  it("¥50,000 dengan kurs 107.25 = Rp5.362.500", async () => {
    const user = userEvent.setup();
    render(<KalkulatorKurs />);
    await user.type(screen.getByLabelText("Kurs (1 Yen = … Rupiah)"), "107.25");
    await user.type(screen.getByLabelText("Yen"), "50000");
    expect((screen.getByLabelText("Rupiah") as HTMLInputElement).value).toBe(
      "5,362,500",
    );
    expect(screen.getByText(/Rp5\.362\.500 diterima/)).toBeTruthy();
  });
});

describe("Nenkin", () => {
  it("kurang dari 6 bulan belum bisa diklaim", async () => {
    const user = userEvent.setup();
    render(<KalkulatorNenkin />);
    await user.type(screen.getByLabelText("Rata-rata 標準報酬額"), "250000");
    await user.selectOptions(screen.getByLabelText("Lama ikut 厚生年金"), "5");
    expect(screen.getByText(/minimal 6 bulan/)).toBeTruthy();
  });
});
