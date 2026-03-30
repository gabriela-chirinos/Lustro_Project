import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import Ticker        from './components/Ticker.jsx'
import Nav           from './components/Nav.jsx'
import HeroSection   from './components/HeroSection.jsx'
import PhilosophySection from './components/PhilosophySection.jsx'
import BrushParallax from './components/BrushParallax.jsx'
import RitualsSection from './components/RitualsSection.jsx'
import BeforeAfterGallery from './components/BeforeAfterGallery.jsx'
import TestimonialsSection from './components/TestimonialsSection.jsx'
import CTAStrip      from './components/CTAStrip.jsx'
import TimelineSection from './components/TimelineSection.jsx'
import FAQSection    from './components/FAQSection.jsx'
import ContactSection from './components/ContactSection.jsx'
import Footer        from './components/Footer.jsx'
import BackToTop     from './components/BackToTop.jsx'
import CustomCursor  from './components/CustomCursor.jsx'
import NotFound      from './pages/NotFound.jsx'

gsap.registerPlugin(ScrollTrigger)

// ─── Sync GSAP ScrollTrigger with Lenis ─────────────────────
function LenisScrollTriggerSync() {
  useEffect(() => {
    const lenis = window.__lenis
    if (!lenis) return

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', ScrollTrigger.update)
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
      <CTAStrip />
      <TimelineSection />
      <FAQSection />
      <ContactSection />
    </motion.div>
  )
}

// ─── App Shell ────────────────────────────────────────────────
function AppShell() {
  const location = useLocation()

  return (
    <>
      <LenisScrollTriggerSync />
      <CustomCursor />
      <Nav />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <BackToTop />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
