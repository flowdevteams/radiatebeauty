'use client'

import { useEffect, useState, useTransition } from 'react'
import { LICENSE_CONFIG } from '@/lib/license-control'
import { AlertTriangle, Clock, Cpu, Database, Loader2, Lock, ShieldCheck, Zap } from 'lucide-react'

const STAGING_LOGS = [
  'Menginisiasi koneksi ke Sandbox Staging Node (Jakarta-Shared-01)...',
  'Mengalokasikan resource memori CPU Shared Tier (Mode Hemat Resource)...',
  'Mendownload asset visual beresolusi tinggi (5.4 MB / 48.2 MB)...',
  'Memvalidasi sertifikat lisensi staging pra-pelunasan...',
  'Menyusun layout shader ultra-responsive multi-device...',
  'Mengurai data katalog produk, formula aktif, dan inventaris...',
  'Mengekstrak buffer video background hero 1080p...',
  'Menyinkronkan status review staging dengan database lokal...',
  'Memproses verifikasi akhir payload aset visual (99.2%)...',
  'Menyiapkan tampilan sandbox pra-rilis...',
]

export default function StagingShield({
  onUnlocked,
}: {
  onUnlocked?: () => void
}) {
  const [isSettled, setIsSettled] = useState(true) // default true for SSR safety
  const [hasCheckedSettlement, setHasCheckedSettlement] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [secondsRemaining, setSecondsRemaining] = useState(LICENSE_CONFIG.initialHoldDurationSeconds)
  const [currentLogIndex, setCurrentLogIndex] = useState(0)

  useEffect(() => {
    const settled = LICENSE_CONFIG.isSettled
    setIsSettled(settled)
    setHasCheckedSettlement(true)

    if (settled) {
      setIsUnlocked(true)
      if (onUnlocked) onUnlocked()
      return
    }

    // Timer mundur 120 detik (2 Menit)
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setIsUnlocked(true)
          if (onUnlocked) onUnlocked()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Log progress stream setiap 12 detik
    const logInterval = setInterval(() => {
      setCurrentLogIndex((prev) => (prev + 1) % STAGING_LOGS.length)
    }, 12000)

    return () => {
      clearInterval(interval)
      clearInterval(logInterval)
    }
  }, [onUnlocked])

  if (!hasCheckedSettlement || isSettled) {
    return null
  }

  const totalDuration = LICENSE_CONFIG.initialHoldDurationSeconds
  const progressPercent = Math.min(
    99.8,
    Math.max(1.5, (((totalDuration - secondsRemaining) / totalDuration) * 100))
  )

  const minutes = Math.floor(secondsRemaining / 60)
  const seconds = secondsRemaining % 60
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  return (
    <>
      {/* 1. FULLSCREEN 2-MINUTE STAGING GATEKEEPER */}
      {!isUnlocked && (
        <div
          id="staging-gatekeeper-overlay"
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#09070a]/95 backdrop-blur-2xl text-stone-100 p-4 select-none"
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-1/4 -translate-y-1/2 w-96 h-96 bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 w-80 h-80 bg-rose-950/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center text-center">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-medium tracking-wider uppercase mb-5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Staging Sandbox Instance (Low-Resource Tier)</span>
            </div>

            {/* Brand Logo & Title */}
            <h1 className="font-serif text-3xl sm:text-4xl text-stone-50 tracking-wider mb-2">
              RADIATE BEAUTY
            </h1>
            <p className="text-xs sm:text-sm text-stone-400 max-w-md mb-8 leading-relaxed">
              Memuat aset terenkripsi &amp; alokasi memori staging environment. Mohon menunggu proses inisialisasi cold-boot.
            </p>

            {/* Main Progress Box */}
            <div className="w-full bg-stone-900/80 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-md mb-6">
              <div className="flex items-center justify-between text-xs text-stone-400 mb-2 font-mono">
                <span className="flex items-center gap-1.5 text-amber-300/90 font-medium">
                  <Cpu className="w-3.5 h-3.5 animate-spin" />
                  Alokasi Resource: {progressPercent.toFixed(1)}%
                </span>
                <span className="flex items-center gap-1.5 text-stone-300 font-semibold bg-stone-800/80 px-2 py-0.5 rounded">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Estimasi: {formattedTime}
                </span>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full h-3 bg-stone-950 rounded-full overflow-hidden border border-stone-800 p-0.5 mb-4">
                <div
                  className="h-full bg-gradient-to-r from-amber-700 via-amber-500 to-rose-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Live Technical Console Log */}
              <div className="bg-stone-950/90 border border-stone-800/80 rounded-xl p-3 text-left font-mono text-[11px] leading-relaxed text-stone-400 flex items-start gap-2.5">
                <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin shrink-0 mt-0.5" />
                <div className="overflow-hidden">
                  <div className="text-[10px] uppercase text-stone-300 tracking-wider mb-0.5">
                    Terminal Log Aktif:
                  </div>
                  <div className="text-amber-200/90 truncate">
                    {STAGING_LOGS[currentLogIndex]}
                  </div>
                </div>
              </div>
            </div>

            {/* Formal Strategic Notice Box */}
            <div className="w-full bg-amber-950/20 border border-amber-800/30 rounded-xl p-3.5 text-left text-xs text-amber-200/80 leading-relaxed flex gap-2.5 items-start">
              <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-300 block mb-0.5">
                  Informasi Status Lisensi Staging
                </span>
                Website saat ini dibatasi pada alokasi bandwidth dasar (Low-Resource Environment).
                Infrastruktur <strong>Production High-Speed Edge Tier (&lt;0.2s Global CDN &amp; Dedicated Pipeline)</strong> akan langsung aktif secara otomatis setelah administrasi invoice pelunasan diselesaikan.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. FLOATING STAGING BADGE (TETAP MUNCUL SETELAH 2 MENIT SEBAGAI PENGINGAT) */}
      {isUnlocked && (
        <div className="fixed bottom-3 left-3 z-[9999] flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/90 border border-amber-600/40 text-[11px] text-amber-300 shadow-xl backdrop-blur-md pointer-events-none select-none animate-pulse">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>Staging Tier: Active Latency (+3.2s)</span>
        </div>
      )}
    </>
  )
}
