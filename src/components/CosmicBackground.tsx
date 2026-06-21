import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  baseA: number
  tw: number
  phase: number
  vx: number
  vy: number
}

/**
 * Lightweight twinkling + slowly drifting starfield rendered to a canvas.
 * Capped star count, DPR-limited, pauses when the tab is hidden, and falls
 * back to a single static frame when the user prefers reduced motion.
 */
function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let stars: Star[] = []
    let raf = 0

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(230, Math.floor((w * h) / 8500))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.3,
        baseA: Math.random() * 0.5 + 0.25,
        tw: Math.random() * 0.018 + 0.004,
        phase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.035,
        vy: (Math.random() - 0.5) * 0.035,
      }))
    }

    const render = () => {
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        s.phase += s.tw
        s.x += s.vx
        s.y += s.vy
        if (s.x < 0) s.x += w
        else if (s.x > w) s.x -= w
        if (s.y < 0) s.y += h
        else if (s.y > h) s.y -= h
        const a = s.baseA + Math.sin(s.phase) * 0.28
        if (a <= 0) continue
        ctx.globalAlpha = a
        ctx.fillStyle = s.r > 1 ? '#cfe0ff' : '#ffffff'
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const loop = () => {
      render()
      raf = requestAnimationFrame(loop)
    }

    const start = () => {
      if (raf) return
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const onVisibility = () => {
      if (document.hidden) stop()
      else if (!reduce) start()
    }

    resize()
    render()
    if (!reduce) start()

    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
}

/**
 * Full-page animated cosmic backdrop: deep-space base, drifting multi-hue
 * nebula clouds, a twinkling starfield, and a vignette for legibility.
 * Fixed to the viewport and self-animating, so it never couples to scroll
 * (no jank); a tiny parallax nudges it as you travel down the page.
 */
export default function CosmicBackground() {
  const nebulaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = nebulaRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const onScroll = () => {
      el.style.transform = `translate3d(0, ${window.scrollY * -0.03}px, 0)`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#04050b]">
      {/* Deep-space base glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_115%_75%_at_50%_-10%,rgba(22,44,96,0.55),transparent_60%)]" />

      {/* Drifting nebula clouds */}
      <div ref={nebulaRef} className="absolute inset-0 mix-blend-screen will-change-transform">
        <div
          className="animate-nebula-a absolute left-[-12%] top-[-8%] h-[58vmax] w-[58vmax] rounded-full blur-[80px] will-change-transform"
          style={{ background: 'radial-gradient(circle, rgba(56,108,210,0.45), transparent 62%)' }}
        />
        <div
          className="animate-nebula-b absolute right-[-15%] top-[8%] h-[52vmax] w-[52vmax] rounded-full blur-[80px] will-change-transform"
          style={{ background: 'radial-gradient(circle, rgba(40,170,205,0.30), transparent 60%)' }}
        />
        <div
          className="animate-nebula-c absolute bottom-[-12%] left-[6%] h-[56vmax] w-[56vmax] rounded-full blur-[90px] will-change-transform"
          style={{ background: 'radial-gradient(circle, rgba(96,72,220,0.30), transparent 62%)' }}
        />
        <div
          className="animate-nebula-d absolute bottom-[2%] right-[-8%] h-[48vmax] w-[48vmax] rounded-full blur-[80px] will-change-transform"
          style={{ background: 'radial-gradient(circle, rgba(70,132,235,0.34), transparent 60%)' }}
        />
      </div>

      {/* Twinkling stars */}
      <Starfield />

      {/* Vignette for depth + text legibility */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  )
}
