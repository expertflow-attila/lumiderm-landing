import { Star } from 'lucide-react'
import { Reveal } from '../lib/motion'

interface Testimonial {
  quote: string
  name: string
  role: string
  initials: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Négy hét alatt a bőröm kiegyensúlyozottabb és ragyogóbb lett, mint valaha. Végre érzem egy ápolási rutin valódi hatását.',
    name: 'Kovács Júlia',
    role: 'marketingvezető, 34',
    initials: 'KJ',
  },
  {
    quote:
      'Imádom, hogy minden a tudományra épül. Nem üres ígéret, hanem mérhető eredmény, amelyet a betegeimnek is nyugodt szívvel ajánlok.',
    name: 'Dr. Nagy Eszter',
    role: 'bőrgyógyász, 41',
    initials: 'NE',
  },
  {
    quote:
      'A szérum a reggeli rutinom nélkülözhetetlen része lett. A kollégáim is megkérdezték, mit változtattam — ennél jobb visszajelzés nincs.',
    name: 'Szabó Anna',
    role: 'építész, 29',
    initials: 'SZA',
  },
]

export default function TestimonialsSection() {
  return (
    <section id="velemenyek" className="scroll-mt-28 bg-[#050507] px-6 py-28 md:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16 text-center md:mb-24">
          <span className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.28em] text-[#5794E2]">
            <span className="h-px w-8 bg-[#5794E2]/60" />
            Vélemények
            <span className="h-px w-8 bg-[#5794E2]/60" />
          </span>
          <h2 className="font-display mx-auto mt-6 max-w-2xl text-4xl font-light leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
            Amit ügyfeleink mondanak
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 110}>
              <figure className="flex h-full flex-col rounded-[28px] border border-white/[0.08] bg-white/[0.02] p-8 transition-colors duration-500 hover:border-white/20">
                <div className="mb-6 flex gap-1 text-[#5794E2]">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="flex-1 text-lg font-light leading-relaxed text-white/85">
                  „{t.quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3.5 border-t border-white/10 pt-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#5794E2]/15 text-sm font-medium text-[#5794E2]">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{t.name}</div>
                    <div className="text-xs font-light text-white/50">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
