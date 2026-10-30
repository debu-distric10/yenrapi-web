import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { situs } from "@/lib/situs";
import "./globals.css";

// Huruf disimpan di situs sendiri (bukan Google Fonts): pengunjung tidak
// dihubungkan ke server lain.
const jakarta = localFont({
  src: [
    { path: "../fonts/PlusJakartaSans-Regular.ttf", weight: "400" },
    { path: "../fonts/PlusJakartaSans-SemiBold.ttf", weight: "600" },
    { path: "../fonts/PlusJakartaSans-ExtraBold.ttf", weight: "800" },
  ],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: {
    default: `${situs.nama} — ${situs.slogan}`,
    template: `%s · ${situs.nama}`,
  },
  description:
    "Aplikasi keuangan gratis untuk orang Indonesia di Jepang: slip gaji, " +
    "kiriman ke Indonesia, tabungan Yen & Rupiah, kalkulator gaji & pajak. " +
    "Data terenkripsi, hanya di HP.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body>
        <header className="top">
          <div className="wrap top-inner">
            <Link className="brand" href="/">
              <Logo />
              <span>{situs.nama}</span>
            </Link>
            <nav aria-label="Menu utama" className="nav">
              <Link href="/kalkulator">Kalkulator</Link>
              <Link href="/istilah">Istilah</Link>
              <Link href="/perjalanan">Perjalanan</Link>
              <Link href="/dukung">Dukung</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="foot">
          <div className="wrap foot-inner">
            <span>© 2026 {situs.nama}</span>
            <Link href="/privasi">Kebijakan Privasi</Link>
            <Link href="/tentang">Tentang &amp; AI</Link>
            <Link href="/sponsor">Jadi Sponsor</Link>
            <a href={`mailto:${situs.email}`}>{situs.email}</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
