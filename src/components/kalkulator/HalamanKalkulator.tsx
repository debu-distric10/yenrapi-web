import Link from "next/link";
import type { ReactNode } from "react";
import { infoKalkulator, type SlugKalkulator } from "@/lib/kalkulator/daftar";

/** Kerangka halaman satu kalkulator. */
export function HalamanKalkulator({
  slug,
  children,
}: {
  slug: SlugKalkulator;
  children: ReactNode;
}) {
  const info = infoKalkulator(slug);
  return (
    <div className="wrap page calc">
      <Link className="crumb" href="/kalkulator">
        ← Semua kalkulator
      </Link>
      <h1>{info.judul}</h1>
      <p className="muted" style={{ marginTop: 0 }}>
        {info.deskripsi}
      </p>
      {children}
    </div>
  );
}
