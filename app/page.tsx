'use client'

import { useState, useId, useEffect } from 'react'
import Image from 'next/image'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Droplets,
  Menu,
  MessageCircle,
  Search,
  ShoppingBag,
  Sparkles,
  SunMoon,
  Truck,
  X
} from 'lucide-react'

const series = [
  {
    name: 'Glow Series',
    focus: 'For Dull Skin',
    price: 'Rp709.000',
    formula: 'Niacinamide + Tranexamic Acid',
    image: '/product_glow.jpg',
    desc: 'Membantu mencerahkan kulit, menyamarkan tampilan noda, dan membuat kulit tampak lebih bercahaya.'
  },
  {
    name: 'Clear Series',
    focus: 'For Acne-Prone Skin',
    price: 'Rp729.000',
    formula: 'Salicylic Acid + Niacinamide',
    image: '/product_clear.jpg',
    desc: 'Membantu menjaga kulit tetap bersih, menenangkan kemerahan, dan mengurangi tampilan pori-pori.'
  },
  {
    name: 'Hydrate Series',
    focus: 'For Dry & Dehydrated Skin',
    price: 'Rp749.000',
    formula: 'Hyaluronic Acid + Ceramide',
    image: '/product_hydrate.jpg',
    desc: 'Melembapkan kulit secara mendalam, menjaga skin barrier, dan membuat kulit terasa lebih kenyal.'
  },
  {
    name: 'Renew Series',
    focus: 'For Uneven Texture & Early Signs of Aging',
    price: 'Rp779.000',
    formula: 'Retinol + Peptides',
    image: '/product_renew.jpg',
    desc: 'Membantu meratakan tekstur kulit, menjaga elastisitas, dan menyamarkan tanda-tanda penuaan dini.'
  },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
      offset: 50,
    })

    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 25)

      const winScroll = document.documentElement.scrollTop || document.body.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      if (height > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (winScroll / height) * 100)))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const [orderOpen, setOrderOpen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [currentInvoice, setCurrentInvoice] = useState<{
    id: string
    date: string
    name: string
    phone: string
    address: string
    note: string
    seriesName: string
    seriesFocus: string
    seriesFormula: string
    price: string
  } | null>(null)

  const [quizOpen, setQuizOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [quizProblem, setQuizProblem] = useState('kusam')
  const [selected, setSelected] = useState(series[0])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [note, setNote] = useState('')
  const [toastMsg, setToastMsg] = useState('')

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 2800)
  }

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    setSearchOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const generateUniqueInvoiceId = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const random4 = Math.floor(1000 + Math.random() * 9000)
    return `RB-${year}${month}${day}-${random4}`
  }

  const formatIndonesianDate = (d = new Date()) => {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ]
    const day = d.getDate()
    const month = months[d.getMonth()]
    const year = d.getFullYear()
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    return `${day} ${month} ${year} pukul ${hours}.${minutes}`
  }

  const openOrder = (item = series[0]) => {
    setSelected(item)
    setOrderOpen(true)
  }

  const handleCreateInvoice = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!name.trim()) {
      showToast('Lengkapi Nama Lengkap terlebih dahulu.')
      return
    }
    if (!phone.trim()) {
      showToast('Lengkapi Nomor WhatsApp terlebih dahulu.')
      return
    }
    if (!address.trim()) {
      showToast('Lengkapi Alamat Lengkap Pengiriman terlebih dahulu.')
      return
    }

    const newInvoice = {
      id: generateUniqueInvoiceId(),
      date: formatIndonesianDate(new Date()),
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      note: note.trim(),
      seriesName: selected.name,
      seriesFocus: selected.focus,
      seriesFormula: selected.formula,
      price: selected.price
    }

    setCurrentInvoice(newInvoice)

    try {
      const history = JSON.parse(localStorage.getItem('rb_invoices_history') || '[]')
      history.unshift(newInvoice)
      localStorage.setItem('rb_invoices_history', JSON.stringify(history.slice(0, 50)))
    } catch {
      // LocalStorage fallback
    }

    setOrderOpen(false)
    setPreviewOpen(true)
    showToast(`Invoice ${newInvoice.id} siap dipratinjau & diunduh!`)
  }

  const sendInvoiceToWhatsApp = (inv: typeof currentInvoice) => {
    if (!inv) return
    const noteText = inv.note && inv.note.trim() ? inv.note.trim() : '-'
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://radiatebeauty.co'
    const invoiceUrl = `${origin}/invoice?id=${encodeURIComponent(inv.id)}&name=${encodeURIComponent(inv.name)}&phone=${encodeURIComponent(inv.phone)}&addr=${encodeURIComponent(inv.address)}&series=${encodeURIComponent(inv.seriesName)}&price=${encodeURIComponent(inv.price)}&formula=${encodeURIComponent(inv.seriesFormula)}&focus=${encodeURIComponent(inv.seriesFocus)}&date=${encodeURIComponent(inv.date)}${inv.note ? `&note=${encodeURIComponent(inv.note)}` : ''}`

    const lines = [
      'Halo Admin Radiate Beauty, saya ingin konfirmasi order dari website:',
      '',
      `*No. Invoice:* ${inv.id}`,
      `*Tanggal:* ${inv.date}`,
      `*Nama:* ${inv.name}`,
      `*WhatsApp:* ${inv.phone}`,
      `*Alamat:* ${inv.address}`,
      `*Produk:* ${inv.seriesName}`,
      `*Total:* ${inv.price}`,
      `*Catatan:* ${noteText}`,
      '',
      '📄 *Lihat & Unduh Invoice PDF Resmi:*',
      invoiceUrl,
      '',
      'Mohon verifikasi pesanan dan petunjuk rekening pembayarannya. Terima kasih!'
    ]
    const message = lines.join('\n')
    window.open(`https://wa.me/6287780831499?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  const handlePrint = () => {
    if (!currentInvoice) return
    const originalTitle = document.title
    document.title = `Invoice_${currentInvoice.id}`
    window.print()
    document.title = originalTitle
  }

  const handleQuizSubmit = () => {
    setQuizOpen(false)
    const map: Record<string, string> = {
      kusam: 'Glow Series',
      berjerawat: 'Clear Series',
      kering: 'Hydrate Series',
      tekstur: 'Renew Series'
    }
    const target = series.find(s => s.name === map[quizProblem]) || series[0]
    openOrder(target)
    showToast(`Rekomendasi untukmu: ${target.name}`)
  }

  const filteredSeries = series.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.focus.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.desc.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const renderAdminInvoice = (inv: NonNullable<typeof currentInvoice>) => (
    <div id="printable-invoice" className="admin-invoice-document">
      {/* 1. KOP SURAT RESMI PERUSAHAAN & FAKTUR BADGE */}
      <div className="adm-header">
        <div className="adm-company">
          <div className="adm-logo-row">
            <span className="adm-brand-name">RADIATE BEAUTY</span>
            <span className="adm-legal-entity">PT RADIATE NUSANTARA KOSMETIKA</span>
          </div>
          <p className="adm-company-desc">
            Authorized Official Store & Dermatological Skincare Distribution
          </p>
          <p className="adm-company-addr">
            One Pacific Place Level 15, SCBD Sudirman, Jakarta Selatan 12190<br />
            NPWP: 01.345.678.9-012.000 · WhatsApp: +62 877-8083-1499 · cs@radiatebeauty.co.id
          </p>
        </div>

        <div className="adm-invoice-meta-box">
          <div className="adm-faktur-title">FAKTUR PENJUALAN</div>
          <div className="adm-faktur-subtitle">OFFICIAL SALES INVOICE</div>
          
          <table className="adm-meta-table">
            <tbody>
              <tr>
                <td>No. Invoice</td>
                <td>:</td>
                <td className="adm-meta-highlight">{inv.id}</td>
              </tr>
              <tr>
                <td>Tanggal</td>
                <td>:</td>
                <td>{inv.date}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>:</td>
                <td><span className="adm-status-badge">MENUNGGU KONFIRMASI</span></td>
              </tr>
              <tr>
                <td>Metode</td>
                <td>:</td>
                <td>Transfer Bank / WhatsApp</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="adm-divider-thick" />

      {/* 2. DUA KOLOM INFORMASI PIHAK TRANSAKSI (BILL TO & SHIP TO) */}
      <div className="adm-parties-grid">
        <div className="adm-party-card">
          <div className="adm-party-header">TAGIHAN KEPADA (BILLED TO / PELANGGAN)</div>
          <div className="adm-party-body">
            <div className="adm-party-row">
              <span className="lbl">Nama Lengkap</span>
              <span className="val bold">{inv.name}</span>
            </div>
            <div className="adm-party-row">
              <span className="lbl">No. WhatsApp/Telp</span>
              <span className="val">{inv.phone}</span>
            </div>
            <div className="adm-party-row">
              <span className="lbl">Saluran Transaksi</span>
              <span className="val">Website Resmi (radiatebeauty.co)</span>
            </div>
          </div>
        </div>

        <div className="adm-party-card">
          <div className="adm-party-header">TUJUAN PENGIRIMAN (SHIPPED TO / ALAMAT)</div>
          <div className="adm-party-body">
            <div className="adm-party-row">
              <span className="lbl">Alamat Pengiriman</span>
              <span className="val bold" style={{ whiteSpace: 'pre-wrap' }}>{inv.address}</span>
            </div>
            <div className="adm-party-row">
              <span className="lbl">Metode Logistik</span>
              <span className="val">Kurir Reguler Express (Subsidi Bebas Ongkir)</span>
            </div>
            {inv.note ? (
              <div className="adm-party-row">
                <span className="lbl">Catatan Tambahan</span>
                <span className="val italic">“{inv.note}”</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* 3. TABEL RINCIAN ITEM PRODUK (ADMINISTRATIVE DATA TABLE) */}
      <div className="adm-table-wrap">
        <table className="adm-item-table">
          <thead>
            <tr>
              <th style={{ width: '6%', textAlign: 'center' }}>NO</th>
              <th style={{ width: '48%', textAlign: 'left' }}>DESKRIPSI PRODUK & SPESIFIKASI FORMULA</th>
              <th style={{ width: '12%', textAlign: 'center' }}>QTY</th>
              <th style={{ width: '17%', textAlign: 'right' }}>HARGA SATUAN</th>
              <th style={{ width: '17%', textAlign: 'right' }}>SUBTOTAL (IDR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: 'center', verticalAlign: 'top' }}>01</td>
              <td style={{ verticalAlign: 'top' }}>
                <strong className="adm-product-name">{inv.seriesName} (Paket Lengkap Skincare)</strong>
                <div className="adm-product-sub">
                  Formula Aktif: {inv.seriesFormula}<br />
                  Fokus Perawatan: {inv.seriesFocus}
                </div>
              </td>
              <td style={{ textAlign: 'center', verticalAlign: 'top' }}>1 Paket</td>
              <td style={{ textAlign: 'right', verticalAlign: 'top' }}>{inv.price}</td>
              <td style={{ textAlign: 'right', verticalAlign: 'top', fontWeight: 700 }}>{inv.price}</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center', verticalAlign: 'top' }}>02</td>
              <td style={{ verticalAlign: 'top' }}>
                <strong className="adm-product-name">Biaya Pengiriman (Seluruh Indonesia)</strong>
                <div className="adm-product-sub">Promo Subsidi Bebas Ongkos Kirim Pesanan Pertama</div>
              </td>
              <td style={{ textAlign: 'center', verticalAlign: 'top' }}>1 Layanan</td>
              <td style={{ textAlign: 'right', verticalAlign: 'top' }}>Rp0</td>
              <td style={{ textAlign: 'right', verticalAlign: 'top', fontWeight: 700, color: '#1f6e37' }}>GRATIS</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 4. REKAPITULASI BIAYA & CATATAN RESMI ADMINISTRASI */}
      <div className="adm-footer-grid">
        <div className="adm-terms-col">
          <div className="adm-terms-title">CATATAN & PETUNJUK ADMINISTRASI:</div>
          <ol className="adm-terms-list">
            <li>Invoice ini merupakan dokumen bukti pemesanan yang diterbitkan secara elektronik dan sah oleh sistem Radiate Beauty.</li>
            <li>Silakan konfirmasi pesanan ini melalui WhatsApp resmi (+62 877-8083-1499) untuk alokasi stok dan petunjuk rekening pembayaran resmi.</li>
            <li>Pesanan akan diproses pengirimannya dalam waktu 1x24 jam setelah pembayaran tervalidasi.</li>
          </ol>
          <div className="adm-stamp-box">
            <span className="stamp-line-1">RADIATE BEAUTY INDONESIA</span>
            <span className="stamp-line-2">ELECTRONICALLY GENERATED & VERIFIED</span>
            <span className="stamp-date">{inv.date}</span>
          </div>
        </div>

        <div className="adm-calc-col">
          <div className="adm-calc-row">
            <span>Subtotal Produk:</span>
            <span>{inv.price}</span>
          </div>
          <div className="adm-calc-row">
            <span>Biaya Pengiriman:</span>
            <span>Rp0</span>
          </div>
          <div className="adm-calc-row">
            <span>Diskon / Potongan:</span>
            <span>- Rp0</span>
          </div>
          <div className="adm-calc-total">
            <span className="ttl-label">TOTAL TAGIHAN:</span>
            <span className="ttl-val">{inv.price}</span>
          </div>
          <div className="adm-terbilang">
            *Semua harga sudah termasuk pajak sesuai regulasi yang berlaku
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* ISOLATED PRINT DOCUMENT (ONLY RENDERED DURING BROWSER PRINT - STRICTLY 1 PAGE A4) */}
      {currentInvoice && (
        <div id="print-invoice-root" aria-hidden="true">
          {renderAdminInvoice(currentInvoice)}
        </div>
      )}

      <main className="site-shell">
      {/* TOP NAVBAR (STICKY WITH SMOOTH LUXURY SCROLL ANIMATION) */}
      <header className={`hero-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="hero-header-inner">
          {/* Left: Hamburger Button & Navigation Links */}
          <div className="hero-header-left">
            <button
              className="hero-hamburger-btn"
              onClick={() => setMenuOpen(true)}
              aria-label="Buka menu navigasi"
              title="Menu"
            >
              <Menu size={22} />
            </button>

            <nav className="hero-nav-menu" aria-label="Navigasi Utama">
              <button onClick={() => scrollTo('home')} className="hero-nav-item">Home</button>
              <button onClick={() => scrollTo('our-story')} className="hero-nav-item">Our Story</button>
              <button onClick={() => scrollTo('shop')} className="hero-nav-item">Shop</button>
              <button onClick={() => scrollTo('skin-guide')} className="hero-nav-item">Skin Guide</button>
              <button onClick={() => scrollTo('journal')} className="hero-nav-item">Journal</button>
              <button onClick={() => scrollTo('faq')} className="hero-nav-item">FAQ</button>
            </nav>
          </div>

          {/* Center: Brand Cursive Logo */}
          <div className="hero-header-center">
            <button
              onClick={() => scrollTo('home')}
              className="hero-logo-btn"
              aria-label="Radiate Beauty Home"
              title="Radiate Beauty"
            >
              <Image
                src="/logo-radiate-beauty.png"
                alt="Radiate Beauty.co"
                className="hero-brand-logo"
                width={200}
                height={50}
                priority
              />
            </button>
          </div>

          {/* Right: Help, Contact, Search, Cart, Indonesia Flag */}
          <div className="hero-header-right">
            <div className="hero-subnav">
              <button onClick={() => scrollTo('faq')} className="hero-nav-item">Help</button>
              <span className="hero-nav-separator">·</span>
              <button
                onClick={() => window.open('https://wa.me/6287780831499', '_blank', 'noopener,noreferrer')}
                className="hero-nav-item"
              >
                Contact Us
              </button>
            </div>

            <div className="hero-action-icons">
              <button
                className="hero-icon-btn"
                onClick={() => setSearchOpen(true)}
                aria-label="Cari produk atau artikel"
                title="Cari Produk / Panduan"
              >
                <Search size={18} />
              </button>

              <button
                className="hero-icon-btn"
                onClick={() => openOrder()}
                aria-label="Keranjang Belanja"
                title="Keranjang & Order"
              >
                <ShoppingBag size={18} />
                <span className="hero-cart-badge">0</span>
              </button>

              <div
                className="hero-flag-btn"
                onClick={() => showToast('Radiate Beauty melayani pengiriman ke seluruh Indonesia')}
                title="Indonesia (IDR) — Melayani Pengiriman Seluruh Indonesia"
              >
                <div className="flag-id">
                  <span className="flag-red" />
                  <span className="flag-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle luminous scroll progress line on sticky navbar */}
        <div
          className="navbar-scroll-progress"
          style={{ width: `${scrollProgress}%` }}
        />
      </header>

      {/* HERO SECTION - 100% Professional Mockup Match with Ambient Video Background */}
      <section id="home" className="hero-section">
        {/* Background video looping no sound */}
        <video
          className="hero-video-bg"
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-bg-luxury.jpg"
          preload="auto"
        >
          <source src="/Video%20Project%2013.mp4" type="video/mp4" />
        </video>

        {/* Soft atmospheric gradients for contrast and readability */}
        <div className="hero-overlay-gradient" />

        {/* HERO MAIN BODY */}
        <div className="hero-container">
          {/* Left Column: Heading & Description */}
          <div className="hero-content" data-aos="fade-up">
            <p className="hero-eyebrow">SKINCARE FOR A BRIGHTER YOU</p>
            <h1 className="hero-title">
              Your Skin,<br />
              <span>Your Radiance</span>
            </h1>
            <p className="hero-desc">
              Radiate Beauty hadir untuk menemani setiap langkah perawatan kulitmu,
              dengan formula yang lembut, efektif, dan disesuaikan untuk kebutuhan kulitmu.
            </p>

            {/* Mobile Dedicated 16:9 Cinematic Video Showcase */}
            <div className="hero-mobile-video-frame">
              <video
                className="hero-mobile-video-player"
                autoPlay
                loop
                muted
                playsInline
                poster="/hero-bg-luxury.jpg"
                preload="auto"
              >
                <source src="/Video%20Project%2013.mp4" type="video/mp4" />
              </video>
              <div className="hero-video-badge">
                <span className="hero-badge-dot" />
                <span>16:9 Cinematic</span>
              </div>
            </div>

            <button
              className="hero-cta-btn"
              onClick={() => scrollTo('shop')}
              title="Lihat Semua Skincare Series"
            >
              <span>EXPLORE OUR SERIES</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Right Column: 3 Feature Badges */}
          <aside className="hero-features" aria-label="Keunggulan Radiate Beauty" data-aos="fade-left" data-aos-delay="200">
            <button
              className="hero-feature-item"
              onClick={() => scrollTo('shop')}
              title="Lihat 4 Skincare Series"
            >
              <span className="feature-icon-circle">
                <Droplets size={17} />
              </span>
              <span className="feature-label">4 Skin Series</span>
            </button>

            <button
              className="hero-feature-item"
              onClick={() => scrollTo('our-story')}
              title="Lihat 4 Essential Steps"
            >
              <span className="feature-icon-circle">
                <Sparkles size={17} />
              </span>
              <span className="feature-label">4 Essential Steps</span>
            </button>

            <button
              className="hero-feature-item"
              onClick={() => scrollTo('journal')}
              title="Day to Night Skincare Routine"
            >
              <span className="feature-icon-circle">
                <SunMoon size={17} />
              </span>
              <span className="feature-label">Day to Night</span>
            </button>
          </aside>

          {/* Bottom-Right Floating Shipping Card */}
          <div
            className="hero-shipping-card"
            data-aos="fade-up"
            data-aos-delay="400"
            onClick={() => {
              openOrder();
              showToast('🎉 Promo Gratis Ongkir aktif untuk pesanan pertamamu!');
            }}
            title="Gratis Ongkos Kirim Pesanan Pertama"
          >
            <Truck size={17} className="shipping-truck-icon" />
            <span>Free shipping on your first order!</span>
          </div>
        </div>
      </section>

      {/* Interactive Search Modal */}
      {searchOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(e) => e.target === e.currentTarget && setSearchOpen(false)}
        >
          <div className="search-dialog" role="dialog" aria-modal="true" aria-label="Pencarian Produk">
            <div className="search-dialog-header">
              <div className="search-input-wrapper">
                <Search size={19} className="search-input-icon" />
                <input
                  type="text"
                  placeholder="Cari series (Glow, Clear...), kandungan (Niacinamide, Retinol...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="search-input-field"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="search-clear-btn" aria-label="Hapus kata kunci">
                    <X size={16} />
                  </button>
                )}
              </div>
              <button onClick={() => setSearchOpen(false)} className="search-close-btn" aria-label="Tutup pencarian">
                <X size={20} />
              </button>
            </div>

            <div className="search-results-container">
              <div className="search-section-title">
                {searchQuery ? `HASIL PENCARIAN (${filteredSeries.length})` : 'SKINCARE SERIES KAMI'}
              </div>
              <div className="search-grid">
                {filteredSeries.length > 0 ? (
                  filteredSeries.map((item) => (
                    <div
                      key={item.name}
                      className="search-result-card"
                      onClick={() => {
                        setSearchOpen(false);
                        openOrder(item);
                      }}
                    >
                      <Image src={item.image} alt={item.name} width={60} height={60} />
                      <div>
                        <h4>{item.name}</h4>
                        <p>{item.focus}</p>
                        <small>{item.formula}</small>
                        <strong>{item.price}</strong>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ gridColumn: '1 / -1', padding: '24px 0', textAlign: 'center', color: '#8c7d6b' }}>
                    Tidak ada produk yang cocok dengan &quot;{searchQuery}&quot;. Coba kata kunci lain atau konsultasikan via WhatsApp.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-modal="true">
          <div className="mobile-nav-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Image src="/logo-radiate-beauty.png" alt="Radiate Beauty" width={150} height={32} style={{ height: '32px', width: 'auto' }} />
            </div>
            <button className="icon-button" onClick={() => setMenuOpen(false)} aria-label="Tutup menu">
              <X size={24} />
            </button>
          </div>
          <nav className="mobile-nav-links">
            <button onClick={() => scrollTo('home')}>Home <ArrowRight size={18} /></button>
            <button onClick={() => scrollTo('our-story')}>Our Story <ArrowRight size={18} /></button>
            <button onClick={() => scrollTo('shop')}>Shop / Series <ArrowRight size={18} /></button>
            <button onClick={() => scrollTo('skin-guide')}>Skin Guide & Quiz <ArrowRight size={18} /></button>
            <button onClick={() => scrollTo('journal')}>Journal <ArrowRight size={18} /></button>
            <button onClick={() => scrollTo('faq')}>FAQ & Bantuan <ArrowRight size={18} /></button>
            <button onClick={() => { setMenuOpen(false); setSearchOpen(true); }}>
              Cari Produk <Search size={18} />
            </button>
            <button onClick={() => window.open('https://wa.me/6287780831499', '_blank')}>
              WhatsApp Admin <MessageCircle size={18} />
            </button>
            <button
              onClick={() => { setMenuOpen(false); openOrder(); }}
              style={{ marginTop: '14px', background: 'var(--brown)', color: '#fff', padding: '12px 20px', borderRadius: '999px', justifyContent: 'center' }}
            >
              Order Sekarang
            </button>
          </nav>
        </div>
      )}

      {/* OUR SERIES SECTION */}
      <section id="shop" className="section cream-section">
        <div className="section-heading" data-aos="fade-up">
          <div>
            <p className="eyebrow">SKINCARE SERIES</p>
            <h2>Our Series</h2>
          </div>
          <p>
            Setiap series diformulasikan khusus untuk kebutuhan kulit yang berbeda.<br />
            Pilih series yang sesuai dengan kondisi kulitmu.
          </p>
        </div>
        <div className="series-grid">
          {series.map((item, idx) => (
            <article className="series-card" key={item.name} data-aos="fade-up" data-aos-delay={idx * 150}>
              <div className="card-image">
                <Image src={item.image} alt={`${item.name} product collection`} width={400} height={300} />
              </div>
              <div className="card-body">
                <h3>{item.name}</h3>
                <i>{item.focus}</i>
                <p>{item.desc}</p>
                <small>{item.formula}</small>
                <strong>{item.price}</strong>
                <button className="dark-button" onClick={() => openOrder(item)}>
                  Lihat Detail <ArrowRight size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* BRAND STORY / PHILOSOPHY SECTION with Ambient Looping Video Background */}
      <section id="our-story" className="story-section">
        {/* Background video looping no sound */}
        <video
          className="story-video-bg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/video%20Project%2014.mp4" type="video/mp4" />
        </video>
        <div className="story-overlay" />

        <div className="story-copy" data-aos="fade-right">
          <p className="eyebrow" style={{ color: '#eed69f' }}>BRAND STORY</p>
          <h2>The Radiate Philosophy</h2>
          <p>
            Kami percaya, kulit yang sehat bukan hanya soal penampilan, tapi juga tentang rasa percaya diri.
            Radiate Beauty lahir dari keinginan untuk menghadirkan skincare yang sederhana, berkualitas,
            dan benar-benar bekerja sesuai kebutuhan kulitmu.
          </p>
          <button className="outline-button" onClick={() => scrollTo('shop')}>
            LEARN MORE <ArrowRight size={15} />
          </button>
        </div>
        <div className="story-quote" data-aos="fade-up" data-aos-delay="150">
          Know Your Skin<br />
          Build Your Routine<br />
          Stay Consistent<br />
          <strong>Find Your Radiance</strong>
        </div>
        <div className="steps" data-aos="fade-left" data-aos-delay="300">
          <h3>4 Essential Steps</h3>
          <div className="steps-grid">
            {[
              { step: 'Cleanser', desc: 'Membersihkan kulit dari kotoran dan minyak.' },
              { step: 'Serum', desc: 'Menutrisi dan menargetkan masalah kulit.' },
              { step: 'Day Cream', desc: 'Melindungi dan menjaga kelembapan.' },
              { step: 'Night Cream', desc: 'Memperbaiki dan meregenerasi kulit.' },
            ].map((item, i) => (
              <div key={item.step} className="step-item">
                <b>{i + 1}</b>
                <span>
                  <strong>{item.step}</strong>
                  <small>{item.desc}</small>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKIN GUIDE SECTION - 100% Mockup Match */}
      <section id="skin-guide" className="guide-section">
        <div className="guide-card" data-aos="fade-up">
          <div className="guide-card-content">
            <p className="guide-card-eyebrow">SKIN GUIDE</p>
            <h2 className="guide-card-title">Belum tahu pilih yang mana?</h2>
            <p className="guide-card-desc">
              Jawab beberapa pertanyaan singkat untuk mendapatkan<br className="guide-desc-break" />
              rekomendasi series yang paling sesuai dengan kondisi kulitmu.
            </p>
            <button className="guide-card-cta" onClick={() => setQuizOpen(true)} title="Mulai Skin Quiz">
              <span>Mulai Skin Quiz</span>
              <ArrowRight size={15} />
            </button>
          </div>
          <div className="guide-card-media">
            <Image
              src="/skin-guide-model.jpg"
              alt="Radiate Beauty skin consultation"
              width={700}
              height={500}
              className="guide-card-image"
              priority
            />
          </div>
        </div>

        <div className="compare-wrapper" data-aos="fade-up" data-aos-delay="200">
          <div className="compare-header">
            <p className="eyebrow">COMPARE SERIES</p>
            <h2>Bandingkan Setiap Series</h2>
          </div>
          <div className="compare-table">
            {series.map((item) => (
              <div className="compare-row" key={item.name}>
                <div className="compare-info">
                  <strong>{item.name}</strong>
                  <div className="compare-formula">{item.formula}</div>
                </div>
                <span className="compare-price">{item.price}</span>
                <button className="compare-btn" onClick={() => openOrder(item)}>
                  Pilih Series
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNAL SECTION */}
      <section id="journal" className="section journal-section">
        <div data-aos="fade-up">
          <p className="eyebrow">SKIN EDUCATION</p>
          <h2>Radiate Journal</h2>
          <p>Tips, insight, dan panduan seputar perawatan kulit harianmu.</p>
        </div>
        <div className="journal-grid">
          {[
            { title: 'Kenapa Rutinitas Skincare Perlu Sederhana?', excerpt: 'Rutinitas skincare yang sederhana membantu kamu fokus pada langkah yang konsisten tanpa merusak skin barrier.' },
            { title: 'Day to Night Routine: Kapan Harus Pakai Serum?', excerpt: 'Gunakan rangkaian yang teratur dari pagi hingga malam, lalu sesuaikan pilihan active ingredients dengan kebutuhan kulit.' },
            { title: 'Cara Memilih Active Ingredients Sesuai Masalah Kulit', excerpt: 'Kenali perbedaan Niacinamide, Salicylic Acid, Hyaluronic Acid, dan Retinol untuk hasil maksimal.' },
          ].map((art, idx) => (
            <article key={idx} data-aos="fade-up" data-aos-delay={idx * 150} className="journal-card">
              <small className="journal-tag">ARTIKEL #{idx + 1}</small>
              <h4 className="journal-title">{art.title}</h4>
              <p className="journal-excerpt">{art.excerpt}</p>
              <button
                className="journal-btn"
                onClick={() => showToast(`Membaca artikel: ${art.title}`)}
              >
                <span>Baca Selengkapnya</span>
                <ArrowRight size={13} />
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* REVIEWS SECTION with Original 3 The Radiate Philosophy Background */}
      <section id="reviews" className="reviews">
        <div className="reviews-bg-container">
          <Image
            src="/original_3_the_radiate_philosophy.jpg"
            alt="Radiate Beauty Real Stories Background"
            fill
            sizes="100vw"
            className="reviews-bg-image"
            priority={false}
          />
          <div className="reviews-overlay" />
        </div>

        <div className="reviews-header" data-aos="fade-up">
          <p className="eyebrow" style={{ color: '#eed69f' }}>REAL STORIES</p>
          <h2 style={{ color: '#fff' }}>Apa Kata Mereka?</h2>
          <p style={{ color: '#ded3c2', fontSize: '13px', lineHeight: '1.6' }}>
            Cerita nyata dari mereka yang telah menemukan rutinitas skincare yang tepat bersama Radiate Beauty.
          </p>
        </div>
        <div className="reviews-cards-grid">
          {[
            { name: 'Aulia Rahma', series: 'Glow Series', text: 'Kulitku jadi lebih cerah dan lembap setelah rutin pakai Radiate Beauty 2 minggu.' },
            { name: 'Dinda Salsabila', series: 'Clear Series', text: 'Jerawat meradang mereda tanpa bikin kulit kering. Tekstur kulit jauh lebih halus!' },
            { name: 'Rizky Maulana', series: 'Hydrate Series', text: 'Skin barrier membaik, kulit tidak lagi mengelupas atau kemerahan saat aktivitas outdoor.' },
          ].map((person, idx) => (
            <article key={person.name} data-aos="fade-up" data-aos-delay={idx * 150} className="review-card">
              <div className="stars">★★★★★</div>
              <strong className="review-name">{person.name}</strong>
              <small className="review-series">Pengguna {person.series}</small>
              <p className="review-quote">“{person.text}”</p>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ & NEWSLETTER SECTION */}
      <section id="faq" className="footer-upper">
        <div data-aos="fade-up">
          <p className="eyebrow">FAQ</p>
          <h3>Pertanyaan yang Sering Diajukan</h3>
          {[
            { q: 'Apakah produk Radiate Beauty aman untuk semua jenis kulit?', a: 'Ya, seluruh series diformulasikan dengan pH seimbang dan dermatologically tested untuk meminimalkan iritasi.' },
            { q: 'Berapa lama hasil pemakaian mulai terlihat?', a: 'Dengan pemakaian teratur 2x sehari, perubahan hidrasi dan kelembutan terasa dalam 7-14 hari.' },
            { q: 'Apakah aman digunakan untuk ibu hamil dan menyusui?', a: 'Glow, Clear, dan Hydrate Series aman. Untuk Renew Series (mengandung retinol), disarankan konsultasi terlebih dahulu.' },
            { q: 'Bagaimana cara pemesanan dan pengirimannya?', a: 'Klik tombol Order Sekarang untuk memilih series dan mengisi alamat, lalu pesanan akan langsung diteruskan ke WhatsApp admin.' },
          ].map((item, idx) => (
            <details key={idx}>
              <summary>
                {item.q}
                <ChevronDown />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>

        <div data-aos="fade-up" data-aos-delay="150">
          <h3>Join Our Newsletter</h3>
          <p>Dapatkan update terbaru seputar skincare tips, peluncuran produk baru, dan promo eksklusif.</p>
          <div className="email-row">
            <input placeholder="Masukkan email kamu" aria-label="Alamat Email" />
            <button aria-label="Daftar Newsletter" onClick={() => showToast('Terima kasih telah berlangganan newsletter!')}>
              <ArrowRight size={16} />
            </button>
          </div>
          <div style={{ marginTop: '24px', fontSize: '12px', color: '#766e62' }}>
            <strong>Butuh Bantuan Cepat?</strong>
            <p style={{ margin: '6px 0 0' }}>Hubungi tim customer care kami di WhatsApp: <strong>+62 877 8083 1499</strong></p>
          </div>
        </div>

        <div className="footer-brand" data-aos="fade-up" data-aos-delay="300">
          <div className="wordmark">Radiate Beauty.co</div>
          <p>Skincare premium yang diformulasikan untuk menemani perjalanan kulit sehatmu setiap hari.</p>
          <div style={{ fontSize: '11px', color: '#cbbda6', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span>✓ 100% Produk Original & Teruji</span>
            <span>✓ Pengiriman Aman Seluruh Indonesia</span>
            <span>✓ Konsultasi Kulit Gratis via WhatsApp</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" data-aos="fade-up">
        <div className="wordmark">Radiate Beauty.co</div>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <button onClick={() => scrollTo('home')} style={{ background: 'none', border: 'none', color: 'inherit' }}>Home</button>
          <button onClick={() => scrollTo('our-story')} style={{ background: 'none', border: 'none', color: 'inherit' }}>Our Story</button>
          <button onClick={() => scrollTo('shop')} style={{ background: 'none', border: 'none', color: 'inherit' }}>Shop</button>
          <button onClick={() => scrollTo('skin-guide')} style={{ background: 'none', border: 'none', color: 'inherit' }}>Skin Guide</button>
          <button onClick={() => scrollTo('journal')} style={{ background: 'none', border: 'none', color: 'inherit' }}>Journal</button>
          <button onClick={() => scrollTo('faq')} style={{ background: 'none', border: 'none', color: 'inherit' }}>FAQ</button>
        </div>
        <div>
          WhatsApp: <a href="https://wa.me/6287780831499" target="_blank" rel="noreferrer" style={{ color: 'var(--brown)', fontWeight: 600 }}>+62 877 8083 1499</a>
        </div>
      </footer>

      {/* Floating Order Button */}
      <button className="floating-order" onClick={() => openOrder()} data-aos="zoom-in" data-aos-delay="600">
        <ShoppingBag size={18} /> Order Sekarang
      </button>

      {/* Skin Quiz Modal */}
      {quizOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setQuizOpen(false)}>
          <div className="invoice-modal" role="dialog" aria-modal="true">
            <button className="modal-close" onClick={() => setQuizOpen(false)} aria-label="Tutup">
              <X size={20} />
            </button>
            <h2>Skin Quiz Radiate Beauty</h2>
            <p style={{ fontSize: '13px', color: '#685d4f', marginBottom: '18px' }}>
              Pilih keluhan utama kulit wajahmu saat ini untuk mendapatkan rekomendasi series yang paling tepat:
            </p>
            <div className="quiz-options-grid">
              {[
                { id: 'kusam', label: 'Kulit Kusam & Tidak Merata', rec: 'Glow Series' },
                { id: 'berjerawat', label: 'Kulit Berjerawat & Pori', rec: 'Clear Series' },
                { id: 'kering', label: 'Kulit Kering & Dehidrasi', rec: 'Hydrate Series' },
                { id: 'tekstur', label: 'Tekstur & Tanda Penuaan', rec: 'Renew Series' },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`quiz-option-card ${quizProblem === opt.id ? 'is-selected' : ''}`}
                >
                  <div className="quiz-opt-text">
                    <span className="quiz-opt-title">{opt.label}</span>
                    <small className="quiz-opt-rec">Solusi: {opt.rec}</small>
                  </div>
                  <input
                    type="radio"
                    name="quizSkin"
                    value={opt.id}
                    checked={quizProblem === opt.id}
                    onChange={() => setQuizProblem(opt.id)}
                    className="quiz-opt-radio"
                  />
                </label>
              ))}
            </div>
            <div className="modal-actions" style={{ marginTop: '24px' }}>
              <button className="dark-button" onClick={handleQuizSubmit}>
                Lihat Rekomendasi & Order <ArrowRight size={15} />
              </button>
              <button className="text-button" onClick={() => setQuizOpen(false)}>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ORDER RADIATE BEAUTY MODAL (IMAGE 3) */}
      {orderOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(e) => e.target === e.currentTarget && setOrderOpen(false)}
        >
          <div className="invoice-modal" role="dialog" aria-modal="true" aria-labelledby="order-title">
            <button
              className="modal-close"
              onClick={() => setOrderOpen(false)}
              aria-label="Tutup Form Order"
            >
              <X size={20} />
            </button>
            <h2 id="order-title">Order Radiate Beauty</h2>
            <div className="form-grid">
              <label className="full">
                Pilih Series
                <select
                  value={selected.name}
                  onChange={(e) => setSelected(series.find((s) => s.name === e.target.value) || series[0])}
                >
                  {series.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name} — {item.price}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Nama Lengkap
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Sarah Anindita"
                />
              </label>
              <label>
                Nomor WhatsApp
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contoh: 081234567890"
                />
              </label>
              <label className="full">
                Catatan Tambahan (Opsional)
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Contoh: Tolong bubble wrap tebal"
                />
              </label>
              <label className="full">
                Alamat Lengkap Pengiriman
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={2}
                  placeholder="Jalan, No. Rumah, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten, Kode Pos"
                />
              </label>
            </div>

            <div className="invoice-summary">
              <div>
                <span>Series Pilihan</span>
                <strong>{selected.name}</strong>
              </div>
              <div>
                <span>Fokus Perawatan</span>
                <span>{selected.focus}</span>
              </div>
              <div>
                <span>Formula Utama</span>
                <span>{selected.formula}</span>
              </div>
              <div>
                <span>Ongkos Kirim</span>
                <strong style={{ color: '#2a6a3b' }}>GRATIS</strong>
              </div>
              <div className="total">
                <strong>Total Pembayaran</strong>
                <strong>{selected.price}</strong>
              </div>
            </div>

            <div className="modal-actions">
              <button className="dark-button" onClick={handleCreateInvoice}>
                <Check size={16} /> Buat Invoice & Kirim ke WhatsApp
              </button>
              <button className="text-button" onClick={() => setOrderOpen(false)}>
                Batal
              </button>
            </div>
            <p className="modal-hint">
              Pesanan akan otomatis dirangkum ke dalam format invoice dan dikonfirmasi langsung oleh admin Radiate Beauty melalui WhatsApp.
            </p>
          </div>
        </div>
      )}

      {/* INVOICE PREVIEW MODAL (IMAGE 1 & IMAGE 2) */}
      {previewOpen && currentInvoice && (
        <div
          className="modal-backdrop print-active"
          role="presentation"
          onMouseDown={(e) => e.target === e.currentTarget && setPreviewOpen(false)}
        >
          <div
            className="invoice-modal invoice-preview-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="preview-title"
          >
            <button
              className="modal-close"
              onClick={() => setPreviewOpen(false)}
              aria-label="Tutup Preview Invoice"
            >
              <X size={20} />
            </button>
            <h2 id="preview-title">Invoice Radiate Beauty</h2>

            {/* Document Card (Administrative Format) */}
            {renderAdminInvoice(currentInvoice)}

            {/* Actions: Send to WA, Print/PDF, Close */}
            <div className="invoice-actions">
              <button
                className="invoice-btn-primary"
                onClick={() => sendInvoiceToWhatsApp(currentInvoice)}
                title="Kirim detail invoice ini ke WhatsApp Admin Radiate Beauty"
              >
                Kirim Invoice ke Admin WhatsApp
              </button>
              <button
                className="invoice-btn-outline"
                onClick={handlePrint}
                title="Cetak invoice atau simpan sebagai dokumen PDF resmi"
              >
                Cetak / Simpan Invoice (PDF)
              </button>
              <button
                className="invoice-btn-outline"
                onClick={() => {
                  if (currentInvoice) {
                    const origin = typeof window !== 'undefined' ? window.location.origin : ''
                    const url = `${origin}/invoice?id=${encodeURIComponent(currentInvoice.id)}&name=${encodeURIComponent(currentInvoice.name)}&phone=${encodeURIComponent(currentInvoice.phone)}&addr=${encodeURIComponent(currentInvoice.address)}&series=${encodeURIComponent(currentInvoice.seriesName)}&price=${encodeURIComponent(currentInvoice.price)}&formula=${encodeURIComponent(currentInvoice.seriesFormula)}&focus=${encodeURIComponent(currentInvoice.seriesFocus)}&date=${encodeURIComponent(currentInvoice.date)}${currentInvoice.note ? `&note=${encodeURIComponent(currentInvoice.note)}` : ''}`
                    window.open(url, '_blank')
                  }
                }}
                title="Buka halaman invoice resmi di tab baru"
              >
                Buka Halaman Invoice Web
              </button>
              <button
                className="invoice-btn-outline"
                onClick={() => setPreviewOpen(false)}
                title="Tutup dialog"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="toast" role="status">
          {toastMsg}
        </div>
      )}
    </main>
    </>
  )
}
