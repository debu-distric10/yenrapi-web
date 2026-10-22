import type { Metadata } from "next";
import { HalamanKalkulator } from "@/components/kalkulator/HalamanKalkulator";
import { KalkulatorPajakPenduduk } from "@/components/kalkulator/KalkulatorLain";
import { infoKalkulator } from "@/lib/kalkulator/daftar";

const info = infoKalkulator("pajak-penduduk");

export const metadata: Metadata = {
  title: info.judul,
  description: info.deskripsi,
};

export default function Page() {
  return (
    <HalamanKalkulator slug="pajak-penduduk">
      <KalkulatorPajakPenduduk />
    </HalamanKalkulator>
  );
}
