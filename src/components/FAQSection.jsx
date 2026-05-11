import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  {
    q: 'How much does it cost?',
    a: "Services start from $45 for a sneaker clean, and from $95 for a full hand shine and conditioning. A full restoration (resoling, colour correction, deep leather repair) typically ranges from $180 to $380 depending on the work required. We provide a firm, itemised quote before any work begins. No surprises.", // Note to client: Adjust prices to reflect actual rates before launch
  },
  {
    q: 'Do you work on sneakers?',
    a: 'Selectively, yes. We work on leather and suede uppers. If your sneakers were designed to be worn with a tailored trouser, and made by someone who cares about the leather, we want to see it. Makers like Common Projects, Maison Margiela, Amiri, Golden Goose, Rick Owens, and similar. We don\'t accept athletic footwear: rubber or mesh uppers, anything built for a court or a track. If it\'s a designer sneaker you\'d hesitate to scuff, it probably qualifies. Send us a photograph when you book if you\'re unsure.',
  },
  {
    q: 'What brands do you service?',
    a: "We work with all quality leather footwear: Alden, Allen Edmonds, Saint Laurent, Berluti, Ferragamo, Crockett & Jones, John Lobb, and others. If it's made well, we can restore it.",
  },
  {
    q: 'How long does a full restoration take?',
    a: 'A Full Restoration typically takes 5–7 business days. More complex work (significant colour correction, welt rebuilding) may require up to 10 days.',
  },
  {
    q: 'Do I need to ship my shoes or can I drop off?',
    a: 'We serve the greater Los Angeles area directly. Pickup and return are coordinated at the time of booking. For clients outside of LA, shipping is an option. Reach out and we\'ll work out the details together.',
  },
  {
    q: 'What products do you use?',
    a: 'We use professional-grade conditioners (Saphir Renovateur, neatsfoot oil, beeswax), matched dyes, and finishing waxes. No silicone, no shortcuts.',
  },
  {
    q: 'Do you offer a guarantee?',
    a: "Every pair that leaves carries our name on the result. If the work doesn't meet the standard agreed at consultation, we will address it. Completely, and at no additional charge.",
  },
]

function FAQItem({ q, a, isOpen, onToggle, id }) {
  const panelId = `faq-panel-${id}`
  const buttonId = `faq-btn-${id}`
  return (
    <div
      style={{
        borderTop: '1px solid var(--taupe-25)',
      }}
    >
      <button
        id={buttonId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.75rem 0',
          textAlign: 'left',
          gap: '2rem',
        }}
      >
        <span style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontWeight: 400,
          fontSize: '1.15rem',
          color: 'var(--charcoal)',
          lineHeight: 1.4,
        }}>
          {q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            flexShrink: 0,
            width: '20px',
            height: '20px',
            position: 'relative',
            color: isOpen ? 'var(--gold)' : 'var(--taupe)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              fontFamily: 'Epilogue, sans-serif',
              fontWeight: 300,
              fontSize: '0.88rem',
              lineHeight: 1.8,
              color: 'var(--mid)',
              paddingBottom: '1.75rem',
              maxWidth: '600px',
            }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section
      id="faq"
      style={{
        background: 'var(--parchment)',
        padding: '8rem 5vw',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

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
           FAQ
          </p>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            lineHeight: 1.15,
            color: 'var(--charcoal)',
          }}>
            Before you book.<br />
            <em style={{ fontWeight: 400 }}>Everything you need to know.</em>
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          {FAQS.map((item, i) => (
            <FAQItem
              key={i}
              id={i}
              q={item.q}
              a={item.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
          <div style={{ borderTop: '1px solid var(--taupe-25)' }} />
        </motion.div>
      </div>
    </section>
  )
}
