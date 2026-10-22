import type { Metadata } from "next";
import { HalamanKalkulator } from "@/components/kalkulator/HalamanKalkulator";
import { KalkulatorLembur } from "@/components/kalkulator/KalkulatorLembur";
import { infoKalkulator } from "@/lib/kalkulator/daftar";

const info = infoKalkulator("lembur");

export const metadata: Metadata = {
  title: info.judul,
  description: info.deskripsi,
};

export default function Page() {
  return (
    <HalamanKalkulator slug="lembur">
      <KalkulatorLembur />
    </HalamanKalkulator>
  );
}
