import type { Metadata } from "next";
import Link from "next/link";
import { aturanSponsor, paketSponsor, sponsorDitolak } from "@/lib/sponsor";
import { situs } from "@/lib/situs";

export const metadata: Metadata = {
  title: "Jadi Sponsor",
  description:
    "Kenalkan layanan Anda kepada orang Indonesia yang bekerja di Jepang lewat website YenRapi, tanpa iklan di aplikasi dan tanpa pelacakan.",
};

const subjek = encodeURIComponent("Sponsor YenRapi");

export default function SponsorPage() {
  return (
    <div className="wrap page prose">
      <h1>Jadi Sponsor YenRapi 🤝</h1>
      <p>
        YenRapi membantu orang Indonesia yang bekerja di Jepang mengatur gaji,
        kiriman ke keluarga, dan tabungan. Kalau layanan Anda berguna untuk
        mereka, Anda bisa ikut mendukung YenRapi dan dikenal oleh pembaca yang
        tepat.
      </p>

      <h2>Siapa pembacanya</h2>
      <ul>
        <li>Pekerja Indonesia di Jepang: 技能実習, 特定技能, pekerja pabrik, perawat, dan pelajar yang bekerja paruh waktu.</li>
        <li>Mengurus gaji dalam Yen dan mengirim uang rutin ke keluarga dalam Rupiah.</li>
        <li>Mencari jawaban soal potongan gaji, pajak, nenkin, dan persiapan pulang.</li>
      </ul>
      <p className="muted">
        Jumlah unduhan dan pengunjung terbaru kami kirim lewat email saat Anda
        menghubungi kami.
      </p>

      <h2>Pilihan sponsor</h2>
      <div className="stack">
        {paketSponsor.map((p) => (
          <article key={p.nama} style={{ marginBottom: 0 }}>
            <h3 style={{ marginTop: 0 }}>
              {p.ikon} {p.nama}
            </h3>
            <p>{p.isi}</p>
            <p className="meta" style={{ marginBottom: 0 }}>
              {p.tempat}
            </p>
          </article>
        ))}
      </div>

      <h2>Aturan main</h2>
      <ul>
        {aturanSponsor.map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>

      <h2>Yang tidak kami terima</h2>
      <p>
        Demi pengguna, kami menolak sponsor dari bidang berikut:{" "}
        {sponsorDitolak.join(", ")}.
      </p>

      <article style={{ marginTop: 28 }}>
        <h2 style={{ marginTop: 0 }}>Hubungi kami</h2>
        <p className="muted">
          Ceritakan singkat layanan Anda dan paket yang diminati. Harga dan angka
          pengguna kami kirim lewat balasan email. Alamat: {situs.email}.
        </p>
        <a
          className="btn btn-accent"
          href={`mailto:${situs.email}?subject=${subjek}`}
        >
          Kirim email
        </a>
      </article>

      <p className="muted">
        Ingin mendukung secara pribadi? Lihat halaman{" "}
        <Link href="/dukung">Dukung YenRapi</Link>.
      </p>
    </div>
  );
}
