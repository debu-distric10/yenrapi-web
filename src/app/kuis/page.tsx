import type { Metadata } from "next";
import { Kuis } from "@/components/kuis/Kuis";

export const metadata: Metadata = {
  title: "Kuis: bisa baca slip gajimu?",
  description:
    "3 soal singkat tentang istilah di slip gaji Jepang: 差引支給額, 厚生年金, dan 住民税. Tanpa daftar, tidak ada yang disimpan.",
};

export default function KuisPage() {
  return (
    <div className="wrap page sempit">
      <h1>Bisa baca slip gajimu?</h1>
      <Kuis />
      <p className="muted" style={{ fontSize: 13, textAlign: "center" }}>
        Tidak ada yang disimpan atau dikirim. Cuma untuk seru-seruan.
      </p>
    </div>
  );
}
