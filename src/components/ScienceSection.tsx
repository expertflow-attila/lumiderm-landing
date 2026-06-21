import { FlaskConical, Dna, Microscope, Leaf } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from '../lib/motion'

interface Feature {
  icon: LucideIcon
  title: string
  desc: string
}

const FEATURES: Feature[] = [
  {
    icon: FlaskConical,
    title: 'CellBoost™ 3.0',
    desc: 'Szabadalmaztatott hatóanyag-rendszerünk felgyorsítja a sejtmegújulás természetes ritmusát.',
  },
  {
    icon: Dna,
    title: 'Bioaktív peptidek',
    desc: 'Célzott peptidláncok serkentik a kollagén- és elasztintermelést a bőr mélyebb rétegeiben.',
  },
  {
    icon: Microscope,
    title: 'Klinikai validáció',
    desc: 'Minden terméket független dermatológiai vizsgálatok igazolnak, valós, mérhető eredményekkel.',
  },
  {
    icon: Leaf,
    title: 'Tiszta összetétel',
    desc: 'Parabén-, szulfát- és illatanyag-mentes, vegán és cruelty-free tanúsítással ellátott formulák.',
  },
]

export default function ScienceSection() {
  return (
    <section id="tudomany" className="scroll-mt-28 px-6 py-28 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16 max-w-3xl md:mb-24">
          <span className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.28em] text-[#5794E2]">
            <span className="h-px w-8 bg-[#5794E2]/60" />
            A tudomány
          </span>
          <h2 className="font-display mt-6 text-4xl font-light leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
            Ragyogás, sejtszintű
            <br className="hidden sm:block" /> pontossággal
          </h2>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/55">
            Nem ígéreteket adunk, hanem bizonyítékot. Minden formulánk mögött évek klinikai
            kutatása és szabadalmaztatott technológia áll, amely a bőr saját regenerációs
            mechanizmusát erősíti.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 90}>
              <div className="group h-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[#5794E2]/30 hover:bg-white/[0.04]">
                <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5794E2]/10 text-[#5794E2] transition-colors group-hover:bg-[#5794E2]/20">
                  <feature.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2.5 text-lg font-medium tracking-tight text-white">{feature.title}</h3>
                <p className="text-sm font-light leading-relaxed text-white/50">{feature.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
