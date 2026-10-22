import type { Metadata } from "next";
import { HalamanKalkulator } from "@/components/kalkulator/HalamanKalkulator";
import { KalkulatorGaji } from "@/components/kalkulator/KalkulatorGaji";
import { infoKalkulator } from "@/lib/kalkulator/daftar";

const info = infoKalkulator("gaji");

export const metadata: Metadata = {
  title: info.judul,
  description: info.deskripsi,
};

export default function Page() {
  return (
    <HalamanKalkulator slug="gaji">
      <KalkulatorGaji />
    </HalamanKalkulator>
  );
}
