import { motion } from 'framer-motion'
import { useBooking } from '../context/BookingContext.jsx'

export default function CTAStrip() {
  const { openModal } = useBooking()

  return (
    <section
      className="cta-strip-inner"
      style={{
        background: 'var(--charcoal)',
        padding: '5rem 5vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem',
        flexWrap: 'wrap',
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 style={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 600,
          fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
          color: 'var(--warm-white)',
          lineHeight: 1.2,
          maxWidth: '480px',
        }}>
          Your shoes deserve it,<br />
          <em style={{ color: 'var(--gold)' }}> and so do you.</em>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      >
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
            color: 'var(--warm-white)',
            background: 'transparent',
            border: '1px solid var(--gold-50)',
            padding: '1rem 2.5rem',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Book a Ritual
        </motion.button>
        <p style={{
          fontFamily: 'Epilogue, sans-serif',
          fontWeight: 300,
          fontSize: '0.58rem',
          letterSpacing: '0.08em',
          color: 'var(--cream-35)',
          marginTop: '0.6rem',
          textAlign: 'center',
        }}>
          Starts with a $15 deposit, applied to your total.
        </p>
      </motion.div>
    </section>
  )
}
