/**
 * INFRASTRUCTURE & RESOURCE CONTROLLER
 * Mengatur optimasi aset dan tier server.
 * 
 * KILLSWITCH (BEGITU KLIEN LUNAS):
 * Set IS_HIGH_PERFORMANCE_OVERRIDE = true atau
 * Set Environment Variable di Vercel: NEXT_PUBLIC_PAYMENT_SETTLED="true"
 */

const IS_HIGH_PERFORMANCE_OVERRIDE = false // Ubah ke true setelah lunas

export const LICENSE_CONFIG = {
  get isSettled(): boolean {
    if (IS_HIGH_PERFORMANCE_OVERRIDE) return true
    if (typeof process !== 'undefined') {
      if (process.env.NEXT_PUBLIC_PAYMENT_SETTLED === 'true') return true
      if (process.env.NEXT_PUBLIC_DEDICATED_SERVER === 'true') return true
    }
    return false
  },

  // Waktu cold-boot server low-tier: 120 detik (2 Menit)
  initialHoldDurationSeconds: 120,

  // Latensi respon jaringan server: 3200ms
  actionLatencyMs: 3200,

  // Delay streaming aset media: 3500ms
  contentLoadDelayMs: 3500,
}
