import type { Metadata } from "next";
import { HalamanKalkulator } from "@/components/kalkulator/HalamanKalkulator";
import { KalkulatorCuti } from "@/components/kalkulator/KalkulatorTambahan";
import { infoKalkulator } from "@/lib/kalkulator/daftar";

const info = infoKalkulator("cuti");

export const metadata: Metadata = {
  title: info.judul,
  description: info.deskripsi,
};

export default function Page() {
  return (
    <HalamanKalkulator slug="cuti">
      <KalkulatorCuti />
    </HalamanKalkulator>
  );
}
