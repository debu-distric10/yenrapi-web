import type { Metadata } from "next";
import Link from "next/link";
import { Ikon, Onigiri, type NamaIkon } from "@/components/Ikon";
import { PilihTema } from "@/components/PilihTema";
import { situs } from "@/lib/situs";

export const metadata: Metadata = {
  title: "Lainnya",
  description:
    "Perjalanan aplikasi YenRapi, tentang pembuatnya, kebijakan privasi, sponsor, dan pilihan tema situs.",
};

const daftar: { href: string; ikon: NamaIkon; judul: string; isi: string }[] = [
  {
    href: "/coba",
    ikon: "hp",
    judul: "Coba aplikasinya",
    isi: "Ikut uji tertutup di Android",
  },
  {
    href: "/perjalanan",
    ikon: "grafik",
    judul: "Perjalanan aplikasi",
    isi: "Apa yang baru di tiap versi",
  },
  {
    href: "/kuis",
    ikon: "slip",
    judul: "Kuis slip gaji",
    isi: "3 soal, sekitar 1 menit",
  },
  {
    href: "/tentang",
    ikon: "orang",
    judul: "Tentang & peran AI",
    isi: "Siapa pembuatnya, jujur soal AI",
  },
  {
    href: "/privasi",
    ikon: "perisai",
    judul: "Kebijakan privasi",
    isi: "Data apa yang disimpan (hampir tidak ada)",
  },
  {
    href: "/sponsor",
    ikon: "gedung",
    judul: "Jadi sponsor",
    isi: "Untuk usaha yang melayani orang Indonesia",
  },
];

export default function LainnyaPage() {
  return (
    <div className="wrap page sempit">
      <h1>Lainnya</h1>

      <Link href="/dukung" className="kartu-onigiri">
        <Onigiri ukuran={52} />
        <span>
          <strong>Traktir onigiri</strong>
          <small>Tidak wajib. Semua fitur tetap gratis.</small>
        </span>
        <Ikon nama="kanan" ukuran={18} />
      </Link>

      <nav className="menu-daftar" aria-label="Halaman lainnya">
        {daftar.map((d) => (
          <Link key={d.href} href={d.href}>
            <span className="menu-ikon">
              <Ikon nama={d.ikon} ukuran={22} />
            </span>
            <span className="menu-teks">
              <strong>{d.judul}</strong>
              <small>{d.isi}</small>
            </span>
            <Ikon nama="kanan" ukuran={18} />
          </Link>
        ))}
        <a href={`mailto:${situs.email}`}>
          <span className="menu-ikon">
            <Ikon nama="surat" ukuran={22} />
          </span>
          <span className="menu-teks">
            <strong>Kirim saran</strong>
            <small>{situs.email}</small>
          </span>
          <Ikon nama="kanan" ukuran={18} />
        </a>
      </nav>

      <section className="card tema">
        <strong>Tampilan</strong>
        <PilihTema />
        <small className="muted">
          Sama seperti di aplikasi. Mode gelap enak dipakai setelah shift malam.
        </small>
      </section>
    </div>
  );
}
