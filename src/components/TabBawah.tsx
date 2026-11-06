"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ikon, type NamaIkon } from "./Ikon";

/** Menu utama. Di HP tampil sebagai tab bawah, di laptop sebagai menu atas. */
export const menuUtama: { href: string; label: string; ikon: NamaIkon }[] = [
  { href: "/", label: "Beranda", ikon: "beranda" },
  { href: "/kalkulator", label: "Kalkulator", ikon: "kalkulator" },
  { href: "/istilah", label: "Istilah", ikon: "buku" },
  { href: "/panduan", label: "Panduan", ikon: "kompas" },
  { href: "/lainnya", label: "Lainnya", ikon: "lainnya" },
];

/** Halaman yang masuk tab "Lainnya". */
const bagianLainnya = [
  "/lainnya",
  "/perjalanan",
  "/dukung",
  "/sponsor",
  "/tentang",
  "/privasi",
  "/coba",
  "/kuis",
];

export function aktif(pathname: string, href: string): boolean {
  const p = pathname.replace(/\/$/, "") || "/";
  if (href === "/") return p === "/";
  if (href === "/lainnya") return bagianLainnya.some((b) => p.startsWith(b));
  return p === href || p.startsWith(`${href}/`);
}

export function MenuAtas() {
  const pathname = usePathname();
  return (
    <nav aria-label="Menu utama" className="nav">
      {menuUtama.slice(1).map((m) => (
        <Link
          key={m.href}
          href={m.href}
          aria-current={aktif(pathname, m.href) ? "page" : undefined}
        >
          {m.label}
        </Link>
      ))}
    </nav>
  );
}

export function TabBawah() {
  const pathname = usePathname();
  return (
    <nav aria-label="Menu utama" className="tabbar">
      {menuUtama.map((m) => (
        <Link
          key={m.href}
          href={m.href}
          aria-current={aktif(pathname, m.href) ? "page" : undefined}
        >
          <span className="tabbar-ikon">
            <Ikon nama={m.ikon} />
          </span>
          {m.label}
        </Link>
      ))}
    </nav>
  );
}
