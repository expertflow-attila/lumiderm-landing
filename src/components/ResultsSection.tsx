import { Reveal, useInView, useCountUp } from '../lib/motion'

const THUMB =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260619_220258_2f77857f-c799-4cce-9818-442542b98f2a.png&w=1280&q=85'

interface Stat {
  target: number
  decimals: number
  suffix: string
  label: string
}

const STATS: Stat[] = [
  { target: 8, decimals: 0, suffix: 'M+', label: 'Megújult bőr világszerte' },
  { target: 96.4, decimals: 1, suffix: '%', label: 'Látható eredmény négy hét alatt' },
  { target: 37, decimals: 0, suffix: '', label: 'Bejegyzett szabadalom' },
  { target: 120, decimals: 0, suffix: '+', label: 'Ország, ahol elérhető' },
]

function StatCounter({ stat, start }: { stat: Stat; start: boolean }) {
  const value = useCountUp(stat.target, start, 2200)
  const text = value.toFixed(stat.decimals).replace('.', ',')
  return (
    <div className="border-t border-white/10 pt-5">
      <div className="font-display text-4xl font-light tracking-tight text-white md:text-5xl">
        {text}
        <span className="text-[#5794E2]">{stat.suffix}</span>
      </div>
      <div className="mt-2 text-sm font-light text-white/50">{stat.label}</div>
    </div>
  )
}

export default function ResultsSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3)

  return (
    <section id="eredmenyek" className="scroll-mt-28 bg-black px-6 py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-24">
        {/* Visual */}
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden rounded-[32px] border border-white/10">
              <img
                src={THUMB}
                alt="A LumiDerm bizonyított eredményei"
                className="aspect-[4/5] w-full object-cover sm:aspect-square lg:aspect-[4/5]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4 rounded-2xl border border-white/10 bg-black/60 p-4 backdrop-blur-md">
              <div className="font-display text-3xl font-light text-white">9/10</div>
              <p className="text-xs font-light leading-snug text-white/70">
                felhasználónk már az első hónapban érzékelhető javulást tapasztalt bőre
                állapotában.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Stats */}
        <div ref={ref}>
          <Reveal>
            <span className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.28em] text-[#5794E2]">
              <span className="h-px w-8 bg-[#5794E2]/60" />
              Eredmények
            </span>
            <h2 className="font-display mt-6 text-4xl font-light leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
              Számokban mérhető megújulás
            </h2>
            <p className="mt-6 max-w-md text-base font-light leading-relaxed text-white/55">
              Eredményeink nem a marketingből, hanem független klinikai vizsgálatokból és
              több millió valós felhasználói tapasztalatból származnak.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-x-10 gap-y-9">
            {STATS.map((stat) => (
              <StatCounter key={stat.label} stat={stat} start={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
