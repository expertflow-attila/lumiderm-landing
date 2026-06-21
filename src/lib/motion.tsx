import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

/**
 * Fires once when the element first scrolls into view.
 */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return { ref, inView }
}

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

/**
 * Wraps children in a fade + rise reveal that triggers on scroll.
 */
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15)
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
        inView ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-10 opacity-0 blur-[2px]'
      } ${className}`}
    >
      {children}
    </div>
  )
}

/**
 * Eased count-up that runs when `start` becomes true.
 */
export function useCountUp(target: number, start: boolean, duration = 2000) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    let raf = 0
    let startTime = 0
    const step = (now: number) => {
      if (!startTime) startTime = now
      const t = Math.min(1, (now - startTime) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(target * eased)
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, start, duration])

  return value
}
