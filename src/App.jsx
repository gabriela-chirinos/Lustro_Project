import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, MemoryRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import Ticker        from './components/Ticker.jsx'
import Nav           from './components/Nav.jsx'
import HeroSection   from './components/HeroSection.jsx'
import PhilosophySection from './components/PhilosophySection.jsx'
import BrushParallax from './components/BrushParallax.jsx'
import RitualsSection from './components/RitualsSection.jsx'
import BeforeAfterGallery from './components/BeforeAfterGallery.jsx'
import TestimonialsSection from './components/TestimonialsSection.jsx'
import CTAStrip      from './components/CTAStrip.jsx'
import FounderSection from './components/FounderSection.jsx'
import TimelineSection from './components/TimelineSection.jsx'
import FAQSection    from './components/FAQSection.jsx'
import ContactSection from './components/ContactSection.jsx'
import Footer        from './components/Footer.jsx'
import BackToTop     from './components/BackToTop.jsx'
import MobileBookingBar from './components/MobileBookingBar.jsx'
import MobileNewsletterPopup from './components/MobileNewsletterPopup.jsx'
import BookingModal  from './components/BookingModal.jsx'
import NotFound      from './pages/NotFound.jsx'
import { BookingProvider } from './context/BookingContext.jsx'

gsap.registerPlugin(ScrollTrigger)

// ─── Init Lenis + sync with GSAP ScrollTrigger ──────────────
function LenisScrollTriggerSync() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false })
    window.__lenis = lenis

    lenis.on('scroll', ScrollTrigger.update)
    const ticker = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', ScrollTrigger.update)
      gsap.ticker.remove(ticker)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])
  return null
}

// ─── Page Transition Wrapper ─────────────────────────────────
const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
}

// ─── Home Page ────────────────────────────────────────────────
function HomePage() {
  return (
    <motion.div
      key="home"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <HeroSection />
      <PhilosophySection />
      <BrushParallax />
      <Ticker />
      <RitualsSection />
      <BeforeAfterGallery />
      <TestimonialsSection />
      <FounderSection />
      <CTAStrip />
      <TimelineSection />
      <ContactSection />
      <FAQSection />
    </motion.div>
  )
}

// ─── App Shell ────────────────────────────────────────────────
function AppShell() {
  const location = useLocation()

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
        onFocus={e => { e.currentTarget.style.cssText = 'position:fixed;top:1rem;left:1rem;z-index:9999;padding:0.5rem 1rem;background:var(--gold);color:var(--deep);font-family:Epilogue,sans-serif;font-size:0.8rem;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;width:auto;height:auto;overflow:visible;' }}
        onBlur={e => { e.currentTarget.style.cssText = 'position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;' }}
      >
        Skip to main content
      </a>
      <LenisScrollTriggerSync />
      <Nav />
      <main id="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <BackToTop />
      <MobileBookingBar />
      <MobileNewsletterPopup />
      <BookingModal />
    </MotionConfig>
  )
}

const Router = typeof window === 'undefined' ? MemoryRouter : BrowserRouter

export default function App() {
  return (
    <Router>
      <BookingProvider>
        <AppShell />
      </BookingProvider>
    </Router>
  )
}
