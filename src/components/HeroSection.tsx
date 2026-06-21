import { Fragment, useEffect, useRef } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'

interface HeroSectionProps {
  isActive: boolean
}

const VIDEO_1 =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_222559_363e35af-d0bc-4650-b3cb-58bf833daa51.mp4'
const VIDEO_2 =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_232048_98292efb-9b9c-4089-a587-72f33437c8f8.mp4'
const THUMB =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260619_220258_2f77857f-c799-4cce-9818-442542b98f2a.png&w=1280&q=85'

const STATS = [
  { value: '8M+', label: 'Megújult bőr' },
  { value: '96,4%', label: 'Látható eredmény' },
  { value: '37', label: 'Bejegyzett szabadalom' },
]

export default function HeroSection({ isActive }: HeroSectionProps) {
  const wrapperRef = useRef<HTMLElement>(null)
  const v1 = useRef<HTMLVideoElement>(null)
  const v2 = useRef<HTMLVideoElement>(null)
  const hero1 = useRef<HTMLDivElement>(null)
  const card = useRef<HTMLDivElement>(null)
  const hint = useRef<HTMLDivElement>(null)
  const hero2 = useRef<HTMLDivElement>(null)
  const statsBox = useRef<HTMLDivElement>(null)

  const isSecondRef = useRef(false)
  const isActiveRef = useRef(isActive)
  isActiveRef.current = isActive

  // Imperative, rAF-throttled scroll updates — no React re-render per scroll
  // event, so the crossfade tracks the scrollbar 1:1 and stays buttery smooth.
  useEffect(() => {
    const switchVideo = (second: boolean) => {
      const a = v1.current
      const b = v2.current
      if (!a || !b) return
      if (second) {
        a.pause()
        b.currentTime = 0
        b.play().catch(() => {})
      } else {
        b.pause()
        a.currentTime = 0
        a.play().catch(() => {})
      }
    }

    // Cache layout metrics; only window.scrollY is read per scroll event
    // (no forced reflow), so the crossfade stays perfectly smooth.
    let range = 0
    let wrapTop = 0
    const measure = () => {
      const el = wrapperRef.current
      if (!el) return
      wrapTop = el.offsetTop
      range = el.offsetHeight - window.innerHeight
    }

    const apply = () => {
      const p = range > 0 ? Math.min(1, Math.max(0, (window.scrollY - wrapTop) / range)) : 0

      if (v1.current) v1.current.style.opacity = `${1 - p}`
      if (v2.current) v2.current.style.opacity = `${p}`

      const h1o = Math.max(0, 1 - p * 2.5)
      const h1y = p * 30
      const setBlock = (node: HTMLDivElement | null, o: number, transform: string) => {
        if (!node) return
        node.style.opacity = `${o}`
        node.style.transform = transform
        node.style.pointerEvents = o < 0.05 ? 'none' : 'auto'
      }
      setBlock(hero1.current, h1o, `translateY(${h1y}px)`)
      setBlock(card.current, h1o, `translateY(${h1y}px)`)
      if (hint.current) hint.current.style.opacity = `${Math.max(0, 1 - p * 4)}`

      const h2o = Math.max(0, (p - 0.4) * 2.5)
      const h2y = Math.max(0, (1 - p) * 30)
      setBlock(hero2.current, h2o, `translateY(${h2y}px)`)
      setBlock(statsBox.current, h2o, `translateY(calc(-50% + ${h2y}px))`)

      const second = p >= 0.5
      if (second !== isSecondRef.current) {
        isSecondRef.current = second
        if (isActiveRef.current) switchVideo(second)
      }
    }

    const onResize = () => {
      measure()
      apply()
    }

    window.addEventListener('scroll', apply, { passive: true })
    window.addEventListener('resize', onResize)
    measure()
    apply()
    return () => {
      window.removeEventListener('scroll', apply)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // Start playback once the intro completes.
  useEffect(() => {
    if (!isActive) return
    const a = v1.current
    const b = v2.current
    if (!a || !b) return
    if (isSecondRef.current) {
      a.pause()
      b.currentTime = 0
      b.play().catch(() => {})
    } else {
      b.pause()
      a.currentTime = 0
      a.play().catch(() => {})
    }
  }, [isActive])

  return (
    <section ref={wrapperRef} id="top" className="relative h-[220vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Video backgrounds */}
        <video
          ref={v1}
          src={VIDEO_1}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 1 }}
        />
        <video
          ref={v2}
          src={VIDEO_2}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0 }}
        />

        {/* Legibility gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/35" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent_55%,rgba(0,0,0,0.45)_100%)]" />

        {/* ---------- HERO STATE 1 — bottom left ---------- */}
        <div
          ref={hero1}
          className="absolute bottom-12 left-6 right-6 z-10 max-w-2xl sm:bottom-8 sm:left-8 sm:right-auto md:bottom-16 md:left-12"
          style={{ opacity: 1 }}
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/70 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5794E2]" />
            Biotechnológia a bőrért
          </span>
          <h1 className="font-display mb-5 text-[2.6rem] font-light leading-[0.98] tracking-tightest text-white sm:text-6xl md:mb-6 md:text-7xl lg:text-8xl">
            A ragyogás
            <br />
            tudománya
          </h1>
          <p className="mb-7 max-w-md text-sm font-light leading-relaxed text-white/70 md:mb-9 md:text-base">
            A LumiDerm a sejtbiológiát és a bioaktív hatóanyagokat ötvözi, hogy bőröd a saját
            erejéből újuljon meg — láthatóan, mérhetően, tartósan.
          </p>
          <a
            href="#kezelesek"
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#5794E2] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#4a84d0] sm:px-8"
          >
            Fedezd fel
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} />
          </a>
        </div>

        {/* ---------- HERO STATE 1 — product card bottom right ---------- */}
        <div
          ref={card}
          className="absolute bottom-8 right-8 z-10 hidden max-w-[380px] items-center gap-4 rounded-[20px] bg-white/95 p-4 shadow-2xl backdrop-blur-sm sm:flex md:bottom-16 md:right-12 md:max-w-[440px] md:gap-5 md:p-5"
          style={{ opacity: 1 }}
        >
          <img
            src={THUMB}
            alt="LumiDerm BioActive"
            className="h-20 w-20 flex-shrink-0 rounded-2xl object-cover md:h-24 md:w-24"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-tight text-[#0a0a0a]">LumiDerm</div>
                <div className="text-sm font-light text-[#0a0a0a]">BioActive</div>
              </div>
              <button
                aria-label="Termék megtekintése"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#0a0a0a] transition-colors hover:bg-[#5794E2]"
              >
                <ArrowRight className="h-4 w-4 text-white" strokeWidth={1.75} />
              </button>
            </div>
            <div className="mt-2 text-xs font-light text-[#666]">CellBoost&trade; 3.0</div>
          </div>
        </div>

        {/* ---------- Scroll hint ---------- */}
        <div
          ref={hint}
          className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 sm:flex"
          style={{ opacity: 1 }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/45">Görgess</span>
          <ChevronDown className="h-4 w-4 animate-bounce text-white/45" strokeWidth={1.5} />
        </div>

        {/* ---------- HERO STATE 2 — bottom center ---------- */}
        <div
          ref={hero2}
          className="absolute bottom-12 left-0 right-0 z-10 flex flex-col items-center px-6 text-center md:bottom-20"
          style={{ opacity: 0 }}
        >
          <h2 className="font-display mb-5 text-4xl font-light leading-[1.02] tracking-tightest text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Sejtszintű
            <br />
            megújulás
          </h2>
          <p className="max-w-lg text-sm font-light leading-relaxed text-white/70 md:text-base">
            Szabadalmaztatott peptidkomplexünk a bőr legmélyebb rétegeibe jut, ahol serkenti a
            kollagén- és elasztintermelést, és helyreállítja a fiatalos rugalmasságot.
          </p>

          {/* Mobile stats */}
          <div className="mt-7 flex items-center gap-7 sm:hidden">
            {STATS.map((stat, i) => (
              <Fragment key={stat.label}>
                {i > 0 && <div className="h-9 w-[1px] bg-[#5794E2]/40" />}
                <div>
                  <div className="font-display text-2xl font-light text-white">{stat.value}</div>
                  <div className="mt-1 text-[10px] tracking-wide text-white/50">{stat.label}</div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        {/* ---------- HERO STATE 2 — desktop stats (right, vertical) ---------- */}
        <div
          ref={statsBox}
          className="absolute right-8 top-1/2 z-10 hidden flex-col gap-8 sm:flex md:right-12"
          style={{ opacity: 0, transform: 'translateY(-50%)' }}
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="text-right">
              <div className="font-display text-4xl font-light tracking-tight text-white md:text-5xl">
                {stat.value}
              </div>
              <div className="mt-1.5 text-xs tracking-wide text-white/50 md:text-sm">{stat.label}</div>
              {i < STATS.length - 1 && (
                <div className="ml-auto mt-5 h-[1px] w-12 bg-[#5794E2]/60" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
