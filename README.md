# LumiDerm — Advanced Skin Science

Prémium, egyoldalas landing oldal egy fiktív luxus bőrápolási / biotech márkának.
Magyar nyelvű, mobilra optimalizált, mozgással gazdagított felület.

## Technológia

- **React + TypeScript + Vite**
- **Tailwind CSS**
- **lucide-react** (ikonok)
- Betűtípusok: **Fraunces** (display serif) + **Inter** (sans)
- Könnyűsúlyú, saját scroll-reveal és számláló animációk (külső motion-könyvtár nélkül)

## Felépítés

- `SplashScreen` — valós idő alapú betöltőképernyő függöny-feltárással
- `Navbar` — lebegő, üveghatású menü, sima anchor-görgetéssel
- `HeroSection` — scroll-rögzített, imperatív `requestAnimationFrame`-frissítésű
  videó-átúsztatás két állapot között (vajsima görgetés)
- `Marquee`, `ScienceSection`, `TreatmentsSection`, `ResultsSection`,
  `TestimonialsSection`, `PricingSection`, `ContactSection`, `Footer`

## Fejlesztés

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build a dist/ mappába
npm run preview  # a build előnézete
```

## Megjegyzés

Demó-projekt: az elérhetőségek, statisztikák és a kapcsolati űrlap fiktívek;
az űrlap nem küld adatot szerverre.
