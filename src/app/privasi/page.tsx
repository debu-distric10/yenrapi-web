import type { Metadata } from "next";
import { situs } from "@/lib/situs";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan privasi aplikasi YenRapi: semua data keuangan disimpan " +
    "terenkripsi hanya di HP pengguna. Internet hanya untuk mengambil kurs.",
};

/** Alamat tetap: /privasi.html (dipakai di Google Play). */
export default function PrivasiPage() {
  return (
    <div className="wrap page">
      <div className="prose">
      <article id="id">
        <h1>Kebijakan Privasi</h1>
        <p className="meta">Diperbarui 12 November 2026 (versi 2.0.0) · Berlaku sejak 22 Oktober 2026 · Aplikasi YenRapi untuk Android</p>

        <div className="note">
          <strong>Singkatnya:</strong> semua data keuanganmu disimpan <strong>terenkripsi hanya di HP-mu</strong>.
          Internet hanya dipakai untuk mengambil angka kurs ¥ → Rp, dan itu bisa dimatikan. Tidak ada akun,
          iklan, atau alat analitik. Kami (pengembang) <strong>tidak bisa melihat</strong> datamu.
        </div>

        <h2>1. Siapa kami</h2>
        <p>YenRapi dibuat oleh pengembang perorangan untuk membantu orang Indonesia yang tinggal di Jepang
        mengelola keuangan. Kontak: <a href={`mailto:${situs.email}`}>{situs.email}</a>.</p>

        <h2>2. Data yang kamu masukkan</h2>
        <p>Data yang kamu catat di aplikasi — misalnya transaksi, saldo rekening, slip gaji, anggaran, target,
        utang, kiriman uang, tagihan, aset, dan foto dokumen — disimpan di penyimpanan internal HP-mu dalam
        database yang <strong>dienkripsi</strong>. Kunci enkripsinya disimpan di penyimpanan aman Android
        (Android Keystore). Data ini tidak dikirim ke pengembang atau ke pihak lain.</p>

        <h2>3. Internet hanya untuk kurs, tanpa akun, tanpa pelacakan</h2>
        <ul>
          <li>Mulai versi 2.0.0, YenRapi memakai internet untuk <strong>satu hal saja</strong>: mengambil kurs
          pasar ¥ → Rp. Versi sebelumnya tidak meminta izin internet sama sekali.</li>
          <li>Saat aplikasi dibuka dan kurs tersimpan sudah lebih dari 6 jam, aplikasi meminta angka kurs ke
          layanan kurs publik: <a href="https://frankfurter.dev" rel="noopener">Frankfurter</a> (kurs acuan
          Bank Sentral Eropa), dengan <a href="https://www.exchangerate-api.com" rel="noopener">ExchangeRate-API</a>{" "}
          sebagai cadangan. Permintaan itu <strong>tidak berisi</strong> data keuanganmu, nama, atau ID
          perangkat. Seperti koneksi internet pada umumnya, layanan tersebut dapat melihat alamat IP HP-mu;
          YenRapi tidak menerima atau menyimpan alamat itu.</li>
          <li>Kamu bisa mematikannya di <strong>Pengaturan → Kurs otomatis</strong>. Setelah dimatikan,
          aplikasi tidak menghubungi internet dan memakai kurs dari kiriman terakhirmu atau kurs perkiraan.</li>
          <li>Tidak ada pendaftaran atau login.</li>
          <li>Tidak ada iklan, tidak ada analitik, dan tidak ada pelacakan.</li>
          <li>Kami tidak menjual atau membagikan data kepada siapa pun.</li>
        </ul>

        <h2>4. Kamera dan foto</h2>
        <p>Kamera atau galeri hanya dibuka saat kamu memilihnya, misalnya untuk memotret slip gaji, bukti
        kiriman, atau dokumen. Pembacaan teks dari foto dilakukan <strong>di HP</strong> menggunakan
        Google ML Kit versi di-perangkat; gambar tidak dikirim ke server. Foto hanya disimpan jika kamu
        memilih menyimpannya, dan disimpan terenkripsi.</p>

        <h2>5. Kunci aplikasi dan sidik jari</h2>
        <p>Jika kamu menyalakan kunci aplikasi, pemeriksaan sidik jari, wajah, atau PIN dilakukan oleh sistem
        Android. YenRapi hanya menerima hasil “berhasil” atau “gagal”; data biometrik tidak pernah diterima
        atau disimpan oleh aplikasi.</p>

        <h2>6. Pengingat</h2>
        <p>Pengingat tagihan dan dokumen adalah notifikasi lokal yang dijadwalkan di HP-mu. Pengingat mati
        secara bawaan dan bisa dinyalakan atau dimatikan di Pengaturan.</p>

        <h2>7. File backup</h2>
        <p>File backup hanya dibuat jika kamu memintanya. File itu dienkripsi dengan password yang kamu
        pilih (password tidak disimpan oleh aplikasi) dan disimpan di tempat yang kamu pilih. Jika kamu
        menyimpannya di layanan penyimpanan lain (misalnya Google Drive), file tersebut tunduk pada
        kebijakan layanan itu, tetapi isinya tetap terenkripsi.</p>

        <h2>8. Menghapus data</h2>
        <ul>
          <li>Buka <strong>Pengaturan → Hapus semua data</strong> untuk menghapus semua data dan foto dari HP.</li>
          <li>Menghapus (uninstall) aplikasi juga menghapus semua datanya dari HP.</li>
          <li>File backup yang kamu simpan sendiri tidak ikut terhapus; hapus file itu secara manual jika
          tidak diperlukan.</li>
        </ul>
        <p>Karena kami tidak menyimpan datamu, kami tidak dapat memulihkan data yang sudah dihapus atau
        password backup yang terlupa.</p>

        <h2>9. Anak-anak</h2>
        <p>YenRapi tidak ditujukan untuk anak di bawah 13 tahun.</p>

        <h2>10. Perubahan kebijakan</h2>
        <p>Jika nanti ada fitur lain yang menggunakan internet (misalnya sinkronisasi cloud opsional), fitur
        itu akan bersifat pilihan, dan kebijakan ini akan diperbarui <strong>sebelum</strong> fitur tersebut
        dirilis, seperti yang dilakukan untuk kurs otomatis di versi 2.0.0. Tanggal di bagian atas halaman ini menunjukkan versi terbaru.</p>

        <h2>11. Kontak</h2>
        <p>Pertanyaan tentang privasi: <a href={`mailto:${situs.email}`}>{situs.email}</a>.</p>

        {situs.goatcounter && (
          <>
            <h2>12. Website</h2>
            <p>Kebijakan di atas berlaku untuk aplikasi. Website ini memakai{" "}
            <a href="https://www.goatcounter.com" rel="noopener">GoatCounter</a> untuk menghitung jumlah
            pengunjung per halaman. GoatCounter tidak memakai cookie, tidak menyimpan alamat IP, dan tidak
            mengikuti kamu ke situs lain. Yang tercatat hanya halaman yang dibuka, situs asal, jenis
            browser, ukuran layar, dan negara. Angka ini dipakai untuk menunjukkan jangkauan YenRapi kepada
            calon sponsor. Aplikasi YenRapi tidak terhubung dengan penghitung ini.</p>
          </>
        )}
      </article>

      <hr />

      <article id="en" lang="en">
        <h1>Privacy Policy</h1>
        <p className="meta">Updated November 12, 2026 (version 2.0.0) · Effective October 22, 2026 · YenRapi for Android</p>

        <div className="note">
          <strong>In short:</strong> all your financial data is stored <strong>encrypted, only on your
          phone</strong>. The internet is used only to fetch the ¥ → Rp exchange rate, and you can turn that
          off. No accounts, no ads, no analytics.
          We (the developer) <strong>cannot see</strong> your data.
        </div>

        <h2>1. Who we are</h2>
        <p>YenRapi is made by an individual developer to help Indonesians living in Japan manage their money.
        Contact: <a href={`mailto:${situs.email}`}>{situs.email}</a>.</p>

        <h2>2. Data you enter</h2>
        <p>Everything you record in the app — such as transactions, account balances, payslips, budgets,
        goals, debts, remittances, bills, assets and document photos — is stored in your phone’s internal
        storage in an <strong>encrypted</strong> database. The encryption key is kept in Android’s secure
        storage (Android Keystore). This data is not sent to the developer or to anyone else.</p>

        <h2>3. Internet only for exchange rates, no accounts, no tracking</h2>
        <ul>
          <li>Starting with version 2.0.0, YenRapi uses the internet for <strong>one thing only</strong>:
          fetching the market ¥ → Rp exchange rate. Earlier versions did not request internet access at all.</li>
          <li>When the app is opened and the saved rate is more than 6 hours old, it asks a public exchange-rate
          service for the rate: <a href="https://frankfurter.dev" rel="noopener">Frankfurter</a> (European
          Central Bank reference rates), with <a href="https://www.exchangerate-api.com" rel="noopener">ExchangeRate-API</a>{" "}
          as a fallback. The request <strong>contains none</strong> of your financial data, name or device ID.
          As with any internet connection, the service can see your phone&rsquo;s IP address; YenRapi does not
          receive or store it.</li>
          <li>You can turn this off in <strong>Settings → Automatic rate</strong> (Pengaturan → Kurs otomatis).
          When it is off, the app does not connect to the internet and uses the rate from your last remittance
          or an estimated rate.</li>
          <li>No sign-up or login.</li>
          <li>No ads, no analytics, no tracking.</li>
          <li>We do not sell or share data with anyone.</li>
        </ul>

        <h2>4. Camera and photos</h2>
        <p>The camera or gallery opens only when you choose to, for example to photograph a payslip, a
        remittance receipt or a document. Text recognition runs <strong>on the device</strong> using the
        on-device version of Google ML Kit; images are not sent to any server. Photos are kept only if you
        choose to save them, and are stored encrypted.</p>

        <h2>5. App lock and biometrics</h2>
        <p>If you turn on the app lock, fingerprint, face or PIN checks are performed by Android. YenRapi only
        receives a “success” or “failure” result; biometric data is never received or stored by the app.</p>

        <h2>6. Reminders</h2>
        <p>Bill and document reminders are local notifications scheduled on your phone. They are off by
        default and can be turned on or off in Settings.</p>

        <h2>7. Backup files</h2>
        <p>A backup file is created only when you ask for one. It is encrypted with a password you choose (the
        app does not store the password) and saved wherever you choose. If you keep it in another storage
        service (such as Google Drive), that service’s policy applies to the file, but its contents remain
        encrypted.</p>

        <h2>8. Deleting your data</h2>
        <ul>
          <li>Open <strong>Settings → Delete all data</strong> (Pengaturan → Hapus semua data) to erase all
          data and photos from the phone.</li>
          <li>Uninstalling the app also removes all of its data from the phone.</li>
          <li>Backup files you saved yourself are not deleted automatically; delete them manually if no
          longer needed.</li>
        </ul>
        <p>Because we do not store your data, we cannot recover deleted data or a forgotten backup
        password.</p>

        <h2>9. Children</h2>
        <p>YenRapi is not directed to children under 13.</p>

        <h2>10. Changes</h2>
        <p>If another feature that uses the internet is added later (for example optional cloud sync), it
        will be optional, and this policy will be updated <strong>before</strong> that feature is released,
        as was done for automatic exchange rates in version 2.0.0. The date
        at the top of this page shows the latest version.</p>

        <h2>11. Contact</h2>
        <p>Privacy questions: <a href={`mailto:${situs.email}`}>{situs.email}</a>.</p>

        {situs.goatcounter && (
          <>
            <h2>12. Website</h2>
            <p>The policy above covers the app. This website uses{" "}
            <a href="https://www.goatcounter.com" rel="noopener">GoatCounter</a> to count visitors per
            page. GoatCounter sets no cookies, does not store IP addresses, and does not follow you to other
            sites. It records only the page viewed, the referring site, browser type, screen size, and
            country. These numbers show YenRapi&rsquo;s reach to potential sponsors. The YenRapi app is not
            connected to this counter.</p>
          </>
        )}
      </article>
      </div>
    </div>
  );
}
