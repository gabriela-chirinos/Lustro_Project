import { motion } from 'framer-motion'
import shoeBlue  from '../assets/images/shoe_blue.webp'
import shoeBrown from '../assets/images/shoe_brown.webp'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay },
})

export default function ShoeShowcase() {
  return (
    <section
      className="shoe-showcase"
      style={{
        background: 'var(--deep)',
        padding: '5rem 5vw 4.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '3rem',
      }}
    >
      {/* Images */}
      <div
        className="shoe-showcase-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.25rem',
          width: '100%',
          maxWidth: '960px',
        }}
      >
        {[
          { src: shoeBlue,  alt: 'Restored monk strap in midnight leather, brush laid alongside' },
          { src: shoeBrown, alt: 'Restored monk strap in dark walnut leather, brush alongside'  },
        ].map(({ src, alt }, i) => (
          <motion.div
            key={i}
            {...fadeUp(i * 0.15)}
            style={{
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <img
              src={src}
              alt={alt}
              loading="lazy"
              style={{
                width: '100%',
                height: '58vh',
                minHeight: '320px',
                objectFit: 'cover',
                objectPosition: 'top center',
                display: 'block',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Caption */}
      <motion.p
        {...fadeUp(0.3)}
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
          color: 'var(--taupe)',
          textAlign: 'center',
          lineHeight: 1.6,
          letterSpacing: '0.01em',
        }}
      >
        The craft, the leather.<br />Every pair, by hand.
      </motion.p>
    </section>
  )
}
