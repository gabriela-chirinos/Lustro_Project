import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

import beforeLoafer from '../assets/images/before_loafer.png'
import afterLoafer  from '../assets/images/after_loafer.png'
import beforeSuade  from '../assets/images/before_suade.png'
import afterSuade   from '../assets/images/after_suade.png'
import beforeOxford from '../assets/images/before_oxford.png'
import afterOxford  from '../assets/images/after_oxford.png'

const PAIRS = [
  {
    label: 'Cognac Penny Loafer',
    before: { src: beforeLoafer, label: 'Before' },
    after:  { src: afterLoafer,  label: 'After'  },
    note: 'Hand shine. Returned to its depth.',
  },
  {
    label: 'Tan Suede Loafer',
    before: { src: beforeSuade, label: 'Before' },
    after:  { src: afterSuade,  label: 'After'  },
    note: 'Water stain removed. Nap fully restored.',
  },
  {
    label: 'Cap-Toe Oxford',
    before: { src: beforeOxford, label: 'Before' },
    after:  { src: afterOxford,  label: 'After'  },
    note: 'Colour matched by eye. Applied by hand.',
  },
]

function BeforeAfterSlider({ pair }) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef(null)
  const dragging = useRef(false)

  const updatePosition = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
    setPosition(pct)
  }, [])

  const onMouseDown  = (e) => { dragging.current = true; updatePosition(e.clientX) }
  const onMouseMove  = (e) => { if (dragging.current) updatePosition(e.clientX) }
  const onMouseUp    = () => { dragging.current = false }
  const onTouchStart = (e) => { dragging.current = true; updatePosition(e.touches[0].clientX) }
  const onTouchMove  = (e) => { if (dragging.current) updatePosition(e.touches[0].clientX) }
  const onTouchEnd   = () => { dragging.current = false }

  return (
    <div>
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          position: 'relative',
          height: '340px',
          overflow: 'hidden',
          cursor: 'ew-resize',
          userSelect: 'none',
          borderRadius: '2px',
        }}
      >
        {/* After panel (full width background) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'flex-end',
            padding: '1.25rem',
          }}
        >
          <img
            src={pair.after.src}
            alt={`${pair.label} — after`}
            draggable={false}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              pointerEvents: 'none',
            }}
          />
          <span style={{
            position: 'relative',
            zIndex: 1,
            fontFamily: 'Epilogue, sans-serif',
            fontWeight: 300,
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.7)',
          }}>
            {pair.after.label}
          </span>
        </div>

        {/* Before panel (clipped) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            clipPath: `inset(0 ${100 - position}% 0 0)`,
            display: 'flex',
            alignItems: 'flex-end',
            padding: '1.25rem',
          }}
        >
          <img
            src={pair.before.src}
            alt={`${pair.label} — before`}
            draggable={false}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              pointerEvents: 'none',
            }}
          />
          <span style={{
            position: 'relative',
            zIndex: 1,
            fontFamily: 'Epilogue, sans-serif',
            fontWeight: 300,
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.5)',
          }}>
            {pair.before.label}
          </span>
        </div>

        {/* Divider line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${position}%`,
            width: '1px',
            background: 'rgba(196,168,130,0.6)',
            transform: 'translateX(-50%)',
            zIndex: 2,
          }}
        />

        {/* Handle */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `${position}%`,
            transform: 'translate(-50%, -50%)',
            width: '36px',
            height: '36px',
            background: 'var(--gold)',
            borderRadius: '50%',
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'ew-resize',
          }}
        >
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path d="M1 5h14M1 5L4 2M1 5l3 3M15 5l-3-3M15 5l-3 3" stroke="var(--deep)" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Label */}
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 600,
          fontSize: '1rem',
          color: 'var(--charcoal)',
        }}>
          {pair.label}
        </p>
        <p style={{
          fontFamily: 'Epilogue, sans-serif',
          fontWeight: 300,
          fontSize: '0.62rem',
          letterSpacing: '0.1em',
          color: 'var(--mid)',
          textTransform: 'uppercase',
        }}>
          {pair.note}
        </p>
      </div>
    </div>
  )
}

export default function BeforeAfterGallery() {
  return (
    <section
      style={{
        background: 'var(--parchment)',
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
          style={{ marginBottom: '4rem' }}
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
            Before &amp; After
          </p>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            color: 'var(--charcoal)',
          }}>
            The work speaks for itself.
          </h2>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 300,
            fontSize: '1.05rem',
            color: 'var(--mid)',
            marginTop: '0.75rem',
          }}>
            Drag the handle to reveal.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          {PAIRS.map((pair, i) => (
            <motion.div
              key={pair.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <BeforeAfterSlider pair={pair} />
            </motion.div>
          ))}
        </div>

        {/* Post-gallery CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginTop: '4rem' }}
        >
          <motion.button
            onClick={() => {
              const el = document.getElementById('contact')
              if (el) window.__lenis?.scrollTo(el, { offset: -80 })
            }}
            whileHover={{ backgroundColor: 'var(--gold)', color: 'var(--deep)' }}
            transition={{ duration: 0.25 }}
            style={{
              fontFamily: 'Epilogue, sans-serif',
              fontWeight: 500,
              fontSize: '0.72rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--charcoal)',
              background: 'transparent',
              border: '1px solid var(--gold)',
              padding: '0.9rem 2.4rem',
              cursor: 'none',
            }}
          >
            Book a Ritual
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
