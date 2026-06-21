import { useState } from 'react'
import type { FormEvent } from 'react'
import { Mail, Phone, MapPin, Check, ArrowRight } from 'lucide-react'
import { Reveal } from '../lib/motion'

const CONTACTS = [
  { icon: Mail, label: 'E-mail', value: 'hello@lumiderm.hu' },
  { icon: Phone, label: 'Telefon', value: '+36 1 234 5678' },
  { icon: MapPin, label: 'Cím', value: 'Budapest, Andrássy út 1.' },
]

export default function ContactSection() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="kapcsolat" className="scroll-mt-28 px-6 py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
        {/* Left — copy + contacts */}
        <Reveal>
          <span className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.28em] text-[#5794E2]">
            <span className="h-px w-8 bg-[#5794E2]/60" />
            Kapcsolat
          </span>
          <h2 className="font-display mt-6 text-4xl font-light leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
            Kezdd el a bőröd
            <br /> útját még ma
          </h2>
          <p className="mt-6 max-w-md text-base font-light leading-relaxed text-white/55">
            Foglalj díjmentes konzultációt szakértőinkkel, vagy írj nekünk — 24 órán belül
            válaszolunk, és segítünk megtalálni a bőrödhöz illő rituálét.
          </p>

          <div className="mt-12 space-y-5">
            {CONTACTS.map((c) => (
              <div key={c.label} className="flex items-center gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#5794E2]">
                  <c.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-white/40">{c.label}</div>
                  <div className="text-sm text-white">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Right — form */}
        <Reveal delay={120}>
          <div className="rounded-[28px] border border-white/[0.08] bg-white/[0.02] p-8 md:p-10">
            {sent ? (
              <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#5794E2]/15 text-[#5794E2]">
                  <Check className="h-8 w-8" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-2xl font-light text-white">
                  Köszönjük az érdeklődést!
                </h3>
                <p className="mt-3 max-w-xs text-sm font-light text-white/60">
                  Üzenetedet megkaptuk. Szakértőnk hamarosan, legkésőbb 24 órán belül
                  jelentkezik.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-wide text-white/40">
                    Név
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Teljes neved"
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#5794E2]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-wide text-white/40">
                    E-mail
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="te@email.hu"
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#5794E2]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-wide text-white/40">
                    Üzenet
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Miben segíthetünk?"
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#5794E2]"
                  />
                </div>
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#5794E2] px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-[#4a84d0]"
                >
                  Időpontot foglalok
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} />
                </button>
                <p className="text-center text-xs font-light text-white/30">
                  Az űrlap elküldésével elfogadod az adatvédelmi tájékoztatónkat.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
