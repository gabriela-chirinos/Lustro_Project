import { motion } from 'framer-motion'

export default function CTAStrip() {
  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) window.__lenis?.scrollTo(el, { offset: -80 })
  }

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
          onClick={scrollToContact}
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
            border: '1px solid rgba(196,168,130,0.5)',
            padding: '1rem 2.5rem',
            cursor: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Book a Ritual
        </motion.button>
      </motion.div>
    </section>
  )
}
