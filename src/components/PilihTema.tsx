"use client";

import { useLayoutEffect } from "react";
import { simpan, useSimpanan } from "@/lib/klien";

type Tema = "terang" | "gelap" | "hp";

const pilihan: { nilai: Tema; label: string }[] = [
  { nilai: "terang", label: "Terang" },
  { nilai: "gelap", label: "Gelap" },
  { nilai: "hp", label: "Ikuti HP" },
];

function pasang(tema: Tema) {
  const html = document.documentElement;
  if (tema === "terang") html.setAttribute("data-theme", "light");
  else if (tema === "gelap") html.setAttribute("data-theme", "dark");
  else html.removeAttribute("data-theme");
}

/** Tema situs; disimpan di browser ini saja (lihat skrip tema di layout). */
export function PilihTema() {
  const tersimpan = useSimpanan("tema");
  const tema: Tema =
    tersimpan === "terang" || tersimpan === "gelap" ? tersimpan : "hp";

  // Pasang lagi setelah React (mode dev) menghapus atribut dari skrip tema.
  useLayoutEffect(() => pasang(tema), [tema]);

  function pilih(t: Tema) {
    simpan("tema", t === "hp" ? null : t);
  }

  return (
    <div className="segmen" role="radiogroup" aria-label="Tema tampilan">
      {pilihan.map((p) => (
        <button
          key={p.nilai}
          type="button"
          role="radio"
          aria-checked={tema === p.nilai}
          onClick={() => pilih(p.nilai)}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
