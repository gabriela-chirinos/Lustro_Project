import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MILESTONES = [
  {
    year: '1988',
    title: 'Founded',
    body: 'Started in Glendale. A clientele built entirely on word of mouth.',
  },
  {
    year: '1997',
    title: 'First Studio',
    body: 'Added full colour restoration to the service menu.',
  },
  {
    year: '2015',
    title: 'By Appointment Only',
    body: 'A deliberate decision: fewer clients, more time per pair. The quality of the work demanded it.',
  },
  {
    year: '2026',
    title: 'Present',
    body: 'A one-person studio. The same commitment as day one.',
  },
]

export default function TimelineSection() {
  const sectionRef = useRef(null)
  const spineRef   = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const spine   = spineRef.current
    if (!section || !spine) return

    const ctx = gsap.context(() => {
      gsap.from(spine, {
        scaleY: 0,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'bottom 60%',
          scrub: 1,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="timeline"
      ref={sectionRef}
      style={{
        background: 'var(--cream)',
        padding: '8rem 5vw',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

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
            Our History
          </p>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            color: 'var(--charcoal)',
          }}>
            Over Three Decades.<br />
            <em style={{ fontWeight: 400 }}>One standard.</em>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: '2.5rem' }}>

          {/* Vertical spine */}
          <div
            ref={spineRef}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'rgba(176,158,140,0.3)',
            }}
          />

          {MILESTONES.map(({ year, title, body }, i) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                paddingBottom: i < MILESTONES.length - 1 ? '4.5rem' : 0,
              }}
            >
              {/* Dot on spine */}
              <div style={{
                position: 'absolute',
                left: '-2.625rem',
                top: '0.35rem',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--gold)',
                border: '1px solid var(--gold)',
              }} />

              {/* Ghost year */}
              <span
                className="ghost-number timeline-ghost-year"
                style={{
                  fontSize: '4rem',
                  position: 'absolute',
                  right: 0,
                  top: '-1rem',
                  opacity: 0.6,
                }}
              >
                {year}
              </span>

              <p style={{
                fontFamily: 'Epilogue, sans-serif',
                fontWeight: 300,
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: '0.5rem',
              }}>
                {year}
              </p>
              <h3 style={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
                fontSize: '1.3rem',
                color: 'var(--charcoal)',
                marginBottom: '0.6rem',
              }}>
                {title}
              </h3>
              <p style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontWeight: 300,
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: 'var(--mid)',
                maxWidth: '420px',
              }}>
                {body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
