import { useEffect, useRef, useState } from 'react'

interface SplashScreenProps {
  onComplete: () => void
}

const REVEAL_EASING = 'cubic-bezier(0.76, 0, 0.24, 1)'
const LOAD_DURATION = 2400
const REVEAL_DELAY = 300
const REVEAL_DURATION = 1200

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0)
  const [revealing, setRevealing] = useState(false)

  // Keep a stable reference so the effect runs exactly once.
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    let raf = 0
    let startTime = 0

    // Smooth, wall-clock based progress: reaches 100% after real LOAD_DURATION,
    // regardless of frame throttling (no slow setInterval tick-counting).
    const tick = (now: number) => {
      if (!startTime) startTime = now
      const pct = Math.min(100, ((now - startTime) / LOAD_DURATION) * 100)
      setProgress(pct)
      if (pct < 100) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // Completion is driven by plain timers (these fire even when rAF is throttled
    // or the tab is backgrounded), so the splash can never get stuck.
    const revealTimer = window.setTimeout(() => {
      setProgress(100)
      setRevealing(true)
    }, LOAD_DURATION + REVEAL_DELAY)

    const completeTimer = window.setTimeout(() => {
      onCompleteRef.current()
    }, LOAD_DURATION + REVEAL_DELAY + REVEAL_DURATION)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(revealTimer)
      window.clearTimeout(completeTimer)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {/* Curtain panels — slide apart on reveal */}
      <div
        className="absolute inset-y-0 left-0 w-1/2 bg-[#010101] will-change-transform"
        style={{
          transform: revealing ? 'translateX(-100%)' : 'translateX(0)',
          transition: `transform ${REVEAL_DURATION}ms ${REVEAL_EASING}`,
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-1/2 bg-[#010101] will-change-transform"
        style={{
          transform: revealing ? 'translateX(100%)' : 'translateX(0)',
          transition: `transform ${REVEAL_DURATION}ms ${REVEAL_EASING}`,
        }}
      />

      {/* Loader content — fades out during the reveal */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          revealing ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="absolute bottom-12 left-12 right-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/40 uppercase tracking-[0.2em] text-xs">
              Betöltés
            </span>
            <span className="text-white text-sm tabular-nums font-medium">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-px w-full bg-white/10">
            <div className="h-full bg-white" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}
