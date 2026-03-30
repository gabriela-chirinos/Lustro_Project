import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
 
  {
    q: 'Do you work on sneakers?',
    a: 'We focus exclusively on leather-soled dress shoes, boots, and leather-upper shoes. We do not work on athletic footwear, rubber-soled sneakers, or fabric uppers.',
  },
  {
    q: 'What brands do you service?',
    a: "We work with all quality leather footwear — from Alden and Allen Edmonds to Saint Laurent, Berluti,Ferragamo and John Lobb. If it's made well, we can restore it.",
  },
  {
    q: 'How long does a full restoration take?',
    a: 'A Full Restoration typically takes 5–7 business days. More complex work — significant colour correction, welt rebuilding — may require up to 10 days.',
  },
  {
    q: 'Do I need to ship my shoes or can I drop off?',
    a: 'We accept both. Our studio is in West Hollywood by appointment. We also accept carefully packaged shoes shipped to our studio address, provided upon booking.',
  },
  {
    q: 'What products do you use?',
    a: 'We use professional-grade conditioners (Saphir Renovateur, neatsfoot oil, beeswax), matched dyes, and finishing waxes. No silicone, no shortcuts.',
  },
  {
    q: 'Do you offer a guarantee?',
    a: "We stand behind our work. If you're not satisfied with the result, bring the shoes back within 48hrs and we'll make it right at no additional charge.",
  },
]

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div
      style={{
        borderTop: '1px solid rgba(176,158,140,0.25)',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'none',
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
            color: 'var(--taupe)',
            marginBottom: '1rem',
          }}>
            Questions
          </p>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            color: 'var(--charcoal)',
          }}>
            FAQs
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
              q={item.q}
              a={item.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
          <div style={{ borderTop: '1px solid rgba(176,158,140,0.25)' }} />
        </motion.div>
      </div>
    </section>
  )
}
