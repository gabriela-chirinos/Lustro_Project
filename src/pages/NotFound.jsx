import { motion } from 'framer-motion'

export default function NotFound() {
  const goHome = () => {
    window.location.href = '/'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        minHeight: '100vh',
        background: 'var(--cream)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        marginTop: '28px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ghost 404 watermark */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(18rem, 40vw, 32rem)',
          fontFamily: '"Playfair Display", serif',
          fontWeight: 700,
          WebkitTextStroke: '1px rgba(176,158,140,0.2)',
          color: 'transparent',
          userSelect: 'none',
          lineHeight: 1,
          pointerEvents: 'none',
        }}
      >
        404
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        <p style={{
          fontFamily: 'Epilogue, sans-serif',
          fontWeight: 300,
          fontSize: '0.62rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--taupe)',
        }}>
          Page not found
        </p>

        <h1 style={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 600,
          fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
          color: 'var(--charcoal)',
          lineHeight: 1.2,
        }}>
          This page doesn't exist.
        </h1>

        <p style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: '1.2rem',
          color: 'var(--taupe)',
        }}>
          The shoes might.
        </p>

        <div style={{ height: '1px', width: '40px', background: 'rgba(176,158,140,0.4)', margin: '0.5rem 0' }} />

        <motion.button
          onClick={goHome}
          whileHover={{ backgroundColor: 'var(--gold)', color: 'var(--deep)' }}
          transition={{ duration: 0.25 }}
          style={{
            fontFamily: 'Epilogue, sans-serif',
            fontWeight: 500,
            fontSize: '0.68rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--charcoal)',
            background: 'transparent',
            border: '1px solid var(--gold)',
            padding: '0.75rem 1.75rem',
            cursor: 'none',
          }}
        >
          Return Home
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
