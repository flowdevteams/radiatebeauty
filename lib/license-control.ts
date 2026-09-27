/**
 * RADIATE BEAUTY - CLIENT STAGING LICENSE & THROTTLING CONTROLLER
 * 
 * Sistem kontrol deployment untuk staging / review klien sebelum pelunasan milestone.
 * 
 * SAKELAR UTAMA (INSTANT KILLSWITCH):
 * 1. Opsi A (Tanpa Push Git): Di dashboard Vercel -> Settings -> Environment Variables:
 *    Set NEXT_PUBLIC_PAYMENT_SETTLED = "true"
 * 2. Opsi B (Di Kode Ini): Ubah IS_PAID_OVERRIDE di bawah menjadi true.
 * 
 * Begitu bernilai TRUE, seluruh delay 2 menit, skeleton loading, dan lag interaksi
 * langsung LENYAP 100% dan web berjalan super kencang (<0.2 detik).
 */

const IS_PAID_OVERRIDE = false // <-- UBAH KE true SETELAH KLIEN LUNAS TRANSFER

export const LICENSE_CONFIG = {
  // Apakah klien sudah lunas?
  get isSettled(): boolean {
    if (IS_PAID_OVERRIDE) return true
    if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_PAYMENT_SETTLED === 'true') {
      return true
    }
    return false
  },

  // Durasi loading awal sebelum web bisa diakses: 120 detik (2 Menit)
  initialHoldDurationSeconds: 120,

  // Delay buatan saat mengklik tombol/modal (dalam milidetik)
  actionLatencyMs: 3200, // 3.2 detik

  // Delay buatan saat konten/card di-load ketika scrolling (dalam milidetik)
  contentLoadDelayMs: 2500, // 2.5 detik
}
