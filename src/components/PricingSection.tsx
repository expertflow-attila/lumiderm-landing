import { Check } from 'lucide-react'
import { Reveal } from '../lib/motion'

interface Plan {
  name: string
  price: string
  note: string
  features: string[]
  featured?: boolean
}

const PLANS: Plan[] = [
  {
    name: 'Felfedező',
    price: '24 000 Ft',
    note: 'Egyszeri vásárlás',
    features: [
      'Sejtmegújító szérum (15 ml)',
      'Személyre szabott bőrelemzés',
      'Digitális ápolási útmutató',
    ],
  },
  {
    name: 'Komplett rituálé',
    price: '58 000 Ft',
    note: 'A legnépszerűbb választás',
    features: [
      'Szérum, krém és szemkontúr',
      'Teljes reggeli és esti rutin',
      'Ingyenes kiszállítás',
      'Online dermatológus-konzultáció',
    ],
    featured: true,
  },
  {
    name: 'Prémium protokoll',
    price: '96 000 Ft',
    note: 'Negyedéves program',
    features: [
      'Minden termék teljes méretben',
      'Személyes dermatológiai konzultáció',
      'Negyedéves automatikus szállítás',
      'Kiemelt ügyfélszolgálat',
    ],
  },
]

export default function PricingSection() {
  return (
    <section id="csomagok" className="scroll-mt-28 px-6 py-28 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16 text-center md:mb-20">
          <span className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.28em] text-[#5794E2]">
            <span className="h-px w-8 bg-[#5794E2]/60" />
            Csomagok
            <span className="h-px w-8 bg-[#5794E2]/60" />
          </span>
          <h2 className="font-display mx-auto mt-6 max-w-2xl text-4xl font-light leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
            Válaszd ki a rituálédat
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base font-light leading-relaxed text-white/55">
            Minden csomag a LumiDerm szabadalmaztatott technológiáját tartalmazza — válassz a
            bőröd igényei és céljaid szerint.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 90}>
              <div
                className={`relative flex h-full flex-col rounded-[28px] border p-8 transition-all duration-500 ${
                  plan.featured
                    ? 'border-[#5794E2]/50 bg-gradient-to-b from-[#5794E2]/[0.14] to-white/[0.02] lg:-translate-y-4 lg:scale-[1.03]'
                    : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20'
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#5794E2] px-4 py-1 text-[11px] font-medium uppercase tracking-wide text-white">
                    Legnépszerűbb
                  </span>
                )}

                <h3 className="text-lg font-medium tracking-tight text-white">{plan.name}</h3>
                <p className="mt-1 text-xs font-light text-white/50">{plan.note}</p>

                <div className="my-7">
                  <span className="font-display text-4xl font-light tracking-tight text-white">
                    {plan.price}
                  </span>
                </div>

                <ul className="mb-9 flex-1 space-y-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm font-light text-white/70">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#5794E2]" strokeWidth={2} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#kapcsolat"
                  className={`mt-auto flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium transition-colors ${
                    plan.featured
                      ? 'bg-[#5794E2] text-white hover:bg-[#4a84d0]'
                      : 'border border-white/15 text-white hover:bg-white/10'
                  }`}
                >
                  Választom
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
