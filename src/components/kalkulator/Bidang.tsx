"use client";

import { useId, type ReactNode } from "react";
import { aturan2026, prefekturBawaan } from "@/lib/kalkulator/aturan2026";
import { parseRate } from "@/lib/kalkulator/hitung";
export { jamKeMenit } from "@/lib/kalkulator/hitung";
import styles from "./kalkulator.module.css";

/** "1,234,567" → 1234567; kosong/tidak valid → null. */
export function bacaAngka(text: string): number | null {
  const digits = text.replace(/[^\d]/g, "");
  if (digits === "") return null;
  return Number(digits.slice(0, 12));
}

const formatter = new Intl.NumberFormat("en-US");

export function formatYen(value: number): string {
  return `${value < 0 ? "-" : ""}¥${formatter.format(Math.abs(value))}`;
}

export function formatRupiah(value: number): string {
  return `Rp${new Intl.NumberFormat("id-ID").format(value)}`;
}

/** Kolom angka yen dengan pemisah ribuan otomatis. */
export function BidangYen({
  label,
  value,
  onChange,
  helper,
  prefix = "¥",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helper?: ReactNode;
  prefix?: string;
}) {
  const id = useId();
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.inputWrap}>
        <span className={styles.prefix}>{prefix}</span>
        <input
          id={id}
          inputMode="numeric"
          autoComplete="off"
          value={value}
          onChange={(e) => {
            const n = bacaAngka(e.target.value);
            onChange(n === null ? "" : formatter.format(n));
          }}
        />
      </div>
      {helper && <p className={styles.helper}>{helper}</p>}
    </div>
  );
}

/** Kolom angka biasa (umur, jam, bulan). */
export function BidangAngka({
  label,
  value,
  onChange,
  helper,
  suffix,
  desimal = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helper?: ReactNode;
  suffix?: string;
  desimal?: boolean;
}) {
  const id = useId();
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.inputWrap}>
        <input
          id={id}
          inputMode={desimal ? "decimal" : "numeric"}
          autoComplete="off"
          value={value}
          onChange={(e) =>
            onChange(
              e.target.value.replace(desimal ? /[^\d.,:]/g : /[^\d]/g, ""),
            )
          }
        />
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
      {helper && <p className={styles.helper}>{helper}</p>}
    </div>
  );
}

export function Pilihan<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  const id = useId();
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={String(value)}
        onChange={(e) => {
          const found = options.find((o) => String(o.value) === e.target.value);
          if (found) onChange(found.value);
        }}
      >
        {options.map((o) => (
          <option key={String(o.value)} value={String(o.value)}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Saklar({
  label,
  checked,
  onChange,
  helper,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  helper?: string;
}) {
  return (
    <label className={styles.toggle}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>
        {label}
        {helper && <small>{helper}</small>}
      </span>
    </label>
  );
}

export const pilihanTanggungan = Array.from({ length: 8 }, (_, i) => ({
  value: i,
  label: `${i} orang`,
}));

const MANUAL = "manual";

/** Asuransi kesehatan: prefektur 協会けんぽ atau tarif manual (組合). */
export function PilihAsuransi({
  pilihan,
  manual,
  onChange,
}: {
  pilihan: string;
  manual: string;
  onChange: (pilihan: string, manual: string) => void;
}) {
  const id = useId();
  return (
    <div className={styles.field}>
      <label htmlFor={id}>Asuransi kesehatan (健康保険)</label>
      <select
        id={id}
        value={pilihan}
        onChange={(e) => onChange(e.target.value, manual)}
      >
        {Object.entries(aturan2026.healthRateByPrefecture).map(([p, rate]) => (
          <option key={p} value={p}>
            協会けんぽ {p} · {persen(rate)}
          </option>
        ))}
        <option value={MANUAL}>Tarif manual (健康保険組合)</option>
      </select>
      {pilihan === MANUAL && (
        <div className={styles.inputWrap} style={{ marginTop: 8 }}>
          <input
            aria-label="Tarif 健康保険 total dalam persen"
            inputMode="decimal"
            placeholder="mis. 9.5"
            value={manual}
            onChange={(e) => onChange(pilihan, e.target.value)}
          />
          <span className={styles.suffix}>%</span>
        </div>
      )}
    </div>
  );
}

/** Tarif (0,001%) dari pilihan asuransi, atau null jika belum valid. */
export function tarifAsuransi(pilihan: string, manual: string): number | null {
  if (pilihan !== MANUAL) return aturan2026.healthRateByPrefecture[pilihan];
  const micros = parseRate(manual);
  if (micros === null || micros >= 30 * 1000000) return null;
  return Math.trunc(micros / 1000);
}

export const asuransiBawaan = prefekturBawaan;

/** 9850 → "9.85%". */
export function persen(rate: number): string {
  const whole = Math.trunc(rate / 1000);
  const fraction = String(rate % 1000)
    .padStart(3, "0")
    .replace(/0+$/, "");
  return fraction ? `${whole}.${fraction}%` : `${whole}%`;
}

/** Satu baris hasil. */
export function Baris({
  label,
  nilai,
  catatan,
  kurang = false,
  tebal = false,
}: {
  label: ReactNode;
  nilai: number;
  catatan?: string;
  kurang?: boolean;
  tebal?: boolean;
}) {
  return (
    <div className={`${styles.row} ${tebal ? styles.rowBold : ""}`}>
      <span>
        {label}
        {catatan && <small>{catatan}</small>}
      </span>
      <span className={styles.amount}>
        {kurang && nilai > 0 ? "-" : ""}
        {formatYen(nilai)}
      </span>
    </div>
  );
}

export function KartuHasil({ children }: { children: ReactNode }) {
  return (
    <div className={styles.result} aria-live="polite">
      {children}
    </div>
  );
}

export function Garis() {
  return <hr className={styles.divider} />;
}

export function CatatanPerkiraan({ butir }: { butir: ReactNode[] }) {
  return (
    <div className={styles.estimate}>
      <strong>ⓘ Perkiraan</strong>
      <ul>
        {butir.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

/** Bulan ini sebagai bulanKe(...), dihitung di browser. */
export function bulanIni(): number {
  const d = new Date();
  return d.getFullYear() * 12 + d.getMonth();
}
