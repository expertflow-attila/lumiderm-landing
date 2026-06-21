import { useCallback, useEffect, useState } from 'react'
import SplashScreen from './components/SplashScreen'
import CosmicBackground from './components/CosmicBackground'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Marquee from './components/Marquee'
import ScienceSection from './components/ScienceSection'
import TreatmentsSection from './components/TreatmentsSection'
import ResultsSection from './components/ResultsSection'
import TestimonialsSection from './components/TestimonialsSection'
import PricingSection from './components/PricingSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function App() {
  const [splashComplete, setSplashComplete] = useState(false)

  const handleComplete = useCallback(() => setSplashComplete(true), [])

  // Lock scrolling while the intro plays.
  useEffect(() => {
    document.body.style.overflow = splashComplete ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [splashComplete])

  return (
    <div className="relative w-full bg-black font-sans antialiased">
      <CosmicBackground />
      {!splashComplete && <SplashScreen onComplete={handleComplete} />}
      <Navbar isActive={splashComplete} />
      <main>
        <HeroSection isActive={splashComplete} />
        <Marquee />
        <ScienceSection />
        <TreatmentsSection />
        <ResultsSection />
        <TestimonialsSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
