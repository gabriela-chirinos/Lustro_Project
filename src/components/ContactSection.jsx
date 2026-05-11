import { useState } from 'react'
import { motion } from 'framer-motion'

const PROCESS = [
  { num: '01', text: 'Select your service and a pickup window that works for you.' },
  { num: '02', text: 'Complete your $15 deposit, applied to your total at delivery.' },
  { num: '03', text: 'We come to you, do the work, and return your shoes restored.' },
]

export default function ContactSection() {
  const [loaded, setLoaded] = useState(false)

  return (
    <section
      id="contact"
      style={{
        background: 'var(--warm-white)',
        padding: '8rem 5vw',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '4rem' }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            marginBottom: '1.5rem',
          }}>
            <div style={{ width: '2rem', height: '1px', background: 'var(--gold-60)', flexShrink: 0 }} />
            <p style={{
              fontFamily: 'Epilogue, sans-serif',
              fontWeight: 300,
              fontSize: '0.62rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--mid)',
            }}>
              Book a Pickup
            </p>
          </div>

          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            lineHeight: 1.15,
            color: 'var(--charcoal)',
            marginBottom: '1.5rem',
          }}>
            Every restoration<br />
            <em style={{ fontWeight: 400 }}>begins with a conversation.</em>
          </h2>

          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 300,
            fontSize: '1.05rem',
            lineHeight: 1.8,
            color: 'var(--mid)',
            maxWidth: '560px',
          }}>
            We come to you. Select your service, choose a pickup window, and complete
            your $15 deposit to confirm. Once your shoes are ready, you'll receive a
            photo and a payment link for the remaining balance before delivery.
          </p>
        </motion.div>

        {/* Iframe — branded frame */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {/* Gold top accent line */}
          <div style={{ height: '1px', background: 'var(--gold-50)' }} />

          <div style={{
            border: '1px solid var(--taupe-20)',
            borderTop: 'none',
            background: 'var(--parchment)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Loading state */}
            {!loaded && (
              <div
                aria-label="Loading scheduler"
                style={{
                  position: 'absolute',
                  inset: 0,
                  minHeight: '400px',
                  background: 'var(--parchment)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1.75rem',
                  zIndex: 2,
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                  {[100, 72, 48].map((w, i) => (
                    <motion.div
                      key={i}
                      style={{ height: '1px', width: `${w}px`, background: 'var(--gold)', opacity: 0.6 }}
                      animate={{ opacity: [0.6, 0.15, 0.6] }}
                      transition={{ duration: 2, delay: i * 0.25, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  ))}
                </div>
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
              height="800"
              frameBorder="0"
              allow="payment"
              onLoad={() => setLoaded(true)}
              style={{
                border: 'none',
                display: 'block',
                opacity: loaded ? 1 : 0,
                transition: 'opacity 0.7s ease',
              }}
            />
          </div>
        </motion.div>

        {/* Process steps */}
        <motion.div
          className="acuity-steps"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            marginTop: '3.5rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid var(--taupe-20)',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
          }}
        >
          {PROCESS.map(({ num, text }) => (
            <div key={num} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{
                fontFamily: 'Epilogue, sans-serif',
                fontWeight: 300,
                fontSize: '0.6rem',
                letterSpacing: '0.12em',
                color: 'var(--gold)',
                paddingTop: '0.15rem',
                flexShrink: 0,
              }}>
                {num}
              </span>
              <span style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontWeight: 400,
                fontSize: '0.95rem',
                color: 'var(--mid)',
                lineHeight: 1.65,
              }}>
                {text}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
