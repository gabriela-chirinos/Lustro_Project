import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const RITUALS = [
 {
    num: '01',
    name: 'The Hand Shine',
    tagline: 'The standard everything else is measured against.',
    description:
      'Each pair begins with a thorough clean and a conditioning pass — reading the leather before anything is applied. Five layers of wax follow, worked in by hand and burnished with bone to a depth no machine can replicate.',
    price: 'From $95',
  },
  {
    num: '02',
    name: 'Suede & Nubuck',
    tagline: 'A different material. A different discipline entirely.',
    description:
      'Suede and nubuck are not smooth leather — and cannot be treated as such. Their surface, the nap, is raised fibre that water stains, wax crushes, and standard shoe cream damages quietly and permanently. We work dry: surface dirt lifted by crepe brush, stains treated by material type, flattened nap raised back by hand, and a breathable protective finish applied to close. Accepted for dress suede, suede boots, and leather-upper luxury sneakers by select makers.',
    price: 'From $145',
  },
  {
    num: '03',
    name: 'Colour Revival',
    tagline: 'Colour returned. Not approximated.',
    description:
      'Dye is matched by eye to the original colour — or a considered new direction, if preferred. Applied in thin successive coats with drying time between each, then sealed with a topcoat that breathes. For shoes that have faded, scuffed through to the leather, or simply deserve better than they have received.',
    price: 'From $180',
  },
  {
    num: '04',
    name: 'Full Restoration',
    tagline: 'The complete conversation.',
    description:
      'A total resurrection — the closest thing to starting over without replacing what cannot be replaced. Every step: deep clean, conditioning treatment, colour work, welt and sole inspection, edge dressing, final mirror finish. Each pair is assessed individually before we begin, and documented when it leaves. Done once. Done right.',
    price: 'From $295',
  },
  {
    num: '05',
    name: 'The Sneaker Ritual',
    tagline: 'Built to move. Restored to last.',
    description:
      'For the leather and suede sneakers that deserve more than a wipe-down. Loro Piana, Hermès, Alexander McQueen, Amiri, Golden Goose, Rick Owens, Fendi, Giuseppe Zanotti, Burberry, Vince — if the upper is leather or suede and the maker is someone who thought about it, we will clean it properly. Upper brushed, tongue and lining addressed, sole edges cleaned and finished. A considered result, not a quick pass.',
    price: 'From $45',
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
            color: 'var(--mid)',
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
            Five services.<br />
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
                borderTop: '1px solid var(--taupe-25)',
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
                  fontWeight: 400,
                  fontSize: '1rem',
                  lineHeight: 1.75,
                  color: 'var(--charcoal)',
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
          <div style={{ borderTop: '1px solid var(--taupe-25)' }} />
        </div>

        {/* Multi-pair note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: 'Epilogue, sans-serif',
            fontWeight: 300,
            fontSize: '0.72rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--taupe)',
            marginTop: '2rem',
            textAlign: 'center',
          }}
        >
          Bringing more than one pair?{' '}
          <span style={{ color: 'var(--gold)' }}>Ask about our multi-pair rate.</span>
        </motion.p>
      </div>
    </section>
  )
}
