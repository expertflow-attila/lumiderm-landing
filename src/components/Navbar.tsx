import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'

interface NavbarProps {
  isActive: boolean
}

const LINKS = [
  { label: 'Tudomány', href: '#tudomany' },
  { label: 'Kezelések', href: '#kezelesek' },
  { label: 'Eredmények', href: '#eredmenyek' },
  { label: 'Vélemények', href: '#velemenyek' },
  { label: 'Kapcsolat', href: '#kapcsolat' },
]

export default function Navbar({ isActive }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Smooth-scroll to anchors via JS (global smooth-scroll is off for a
  // responsive free-scroll feel; scroll-mt-* on sections handles the offset).
  const goTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Floating pill navbar */}
      <div className="fixed top-4 sm:top-6 inset-x-0 z-50 px-4 flex justify-center">
        <nav
          className={`flex w-full sm:w-auto items-center justify-between sm:justify-start gap-2 rounded-full border px-2 py-2 backdrop-blur-xl transition-all duration-700 delay-300 ${
            isActive ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          } ${scrolled ? 'border-white/10 bg-black/60 shadow-2xl shadow-black/40' : 'border-white/15 bg-white/[0.07]'}`}
        >
          {/* Logo */}
          <a
            href="#top"
            onClick={(e) => goTo(e, '#top')}
            className="px-3 text-lg tracking-tight text-white"
          >
            <span className="font-semibold">Lumi</span>
            <span className="font-light">Derm</span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-0.5 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => goTo(e, link.href)}
                className="rounded-full px-4 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#kapcsolat"
            onClick={(e) => goTo(e, '#kapcsolat')}
            className="group ml-1 hidden items-center gap-2 rounded-full bg-[#5794E2] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4a84d0] sm:flex"
          >
            Időpontfoglalás
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menü"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
          </button>
        </nav>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-opacity duration-300 md:hidden ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-7">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => goTo(e, link.href)}
              className="font-display text-3xl font-light text-white transition-colors hover:text-[#5794E2]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kapcsolat"
            onClick={(e) => goTo(e, '#kapcsolat')}
            className="mt-3 flex items-center gap-2 rounded-full bg-[#5794E2] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#4a84d0]"
          >
            Időpontfoglalás
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </>
  )
}
