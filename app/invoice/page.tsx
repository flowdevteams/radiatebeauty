'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, Printer, MessageCircle, CheckCircle, ShieldCheck } from 'lucide-react'

interface InvoiceData {
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
}

function InvoiceContent() {
  const searchParams = useSearchParams()
  const [invoice, setInvoice] = useState<InvoiceData>({
    id: 'RB-202609-0001',
    date: '27 September 2026',
    name: 'Pelanggan Radiate Beauty',
    phone: '-',
    address: '-',
    note: '-',
    seriesName: 'Glow Series',
    seriesFocus: 'For Dull Skin',
    seriesFormula: 'Niacinamide + Tranexamic Acid',
    price: 'Rp709.000',
  })

  useEffect(() => {
    // 1. Try reading from URL Query Params
    const qId = searchParams.get('id')
    const qName = searchParams.get('name')
    const qPhone = searchParams.get('phone')
    const qAddr = searchParams.get('addr') || searchParams.get('address')
    const qSeries = searchParams.get('series')
    const qPrice = searchParams.get('price')
    const qFormula = searchParams.get('formula')
    const qFocus = searchParams.get('focus')
    const qDate = searchParams.get('date')
    const qNote = searchParams.get('note')

    if (qId && qName && qSeries) {
      setInvoice({
        id: qId,
        date: qDate || new Date().toLocaleDateString('id-ID', { dateStyle: 'long' }),
        name: qName,
        phone: qPhone || '-',
        address: qAddr || '-',
        note: qNote || '-',
        seriesName: qSeries,
        seriesFocus: qFocus || 'Skin Solution Series',
        seriesFormula: qFormula || 'Dermatologically Tested Ingredients',
        price: qPrice || 'Rp709.000',
      })
      return
    }

    // 2. Fallback to latest local history if opened directly
    try {
      const history = JSON.parse(localStorage.getItem('rb_invoices_history') || '[]')
      if (Array.isArray(history) && history.length > 0) {
        setInvoice(history[0])
      }
    } catch {
      // Ignore storage errors
    }
  }, [searchParams])

  useEffect(() => {
    document.title = `Invoice #${invoice.id} — Radiate Beauty Official`
  }, [invoice.id])

  const handlePrint = () => {
    const originalTitle = document.title
    document.title = `Invoice_${invoice.id}_RadiateBeauty`
    window.print()
    document.title = originalTitle
  }

  const handleWhatsApp = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://radiatebeauty.co'
    const invoiceUrl = `${origin}/invoice?id=${encodeURIComponent(invoice.id)}&name=${encodeURIComponent(invoice.name)}&phone=${encodeURIComponent(invoice.phone)}&addr=${encodeURIComponent(invoice.address)}&series=${encodeURIComponent(invoice.seriesName)}&price=${encodeURIComponent(invoice.price)}&formula=${encodeURIComponent(invoice.seriesFormula)}&focus=${encodeURIComponent(invoice.seriesFocus)}&date=${encodeURIComponent(invoice.date)}${invoice.note && invoice.note !== '-' ? `&note=${encodeURIComponent(invoice.note)}` : ''}`

    const message = [
      'Halo Admin Radiate Beauty, saya ingin konfirmasi pesanan:',
      '',
      `*No. Invoice:* ${invoice.id}`,
      `*Tanggal:* ${invoice.date}`,
      `*Nama:* ${invoice.name}`,
      `*WhatsApp:* ${invoice.phone}`,
      `*Alamat:* ${invoice.address}`,
      `*Produk:* ${invoice.seriesName}`,
      `*Total:* ${invoice.price}`,
      `*Catatan:* ${invoice.note}`,
      '',
      '📄 *Lihat & Unduh Invoice PDF Resmi:*',
      invoiceUrl,
      '',
      'Mohon verifikasi ketersediaan dan petunjuk rekening pembayarannya. Terima kasih!'
    ].join('\n')

    window.open(`https://wa.me/6287780831499?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="invoice-standalone-page">
      {/* Top Floating Action Bar (Hidden during print) */}
      <div className="invoice-top-bar no-print">
        <div className="top-bar-inner">
          <Link href="/" className="back-link">
            <ArrowLeft size={16} /> Kembali ke Beranda
          </Link>
          <div className="top-bar-actions">
            <button onClick={handlePrint} className="top-btn print-btn">
              <Printer size={16} /> Cetak / Simpan PDF
            </button>
            <button onClick={handleWhatsApp} className="top-btn wa-btn">
              <MessageCircle size={16} /> Konfirmasi ke WhatsApp Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="invoice-main-wrapper">
        <div className="admin-invoice-document" id="printable-invoice">
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
                    <td className="adm-meta-highlight">{invoice.id}</td>
                  </tr>
                  <tr>
                    <td>Tanggal</td>
                    <td>:</td>
                    <td>{invoice.date}</td>
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
                  <span className="val bold">{invoice.name}</span>
                </div>
                <div className="adm-party-row">
                  <span className="lbl">No. WhatsApp/Telp</span>
                  <span className="val">{invoice.phone}</span>
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
                  <span className="val bold" style={{ whiteSpace: 'pre-wrap' }}>{invoice.address}</span>
                </div>
                <div className="adm-party-row">
                  <span className="lbl">Metode Logistik</span>
                  <span className="val">Kurir Reguler Express (Subsidi Bebas Ongkir)</span>
                </div>
                {invoice.note && invoice.note !== '-' ? (
                  <div className="adm-party-row">
                    <span className="lbl">Catatan Tambahan</span>
                    <span className="val italic">“{invoice.note}”</span>
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
                    <strong className="adm-product-name">{invoice.seriesName} (Paket Lengkap Skincare)</strong>
                    <div className="adm-product-sub">
                      Formula Aktif: {invoice.seriesFormula}<br />
                      Fokus Perawatan: {invoice.seriesFocus}
                    </div>
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'top' }}>1 Paket</td>
                  <td style={{ textAlign: 'right', verticalAlign: 'top' }}>{invoice.price}</td>
                  <td style={{ textAlign: 'right', verticalAlign: 'top', fontWeight: 700 }}>{invoice.price}</td>
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
                <span className="stamp-date">{invoice.date}</span>
              </div>
            </div>

            <div className="adm-calc-col">
              <div className="adm-calc-row">
                <span>Subtotal Produk:</span>
                <span>{invoice.price}</span>
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
                <span className="ttl-val">{invoice.price}</span>
              </div>
              <div className="adm-terbilang">
                *Semua harga sudah termasuk pajak sesuai regulasi yang berlaku
              </div>
            </div>
          </div>
        </div>

        {/* Security & Support Guarantee (Below Printable Area) */}
        <div className="invoice-bottom-guarantee no-print">
          <div className="guarantee-badge">
            <ShieldCheck size={18} color="#2e7d32" />
            <span>Dokumen Transaksi Resmi & Terenkripsi</span>
          </div>
          <div className="guarantee-badge">
            <CheckCircle size={18} color="#2e7d32" />
            <span>Garansi 100% Produk Original & Teruji Klinis</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function InvoicePage() {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f5f0e7' }}>
        <p style={{ fontFamily: 'Georgia, serif', color: '#4b3b1c' }}>Memuat Invoice Radiate Beauty...</p>
      </div>
    }>
      <InvoiceContent />
    </Suspense>
  )
}
