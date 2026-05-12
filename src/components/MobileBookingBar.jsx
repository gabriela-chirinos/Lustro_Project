import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBreakpoint } from '../hooks/useBreakpoint.js'
import { useBooking } from '../context/BookingContext.jsx'

export default function MobileBookingBar() {
  const { isMobileOrTablet } = useBreakpoint()
  const { openModal } = useBooking()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!isMobileOrTablet) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 150,
            padding: '1rem 1.5rem',
            paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))',
            background: 'var(--deep-95)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid var(--gold-15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 400,
            fontStyle: 'italic',
            fontSize: '1.05rem',
            color: 'var(--cream-88)',
          }}>
            Ready to restore your shoes?
          </p>
          <button
            onClick={openModal}
            style={{
              fontFamily: 'Epilogue, sans-serif',
              fontWeight: 500,
              fontSize: '0.65rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--deep)',
              background: 'var(--gold)',
              border: 'none',
              padding: '0.7rem 1.4rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              minHeight: '44px',
            }}
          >
            Book a Ritual
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
