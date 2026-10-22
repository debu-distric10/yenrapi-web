import type { NextConfig } from "next";

// Situs statis (tanpa server) untuk GitHub Pages. BASE_PATH diisi saat build
// di GitHub Actions ("/yenrapi-web"); kosong untuk `npm run dev` dan untuk
// domain sendiri nanti.
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.BASE_PATH ?? "",
  env: { BASE_PATH: process.env.BASE_PATH ?? "" },
  // /privasi -> out/privasi.html, jadi alamat lama .../privasi.html tetap.
  trailingSlash: false,
  images: { unoptimized: true },
};

export default nextConfig;
