import { Instagram, Facebook, Linkedin } from 'lucide-react'
import type { MouseEvent } from 'react'

const COLUMNS = [
  {
    title: 'Termékek',
    links: ['Sejtmegújító szérum', 'Feszesítő peptidkrém', 'Bioaktív szemkontúr', 'Szettek'],
  },
  {
    title: 'Vállalat',
    links: ['Rólunk', 'A tudomány', 'Karrier', 'Sajtó'],
  },
  {
    title: 'Jogi',
    links: ['ÁSZF', 'Adatvédelem', 'Cookie-szabályzat', 'Impresszum'],
  },
]

export default function Footer() {
  const toTop = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-white/10 bg-black/40 px-6 pb-10 pt-20 md:pt-24 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5 md:gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#top" onClick={toTop} className="text-2xl tracking-tight text-white">
              <span className="font-semibold">Lumi</span>
              <span className="font-light">Derm</span>
            </a>
            <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-white/50">
              Fejlett bőrtudomány a sugárzó, egészséges bőrért. Kutatáson alapuló, tiszta
              formulák — valódi eredményekkel.
            </p>
            <div className="mt-7 flex gap-3">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Közösségi média"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition-colors hover:border-[#5794E2]/40 hover:text-white"
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm font-light text-white/55 transition-colors hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs font-light text-white/40 sm:flex-row">
          <span>© 2026 LumiDerm. Minden jog fenntartva.</span>
          <span>Készült Magyarországon, tudományos szenvedéllyel.</span>
        </div>
      </div>
    </footer>
  )
}
