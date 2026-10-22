import type { Metadata } from "next";
import { HalamanKalkulator } from "@/components/kalkulator/HalamanKalkulator";
import { KalkulatorPotongan } from "@/components/kalkulator/KalkulatorGaji";
import { infoKalkulator } from "@/lib/kalkulator/daftar";

const info = infoKalkulator("pajak");

export const metadata: Metadata = {
  title: info.judul,
  description: info.deskripsi,
};

export default function Page() {
  return (
    <HalamanKalkulator slug="pajak">
      <KalkulatorPotongan />
    </HalamanKalkulator>
  );
}
