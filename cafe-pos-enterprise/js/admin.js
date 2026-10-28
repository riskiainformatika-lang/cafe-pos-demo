let STORE_CONFIG = JSON.parse(localStorage.getItem("CAFE_CONFIG")) || {
  name: "Titik Temu Coffee",
  hours: "08:00 - 22:00 WIB",
  isOpen: true,
  adminPin: "123456",
  qrisUrl: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=00020101021126570014ID.LINKAJA.WWW01189360091100000000005204581253033605802ID5914TITIK%20TEMU%20COFFEE6007BANDUNG61051234062070703A016304ABCD",
  bankName: "BCA (Bank Central Asia)",
  bankNumber: "8415-2910-29",
  bankHolder: "Titik Temu Coffee"
};

let PRODUCTS = JSON.parse(localStorage.getItem("CAFE_PRODUCTS")) || [];
let ORDERS = JSON.parse(localStorage.getItem("CAFE_ORDERS")) || [];

const formatRupiah = (n) => "Rp" + Number(n).toLocaleString("id-ID");

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  updateLiveClock();
  setInterval(updateLiveClock, 1000);
  checkAdminSession();
});

function updateLiveClock() {
  const now = new Date();
  document.getElementById("live-clock").innerText = now.toLocaleDateString("id-ID", { weekday: 'long', hour: '2-digit', minute: '2-digit' }) + " WIB";
}

function checkAdminSession() {
  const isAuth = sessionStorage.getItem("IS_ADMIN_LOGGED_IN");
  if (isAuth === "true") {
    showDashboard();
  } else {
    document.getElementById("admin-lock-screen").classList.remove("hidden");
    document.getElementById("admin-main-screen").classList.add("hidden");
  }
}

window.verifyAdminPin = function() {
  const inputPin = document.getElementById("inp-admin-pin").value.trim();
  if (inputPin === STORE_CONFIG.adminPin) {
    sessionStorage.setItem("IS_ADMIN_LOGGED_IN", "true");
    showDashboard();
  } else {
    alert("PIN Kasir Salah! (Gunakan 123456 untuk demo)");
  }
};

window.logoutAdmin = function() {
  sessionStorage.removeItem("IS_ADMIN_LOGGED_IN");
  location.reload();
};

function showDashboard() {
  document.getElementById("admin-lock-screen").classList.add("hidden");
  document.getElementById("admin-main-screen").classList.remove("hidden");
  renderKDS();
  renderAdminProducts();
  loadSettings();
  setupPolling();
}

function setupPolling() {
  setInterval(() => {
    const fresh = JSON.parse(localStorage.getItem("CAFE_ORDERS")) || [];
    if (fresh.length > ORDERS.length) {
      playBeep();
      ORDERS = fresh;
      renderKDS();
    }
  }, 2000);
}

function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    osc.connect(ctx.destination);
    osc.frequency.setValueAtTime(659.25, ctx.currentTime);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (e) {}
}

window.switchTab = function(t) {
  ["orders", "menus", "settings"].forEach(tab => {
    document.getElementById(`view-tab-${tab}`).classList.toggle("hidden", tab !== t);
    document.getElementById(`tab-${tab}`).className = tab === t 
      ? "px-4 py-2 font-black text-xs bg-amber-500 text-slate-950 rounded-xl"
      : "px-4 py-2 font-bold text-xs bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700";
  });
};

