// DEFAULT CONFIGURATION
const DEFAULT_STORE = {
  name: "Titik Temu Coffee",
  hours: "08:00 - 22:00 WIB",
  isOpen: true,
  adminPin: "123456",
  qrisUrl: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=00020101021126570014ID.LINKAJA.WWW01189360091100000000005204581253033605802ID5914TITIK%20TEMU%20COFFEE6007BANDUNG61051234062070703A016304ABCD",
  bankName: "BCA (Bank Central Asia)",
  bankNumber: "8415-2910-29",
  bankHolder: "Titik Temu Coffee",
  shippingZones: [
    { name: "Radius Kafe / Kampus (< 2 km)", fee: 4000 },
    { name: "Area Dalam Kota (2 - 6 km)", fee: 9000 },
    { name: "Luar Area (> 6 km)", fee: 16000 }
  ],
  promos: {
    "COFFEEFIRST": 10000,
    "HEMAT15": 15000
  }
};

// 18 MENU LENGKAP & SINKRON (DENGAN GAMBAR UNSPLASH VALID)
const DEFAULT_PRODUCTS = [
  // COFFEE BAR
  { id: 1, name: "Kopi Susu Aren Spesial", category: "Coffee Bar", price: 20000, isBestSeller: true, image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=80", desc: "Espresso ganda, susu evaporasi segar & gula aren murni.", tags: "kopi susu aren dingin kopi manis best seller" },
  { id: 2, name: "Iced Caramel Macchiato", category: "Coffee Bar", price: 26000, isBestSeller: true, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&auto=format&fit=crop&q=80", desc: "Susu vanila lembut, lapisan espresso & drizzle saus karamel.", tags: "kopi caramel macchiato dingin manis best seller" },
  { id: 3, name: "Americano Arabica Flores", category: "Coffee Bar", price: 18000, isBestSeller: false, image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80", desc: "Single origin Flores Bajawa dengan cita rasa cokelat dan jeruk.", tags: "kopi hitam americano panas dingin pahit arabica" },
  { id: 4, name: "Cafe Latte Single Origin", category: "Coffee Bar", price: 24000, isBestSeller: false, image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&auto=format&fit=crop&q=80", desc: "Steamed milk lembut berpadu espresso kaya rasa.", tags: "kopi latte panas dingin creamy" },
  { id: 5, name: "Vanilla Cold Brew Nitro", category: "Coffee Bar", price: 25000, isBestSeller: false, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop&q=80", desc: "Kopi seduh dingin 16 jam dengan ekstrak vanila aromatik.", tags: "kopi cold brew dingin vanila segar" },

  // ARTISAN TEA & MOCKTAIL
  { id: 6, name: "Kyoto Matcha Cream Cheese", category: "Artisan & Tea", price: 26000, isBestSeller: true, image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&auto=format&fit=crop&q=80", desc: "Pure ceremonial matcha Jepang dengan krim keju gurih di atasnya.", tags: "matcha teh jepang non-coffee keju manis best seller" },
  { id: 7, name: "Artisan Peach Berry Refresher", category: "Artisan & Tea", price: 22000, isBestSeller: true, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&auto=format&fit=crop&q=80", desc: "Seduhan teh buah persik dan stroberi segar pemuas dahaga.", tags: "teh buah peach berry mocktail segar dingin manis best seller" },
  { id: 8, name: "Lychee Yakult Breeze", category: "Artisan & Tea", price: 23000, isBestSeller: false, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=80", desc: "Yakult segar dipadukan dengan sirup leci dan buah leci asli.", tags: "yakult leci asam manis segar dingin" },
  { id: 9, name: "Belgian Dark Chocolate Iced", category: "Artisan & Tea", price: 25000, isBestSeller: false, image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=500&auto=format&fit=crop&q=80", desc: "Cokelat Belgia pekat dengan susu murni yang kental.", tags: "cokelat manis dingin non-coffee creamy" },

  // MAIN COURSE (MAKANAN BERAT)
  { id: 10, name: "Crispy Chicken Rice Bowl Sambal Matah", category: "Main Course", price: 32000, isBestSeller: true, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=80", desc: "Ayam fillet krispi, telur mata sapi & sambal matah Bali segar.", tags: "nasi ayam rice bowl pedas makan siang kenyang best seller" },
  { id: 11, name: "Spaghetti Aglio Olio Smoked Beef", category: "Main Course", price: 34000, isBestSeller: true, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&auto=format&fit=crop&q=80", desc: "Pasta al-dente dengan tumisan bawang putih, cabai & daging asap.", tags: "pasta spaghetti aglio olio gurih pedas makan siang best seller" },
  { id: 12, name: "Beef Teriyaki Rice Bowl", category: "Main Course", price: 36000, isBestSeller: false, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80", desc: "Irisan daging sapi tumis saus teriyaki gurih manis khas Jepang.", tags: "daging sapi beef teriyaki nasi makan siang manis" },
  { id: 13, name: "Nasi Goreng Kampung Spesial", category: "Main Course", price: 28000, isBestSeller: false, image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&auto=format&fit=crop&q=80", desc: "Nasi goreng bumbu tradisional dengan suwiran ayam, telur & acar.", tags: "nasi goreng ayam telur gurih makan malam" },

  // PASTRY & BITES (CEMILAN)
  { id: 14, name: "Butter Croissant Fresh Bake", category: "Pastry & Bites", price: 18000, isBestSeller: true, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop&q=80", desc: "Croissant renyah berlapis dengan aroma butter Prancis yang harum.", tags: "croissant roti pastry cemilan snack butter best seller" },
  { id: 15, name: "Truffle Fries with Mayo Dip", category: "Pastry & Bites", price: 24000, isBestSeller: true, image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500&auto=format&fit=crop&q=80", desc: "Kentang goreng renyah dengan minyak jamur truffle & mayones gurih.", tags: "kentang goreng truffle snack cemilan gurih best seller" },
  { id: 16, name: "Churros Cinnamon Sugar Dip Chocolate", category: "Pastry & Bites", price: 22000, isBestSeller: false, image: "https://images.unsplash.com/photo-1624300629298-e9de39c13be5?w=500&auto=format&fit=crop&q=80", desc: "Churros krispi tabur kayu manis gula dengan cocolan cokelat lumer.", tags: "churros cemilan manis cokelat dessert" },
  { id: 17, name: "Dark Chocolate Fudgy Brownie", category: "Pastry & Bites", price: 20000, isBestSeller: false, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=80", desc: "Brownies cokelat pekat lumer dengan taburan kacang almond renyah.", tags: "brownies coklat kue manis dessert snack" },
  { id: 18, name: "Crispy Chicken Tenders Honey Mustard", category: "Pastry & Bites", price: 25000, isBestSeller: false, image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500&auto=format&fit=crop&q=80", desc: "Fillet ayam renyah tanpa tulang dengan cocolan saus madu mustard.", tags: "ayam tenders snack cemilan gurih gorengan" }
];

// STATE INITIALIZATION
let STORE_CONFIG = JSON.parse(localStorage.getItem("CAFE_CONFIG")) || DEFAULT_STORE;
let PRODUCTS = JSON.parse(localStorage.getItem("CAFE_PRODUCTS")) || DEFAULT_PRODUCTS;
let ORDERS = JSON.parse(localStorage.getItem("CAFE_ORDERS")) || [];

let cart = [];
let currentServiceType = "dine_in";
let activeCategory = "Semua";
let currentCustomizingProduct = null;
let discountApplied = 0;

const formatRupiah = (n) => "Rp" + Number(n).toLocaleString("id-ID");

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  setupUI();
  renderCategories();
  renderProducts();
});

function setupUI() {
  document.getElementById("txt-store-hours").innerText = STORE_CONFIG.hours;
  const badge = document.getElementById("badge-status-toko");
  const banner = document.getElementById("closed-banner");

  if (STORE_CONFIG.isOpen) {
    badge.className = "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[9px] font-black px-2 py-0.5 rounded-full";
    badge.innerText = "BUKA";
    banner.classList.add("hidden");
  } else {
    badge.className = "bg-rose-500/20 text-rose-400 border border-rose-500/40 text-[9px] font-black px-2 py-0.5 rounded-full";
    badge.innerText = "TUTUP";
    banner.classList.remove("hidden");
  }

  document.getElementById("sel-delivery-zone").innerHTML = STORE_CONFIG.shippingZones.map(z => 
    `<option value="${z.fee}">${z.name} (+${formatRupiah(z.fee)})</option>`
  ).join("");

  document.getElementById("search-box").addEventListener("input", (e) => {
    document.getElementById("btn-clear-search").classList.toggle("hidden", e.target.value.length === 0);
    renderProducts();
  });
}

window.setServiceType = function(type) {
  currentServiceType = type;
  document.getElementById("btn-type-dinein").className = type === 'dine_in' ? "flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-bold bg-roast-900 text-white shadow" : "flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-bold bg-crema-100 text-roast-900 hover:bg-crema-200";
  document.getElementById("btn-type-takeaway").className = type === 'takeaway' ? "flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-bold bg-roast-900 text-white shadow" : "flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-bold bg-crema-100 text-roast-900 hover:bg-crema-200";
  document.getElementById("btn-type-delivery").className = type === 'delivery' ? "flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-bold bg-roast-900 text-white shadow" : "flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-bold bg-crema-100 text-roast-900 hover:bg-crema-200";

  const indicator = document.getElementById("current-service-indicator");
  indicator.innerText = type === 'dine_in' ? "Makan di Tempat (Dine-In)" : type === 'takeaway' ? "Bawa Pulang (Takeaway)" : "Antar ke Rumah (Delivery)";

  document.getElementById("box-input-table").classList.toggle("hidden", type !== "dine_in");
  document.getElementById("box-input-delivery").classList.toggle("hidden", type !== "delivery");
  document.getElementById("checkout-service-subtitle").innerText = `Layanan: ${indicator.innerText}`;
  recalculateTotals();
};

function renderCategories() {
  const cats = ["Semua", "🔥 Best Seller", ...new Set(PRODUCTS.map(p => p.category))];
  document.getElementById("filter-categories").innerHTML = cats.map(c => `
    <button onclick="selectCategory('${c}')" class="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
      activeCategory === c ? 'bg-roast-900 text-white shadow' : 'bg-white text-slate-700 border border-crema-200 hover:bg-crema-100'
    }">${c}</button>
  `).join("");
}

window.selectCategory = function(c) {
  activeCategory = c;
  renderCategories();
  renderProducts();
};

window.quickFilter = function(keyword) {
  if (keyword === 'best_seller') {
    activeCategory = "🔥 Best Seller";
  } else {
    document.getElementById("search-box").value = keyword;
    document.getElementById("btn-clear-search").classList.remove("hidden");
    activeCategory = "Semua";
  }
  renderCategories();
  renderProducts();
};

window.resetSearch = function() {
  document.getElementById("search-box").value = "";
  document.getElementById("btn-clear-search").classList.add("hidden");
  renderProducts();
};

function renderProducts() {
  const q = document.getElementById("search-box").value.toLowerCase().trim();
  const filtered = PRODUCTS.filter(p => {
    const matchCat = activeCategory === "Semua" ? true : activeCategory === "🔥 Best Seller" ? p.isBestSeller : p.category === activeCategory;
    const matchQ = p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || (p.tags && p.tags.toLowerCase().includes(q));
    return matchCat && matchQ;
  });

  document.getElementById("lbl-catalog-count").innerText = `Daftar Menu (${filtered.length})`;
  const grid = document.getElementById("product-grid");

  grid.innerHTML = filtered.map(p => `
    <div class="glass-card rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition">
      <div class="relative h-32 sm:h-36 bg-slate-200">
        <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover">
        ${p.isBestSeller ? `<span class="absolute top-2 left-2 bg-amberGold text-roast-950 text-[9px] font-black px-2 py-0.5 rounded-md shadow">FAVORIT</span>` : ''}
        <span class="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-[9px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">${p.category}</span>
      </div>
      <div class="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h4 class="font-extrabold text-xs sm:text-sm text-roast-900 leading-snug">${p.name}</h4>
          <p class="text-[11px] text-slate-500 line-clamp-1 mt-0.5">${p.desc}</p>
        </div>
        <div class="mt-3 flex items-center justify-between pt-2 border-t border-crema-200">
          <span class="font-black text-xs sm:text-sm text-roast-900">${formatRupiah(p.price)}</span>
          <button onclick="promptCustomization(${p.id})" class="bg-roast-950 hover:bg-black text-crema-50 text-xs font-bold px-3 py-1.5 rounded-xl shadow transition active:scale-95">
            + Pesan
          </button>
        </div>
      </div>
    </div>
  `).join("");
  lucide.createIcons();
}

window.promptCustomization = function(prodId) {
  const p = PRODUCTS.find(x => x.id === prodId);
  currentCustomizingProduct = p;
  document.getElementById("mod-cust-title").innerText = p.name;
  document.getElementById("mod-cust-price").innerText = formatRupiah(p.price);

  const isFood = p.category === "Main Course" || p.category === "Pastry & Bites";
  document.getElementById("group-opt-temp").classList.toggle("hidden", isFood);
  document.getElementById("group-opt-sugar").classList.toggle("hidden", isFood);
  document.getElementById("opt-notes").value = "";

  document.getElementById("modal-item-custom").classList.remove("hidden");
};

window.closeCustomModal = function() {
  document.getElementById("modal-item-custom").classList.add("hidden");
};

window.commitCustomAddToCart = function() {
  const p = currentCustomizingProduct;
  const isFood = p.category === "Main Course" || p.category === "Pastry & Bites";
  const temp = isFood ? "-" : document.querySelector('input[name="opt-temp"]:checked').value;
  const sugar = isFood ? "-" : document.querySelector('input[name="opt-sugar"]:checked').value;
  const notes = document.getElementById("opt-notes").value.trim();

  cart.push({
    cartItemId: Date.now() + Math.random(),
    productId: p.id,
    name: p.name,
    price: p.price,
    qty: 1,
    temp, sugar, notes
  });

  closeCustomModal();
  updateCartDisplay();
};

function updateCartDisplay() {
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + (i.price * i.qty), 0);

  document.getElementById("ui-cart-qty").innerText = totalQty;
  document.getElementById("ui-cart-total").innerText = formatRupiah(subtotal);
  document.getElementById("floating-bar").classList.toggle("hidden", totalQty === 0);
  recalculateTotals();
}

window.openCheckoutModal = function() {
  const list = document.getElementById("checkout-items-list");
  list.innerHTML = cart.map((item, idx) => `
    <div class="pt-2 flex justify-between items-start text-xs">
      <div>
        <p class="font-extrabold text-roast-900">${item.name}</p>
        <p class="text-[10px] text-slate-500">${item.temp !== '-' ? item.temp + ' • ' + item.sugar : ''} ${item.notes ? '(' + item.notes + ')' : ''}</p>
        <span class="font-bold text-slate-700">${formatRupiah(item.price)}</span>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="adjustCartItemQty(${idx}, -1)" class="w-6 h-6 bg-crema-200 rounded-lg font-bold text-slate-800">-</button>
        <span class="font-bold text-xs">${item.qty}</span>
        <button onclick="adjustCartItemQty(${idx}, 1)" class="w-6 h-6 bg-roast-950 text-white rounded-lg font-bold">+</button>
      </div>
    </div>
  `).join("");

  document.getElementById("modal-checkout").classList.remove("hidden");
  recalculateTotals();
};

window.closeCheckoutModal = function() {
  document.getElementById("modal-checkout").classList.add("hidden");
};

window.adjustCartItemQty = function(idx, delta) {
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  if (cart.length === 0) closeCheckoutModal();
  updateCartDisplay();
  openCheckoutModal();
};

window.recalculateTotals = function() {
  const subtotal = cart.reduce((s, i) => s + (i.price * i.qty), 0);
  let fee = 0;
  if (currentServiceType === "delivery") {
    fee = Number(document.getElementById("sel-delivery-zone").value || 0);
  }

  const grandTotal = Math.max(0, subtotal - discountApplied + fee);

  document.getElementById("txt-subtotal").innerText = formatRupiah(subtotal);
  document.getElementById("txt-service-fee").innerText = formatRupiah(fee);
  document.getElementById("txt-discount").innerText = "-" + formatRupiah(discountApplied);
  document.getElementById("row-discount").classList.toggle("hidden", discountApplied === 0);
  document.getElementById("txt-grand-total").innerText = formatRupiah(grandTotal);

  return { subtotal, fee, grandTotal };
};

window.applyPromoCode = function() {
  const code = document.getElementById("inp-promo-code").value.trim().toUpperCase();
  const feedback = document.getElementById("msg-promo-feedback");
  feedback.classList.remove("hidden");

  if (STORE_CONFIG.promos[code]) {
    discountApplied = STORE_CONFIG.promos[code];
    feedback.innerText = `✅ Voucher ${code} aktif! Diskon ${formatRupiah(discountApplied)}`;
    feedback.className = "text-[10px] font-bold text-emerald-700";
  } else {
    discountApplied = 0;
    feedback.innerText = "❌ Kode voucher tidak ditemukan.";
    feedback.className = "text-[10px] font-bold text-rose-600";
  }
  recalculateTotals();
};

window.launchPaymentGatewayModal = function() {
  if (!STORE_CONFIG.isOpen) {
    return alert("Mohon maaf, toko sedang tutup / tidak menerima pesanan baru saat ini.");
  }

  const name = document.getElementById("inp-cust-name").value.trim();
  const phone = document.getElementById("inp-cust-phone").value.trim();
  const email = document.getElementById("inp-cust-email").value.trim();
  const table = document.getElementById("inp-table-no").value.trim();
  const address = document.getElementById("inp-deliv-address").value.trim();

  if (!name || !phone || !email) return alert("Mohon lengkapi Nama, Nomor WhatsApp, dan Email Anda.");
  if (currentServiceType === "dine_in" && !table) return alert("Mohon isi Nomor Meja Anda.");
  if (currentServiceType === "delivery" && !address) return alert("Mohon cantumkan Alamat Lengkap Pengiriman.");

  const { grandTotal } = recalculateTotals();
  const method = document.querySelector('input[name="pay-method"]:checked').value;

  document.getElementById("pay-nominal-display").innerText = formatRupiah(grandTotal);
  document.getElementById("box-pay-qris").classList.toggle("hidden", method !== "qris");
  document.getElementById("box-pay-transfer").classList.toggle("hidden", method === "qris");
  document.getElementById("img-qris-target").src = STORE_CONFIG.qrisUrl;
  document.getElementById("bank-title-display").innerText = STORE_CONFIG.bankName;
  document.getElementById("bank-acc-display").innerText = STORE_CONFIG.bankNumber;
  document.getElementById("bank-holder-display").innerText = STORE_CONFIG.bankHolder;

  closeCheckoutModal();
  document.getElementById("modal-pay-gate").classList.remove("hidden");
};

window.closePayGateModal = function() {
  document.getElementById("modal-pay-gate").classList.add("hidden");
};

window.copyBankAcc = function() {
  navigator.clipboard.writeText(STORE_CONFIG.bankNumber);
  alert("Nomor rekening tersalin!");
};

window.finalizeCustomerOrder = function() {
  const file = document.getElementById("inp-receipt-file").files[0];
  if (!file) return alert("Mohon lampirkan foto/screenshot bukti pembayaran Anda.");

  const { subtotal, fee, grandTotal } = recalculateTotals();
  const table = document.getElementById("inp-table-no").value.trim();
  const address = document.getElementById("inp-deliv-address").value.trim();

  const newOrder = {
    orderId: "ORD-" + Math.floor(1000 + Math.random() * 9000),
    timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    name: document.getElementById("inp-cust-name").value.trim(),
    phone: document.getElementById("inp-cust-phone").value.trim(),
    email: document.getElementById("inp-cust-email").value.trim(),
    serviceType: currentServiceType,
    serviceLocation: currentServiceType === 'dine_in' ? `Meja ${table}` : currentServiceType === 'takeaway' ? 'Takeaway' : `Antar: ${address}`,
    items: [...cart],
    subtotal, fee, discountApplied, grandTotal,
    paymentMethod: document.querySelector('input[name="pay-method"]:checked').value.toUpperCase(),
    status: "Menunggu Verifikasi Dapur"
  };

  ORDERS.unshift(newOrder);
  localStorage.setItem("CAFE_ORDERS", JSON.stringify(ORDERS));

  closePayGateModal();
  document.getElementById("lbl-success-order-id").innerText = `#${newOrder.orderId}`;
  document.getElementById("lbl-success-location").innerText = newOrder.serviceLocation;
  document.getElementById("modal-success").classList.remove("hidden");

  cart = [];
  updateCartDisplay();
};

window.closeSuccessModal = function() {
  document.getElementById("modal-success").classList.add("hidden");
};