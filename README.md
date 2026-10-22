# YenRapi — website

Situs publik aplikasi YenRapi: halaman utama, kalkulator, panduan istilah,
dukungan, dan [kebijakan privasi](https://debu-distric10.github.io/yenrapi-web/privasi.html).

- Next.js (App Router) + TypeScript, **ekspor statis** (`output: "export"`).
- Tanpa analitik, pelacak, atau font dari server lain. Kalkulator menghitung
  di browser.
- Terbit otomatis ke GitHub Pages lewat `.github/workflows/deploy.yml`.

```
npm install
npm run dev     # http://localhost:3000
npm run build   # hasil di out/
```
