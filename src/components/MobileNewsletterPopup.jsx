import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBreakpoint } from '../hooks/useBreakpoint.js'

const STORAGE_KEY = 'lustro_newsletter_dismissed'

export default function MobileNewsletterPopup() {
  const { isMobile } = useBreakpoint()
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!isMobile) return
    if (localStorage.getItem(STORAGE_KEY)) return

    const t = setTimeout(() => setVisible(true), 3500)
    return () => clearTimeout(t)
  }, [isMobile])

  const dismiss = () => {
    setVisible(false)
    localStorage.setItem(STORAGE_KEY, '1')
  }

  const validate = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate(email)) {
      setEmailError('Please enter a valid email.')
      return
    }
    setEmailError('')
    // TODO: wire to your email service (Klaviyo, Mailchimp, etc.)
    setSubmitted(true)
    setTimeout(dismiss, 2200)
  }

  if (!isMobile) return null

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Scrim */}
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={dismiss}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'var(--deep-55)',
              zIndex: 200,
            }}
          />

          {/* Bottom sheet */}
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 201,
              background: 'var(--deep)',
              borderTop: '1px solid var(--gold-15)',
              padding: '2.5rem 2rem',
              paddingBottom: 'calc(2.5rem + env(safe-area-inset-bottom))',
            }}
          >
            {/* Drag handle */}
            <div style={{
              width: '32px',
              height: '3px',
              background: 'var(--taupe-30)',
              borderRadius: '2px',
              margin: '0 auto 2rem',
            }} />

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Eyebrow */}
                  <p style={{
                    fontFamily: 'Epilogue, sans-serif',
                    fontWeight: 300,
                    fontSize: '0.58rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'var(--gold-72)',
                    marginBottom: '1rem',
                  }}>
                    The Lustro Circle
                  </p>

                  {/* Heading */}
                  <h2 style={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 600,
                    fontSize: '1.6rem',
                    lineHeight: 1.2,
                    color: 'var(--cream-88)',
                    marginBottom: '0.75rem',
                  }}>
                    Craft notes &amp; early access.
                  </h2>

                  {/* Body */}
                  <p style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontWeight: 300,
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    color: 'var(--cream-65)',
                    marginBottom: '2rem',
                  }}>
                    Seasonal care guides, rare leather spotlights, and first access to open appointments — for those who take their shoes seriously.
                  </p>

                  {/* Form */}
                  <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label htmlFor="nl-email" style={{
                        position: 'absolute', width: '1px', height: '1px', padding: 0,
                        margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)',
                        whiteSpace: 'nowrap', border: 0,
                      }}>
                        Email address
                      </label>
                      <input
                        id="nl-email"
                        type="email"
                        value={email}
                        onChange={e => { setEmail(e.target.value); setEmailError('') }}
                        placeholder="Your email address"
                        aria-describedby={emailError ? 'nl-email-error' : undefined}
                        style={{
                          width: '100%',
                          background: 'transparent',
                          border: 'none',
                          borderBottom: `1px solid ${emailError ? 'var(--rose-dust)' : 'var(--taupe-30)'}`,
                          outline: 'none',
                          padding: '0.85rem 0',
                          fontFamily: '"Cormorant Garamond", serif',
                          fontSize: 'max(16px, 1rem)',
                          color: 'var(--cream-85)',
                          transition: 'border-color 0.2s',
                        }}
                      />
                      {emailError && (
                        <span id="nl-email-error" role="alert" style={{
                          fontFamily: 'Epilogue, sans-serif',
                          fontWeight: 300,
                          fontSize: '0.6rem',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'var(--rose-dust)',
                          marginTop: '0.4rem',
                          display: 'block',
                        }}>
                          {emailError}
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        fontFamily: 'Epilogue, sans-serif',
                        fontWeight: 500,
                        fontSize: '0.68rem',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'var(--deep)',
                        background: 'var(--gold)',
                        border: 'none',
                        padding: '1rem',
                        cursor: 'pointer',
                        marginTop: '0.5rem',
                      }}
                    >
                      Join the Circle
                    </button>
                  </form>

                  {/* Dismiss */}
                  <button
                    onClick={dismiss}
                    style={{
                      display: 'block',
                      margin: '1.25rem auto 0',
                      background: 'none',
                      border: 'none',
                      fontFamily: 'Epilogue, sans-serif',
                      fontWeight: 300,
                      fontSize: '0.6rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--taupe-50)',
                      cursor: 'pointer',
                    }}
                  >
                    No thanks
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ textAlign: 'center', padding: '1rem 0 2rem' }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '1px solid var(--gold-40)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                  }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8L6.5 11.5L13 5" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p style={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 600,
                    fontSize: '1.3rem',
                    color: 'var(--cream-88)',
                    marginBottom: '0.5rem',
                  }}>
                    Welcome to the Circle.
                  </p>
                  <p style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontWeight: 300,
                    fontSize: '0.95rem',
                    color: 'var(--cream-65)',
                    lineHeight: 1.6,
                  }}>
                    You'll hear from us when it's worth your time.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
