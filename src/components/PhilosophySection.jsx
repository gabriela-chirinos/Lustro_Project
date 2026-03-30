import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useBreakpoint } from '../hooks/useBreakpoint.js'

gsap.registerPlugin(ScrollTrigger)

const PILLARS = [
  {
    num: '01',
    title: 'The Consultation',
    body: 'Every pair tells a story. We begin by listening — to the leather, the wear patterns, the life lived inside the shoe. No two assessments are alike.',
  },
  {
    num: '02',
    title: 'The Preparation',
    body: 'Dirt, old cream, and oxidation are removed by hand. The leather is allowed to breathe, assessed for moisture loss, and treated before anything is applied.',
  },
  {
    num: '03',
    title: 'The Treatment',
    body: 'Conditioners drawn from natural oils — neatsfoot, lanolin, beeswax — are worked into the grain in slow, circular passes. The leather drinks what it needs.',
  },
  {
    num: '04',
    title: 'The Finish',
    body: 'Colour is restored with surgical precision. A high-shine or satin finish is brought up through successive layers of wax, heat, and bone. The result is irreversible elegance.',
  },
]

export default function PhilosophySection() {
  const sectionRef = useRef(null)
  const leftRef    = useRef(null)
  const { isMobile, isTablet } = useBreakpoint()

  useEffect(() => {
    const section = sectionRef.current
    const left    = leftRef.current
    if (!section || !left) return

    // Disable sticky pin on mobile and tablet — not useful in single-column layout
    if (isMobile || isTablet) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 92px',
        end: () => `+=${section.offsetHeight - left.offsetHeight - 80}`,
        pin: left,
        pinSpacing: false,
      })
    }, section)

    return () => ctx.revert()
  }, [isMobile, isTablet])

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="philosophy-grid"
      style={{
        background: 'var(--warm-white)',
        padding: '8rem 0',
        display: 'grid',
        gridTemplateColumns: '40% 1fr',
        gap: '0 4rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Left — sticky on desktop */}
      <div ref={leftRef} className="philosophy-left" style={{ padding: '0 4vw 0 5vw', alignSelf: 'start' }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: 'Epilogue, sans-serif',
            fontWeight: 300,
            fontSize: '0.62rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--taupe)',
            marginBottom: '1.5rem',
          }}
        >
          The Philosophy
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 600,
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            lineHeight: 1.15,
            color: 'var(--charcoal)',
            marginBottom: '2rem',
          }}
        >
          Hard Work.<br />
          <em>Everytime. No Shortcuts</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.25 }}
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 500,
            fontSize: '1.1rem',
            lineHeight: 1.75,
            color: 'var(--mid)',
          }}
        >
          From Latin and Italian — <b>Lustro</b> : to shine, to illuminate, to purify through polish
        </motion.p>
      </div>

      {/* Right — scrolling pillars */}
      <div className="philosophy-right" style={{ padding: '0 5vw 0 0', display: 'flex', flexDirection: 'column', gap: '5rem' }}>
        {PILLARS.map(({ num, title, body }, i) => (
          <motion.div
            key={num}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{ borderTop: '1px solid rgba(176,158,140,0.25)', paddingTop: '2.5rem' }}
          >
            <p style={{
              fontFamily: 'Epilogue, sans-serif',
              fontWeight: 300,
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--taupe)',
              marginBottom: '0.75rem',
            }}>
              {num}
            </p>
            <h3 style={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              fontSize: '1.4rem',
              color: 'var(--charcoal)',
              marginBottom: '1rem',
            }}>
              {title}
            </h3>
            <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 300,
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: 'var(--mid)',
              maxWidth: '460px',
            }}>
              {body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
