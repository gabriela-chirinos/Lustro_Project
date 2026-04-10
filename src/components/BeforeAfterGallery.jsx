import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

const PAIRS = [
  {
    label: 'Cognac Penny Loafer',
    before: { bg: '#4A3832', label: 'Before' },
    after:  { bg: '#8B6350', label: 'After'  },
    note: 'Hand shine. Returned to its depth.',
  },
  {
    label: 'Tan Suade Loafer',
    before: { bg: '#5C4840', label: 'Before' },
    after:  { bg: '#9B7B60', label: 'After'  },
    note: 'Water stain removed. Nap fully restored.',
  },
  {
    label: 'Cap-Toe Oxford',
    before: { bg: '#3A2E2A', label: 'Before' },
    after:  { bg: '#7A5A48', label: 'After'  },
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

  const onMouseDown = (e) => { dragging.current = true; updatePosition(e.clientX) }
  const onMouseMove = (e) => { if (dragging.current) updatePosition(e.clientX) }
  const onMouseUp   = () => { dragging.current = false }
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
            background: pair.after.bg,
            display: 'flex',
            alignItems: 'flex-end',
            padding: '1.25rem',
          }}
        >
          <span style={{
            fontFamily: 'Epilogue, sans-serif',
            fontWeight: 300,
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.6)',
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
            background: pair.before.bg,
            display: 'flex',
            alignItems: 'flex-end',
            padding: '1.25rem',
          }}
        >
          <span style={{
            fontFamily: 'Epilogue, sans-serif',
            fontWeight: 300,
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.4)',
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
            background: 'rgba(196,168,130,0.4)',
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
          color: 'var(--taupe)',
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
            color: 'var(--taupe)',
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
      </div>
    </section>
  )
}
