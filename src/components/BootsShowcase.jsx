import { motion } from 'framer-motion'
import bootsImg from '../assets/images/boots.webp'

export default function BootsShowcase() {
  return (
    <section
      className="boots-showcase"
      style={{
        background: 'var(--deep)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '5rem 5vw',
        gap: '2.5rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '420px',
          overflow: 'hidden',
        }}
      >
        <img
          src={bootsImg}
          alt="Tall leather riding boots restored and conditioned"
          loading="lazy"
          style={{
            width: '100%',
            height: '56vh',
            minHeight: '340px',
            objectFit: 'cover',
            objectPosition: 'center 80%',
            display: 'block',
          }}
        />
        {/* Gradient masks watermark at bottom-right corner */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '40%',
          height: '12%',
          background: 'linear-gradient(to top left, var(--deep) 30%, transparent 100%)',
          pointerEvents: 'none',
        }} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        style={{ textAlign: 'center' }}
      >
        <p style={{
          fontFamily: 'Epilogue, sans-serif',
          fontWeight: 300,
          fontSize: '0.6rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--taupe)',
          marginBottom: '0.6rem',
        }}>
          Client Work
        </p>
        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: 'var(--cream-82)',
          lineHeight: 1.6,
        }}>
          Tall leather boots. Conditioning, edge dressing,<br />
          and a full hand polish from shaft to sole.
        </p>
      </motion.div>
    </section>
  )
}
