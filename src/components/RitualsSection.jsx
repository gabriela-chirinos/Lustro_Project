import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const RITUALS = [
  {
    num: '01',
    name: 'The Hand Shine',
    tagline: 'Mirror-bright in under an hour.',
    description: 'A deep clean, conditioning pass, and five-layer hand wax finish. Bone-burnished to a depth no machine can replicate.',
    duration: '45 – 60 min',
    price: 'From $95',
  },
  {
    num: '02',
    name: 'Deep Conditioning',
    tagline: 'For leather that has forgotten what it is.',
    description: 'A multi-day treatment using warm neatsfoot oil and lanolin to revive desiccated grain leather. Recommended for neglected or antique pieces.',
    duration: '2 – 3 days',
    price: 'From $140',
  },
  {
    num: '03',
    name: 'Colour Revival',
    tagline: 'Exactly the shade it was meant to be.',
    description: 'Solvent-based dye is matched by eye to the original colour, applied in thin successive coats, sealed with a topcoat that breathes.',
    duration: '3 – 5 days',
    price: 'From $185',
  },
  {
    num: '04',
    name: 'Full Restoration',
    tagline: 'The complete conversation.',
    description: 'A total resurrection: cleaning, conditioning, colour work, welt inspection, sole assessment, and final high-shine finish. Done once. Done right.',
    duration: '5 – 7 days',
    price: 'From $320',
  },
]

export default function RitualsSection() {
  const rowRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowRefs.current.forEach((row) => {
        if (!row) return
        gsap.from(row, {
          x: -40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="rituals"
      style={{
        background: 'var(--cream)',
        padding: '8rem 5vw',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '5rem' }}
        >
          <p style={{
            fontFamily: 'Epilogue, sans-serif',
            fontWeight: 300,
            fontSize: '0.62rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--taupe)',
            marginBottom: '1rem',
          }}>
            The Rituals
          </p>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
            lineHeight: 1.1,
            color: 'var(--charcoal)',
          }}>
            Four services.<br />
            <em style={{ fontWeight: 400 }}>Each one a commitment.</em>
          </h2>
        </motion.div>

        {/* Ritual Rows */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {RITUALS.map(({ num, name, tagline, description, duration, price }, i) => (
            <div
              key={num}
              ref={el => rowRefs.current[i] = el}
              className="ritual-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr auto',
                gap: '0 3rem',
                alignItems: 'start',
                padding: '3rem 0',
                borderTop: '1px solid rgba(176,158,140,0.25)',
                cursor: 'default',
              }}
            >
              {/* Ghost Number */}
              <div className="ritual-ghost" style={{ paddingTop: '0.25rem' }}>
                <span
                  className="ghost-number"
                  style={{ fontSize: '4.5rem', display: 'block', lineHeight: 1 }}
                >
                  {num}
                </span>
              </div>

              {/* Content */}
              <div>
                <h3 style={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 600,
                  fontSize: '1.55rem',
                  color: 'var(--charcoal)',
                  marginBottom: '0.35rem',
                }}>
                  {name}
                </h3>
                <p style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: '1.05rem',
                  color: 'var(--gold)',
                  marginBottom: '0.85rem',
                }}>
                  {tagline}
                </p>
                <p style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontWeight: 300,
                  fontSize: '1rem',
                  lineHeight: 1.75,
                  color: 'var(--mid)',
                  maxWidth: '480px',
                }}>
                  {description}
                </p>
              </div>

              {/* Meta */}
              <div className="ritual-meta" style={{ textAlign: 'right', paddingTop: '0.25rem', minWidth: '120px' }}>
                <p style={{
                  fontFamily: 'Epilogue, sans-serif',
                  fontWeight: 500,
                  fontSize: '1rem',
                  color: 'var(--charcoal)',
                  marginBottom: '0.4rem',
                }}>
                  {price}
                </p>
                <p style={{
                  fontFamily: 'Epilogue, sans-serif',
                  fontWeight: 300,
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  color: 'var(--taupe)',
                  textTransform: 'uppercase',
                }}>
                  {duration}
                </p>
              </div>
            </div>
          ))}
          {/* Bottom border */}
          <div style={{ borderTop: '1px solid rgba(176,158,140,0.25)' }} />
        </div>
      </div>
    </section>
  )
}
