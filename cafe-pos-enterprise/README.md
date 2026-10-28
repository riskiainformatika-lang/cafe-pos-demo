# ☕ Smart POS & Self-Order System (Enterprise Edition)

Platform digital terintegrasi untuk kafe, resto, dan *coffee shop*. Didesain untuk memukau calon klien bahwa sistem berpenampilan modern ini bisa mereka miliki tanpa biaya langganan bulanan.

---

## 🚀 Fitur Unggulan untuk Ditunjukkan ke Calon Klien

1. **Self-Order via Meja (Scan QR Meja):**
   Pelanggan duduk di kafe, memilih menu, mengatur varian (suhu dingin/panas, level gula, catatan barista), dan bayar di tempat.
2. **Payment Gateway Non-Tunai (Anti-Penipuan & Tanpa COD):**
   Mendukung QRIS instan dan transfer bank dengan upload bukti transfer langsung di website.
3. **Akun Member & Poin Loyalitas:**
   Pelanggan bisa mendaftar akun untuk mengumpulkan poin setiap transaksi.
4. **Kitchen Display System (KDS / Layar Dapur):**
   Staf dapur dan barista memantau pesanan masuk secara *real-time* di `admin.html` lengkap dengan sinyal audio notifikasi.
5. **Cetak Struk Thermal 58mm / 80mm:**
   Struk kasir siap dicetak langsung ke printer kasir bluetooth/USB.

---

## 🛠️ Cara Setup Firebase Gratis (Opsional untuk Multi-Perangkat Nyata)

Jika ingin dihubungkan antar-HP dan laptop yang berbeda jaringan:
1. Buka [console.firebase.google.com](https://console.firebase.google.com/) (Gratis).
2. Buat proyek baru $\rightarrow$ Buat **Firestore Database** (Mode Test).
3. Buat **Authentication** $\rightarrow$ Aktifkan penyedia **Email/Password**.
4. Salin objek `firebaseConfig` ke dalam file `js/firebase-config.js`.

*(Jika langkah ini dilewati, sistem tetap berjalan otomatis dalam mode lokal multi-tab browser).*

---

## 🌐 Deploy Gratis ke Internet dalam 1 Menit

1. Buka [vercel.com](https://vercel.com) atau [app.netlify.com/drop](https://app.netlify.com/drop).
2. Unggah seluruh isi folder proyek ini.
3. Website langsung aktif dengan domain `https://nama-kafe.vercel.app` dan sertifikat SSL HTTPS gratis.