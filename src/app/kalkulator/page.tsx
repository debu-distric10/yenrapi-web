import type { Metadata } from "next";

export const metadata: Metadata = { title: "Kalkulator" };

export default function KalkulatorPage() {
  return (
    <div className="wrap page prose">
      <h1>Kalkulator</h1>
      <p className="muted">Segera hadir.</p>
    </div>
  );
}