function renderKDS() {
  document.getElementById("kds-stat-active").innerText = `${ORDERS.filter(o => o.status !== 'Selesai').length} Pesanan`;
  const totalOmzet = ORDERS.reduce((s, o) => s + (o.grandTotal || 0), 0);
  document.getElementById("kds-stat-omzet").innerText = formatRupiah(totalOmzet);

  const container = document.getElementById("kds-orders-container");
  if (ORDERS.length === 0) {
    container.innerHTML = `<div class="col-span-full py-16 text-center text-slate-500 text-xs">Belum ada pesanan aktif. Coba pesan dari tab index.html.</div>`;
    return;
  }

  container.innerHTML = ORDERS.map((o, idx) => `
    <div class="bg-slate-950 border ${o.status === 'Selesai' ? 'border-slate-800 opacity-60' : 'border-amber-500/40'} rounded-2xl p-4 flex flex-col justify-between shadow-xl space-y-3">
      <div>
        <div class="flex justify-between items-center border-b border-slate-800 pb-2">
          <div>
            <span class="font-mono font-black text-amber-400 text-sm">#${o.orderId}</span>
            <span class="text-[10px] text-slate-400 block">${o.timestamp} WIB</span>
          </div>
          <span class="bg-slate-800 text-amber-300 font-extrabold px-2.5 py-1 rounded-lg text-xs">${o.serviceLocation}</span>
        </div>

        <div class="pt-2 text-xs space-y-1">
          <p class="font-bold text-white">${o.name}</p>
          <p class="text-[11px] text-slate-400">WA: <a href="https://wa.me/${o.phone}" target="_blank" class="text-emerald-400 underline font-bold">${o.phone}</a></p>
          <p class="text-[11px] text-slate-400">Email: ${o.email || '-'}</p>
          <div class="py-2 divide-y divide-slate-800/60">
            ${o.items.map(it => `
              <div class="py-1 flex justify-between">
                <div>
                  <span class="font-bold text-white">${it.name}</span>
                  <p class="text-[10px] text-slate-400">${it.temp !== '-' ? it.temp : ''} ${it.notes ? '• ' + it.notes : ''}</p>
                </div>
                <strong class="text-amber-400 font-black">${it.qty}x</strong>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <div class="pt-2 border-t border-slate-800 space-y-2">
        <div class="flex justify-between items-center text-xs">
          <span class="text-slate-400">Total:</span>
          <span class="font-black text-emerald-400">${formatRupiah(o.grandTotal)} (${o.paymentMethod})</span>
        </div>

        <select onchange="updateStatus(${idx}, this.value)" class="w-full p-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-white">
          <option value="Menunggu Verifikasi Dapur" ${o.status === 'Menunggu Verifikasi Dapur' ? 'selected' : ''}>⏳ Menunggu Verifikasi</option>
          <option value="Sedang Dibuat Barista" ${o.status === 'Sedang Dibuat Barista' ? 'selected' : ''}>☕ Sedang Dibuat Barista</option>
          <option value="Siap Disajikan" ${o.status === 'Siap Disajikan' ? 'selected' : ''}>🔔 Siap Disajikan / Antar</option>
          <option value="Selesai" ${o.status === 'Selesai' ? 'selected' : ''}>✅ Selesai</option>
        </select>

        <div class="flex gap-2">
          <button onclick="printThermal(${idx})" class="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 rounded-xl text-[11px] flex items-center justify-center gap-1">
            <i data-lucide="printer" class="w-3.5 h-3.5"></i> Struk 58mm
          </button>
          <button onclick="deleteOrder(${idx})" class="px-3 bg-rose-950/60 text-rose-400 hover:bg-rose-900 rounded-xl font-bold text-xs">
            ✕
          </button>
        </div>
      </div>
    </div>
  `).join("");
  lucide.createIcons();
}

window.updateStatus = function(idx, val) {
  ORDERS[idx].status = val;
  localStorage.setItem("CAFE_ORDERS", JSON.stringify(ORDERS));
  renderKDS();
};

window.deleteOrder = function(idx) {
  if (confirm("Hapus pesanan ini dari monitor?")) {
    ORDERS.splice(idx, 1);
    localStorage.setItem("CAFE_ORDERS", JSON.stringify(ORDERS));
    renderKDS();
  }
};

window.printThermal = function(idx) {
  const o = ORDERS[idx];
  document.getElementById("prn-time").innerText = `${new Date().toLocaleDateString("id-ID")} ${o.timestamp}`;
  document.getElementById("prn-order-id").innerText = `#${o.orderId}`;
  document.getElementById("prn-location").innerText = o.serviceLocation.toUpperCase();
  document.getElementById("prn-cust-name").innerText = o.name;
  document.getElementById("prn-cust-phone").innerText = o.phone;
  document.getElementById("prn-cust-email").innerText = o.email || "-";
  document.getElementById("prn-cust-notes").innerText = o.items.map(i => i.notes).filter(Boolean).join(", ") || "-";

  document.getElementById("prn-items-body").innerHTML = o.items.map(it => `
    <tr>
      <td style="padding: 2px 0;">${it.name}<br><small style="font-size: 9px;">${it.temp !== '-' ? it.temp : ''}</small></td>
      <td style="text-align: center;">${it.qty}x</td>
      <td style="text-align: right;">${formatRupiah(it.price * it.qty)}</td>
    </tr>
  `).join("");

  document.getElementById("prn-subtotal").innerText = formatRupiah(o.subtotal);
  document.getElementById("prn-discount").innerText = "-" + formatRupiah(o.discountApplied || 0);
  document.getElementById("prn-total").innerText = formatRupiah(o.grandTotal);

  window.print();
};

window.exportOrdersToCSV = function() {
  if (ORDERS.length === 0) return alert("Belum ada transaksi.");
  let csv = "Order ID,Waktu,Lokasi,Nama,No WA,Email,Total,Status\n";
  ORDERS.forEach(o => {
    csv += `"${o.orderId}","${o.timestamp}","${o.serviceLocation}","${o.name}","${o.phone}","${o.email || '-'}",${o.grandTotal},"${o.status}"\n`;
  });
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `Laporan-Kasir-TitikTemu-${new Date().toLocaleDateString("id-ID")}.csv`;
  a.click();
};

function renderAdminProducts() {
  document.getElementById("admin-product-table").innerHTML = PRODUCTS.map(p => `
    <div class="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex justify-between items-center text-xs">
      <div class="flex items-center gap-3">
        <img src="${p.image}" class="w-11 h-11 rounded-xl object-cover">
        <div>
          <p class="font-bold text-white">${p.name} ${p.isBestSeller ? '🔥' : ''}</p>
          <p class="text-slate-400">${p.category} • <strong class="text-amber-400">${formatRupiah(p.price)}</strong></p>
        </div>
      </div>
      <div class="flex gap-2">
        <button onclick="editProd(${p.id})" class="bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold px-3 py-1.5 rounded-xl">Edit</button>
        <button onclick="deleteProd(${p.id})" class="text-rose-400 hover:bg-rose-950/60 px-2 py-1.5 rounded-xl font-bold">Hapus</button>
      </div>
    </div>
  `).join("");
}

window.saveProductData = function() {
  const id = document.getElementById("edit-prod-id").value;
  const name = document.getElementById("inp-prod-name").value.trim();
  const category = document.getElementById("inp-prod-cat").value.trim() || "Menu";
  const price = Number(document.getElementById("inp-prod-price").value);
  const image = document.getElementById("inp-prod-img").value.trim() || "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500";
  const tags = document.getElementById("inp-prod-tags").value.trim();
  const desc = document.getElementById("inp-prod-desc").value.trim();
  const isBestSeller = document.getElementById("inp-prod-bestseller").checked;

  if (!name || !price) return alert("Nama dan harga wajib diisi.");

  if (id) {
    const idx = PRODUCTS.findIndex(x => x.id == id);
    PRODUCTS[idx] = { ...PRODUCTS[idx], name, category, price, image, tags, desc, isBestSeller };
  } else {
    PRODUCTS.unshift({ id: Date.now(), name, category, price, image, tags, desc, isBestSeller });
  }

  localStorage.setItem("CAFE_PRODUCTS", JSON.stringify(PRODUCTS));
  resetMenuForm();
  renderAdminProducts();
  alert("Menu tersimpan!");
};

window.editProd = function(id) {
  const p = PRODUCTS.find(x => x.id == id);
  document.getElementById("form-menu-mode").innerText = `✏️ Edit Menu: ${p.name}`;
  document.getElementById("edit-prod-id").value = p.id;
  document.getElementById("inp-prod-name").value = p.name;
  document.getElementById("inp-prod-cat").value = p.category;
  document.getElementById("inp-prod-price").value = p.price;
  document.getElementById("inp-prod-img").value = p.image;
  document.getElementById("inp-prod-tags").value = p.tags || "";
  document.getElementById("inp-prod-desc").value = p.desc || "";
  document.getElementById("inp-prod-bestseller").checked = !!p.isBestSeller;
};

window.resetMenuForm = function() {
  document.getElementById("form-menu-mode").innerText = "➕ Tambah Menu Baru";
  document.getElementById("edit-prod-id").value = "";
  document.getElementById("inp-prod-name").value = "";
  document.getElementById("inp-prod-cat").value = "";
  document.getElementById("inp-prod-price").value = "";
  document.getElementById("inp-prod-img").value = "";
  document.getElementById("inp-prod-tags").value = "";
  document.getElementById("inp-prod-desc").value = "";
  document.getElementById("inp-prod-bestseller").checked = false;
};

window.deleteProd = function(id) {
  if (confirm("Hapus menu ini?")) {
    PRODUCTS = PRODUCTS.filter(x => x.id != id);
    localStorage.setItem("CAFE_PRODUCTS", JSON.stringify(PRODUCTS));
    renderAdminProducts();
  }
};

function loadSettings() {
  document.getElementById("set-store-status").value = String(STORE_CONFIG.isOpen);
  document.getElementById("set-store-hours").value = STORE_CONFIG.hours;
  document.getElementById("set-qris-image").value = STORE_CONFIG.qrisUrl;
  document.getElementById("set-bank-name").value = STORE_CONFIG.bankName;
  document.getElementById("set-bank-acc").value = STORE_CONFIG.bankNumber;
  document.getElementById("set-admin-pin").value = STORE_CONFIG.adminPin;
}

window.saveAdminSettings = function() {
  STORE_CONFIG.isOpen = document.getElementById("set-store-status").value === "true";
  STORE_CONFIG.hours = document.getElementById("set-store-hours").value.trim();
  STORE_CONFIG.qrisUrl = document.getElementById("set-qris-image").value.trim();
  STORE_CONFIG.bankName = document.getElementById("set-bank-name").value.trim();
  STORE_CONFIG.bankNumber = document.getElementById("set-bank-acc").value.trim();
  STORE_CONFIG.adminPin = document.getElementById("set-admin-pin").value.trim() || "123456";
  localStorage.setItem("CAFE_CONFIG", JSON.stringify(STORE_CONFIG));
  alert("Pengaturan Toko Berhasil Disimpan!");
};