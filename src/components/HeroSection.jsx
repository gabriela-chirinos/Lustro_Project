import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import heroVideo from '../assets/video/hero.mp4'
import { useBooking } from '../context/BookingContext.jsx'

gsap.registerPlugin(ScrollTrigger)

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.10, delayChildren: 0.2 } },
}

const lineVariant = {
  hidden: { opacity: 0, y: 60 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

export default function HeroSection() {
  const { openModal } = useBooking()
  const videoRef   = useRef(null)
  const sectionRef = useRef(null)
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    // GSAP video fade: opacity 1 → 0.08 as user scrolls past hero
    const ctx = gsap.context(() => {
      gsap.to(video, {
        opacity: 0.08,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '80% top',
          scrub: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        height: '100svh',
        minHeight: '600px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        background: 'var(--deep)',
        marginTop: '0',
      }}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay={!prefersReduced}
        muted
        loop={!prefersReduced}
        playsInline
        preload="none"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 1,
        }}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, var(--deep-55) 0%, var(--deep-30) 50%, var(--deep-72) 100%)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '0 5vw clamp(8rem, 15vh, 14rem)',
          maxWidth: '900px',
          marginLeft: 'max(5vw, 2rem)',
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Eyebrow */}
          <motion.p
            variants={lineVariant}
            style={{
              fontFamily: 'Epilogue, sans-serif',
              fontWeight: 300,
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '1.5rem',
            }}
          >
            Los Angeles · Est. 1988
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={lineVariant}
            style={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: 'clamp(3rem, 7vw, 6.5rem)',
              lineHeight: 1.05,
              color: 'var(--warm-white)',
              marginBottom: '0.2em',
            }}
          >
            Old world craft.
          </motion.h1>
          <motion.p
            variants={lineVariant}
            style={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 400,
              fontStyle: 'italic',
              fontSize: 'clamp(3rem, 7vw, 6.5rem)',
              lineHeight: 1.05,
              color: 'var(--gold)',
              marginBottom: '2rem',
            }}
          >
            Modern standards.
          </motion.p>

          {/* Subtext */}
          <motion.p
            variants={lineVariant}
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 300,
              fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
              color: 'var(--cream-72)',
              maxWidth: '460px',
              lineHeight: 1.6,
              marginBottom: '2.5rem',
            }}
          >
            Premium bespoke shoe care and leather restoration.
            By appointment only.
          </motion.p>

          {/* CTA */}
          <motion.div variants={lineVariant}>
            <motion.button
              onClick={openModal}
              whileHover={{ backgroundColor: 'var(--gold)', color: 'var(--deep)', borderColor: 'var(--gold)' }}
              transition={{ duration: 0.25 }}
              style={{
                fontFamily: 'Epilogue, sans-serif',
                fontWeight: 500,
                fontSize: '0.72rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                background: 'transparent',
                border: '1px solid var(--gold-40)',
                padding: '0.9rem 2.2rem',
                cursor: 'pointer',
              }}
            >
              Book a Ritual
            </motion.button>
            <p style={{
              fontFamily: 'Epilogue, sans-serif',
              fontWeight: 300,
              fontSize: '0.6rem',
              letterSpacing: '0.08em',
              color: 'var(--cream-50)',
              marginTop: '0.65rem',
            }}>
              Starts with a $15 deposit, applied to your total.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Etymology — bottom right (hidden on mobile via .hero-etymology CSS class) */}
      <motion.div
        className="hero-etymology"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          right: '4vw',
          zIndex: 2,
          textAlign: 'right',
        }}
      >
        <p style={{
          fontFamily: 'Epilogue, sans-serif',
          fontWeight: 300,
          fontSize: '0.58rem',
          letterSpacing: '0.12em',
          color: 'var(--gold-50)',
          lineHeight: 1.7,
          textTransform: 'uppercase',
        }}>
          lus·tro<br />
          <span style={{ fontStyle: 'italic', textTransform: 'none', letterSpacing: '0.05em', color: 'var(--gold-40)' }}>
            to shine, to illuminate, to purify through polish
          </span>
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 300, fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-40)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '1px', height: '32px', background: 'var(--gold-35)' }}
        />
      </motion.div>
    </section>
  )
}
