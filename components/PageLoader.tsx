'use client'

import { useEffect, useState } from 'react'
import { LICENSE_CONFIG } from '@/lib/license-control'
import { Loader2 } from 'lucide-react'

export default function PageLoader({
  durationSeconds = LICENSE_CONFIG.initialHoldDurationSeconds,
  active = true,
  onUnlocked,
}: {
  durationSeconds?: number
  active?: boolean
  onUnlocked?: () => void
}) {
  const [isSettled, setIsSettled] = useState(true)
  const [hasCheckedSettlement, setHasCheckedSettlement] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [secondsRemaining, setSecondsRemaining] = useState(durationSeconds)

  useEffect(() => {
    const settled = LICENSE_CONFIG.isSettled
    setIsSettled(settled)
    setHasCheckedSettlement(true)

    if (settled || !active) {
      setIsUnlocked(true)
      if (onUnlocked) onUnlocked()
      return
    }

    setIsUnlocked(false)
    setSecondsRemaining(durationSeconds)

    // Set document title to simulate native browser loading
    const originalTitle = document.title
    document.title = 'Radiate Beauty — Loading...'

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
  }, [durationSeconds, active, onUnlocked])

  if (!hasCheckedSettlement || isSettled || isUnlocked || !active) {
    return null
  }

  const rawRatio = (durationSeconds - secondsRemaining) / durationSeconds
  const progressPercent = Math.min(99.4, Math.max(1.5, rawRatio * 100))

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

      {/* Center: Delicate Spinner + Requested Text */}
      <div className="flex flex-col items-center justify-center gap-3.5 text-center px-4">
        <Loader2 className="w-6 h-6 text-stone-400 animate-spin" />
        <p className="text-xs text-stone-500 font-mono tracking-wide animate-pulse">
          menload resource dari server ...
        </p>
      </div>
    </div>
  )
}
