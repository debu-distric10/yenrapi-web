import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import Script from "next/script";
import { Logo } from "@/components/Logo";
import { MenuAtas, TabBawah } from "@/components/TabBawah";
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f0" },
    { media: "(prefers-color-scheme: dark)", color: "#121722" },
  ],
};

/**
 * Tema pilihan pengunjung (Terang/Gelap) dipasang sebelum halaman tampil
 * agar tidak berkedip. Tanpa pilihan, situs mengikuti tema HP.
 */
const skripTema = `(function(){try{var t=localStorage.getItem("tema");if(t==="terang")document.documentElement.setAttribute("data-theme","light");else if(t==="gelap")document.documentElement.setAttribute("data-theme","dark")}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={jakarta.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: skripTema }} />
      </head>
      <body>
        <header className="top">
          <div className="wrap top-inner">
            <Link className="brand" href="/">
              <Logo size={34} />
              <span>{situs.nama}</span>
            </Link>
            <MenuAtas />
            <Link
              className="top-coba"
              href={situs.playStore ?? "/coba"}
            >
              {situs.playStore ? "Pasang app" : "Coba app"}
            </Link>
          </div>
        </header>
        <main>{children}</main>
        <footer className="foot">
          <div className="wrap foot-inner">
            <span>© 2026 {situs.nama} · Pelan-pelan, yang penting rapi.</span>
            <Link href="/perjalanan">Perjalanan</Link>
            <Link href="/dukung">Dukung</Link>
            <Link href="/privasi">Kebijakan Privasi</Link>
            <Link href="/tentang">Tentang &amp; AI</Link>
            <Link href="/sponsor">Jadi Sponsor</Link>
            <a href={`mailto:${situs.email}`}>{situs.email}</a>
          </div>
        </footer>
        <TabBawah />
        {situs.goatcounter && (
          // Penghitung pengunjung tanpa cookie; lihat bagian Website di /privasi.
          <Script
            data-goatcounter={`https://${situs.goatcounter}.goatcounter.com/count`}
            src="https://gc.zgo.at/count.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
