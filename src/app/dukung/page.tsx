import type { Metadata } from "next";
import { pendukung } from "@/lib/pendukung";
import { situs } from "@/lib/situs";

export const metadata: Metadata = {
  title: "Dukung YenRapi",
  description:
    "YenRapi gratis dan tanpa iklan. Kalau aplikasinya membantu, kamu bisa mentraktir onigiri pengembangnya.",
};

export default function DukungPage() {
  return (
    <div className="wrap page prose">
      <h1>Dukung YenRapi 🍙</h1>
      <p>
        YenRapi dibuat oleh satu orang pekerja Indonesia di Jepang, untuk teman
        senasib. Aplikasinya <strong>gratis</strong>, <strong>tanpa iklan</strong>,
        dan <strong>tidak menjual data</strong> — datamu bahkan tidak pernah
        keluar dari HP.
      </p>
      <p>
        Kalau YenRapi membantumu mengatur gaji, kiriman, atau tabungan, kamu bisa
        mentraktir onigiri. Sama sekali tidak wajib: semua fitur tetap gratis untuk
        semua orang.
      </p>

      <article>
        <h2 style={{ marginTop: 0 }}>Traktir lewat Trakteer</h2>
        <p className="muted">
          Bisa bayar dengan QRIS, e-wallet (GoPay, OVO, DANA, ShopeePay), atau
          transfer bank Indonesia.
        </p>
        {situs.trakteer ? (
          <a className="btn btn-accent" href={situs.trakteer} rel="noopener">
            Traktir onigiri di Trakteer
          </a>
        ) : (
          <span className="btn btn-accent" aria-disabled="true">
            Segera hadir
          </span>
        )}
      </article>

      <section id="pendukung">
        <h2>Pendukung YenRapi 🙏</h2>
        <p className="muted">
          Terima kasih kepada semua yang sudah mentraktir. Mau namamu ada di
          sini? Ambil reward &ldquo;Nama di Dinding Terima Kasih&rdquo; di
          Trakteer.
        </p>
        {pendukung.length > 0 ? (
          <ul>
            {pendukung.map((p) => (
              <li key={`${p.nama}-${p.tanggal}`}>{p.nama}</li>
            ))}
          </ul>
        ) : (
          <p>Belum ada nama di sini. Jadilah pendukung pertama YenRapi!</p>
        )}
      </section>

      <h2>Dukungan lain yang juga berarti</h2>
      <ul>
        <li>Ceritakan YenRapi ke teman kerja atau grup komunitas.</li>
        <li>Beri ulasan di Google Play setelah aplikasinya tayang.</li>
        <li>
          Kirim saran atau laporan masalah ke{" "}
          <a href={`mailto:${situs.email}`}>{situs.email}</a>.
        </li>
      </ul>
    </div>
  );
}
