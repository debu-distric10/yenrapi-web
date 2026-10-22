import type { Metadata } from "next";
import { CariIstilah } from "@/components/istilah/CariIstilah";
import data from "@/lib/istilah.json";

export const metadata: Metadata = {
  title: "Istilah Jepang di slip gaji & administrasi",
  description:
    "Arti istilah Jepang yang sering ditemui pekerja Indonesia: 給与明細, 手取り (tedori), 控除 (kōjo), 厚生年金, 住民税, 在留カード, dan lainnya — dijelaskan dalam bahasa Indonesia.",
};

export default function IstilahPage() {
  return (
    <div className="wrap page">
      <h1>Istilah Jepang</h1>
      <p className="muted">
        {data.terms.length} istilah yang sering ditemui di slip gaji, pajak,
        asuransi, dan administrasi — sama dengan panduan di aplikasi YenRapi.
      </p>
      <CariIstilah />
    </div>
  );
}
