const PARTNERS = [
  'DERMA INSTITUTE',
  'BIOTECH LABS',
  'VOGUE BEAUTY',
  'CLEAN COSMETICS',
  'SKIN JOURNAL',
  'EU CERTIFIED',
  "L'ESSENCE",
  'PURE SCIENCE',
]

export default function Marquee() {
  return (
    <section className="border-y border-white/10 bg-black py-10 md:py-12">
      <p className="mb-8 text-center text-[11px] uppercase tracking-[0.25em] text-white/40">
        Elismert partnereink és szakmai háttér
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-16 pr-16">
          {[...PARTNERS, ...PARTNERS].map((name, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-lg font-light tracking-wide text-white/35 transition-colors hover:text-white/70 md:text-2xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
