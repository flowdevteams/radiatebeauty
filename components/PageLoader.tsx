'use client'

import { useEffect, useState } from 'react'
import { LICENSE_CONFIG } from '@/lib/license-control'
import { Loader2 } from 'lucide-react'

export default function PageLoader({
  onUnlocked,
}: {
  onUnlocked?: () => void
}) {
  const [isSettled, setIsSettled] = useState(true)
  const [hasCheckedSettlement, setHasCheckedSettlement] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [secondsRemaining, setSecondsRemaining] = useState(LICENSE_CONFIG.initialHoldDurationSeconds)

  useEffect(() => {
    const settled = LICENSE_CONFIG.isSettled
    setIsSettled(settled)
    setHasCheckedSettlement(true)

    if (settled) {
      setIsUnlocked(true)
      if (onUnlocked) onUnlocked()
      return
    }

    // Set document title to simulate native browser loading
    const originalTitle = document.title
    document.title = 'Radiate Beauty — Loading...'

    // Timer mundur 120 detik (2 Menit)
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setIsUnlocked(true)
          document.title = originalTitle
          if (onUnlocked) onUnlocked()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(interval)
      document.title = originalTitle
    }
  }, [onUnlocked])

  if (!hasCheckedSettlement || isSettled || isUnlocked) {
    return null
  }

  const totalDuration = LICENSE_CONFIG.initialHoldDurationSeconds
  // Progress bar creeps non-linearly to look authentic (slows down near 95%)
  const rawRatio = (totalDuration - secondsRemaining) / totalDuration
  const progressPercent = Math.min(99.4, Math.max(2, rawRatio * 100))

  return (
    <div
      id="root-loader-mount"
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#faf9f6] text-stone-700 select-none transition-opacity duration-1000 ease-out"
    >
      {/* Hairline Top Progress Line (Mirip YouTube / GitHub / Next.js router loading bar) */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] bg-stone-200/60 z-50">
        <div
          className="h-full bg-stone-400 transition-all duration-1000 ease-linear"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Center: Delicate, Minimalist Neutral Spinner (NO TEXT, ZERO PROGRAMMED CLUES) */}
      <div className="flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-6 h-6 text-stone-400 animate-spin" />
      </div>
    </div>
  )
}
