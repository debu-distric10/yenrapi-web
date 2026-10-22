import type { Metadata } from "next";
import { HalamanKalkulator } from "@/components/kalkulator/HalamanKalkulator";
import { KalkulatorNenkin } from "@/components/kalkulator/KalkulatorLain";
import { infoKalkulator } from "@/lib/kalkulator/daftar";

const info = infoKalkulator("nenkin");

export const metadata: Metadata = {
  title: info.judul,
  description: info.deskripsi,
};

export default function Page() {
  return (
    <HalamanKalkulator slug="nenkin">
      <KalkulatorNenkin />
    </HalamanKalkulator>
  );
}
