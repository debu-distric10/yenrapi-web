import type { Metadata } from "next";
import Link from "next/link";
import { daftarPanduan } from "@/lib/panduan";

export const metadata: Metadata = {
  title: "Panduan",
  description:
    "Panduan praktis keuangan untuk orang Indonesia di Jepang: kirim uang, gaji, pajak, dan persiapan pulang.",
};

export default function PanduanPage() {
  return (
    <div className="wrap page prose">
      <h1>Panduan 📚</h1>
      <p>
        Panduan singkat untuk urusan uang sehari-hari di Jepang, ditulis oleh
        sesama pekerja Indonesia.
      </p>
      <div className="stack">
        {daftarPanduan.map((p) => (
          <article key={p.slug} style={{ marginBottom: 0 }}>
            <h2 style={{ marginTop: 0 }}>
              {p.ikon} <Link href={`/panduan/${p.slug}`}>{p.judul}</Link>
            </h2>
            <p>{p.ringkas}</p>
            <p className="meta" style={{ marginBottom: 0 }}>
              Diperbarui {p.diperbarui}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
