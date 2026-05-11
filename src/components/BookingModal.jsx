import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBooking } from '../context/BookingContext.jsx'

export default function BookingModal() {
  const { isOpen, closeModal } = useBooking()
  const [loaded, setLoaded] = useState(false)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={closeModal}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 900,
              background: 'var(--deep-92)',
              backdropFilter: 'blur(6px)',
            }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              inset: '0',
              zIndex: 901,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                background: 'var(--warm-white)',
                width: '100%',
                maxWidth: '780px',
                maxHeight: '90vh',
                overflowY: 'auto',
                pointerEvents: 'all',
                position: 'relative',
              }}
            >
              {/* Gold top bar */}
              <div style={{ height: '3px', background: 'var(--gold)', flexShrink: 0 }} />

              {/* Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.75rem 2rem 1.25rem',
                borderBottom: '1px solid var(--taupe-20)',
              }}>
                <div>
                  <p style={{
                    fontFamily: 'Epilogue, sans-serif',
                    fontWeight: 300,
                    fontSize: '0.58rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'var(--mid)',
                    marginBottom: '0.4rem',
                  }}>
                    Lustro · Los Angeles
                  </p>
                  <h2 style={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 600,
                    fontSize: '1.5rem',
                    color: 'var(--charcoal)',
                    lineHeight: 1.2,
                  }}>
                    Book a Ritual
                  </h2>
                  <p style={{
                    fontFamily: 'Epilogue, sans-serif',
                    fontWeight: 300,
                    fontSize: '0.7rem',
                    color: 'var(--mid)',
                    marginTop: '0.35rem',
                    letterSpacing: '0.04em',
                  }}>
                    Starts with a $15 deposit, applied to your total at delivery.
                  </p>
                </div>

                {/* Close button */}
                <button
                  onClick={closeModal}
                  aria-label="Close booking"
                  style={{
                    background: 'none',
                    border: '1px solid var(--taupe-30)',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0,
                    color: 'var(--mid)',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--charcoal)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--taupe-30)'; e.currentTarget.style.color = 'var(--mid)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Acuity iframe */}
              <div style={{ position: 'relative', minHeight: '520px' }}>
                {!loaded && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1.5rem',
                    background: 'var(--warm-white)',
                    zIndex: 2,
                  }}>
                    {[100, 72, 48].map((w, i) => (
                      <motion.div
                        key={i}
                        style={{ height: '1px', width: `${w}px`, background: 'var(--gold)', opacity: 0.6 }}
                        animate={{ opacity: [0.6, 0.15, 0.6] }}
                        transition={{ duration: 2, delay: i * 0.25, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    ))}
                    <p style={{
                      fontFamily: 'Epilogue, sans-serif',
                      fontWeight: 300,
                      fontSize: '0.58rem',
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      color: 'var(--taupe)',
                    }}>
                      Loading
                    </p>
                  </div>
                )}
                <iframe
                  src="https://app.acuityscheduling.com/schedule.php?owner=39188635&ref=embedded_csp"
                  title="Schedule Appointment"
                  width="100%"
                  height="640"
                  frameBorder="0"
                  allow="payment"
                  onLoad={() => setLoaded(true)}
                  style={{
                    border: 'none',
                    display: 'block',
                    opacity: loaded ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                  }}
                />
              </div>

              {/* Fallback */}
              <div style={{
                padding: '1rem 2rem 1.5rem',
                borderTop: '1px solid var(--taupe-15)',
                textAlign: 'center',
              }}>
                <p style={{
                  fontFamily: 'Epilogue, sans-serif',
                  fontWeight: 300,
                  fontSize: '0.62rem',
                  letterSpacing: '0.08em',
                  color: 'var(--taupe)',
                }}>
                  Having trouble? Email us at{' '}
                  <a
                    href="mailto:hello@lustro.studio"
                    style={{ color: 'var(--gold)', textDecoration: 'none' }}
                  >
                    hello@lustro.studio {/* TODO: Replace with real email before launch */}
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
