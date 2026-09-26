const path = require('path');
const sharp = require(path.join(__dirname, 'node_modules/sharp'));

// ==========================================
// FLOWCHART 1: STANDAR & SEWAJARNYA (PRAGMATIS & EFISIEN)
// ==========================================
function generateStandarSvg() {
  const width = 1600;
  const height = 1100;

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#140e08"/>
      <stop offset="50%" stop-color="#1c150e"/>
      <stop offset="100%" stop-color="#120c06"/>
    </linearGradient>
    
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e0be80"/>
      <stop offset="100%" stop-color="#a88544"/>
    </linearGradient>

    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.45"/>
    </filter>
    
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#c4a56c"/>
    </marker>
    <marker id="arrowGreen" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2eb872"/>
    </marker>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>
  
  <!-- Outer Frame -->
  <rect x="30" y="30" width="${width - 60}" height="${height - 60}" rx="20" fill="none" stroke="#36291a" stroke-width="1.5"/>

  <!-- Header Banner -->
  <g transform="translate(60, 65)">
    <text x="0" y="24" fill="#a88544" font-family="Georgia, serif" font-size="13" letter-spacing="3" font-weight="bold">RADIATE BEAUTY — ARSITEKTUR WORKFLOW BISNIS</text>
    <text x="0" y="60" fill="#f8f1e6" font-family="Georgia, serif" font-size="28" font-weight="normal">Alur WA &amp; Invoice: Versi Semestinya &amp; Sewajarnya (Standar D2C)</text>
    <text x="0" y="90" fill="#9e9180" font-family="Arial, sans-serif" font-size="13">Pendekatan realistis, zero platform fee, high-touch personal consultation, dan terbukti menghasilkan tingkat closing 15-25% di pasar Indonesia.</text>
    
    <!-- Badge -->
    <rect x="${width - 340}" y="15" width="220" height="42" rx="21" fill="#2a1f14" stroke="#523e27" stroke-width="1.5"/>
    <circle cx="${width - 315}" cy="36" r="6" fill="#2eb872"/>
    <text x="${width - 295}" y="41" fill="#f8f1e6" font-family="Arial, sans-serif" font-size="12" font-weight="bold">VERSI 1: STANDARD READY</text>
  </g>

  <!-- Swimlane Headers -->
  <!-- Col 1: Customer (User Experience) -->
  <g transform="translate(60, 200)">
    <rect width="450" height="50" rx="10" fill="#241b12" stroke="#4a3722" stroke-width="1"/>
    <rect x="16" y="15" width="8" height="20" rx="3" fill="url(#goldGrad)"/>
    <text x="36" y="32" fill="#eed9b3" font-family="Georgia, serif" font-size="16" font-weight="bold">1. CUSTOMER (FRONTEND WEB)</text>
    <text x="36" y="44" fill="#9e9180" font-family="Arial, sans-serif" font-size="10">Pencarian produk, formulir checkout, &amp; redirect WA</text>
  </g>

  <!-- Col 2: System / Data Layer -->
  <g transform="translate(575, 200)">
    <rect width="450" height="50" rx="10" fill="#241b12" stroke="#4a3722" stroke-width="1"/>
    <rect x="16" y="15" width="8" height="20" rx="3" fill="#699bf7"/>
    <text x="36" y="32" fill="#eed9b3" font-family="Georgia, serif" font-size="16" font-weight="bold">2. SISTEM &amp; GENERATOR INVOICE</text>
    <text x="36" y="44" fill="#9e9180" font-family="Arial, sans-serif" font-size="10">Kalkulasi, validasi form, format payload teks</text>
  </g>

  <!-- Col 3: CS / Admin Operation -->
  <g transform="translate(1090, 200)">
    <rect width="450" height="50" rx="10" fill="#241b12" stroke="#4a3722" stroke-width="1"/>
    <rect x="16" y="15" width="8" height="20" rx="3" fill="#2eb872"/>
    <text x="36" y="32" fill="#eed9b3" font-family="Georgia, serif" font-size="16" font-weight="bold">3. WHATSAPP CS &amp; FULFILLMENT</text>
    <text x="36" y="44" fill="#9e9180" font-family="Arial, sans-serif" font-size="10">Penerimaan data, payment verification, &amp; resi kurir</text>
  </g>

  <!-- Flow Steps -->

  <!-- STEP 1: Discovery & Order Form -->
  <g transform="translate(60, 280)" filter="url(#cardShadow)">
    <rect width="450" height="135" rx="12" fill="#1e1710" stroke="#3d2d1b" stroke-width="1.5"/>
    <circle cx="36" cy="34" r="14" fill="#36291a"/>
    <text x="36" y="39" fill="#e0be80" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">1</text>
    <text x="64" y="38" fill="#fcf8f2" font-family="Georgia, serif" font-size="16" font-weight="bold">Pemilihan Series &amp; Isi Form Order</text>
    <text x="64" y="62" fill="#a89987" font-family="Arial, sans-serif" font-size="12">Customer memilih series (Glow/Clear/Hydrate/Renew)</text>
    <text x="64" y="80" fill="#a89987" font-family="Arial, sans-serif" font-size="12">atau selesai Skin Quiz. Mengisi formulir pop-up:</text>
    <rect x="64" y="94" width="360" height="26" rx="6" fill="#2d2215"/>
    <text x="76" y="111" fill="#d9c4a3" font-family="Arial, sans-serif" font-size="11">Data: Nama Lengkap · No. WhatsApp · Alamat Pengiriman</text>
  </g>

  <!-- Arrow 1 -> 2 (Horizontal to System) -->
  <path d="M 510 347 L 575 347" stroke="#c4a56c" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

  <!-- STEP 2: Instant Generator Logic -->
  <g transform="translate(575, 280)" filter="url(#cardShadow)">
    <rect width="450" height="135" rx="12" fill="#1e1710" stroke="#3d2d1b" stroke-width="1.5"/>
    <circle cx="36" cy="34" r="14" fill="#36291a"/>
    <text x="36" y="39" fill="#699bf7" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">2</text>
    <text x="64" y="38" fill="#fcf8f2" font-family="Georgia, serif" font-size="16" font-weight="bold">Generate Invoice ID &amp; Format WA</text>
    <text x="64" y="62" fill="#a89987" font-family="Arial, sans-serif" font-size="12">Sistem Frontend meng-generate identifier unik:</text>
    <text x="64" y="80" fill="#e0be80" font-family="Courier, monospace" font-size="12" font-weight="bold">ID: RB-260927-4821 | Status: PENDING</text>
    <text x="64" y="98" fill="#a89987" font-family="Arial, sans-serif" font-size="12">Menyusun payload teks WhatsApp rapi siap kirim</text>
    <text x="64" y="114" fill="#a89987" font-family="Arial, sans-serif" font-size="12">tanpa perlu database berat pada fase awal.</text>
  </g>

  <!-- Arrow 2 -> 3 (Horizontal to CS) -->
  <path d="M 1025 347 L 1090 347" stroke="#c4a56c" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

  <!-- STEP 3: WhatsApp Dispatch -->
  <g transform="translate(1090, 280)" filter="url(#cardShadow)">
    <rect width="450" height="135" rx="12" fill="#1e1710" stroke="#3d2d1b" stroke-width="1.5"/>
    <circle cx="36" cy="34" r="14" fill="#36291a"/>
    <text x="36" y="39" fill="#2eb872" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">3</text>
    <text x="64" y="38" fill="#fcf8f2" font-family="Georgia, serif" font-size="16" font-weight="bold">Pesan Masuk ke WhatsApp CS Resmi</text>
    <text x="64" y="62" fill="#a89987" font-family="Arial, sans-serif" font-size="12">Admin langsung menerima chat terstruktur 100%:</text>
    <rect x="64" y="74" width="360" height="48" rx="6" fill="#172e20" stroke="#235c3a" stroke-width="1"/>
    <text x="76" y="92" fill="#75e09f" font-family="Arial, sans-serif" font-size="11">"Halo Admin, saya ingin order Glow Series (Rp709.000)...</text>
    <text x="76" y="110" fill="#75e09f" font-family="Arial, sans-serif" font-size="11">Invoice: RB-260927-4821, Nama: Sarah, Alamat: ... "</text>
  </g>

  <!-- Vertical connector from Step 3 down to Step 4 -->
  <path d="M 1315 415 L 1315 480" stroke="#c4a56c" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

  <!-- STEP 4: Admin Payment Instructions -->
  <g transform="translate(1090, 480)" filter="url(#cardShadow)">
    <rect width="450" height="135" rx="12" fill="#1e1710" stroke="#3d2d1b" stroke-width="1.5"/>
    <circle cx="36" cy="34" r="14" fill="#36291a"/>
    <text x="36" y="39" fill="#2eb872" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">4</text>
    <text x="64" y="38" fill="#fcf8f2" font-family="Georgia, serif" font-size="16" font-weight="bold">CS Validasi Stok &amp; Kirim Rekening</text>
    <text x="64" y="62" fill="#a89987" font-family="Arial, sans-serif" font-size="12">CS mengirim quick-reply rekening resmi toko:</text>
    <text x="64" y="80" fill="#eed9b3" font-family="Arial, sans-serif" font-size="12">BCA / Mandiri an. PT Radiate Beauty / QRIS Statis.</text>
    <text x="64" y="98" fill="#a89987" font-family="Arial, sans-serif" font-size="12">CS dapat melakukan konsultasi singkat &amp; upselling</text>
    <text x="64" y="114" fill="#a89987" font-family="Arial, sans-serif" font-size="12">(misal: rekomendasi serum tambahan atau sunscreen).</text>
  </g>

  <!-- Arrow Step 4 Left to Step 5 (Customer Transfers) -->
  <path d="M 1090 547 L 510 547" stroke="#c4a56c" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

  <!-- STEP 5: Customer Transfers Payment -->
  <g transform="translate(60, 480)" filter="url(#cardShadow)">
    <rect width="450" height="135" rx="12" fill="#1e1710" stroke="#3d2d1b" stroke-width="1.5"/>
    <circle cx="36" cy="34" r="14" fill="#36291a"/>
    <text x="36" y="39" fill="#e0be80" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">5</text>
    <text x="64" y="38" fill="#fcf8f2" font-family="Georgia, serif" font-size="16" font-weight="bold">Pembayaran &amp; Kirim Bukti Transfer</text>
    <text x="64" y="62" fill="#a89987" font-family="Arial, sans-serif" font-size="12">Customer transfer melalui m-banking / QRIS</text>
    <text x="64" y="80" fill="#a89987" font-family="Arial, sans-serif" font-size="12">lalu mengunggah screenshot bukti transfer ke WhatsApp.</text>
    <rect x="64" y="94" width="360" height="26" rx="6" fill="#2d2215"/>
    <text x="76" y="111" fill="#2eb872" font-family="Arial, sans-serif" font-size="11">✓ Tidak ada potongan fee payment gateway 1.5% - 3%</text>
  </g>

  <!-- Arrow Step 5 to Step 6 (Middle Reconciliation) -->
  <path d="M 285 615 L 285 680" stroke="#c4a56c" stroke-width="2" fill="none"/>
  <path d="M 285 680 L 575 680" stroke="#c4a56c" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

  <!-- STEP 6: Manual / Semi-Auto Verification -->
  <g transform="translate(575, 615)" filter="url(#cardShadow)">
    <rect width="450" height="135" rx="12" fill="#1e1710" stroke="#3d2d1b" stroke-width="1.5"/>
    <circle cx="36" cy="34" r="14" fill="#36291a"/>
    <text x="36" y="39" fill="#699bf7" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">6</text>
    <text x="64" y="38" fill="#fcf8f2" font-family="Georgia, serif" font-size="16" font-weight="bold">Pencocokan Mutasi &amp; Status Lunas</text>
    <text x="64" y="62" fill="#a89987" font-family="Arial, sans-serif" font-size="12">Admin mencocokkan nominal di rekening bank.</text>
    <text x="64" y="80" fill="#a89987" font-family="Arial, sans-serif" font-size="12">Status pesanan berubah menjadi:</text>
    <rect x="64" y="94" width="130" height="26" rx="6" fill="#163824"/>
    <text x="78" y="111" fill="#46d689" font-family="Arial, sans-serif" font-size="11" font-weight="bold">STATUS: LUNAS</text>
    <text x="210" y="111" fill="#9e9180" font-family="Arial, sans-serif" font-size="11">Diteruskan ke tim packing gudang</text>
  </g>

  <!-- Arrow Step 6 to Step 7 (To CS / Delivery) -->
  <path d="M 1025 682 L 1090 682" stroke="#2eb872" stroke-width="2" fill="none" marker-end="url(#arrowGreen)"/>

  <!-- STEP 7: Shipping & Receipt via WhatsApp -->
  <g transform="translate(1090, 615)" filter="url(#cardShadow)">
    <rect width="450" height="135" rx="12" fill="#1e1710" stroke="#235c3a" stroke-width="1.5"/>
    <circle cx="36" cy="34" r="14" fill="#163824"/>
    <text x="36" y="39" fill="#46d689" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">7</text>
    <text x="64" y="38" fill="#fcf8f2" font-family="Georgia, serif" font-size="16" font-weight="bold">Packing &amp; Pengiriman Nomor Resi</text>
    <text x="64" y="62" fill="#a89987" font-family="Arial, sans-serif" font-size="12">Gudang mengemas produk dengan bubble wrap tebal.</text>
    <text x="64" y="80" fill="#a89987" font-family="Arial, sans-serif" font-size="12">Admin input resi (J&amp;T / SiCepat / JNE) lalu kirim</text>
    <text x="64" y="98" fill="#75e09f" font-family="Arial, sans-serif" font-size="12" font-weight="bold">Pesan Konfirmasi Resi Kurir + Link Pelacakan</text>
    <text x="64" y="114" fill="#a89987" font-family="Arial, sans-serif" font-size="12">ke thread chat WhatsApp customer yang sama.</text>
  </g>

  <!-- Bottom Evaluation Summary Box -->
  <g transform="translate(60, 810)">
    <rect width="${width - 120}" height="220" rx="16" fill="#17110a" stroke="#42321f" stroke-width="1.5"/>
    <text x="30" y="35" fill="#e0be80" font-family="Georgia, serif" font-size="18" font-weight="bold">EVALUASI STRATEGIS &amp; METRIK BISNIS (VERSI STANDAR):</text>
    
    <g transform="translate(30, 65)">
      <!-- Col 1 -->
      <rect width="330" height="125" rx="10" fill="#20170f" stroke="#332415" stroke-width="1"/>
      <text x="18" y="28" fill="#75e09f" font-family="Arial, sans-serif" font-size="13" font-weight="bold">Kelebihan Utama</text>
      <text x="18" y="52" fill="#d9cebf" font-family="Arial, sans-serif" font-size="11">✓ Zero Friction: Tidak butuh login/registrasi</text>
      <text x="18" y="72" fill="#d9cebf" font-family="Arial, sans-serif" font-size="11">✓ Zero Fee: Margin laba 100% tanpa fee PG</text>
      <text x="18" y="92" fill="#d9cebf" font-family="Arial, sans-serif" font-size="11">✓ High Conversion: Closing via WA 15-25%</text>
      <text x="18" y="112" fill="#d9cebf" font-family="Arial, sans-serif" font-size="11">✓ Upselling: CS bisa tawarkan produk pelengkap</text>
    </g>

    <g transform="translate(390, 65)">
      <!-- Col 2 -->
      <rect width="330" height="125" rx="10" fill="#20170f" stroke="#332415" stroke-width="1"/>
      <text x="18" y="28" fill="#e0be80" font-family="Arial, sans-serif" font-size="13" font-weight="bold">Kapasitas &amp; Probabilitas</text>
      <text x="18" y="52" fill="#d9cebf" font-family="Arial, sans-serif" font-size="11">• Optimal untuk: 10 - 75 pesanan / hari</text>
      <text x="18" y="72" fill="#d9cebf" font-family="Arial, sans-serif" font-size="11">• Kebutuhan SDM: Cukup 1 - 2 Admin CS</text>
      <text x="18" y="92" fill="#d9cebf" font-family="Arial, sans-serif" font-size="11">• SLA Respon: &lt; 5 menit di jam operasional</text>
      <text x="18" y="112" fill="#d9cebf" font-family="Arial, sans-serif" font-size="11">• Drop-off Risk: 10% jika CS slow-respon malam</text>
    </g>

    <g transform="translate(750, 65)">
      <!-- Col 3 -->
      <rect width="330" height="125" rx="10" fill="#20170f" stroke="#332415" stroke-width="1"/>
      <text x="18" y="28" fill="#e07575" font-family="Arial, sans-serif" font-size="13" font-weight="bold">Titik Kritis (Bottleneck)</text>
      <text x="18" y="52" fill="#d9cebf" font-family="Arial, sans-serif" font-size="11">! Pencocokan mutasi manual rawan slip</text>
      <text x="18" y="72" fill="#d9cebf" font-family="Arial, sans-serif" font-size="11">! Input resi manual memakan waktu 2-3 jam/hari</text>
      <text x="18" y="92" fill="#d9cebf" font-family="Arial, sans-serif" font-size="11">! Chat bisa tertimbun bila terjadi lonjakan traffic</text>
      <text x="18" y="112" fill="#d9cebf" font-family="Arial, sans-serif" font-size="11">! Perlu pivot ke Versi Advance bila &gt; 100 order/hari</text>
    </g>

    <g transform="translate(1110, 65)">
      <!-- Col 4 -->
      <rect width="330" height="125" rx="10" fill="#20170f" stroke="#332415" stroke-width="1"/>
      <text x="18" y="28" fill="#699bf7" font-family="Arial, sans-serif" font-size="13" font-weight="bold">Kunci Sukses Eksekusi</text>
      <text x="18" y="52" fill="#d9cebf" font-family="Arial, sans-serif" font-size="11">1. Format invoice WA harus rigid &amp; konsisten</text>
      <text x="18" y="72" fill="#d9cebf" font-family="Arial, sans-serif" font-size="11">2. Sediakan WA Business Quick Replies (FAQ, Rek)</text>
      <text x="18" y="92" fill="#d9cebf" font-family="Arial, sans-serif" font-size="11">3. Gunakan WhatsApp Business Label</text>
      <text x="18" y="112" fill="#d9cebf" font-family="Arial, sans-serif" font-size="11">   (New Order, Paid, Packed, Sent)</text>
    </g>
  </g>
</svg>`;
}

// ==========================================
// FLOWCHART 2: ADVANCE ENTERPRISE (AUTOMATED & API-DRIVEN)
// ==========================================
function generateAdvanceSvg() {
  const width = 1600;
  const height = 1100;

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0e131a"/>
      <stop offset="50%" stop-color="#141a24"/>
      <stop offset="100%" stop-color="#0a0e14"/>
    </linearGradient>
    
    <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#699bf7"/>
      <stop offset="100%" stop-color="#3867d6"/>
    </linearGradient>

    <filter id="cardShadow2" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.55"/>
    </filter>
    
    <marker id="arrowBlue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#699bf7"/>
    </marker>
    <marker id="arrowGreen2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2eb872"/>
    </marker>
    <marker id="arrowAmber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#e5a54b"/>
    </marker>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bgGrad2)"/>
  
  <!-- Outer Frame -->
  <rect x="30" y="30" width="${width - 60}" height="${height - 60}" rx="20" fill="none" stroke="#223145" stroke-width="1.5"/>

  <!-- Header Banner -->
  <g transform="translate(60, 65)">
    <text x="0" y="24" fill="#699bf7" font-family="Georgia, serif" font-size="13" letter-spacing="3" font-weight="bold">RADIATE BEAUTY — ARSITEKTUR WORKFLOW BISNIS (ADVANCE)</text>
    <text x="0" y="60" fill="#f8f1e6" font-family="Georgia, serif" font-size="28" font-weight="normal">Alur WA &amp; Invoice: Versi Otomasi Penuh (WABA &amp; Payment Gateway API)</text>
    <text x="0" y="90" fill="#8e9eb3" font-family="Arial, sans-serif" font-size="13">Skala volume tinggi (&gt;100 pesanan/hari), Dynamic QRIS, WhatsApp Business Cloud API, Auto-Fulfillment, &amp; CRM Retensi.</text>
    
    <!-- Badge -->
    <rect x="${width - 340}" y="15" width="220" height="42" rx="21" fill="#1b283b" stroke="#385175" stroke-width="1.5"/>
    <circle cx="${width - 315}" cy="36" r="6" fill="#699bf7"/>
    <text x="${width - 295}" y="41" fill="#e1ecf7" font-family="Arial, sans-serif" font-size="12" font-weight="bold">VERSI 2: ADVANCE / SCALE</text>
  </g>

  <!-- Swimlane Headers -->
  <!-- Col 1: Web & Headless Checkout -->
  <g transform="translate(60, 200)">
    <rect width="345" height="50" rx="10" fill="#182333" stroke="#2c3e59" stroke-width="1"/>
    <rect x="14" y="15" width="6" height="20" rx="3" fill="#699bf7"/>
    <text x="30" y="32" fill="#e1ecf7" font-family="Georgia, serif" font-size="15" font-weight="bold">1. WEB APP &amp; DB</text>
    <text x="30" y="44" fill="#8e9eb3" font-family="Arial, sans-serif" font-size="10">Next.js API + PostgreSQL</text>
  </g>

  <!-- Col 2: Payment Gateway API -->
  <g transform="translate(435, 200)">
    <rect width="345" height="50" rx="10" fill="#182333" stroke="#2c3e59" stroke-width="1"/>
    <rect x="14" y="15" width="6" height="20" rx="3" fill="#e5a54b"/>
    <text x="30" y="32" fill="#e1ecf7" font-family="Georgia, serif" font-size="15" font-weight="bold">2. PAYMENT GATEWAY</text>
    <text x="30" y="44" fill="#8e9eb3" font-family="Arial, sans-serif" font-size="10">Midtrans / Xendit / QRIS</text>
  </g>

  <!-- Col 3: WABA (Cloud API) -->
  <g transform="translate(810, 200)">
    <rect width="345" height="50" rx="10" fill="#182333" stroke="#2c3e59" stroke-width="1"/>
    <rect x="14" y="15" width="6" height="20" rx="3" fill="#2eb872"/>
    <text x="30" y="32" fill="#e1ecf7" font-family="Georgia, serif" font-size="15" font-weight="bold">3. WHATSAPP CLOUD API</text>
    <text x="30" y="44" fill="#8e9eb3" font-family="Arial, sans-serif" font-size="10">Meta WABA Verified Bot</text>
  </g>

  <!-- Col 4: Logistics & Warehouse -->
  <g transform="translate(1185, 200)">
    <rect width="345" height="50" rx="10" fill="#182333" stroke="#2c3e59" stroke-width="1"/>
    <rect x="14" y="15" width="6" height="20" rx="3" fill="#9d72e6"/>
    <text x="30" y="32" fill="#e1ecf7" font-family="Georgia, serif" font-size="15" font-weight="bold">4. LOGISTICS &amp; CRM</text>
    <text x="30" y="44" fill="#8e9eb3" font-family="Arial, sans-serif" font-size="10">Biteship API &amp; Retention</text>
  </g>

  <!-- FLOW STEPS -->

  <!-- STEP 1: Headless Smart Checkout -->
  <g transform="translate(60, 280)" filter="url(#cardShadow2)">
    <rect width="345" height="140" rx="12" fill="#131c29" stroke="#253752" stroke-width="1.5"/>
    <circle cx="30" cy="30" r="13" fill="#202e42"/>
    <text x="30" y="35" fill="#699bf7" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">1</text>
    <text x="54" y="35" fill="#fcf8f2" font-family="Georgia, serif" font-size="15" font-weight="bold">Smart Checkout + DB Sync</text>
    <text x="20" y="64" fill="#8e9eb3" font-family="Arial, sans-serif" font-size="11">Customer input alamat (autocomplete kelurahan/kodepos).</text>
    <text x="20" y="80" fill="#8e9eb3" font-family="Arial, sans-serif" font-size="11">DB mencatat Order: <tspan fill="#e5a54b" font-weight="bold">STATUS: PENDING</tspan></text>
    <rect x="20" y="94" width="305" height="30" rx="6" fill="#1a273b"/>
    <text x="30" y="113" fill="#90caf9" font-family="Courier, monospace" font-size="11">POST /api/orders &gt;&gt; DB Saved</text>
  </g>

  <!-- Arrow Step 1 to Step 2 (Payment Gateway API) -->
  <path d="M 405 350 L 435 350" stroke="#699bf7" stroke-width="2" fill="none" marker-end="url(#arrowBlue)"/>

  <!-- STEP 2: PG Dynamic QRIS & VA -->
  <g transform="translate(435, 280)" filter="url(#cardShadow2)">
    <rect width="345" height="140" rx="12" fill="#131c29" stroke="#253752" stroke-width="1.5"/>
    <circle cx="30" cy="30" r="13" fill="#202e42"/>
    <text x="30" y="35" fill="#e5a54b" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">2</text>
    <text x="54" y="35" fill="#fcf8f2" font-family="Georgia, serif" font-size="15" font-weight="bold">Dynamic Payment Generation</text>
    <text x="20" y="64" fill="#8e9eb3" font-family="Arial, sans-serif" font-size="11">Sistem request payment link ke Midtrans/Xendit.</text>
    <text x="20" y="80" fill="#8e9eb3" font-family="Arial, sans-serif" font-size="11">Menghasilkan: QRIS Dinamis + Virtual Account BCA/BRI</text>
    <rect x="20" y="94" width="305" height="30" rx="6" fill="#2d2215"/>
    <text x="30" y="113" fill="#f0c27b" font-family="Arial, sans-serif" font-size="11">Countdown Timer Bayar: 60 Menit</text>
  </g>

  <!-- Arrow Step 2 to Step 3 (WABA Notification) -->
  <path d="M 780 350 L 810 350" stroke="#699bf7" stroke-width="2" fill="none" marker-end="url(#arrowBlue)"/>

  <!-- STEP 3: Automated WA Cloud API Dispatch -->
  <g transform="translate(810, 280)" filter="url(#cardShadow2)">
    <rect width="345" height="140" rx="12" fill="#131c29" stroke="#253752" stroke-width="1.5"/>
    <circle cx="30" cy="30" r="13" fill="#202e42"/>
    <text x="30" y="35" fill="#2eb872" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">3</text>
    <text x="54" y="35" fill="#fcf8f2" font-family="Georgia, serif" font-size="15" font-weight="bold">Trigger WhatsApp Template Resmi</text>
    <text x="20" y="64" fill="#8e9eb3" font-family="Arial, sans-serif" font-size="11">Bukan wa.me manual! Server menembakkan WA API.</text>
    <text x="20" y="80" fill="#8e9eb3" font-family="Arial, sans-serif" font-size="11">Customer menerima WA bercentang hijau:</text>
    <rect x="20" y="94" width="305" height="30" rx="6" fill="#163824"/>
    <text x="30" y="113" fill="#75e09f" font-family="Arial, sans-serif" font-size="11">Pesan Invoice + Tombol Interaktif Bayar</text>
  </g>

  <!-- Arrow Step 3 to Customer Action below -->
  <path d="M 982 420 L 982 485" stroke="#2eb872" stroke-width="2" fill="none" marker-end="url(#arrowGreen2)"/>

  <!-- STEP 4: Customer Completes Payment -->
  <g transform="translate(810, 485)" filter="url(#cardShadow2)">
    <rect width="345" height="140" rx="12" fill="#131c29" stroke="#253752" stroke-width="1.5"/>
    <circle cx="30" cy="30" r="13" fill="#202e42"/>
    <text x="30" y="35" fill="#2eb872" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">4</text>
    <text x="54" y="35" fill="#fcf8f2" font-family="Georgia, serif" font-size="15" font-weight="bold">User Membayar (QRIS / VA / COD)</text>
    <text x="20" y="64" fill="#8e9eb3" font-family="Arial, sans-serif" font-size="11">User scan QRIS di HP atau bayar via Virtual Account.</text>
    <text x="20" y="80" fill="#8e9eb3" font-family="Arial, sans-serif" font-size="11">Pembayaran terverifikasi real-time (&lt; 2 detik).</text>
    <rect x="20" y="94" width="305" height="30" rx="6" fill="#192a3d"/>
    <text x="30" y="113" fill="#699bf7" font-family="Arial, sans-serif" font-size="11">Zero manual check: Tidak perlu upload struk!</text>
  </g>

  <!-- Arrow Step 4 Left to Webhook (Col 2 & Col 1) -->
  <path d="M 810 555 L 780 555" stroke="#2eb872" stroke-width="2" fill="none" marker-end="url(#arrowGreen2)"/>

  <!-- STEP 5: PG Webhook Callback -->
  <g transform="translate(435, 485)" filter="url(#cardShadow2)">
    <rect width="345" height="140" rx="12" fill="#131c29" stroke="#235c3a" stroke-width="1.5"/>
    <circle cx="30" cy="30" r="13" fill="#163824"/>
    <text x="30" y="35" fill="#46d689" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">5</text>
    <text x="54" y="35" fill="#fcf8f2" font-family="Georgia, serif" font-size="15" font-weight="bold">Instant Webhook Callback</text>
    <text x="20" y="64" fill="#8e9eb3" font-family="Arial, sans-serif" font-size="11">Gateway menembak endpoint Next.js:</text>
    <text x="20" y="80" fill="#75e09f" font-family="Courier, monospace" font-size="11">POST /api/webhooks/payment</text>
    <rect x="20" y="94" width="305" height="30" rx="6" fill="#172b1d"/>
    <text x="30" y="113" fill="#46d689" font-family="Arial, sans-serif" font-size="11" font-weight="bold">STATUS DATABASE: PAID (LUNAS)</text>
  </g>

  <!-- Arrow Step 5 to Step 6 (Logistics Automation) -->
  <path d="M 435 555 L 300 555 L 300 680 L 1185 680" stroke="#699bf7" stroke-width="2" fill="none" marker-end="url(#arrowBlue)"/>

  <!-- STEP 6: Auto-Fulfillment & Courier Booking -->
  <g transform="translate(1185, 485)" filter="url(#cardShadow2)">
    <rect width="345" height="140" rx="12" fill="#131c29" stroke="#253752" stroke-width="1.5"/>
    <circle cx="30" cy="30" r="13" fill="#202e42"/>
    <text x="30" y="35" fill="#9d72e6" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">6</text>
    <text x="54" y="35" fill="#fcf8f2" font-family="Georgia, serif" font-size="15" font-weight="bold">Logistics API &amp; Auto-Booking</text>
    <text x="20" y="64" fill="#8e9eb3" font-family="Arial, sans-serif" font-size="11">Backend otomatis request Airway Bill (AWB) ke kurir:</text>
    <text x="20" y="80" fill="#d1b8f7" font-family="Courier, monospace" font-size="11">Resi: JNT-ID8829103982</text>
    <rect x="20" y="94" width="305" height="30" rx="6" fill="#241a38"/>
    <text x="30" y="113" fill="#d1b8f7" font-family="Arial, sans-serif" font-size="11">Printer thermal gudang langsung auto-cetak resi</text>
  </g>

  <!-- Step 7: Post-Purchase Automated WhatsApp Updates & CRM -->
  <g transform="translate(1185, 655)" filter="url(#cardShadow2)">
    <rect width="345" height="120" rx="12" fill="#131c29" stroke="#385175" stroke-width="1.5"/>
    <circle cx="30" cy="30" r="13" fill="#202e42"/>
    <text x="30" y="35" fill="#699bf7" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">7</text>
    <text x="54" y="35" fill="#fcf8f2" font-family="Georgia, serif" font-size="15" font-weight="bold">WA Tracking &amp; CRM Retensi</text>
    <text x="20" y="60" fill="#8e9eb3" font-family="Arial, sans-serif" font-size="11">1. Saat pickup: WA kirim Link Live Tracking Resi</text>
    <text x="20" y="78" fill="#8e9eb3" font-family="Arial, sans-serif" font-size="11">2. Hari ke-3: WA kirim tips cara pakai skincare</text>
    <text x="20" y="96" fill="#75e09f" font-family="Arial, sans-serif" font-size="11">3. Hari ke-25: WA kirim reminder Re-Order + Voucher</text>
  </g>

  <!-- Arrow between Step 6 & Step 7 -->
  <path d="M 1357 625 L 1357 655" stroke="#699bf7" stroke-width="2" fill="none" marker-end="url(#arrowBlue)"/>

  <!-- Bottom Evaluation Summary Box (Advance) -->
  <g transform="translate(60, 810)">
    <rect width="${width - 120}" height="220" rx="16" fill="#101724" stroke="#253752" stroke-width="1.5"/>
    <text x="30" y="35" fill="#90caf9" font-family="Georgia, serif" font-size="18" font-weight="bold">EVALUASI STRATEGIS &amp; DATA PROBABILITAS BISNIS (VERSI ADVANCE):</text>
    
    <g transform="translate(30, 65)">
      <!-- Col 1 -->
      <rect width="330" height="125" rx="10" fill="#162030" stroke="#25354d" stroke-width="1"/>
      <text x="18" y="28" fill="#75e09f" font-family="Arial, sans-serif" font-size="13" font-weight="bold">Nilai Tambah &amp; Efisiensi</text>
      <text x="18" y="52" fill="#d1e0f0" font-family="Arial, sans-serif" font-size="11">✓ Zero Human Error: Rekonsiliasi 100% akurat</text>
      <text x="18" y="72" fill="#d1e0f0" font-family="Arial, sans-serif" font-size="11">✓ Instant Fulfillment: Resi terbit dalam 3 detik</text>
      <text x="18" y="92" fill="#d1e0f0" font-family="Arial, sans-serif" font-size="11">✓ Repeat Order Naik: 28% via CRM WhatsApp</text>
      <text x="18" y="112" fill="#d1e0f0" font-family="Arial, sans-serif" font-size="11">✓ 24/7 Transaksi: Checkout aktif tengah malam</text>
    </g>

    <g transform="translate(390, 65)">
      <!-- Col 2 -->
      <rect width="330" height="125" rx="10" fill="#162030" stroke="#25354d" stroke-width="1"/>
      <text x="18" y="28" fill="#e5a54b" font-family="Arial, sans-serif" font-size="13" font-weight="bold">Struktur Biaya &amp; Margin</text>
      <text x="18" y="52" fill="#d1e0f0" font-family="Arial, sans-serif" font-size="11">• Biaya Gateway: QRIS ~0.7%, VA ~Rp4.000/trx</text>
      <text x="18" y="72" fill="#d1e0f0" font-family="Arial, sans-serif" font-size="11">• Biaya WABA (Meta): ~Rp450 - Rp600 per percakapan</text>
      <text x="18" y="92" fill="#d1e0f0" font-family="Arial, sans-serif" font-size="11">• Skala Balik Modal: Worth it jika &gt; 100 order/hari</text>
      <text x="18" y="112" fill="#d1e0f0" font-family="Arial, sans-serif" font-size="11">• Penghematan SDM: Pangkas 3 CS senilai ~Rp12jt/bln</text>
    </g>

    <g transform="translate(750, 65)">
      <!-- Col 3 -->
      <rect width="330" height="125" rx="10" fill="#162030" stroke="#25354d" stroke-width="1"/>
      <text x="18" y="28" fill="#e07575" font-family="Arial, sans-serif" font-size="13" font-weight="bold">Risiko &amp; Mitigasi</text>
      <text x="18" y="52" fill="#d1e0f0" font-family="Arial, sans-serif" font-size="11">! Risiko Blokir Meta: WABA harus verified centang hijau</text>
      <text x="18" y="72" fill="#d1e0f0" font-family="Arial, sans-serif" font-size="11">! Webhook Gagal: Butuh retry logic &amp; cron polling</text>
      <text x="18" y="92" fill="#d1e0f0" font-family="Arial, sans-serif" font-size="11">! Pembeli Gaptek: Tetap sediakan tombol fallback</text>
      <text x="18" y="112" fill="#d1e0f0" font-family="Arial, sans-serif" font-size="11">   "Bicara dengan Beauty Advisor Manusia"</text>
    </g>

    <g transform="translate(1110, 65)">
      <!-- Col 4 -->
      <rect width="330" height="125" rx="10" fill="#162030" stroke="#25354d" stroke-width="1"/>
      <text x="18" y="28" fill="#699bf7" font-family="Arial, sans-serif" font-size="13" font-weight="bold">Rekomendasi Implementasi</text>
      <text x="18" y="52" fill="#d1e0f0" font-family="Arial, sans-serif" font-size="11">Tahap 1: Mulai dengan Versi Standar dulu</text>
      <text x="18" y="72" fill="#d1e0f0" font-family="Arial, sans-serif" font-size="11">Tahap 2: Tambah database &amp; payment gateway</text>
      <text x="18" y="92" fill="#d1e0f0" font-family="Arial, sans-serif" font-size="11">Tahap 3: Sambungkan WABA &amp; API Kurir</text>
      <text x="18" y="112" fill="#d1e0f0" font-family="Arial, sans-serif" font-size="11">Fokus pada stabilitas unit economics bisnis!</text>
    </g>
  </g>
</svg>`;
}

async function renderFlowcharts() {
  const standarSvg = generateStandarSvg();
  const advanceSvg = generateAdvanceSvg();

  const outStandar = path.join(__dirname, 'flowchart-wa-invoice-standar.png');
  const outAdvance = path.join(__dirname, 'flowchart-wa-invoice-advance.png');

  console.log('Generating Standar Flowchart PNG...');
  await sharp(Buffer.from(standarSvg)).png({ quality: 100 }).toFile(outStandar);
  console.log('Saved:', outStandar);

  console.log('Generating Advance Flowchart PNG...');
  await sharp(Buffer.from(advanceSvg)).png({ quality: 100 }).toFile(outAdvance);
  console.log('Saved:', outAdvance);

  console.log('All Flowchart PNGs generated successfully!');
}

renderFlowcharts().catch(err => {
  console.error('Error rendering flowcharts:', err);
  process.exit(1);
});
