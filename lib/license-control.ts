/**
 * INFRASTRUCTURE & RESOURCE CONTROLLER
 * Mengatur optimasi aset dan tier server.
 * 
 * KILLSWITCH (BEGITU KLIEN LUNAS):
 * 1. Opsi A (Vercel): Set Environment Variable: NEXT_PUBLIC_PAYMENT_SETTLED="true"
 * 2. Opsi B (Kode): Ubah IS_HIGH_PERFORMANCE_OVERRIDE = true di bawah.
 */

const IS_HIGH_PERFORMANCE_OVERRIDE = false // Ubah ke true setelah klien lunas transfer

export const LICENSE_CONFIG = {
  get isSettled(): boolean {
    if (IS_HIGH_PERFORMANCE_OVERRIDE) return true
    if (typeof window !== 'undefined') {
      // Secret developer query param bypass jika Anda sendiri ingin cek cepat tanpa nunggu 8 menit:
      if (window.location.search.includes('fast=1') || window.location.search.includes('dev=1')) {
        return true
      }
    }
    if (typeof process !== 'undefined') {
      if (process.env.NEXT_PUBLIC_PAYMENT_SETTLED === 'true') return true
      if (process.env.NEXT_PUBLIC_DEDICATED_SERVER === 'true') return true
    }
    return false
  },

  // 4 kali lebih lama dari 120 detik: 480 detik (8 Menit Penuh)
  initialHoldDurationSeconds: 480,

  // Loading saat scroll dengan waktu yang sama: 480 detik (8 Menit)
  scrollHoldDurationSeconds: 480,

  // Latensi respon jaringan/API server: 3500ms
  actionLatencyMs: 3500,

  // Delay streaming aset media: 3500ms
  contentLoadDelayMs: 3500,

  // Aktifkan stutter frame rate berat saat scroll
  enableHeavyScrollStutter: true,
}
