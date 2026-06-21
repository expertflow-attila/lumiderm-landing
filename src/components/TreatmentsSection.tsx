import { Droplet, Sparkles, Eye, ArrowUpRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from '../lib/motion'

interface Treatment {
  index: string
  icon: LucideIcon
  name: string
  desc: string
  price: string
  gradient: string
}

const TREATMENTS: Treatment[] = [
  {
    index: '01',
    icon: Droplet,
    name: 'Sejtmegújító szérum',
    desc: 'Nagy koncentrációjú CellBoost™ 3.0 a mélyreható regenerációért és a tartós ragyogásért.',
    price: '38 000 Ft',
    gradient: 'from-[#1a2a4a] via-[#0c1526] to-black',
  },
  {
    index: '02',
    icon: Sparkles,
    name: 'Feszesítő peptidkrém',
    desc: '24 órán át tartó intenzív hidratálás és láthatóan feszesebb, ruganyosabb bőr.',
    price: '29 000 Ft',
    gradient: 'from-[#10243a] via-[#0a1420] to-black',
  },
  {
    index: '03',
    icon: Eye,
    name: 'Bioaktív szemkontúr',
    desc: 'Célzott ápolás a finom vonalak, a duzzanat és a sötét karikák ellen a szem körül.',
    price: '24 000 Ft',
    gradient: 'from-[#1e2540] via-[#0c111f] to-black',
  },
]

export default function TreatmentsSection() {
  return (
    <section id="kezelesek" className="scroll-mt-28 bg-[#050507] px-6 py-28 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16 flex flex-col items-start justify-between gap-6 md:mb-24 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.28em] text-[#5794E2]">
              <span className="h-px w-8 bg-[#5794E2]/60" />
              Kezelések
            </span>
            <h2 className="font-display mt-6 text-4xl font-light leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
              Rituálé, ami valóban működik
            </h2>
          </div>
          <p className="max-w-sm text-base font-light leading-relaxed text-white/55">
            Három alapvető lépés, amelyet a bőröd igényeire szabtunk — a tisztításától a
            mélyreható sejtmegújulásig.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {TREATMENTS.map((t, i) => (
            <Reveal key={t.name} delay={i * 110}>
              <article
                className={`group relative flex h-[440px] flex-col justify-between overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-b ${t.gradient} p-8 transition-all duration-500 hover:-translate-y-2 hover:border-white/20 md:h-[480px]`}
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[#5794E2]/10 opacity-70 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="flex items-start justify-between">
                  <span className="font-display text-5xl font-light text-white/15">{t.index}</span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-sm">
                    <t.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-2xl font-light tracking-tight text-white">{t.name}</h3>
                  <p className="mb-7 text-sm font-light leading-relaxed text-white/60">{t.desc}</p>
                  <div className="flex items-center justify-between border-t border-white/10 pt-5">
                    <span className="text-lg font-medium text-white">{t.price}</span>
                    <span className="flex items-center gap-1 text-sm text-[#5794E2] transition-colors group-hover:text-white">
                      Részletek
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.75}
                      />
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
