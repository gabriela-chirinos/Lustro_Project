import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBreakpoint } from '../hooks/useBreakpoint.js'
import { useBooking } from '../context/BookingContext.jsx'

const NAV_LINKS = [
  { label: 'Rituals',    href: '#rituals'    },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'History',    href: '#timeline'   },
  { label: 'FAQ',        href: '#faq'        },
  { label: 'Contact',    href: '#contact'    },
]

// ─── Animation Variants ─────────────────────────────────────

const curtainVariants = {
  closed: {
    clipPath: 'inset(0 0 100% 0)',
    transition: { duration: 0.52, ease: [0.76, 0, 0.24, 1] },
  },
  open: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.62, ease: [0.76, 0, 0.24, 1] },
  },
}

const linkListVariants = {
  closed: {},
  open: { transition: { staggerChildren: 0.075, delayChildren: 0.38 } },
}

const linkTextVariants = {
  closed: { y: '115%' },
  open:   { y: '0%', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const bottomFadeVariants = {
  closed: { opacity: 0 },
  open:   { opacity: 1, transition: { delay: 0.78, duration: 0.6 } },
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { isMobileOrTablet } = useBreakpoint()
  const { openModal } = useBooking()

  // Close menu when resizing to desktop
  useEffect(() => {
    if (!isMobileOrTablet && menuOpen) setMenuOpen(false)
  }, [isMobileOrTablet])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  const scrollTo = (href) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      const lenis = window.__lenis
      if (lenis) lenis.scrollTo(el, { offset: -80 })
      else el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          padding: '0 2.5rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-bottom 0.4s ease',
          background: menuOpen
            ? 'transparent'
            : scrolled ? 'var(--cream-88)' : 'transparent',
          backdropFilter: menuOpen ? 'none' : scrolled ? 'blur(12px)' : 'none',
          borderBottom: menuOpen
            ? '1px solid transparent'
            : scrolled ? '1px solid var(--taupe-20)' : '1px solid transparent',
        }}
      >
        {/* Wordmark */}
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); window.__lenis?.scrollTo(0) }}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 600,
            fontSize: '1.35rem',
            letterSpacing: '0.06em',
            color: menuOpen ? 'var(--warm-white)' : scrolled ? 'var(--charcoal)' : 'var(--gold)',
            textDecoration: 'none',
            position: 'relative',
            zIndex: 201,
            transition: 'color 0.4s ease',
          }}
        >
          Lustro
        </a>

        {/* ─── Desktop: Links + CTA (hidden on mobile/tablet) ── */}
        {!isMobileOrTablet && (
          <>
            <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', alignItems: 'center' }}>
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => scrollTo(href)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontFamily: 'Epilogue, sans-serif',
                      fontWeight: 300,
                      fontSize: '0.72rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: scrolled ? 'var(--mid)' : 'var(--cream-75)',
                      cursor: 'pointer',
                      padding: '0.25rem 0',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = scrolled ? 'var(--charcoal)' : 'var(--cream)'}
                    onMouseLeave={e => e.currentTarget.style.color = scrolled ? 'var(--mid)' : 'var(--cream-75)'}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>

            <motion.button
              onClick={openModal}
              whileHover={{ backgroundColor: 'var(--gold)', color: 'var(--deep)' }}
              transition={{ duration: 0.25 }}
              style={{
                fontFamily: 'Epilogue, sans-serif',
                fontWeight: 500,
                fontSize: '0.68rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: scrolled ? 'var(--charcoal)' : 'var(--cream-70)',
                background: 'transparent',
                border: scrolled ? '1px solid var(--gold)' : '1px solid var(--cream-35)',
                padding: '0.55rem 1.4rem',
                cursor: 'pointer',
                transition: 'color 0.4s ease, border-color 0.4s ease',
              }}
            >
              Book a Ritual
            </motion.button>
          </>
        )}

        {/* ─── Mobile/Tablet: Hamburger / X ─────────────────── */}
        {isMobileOrTablet && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              position: 'relative',
              zIndex: 201,
              width: '40px',
              height: '40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <motion.span
              animate={menuOpen
                ? { rotate: 45,  y: 9,  backgroundColor: 'var(--warm-white)' }
                : { rotate: 0,   y: 0,  backgroundColor: 'var(--charcoal)'   }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              style={{ display: 'block', width: '22px', height: '1px', transformOrigin: 'center' }}
            />
            <motion.span
              animate={menuOpen
                ? { scaleX: 0, opacity: 0, backgroundColor: 'var(--warm-white)' }
                : { scaleX: 1, opacity: 1, backgroundColor: 'var(--charcoal)'   }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              style={{ display: 'block', width: '22px', height: '1px', transformOrigin: 'center' }}
            />
            <motion.span
              animate={menuOpen
                ? { rotate: -45, y: -9, backgroundColor: 'var(--warm-white)' }
                : { rotate: 0,   y: 0,  backgroundColor: 'var(--charcoal)'   }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              style={{ display: 'block', width: '22px', height: '1px', transformOrigin: 'center' }}
            />
          </button>
        )}
      </nav>

      {/* ─── Full-Screen Mobile Menu Overlay ──────────────────── */}
      {isMobileOrTablet && (
        <motion.div
          initial="closed"
          animate={menuOpen ? 'open' : 'closed'}
          variants={curtainVariants}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 199,
            background: 'var(--deep)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 2.5rem',
            pointerEvents: menuOpen ? 'all' : 'none',
          }}
        >
          {/* Thin rule below nav bar */}
          <motion.div
            variants={bottomFadeVariants}
            style={{
              position: 'absolute',
              top: '64px',
              left: '2.5rem',
              right: '2.5rem',
              height: '1px',
              background: 'var(--gold-15)',
            }}
          />

          {/* Nav Links */}
          <motion.ul variants={linkListVariants} style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {NAV_LINKS.map(({ label, href }) => (
              <li
                key={href}
                style={{
                  overflow: 'hidden',
                  borderBottom: '1px solid var(--gold-10)',
                  padding: '0.1rem 0',
                }}
              >
                <motion.button
                  variants={linkTextVariants}
                  onClick={() => scrollTo(href)}
                  style={{
                    background: 'none',
                    border: 'none',
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '1.1rem 0',
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.9rem, 8vw, 2.6rem)',
                    color: 'var(--warm-white)',
                    cursor: 'pointer',
                    letterSpacing: '0.01em',
                    lineHeight: 1.1,
                    transition: 'color 0.2s ease',
                  }}
                  onTouchStart={e => e.currentTarget.style.color = 'var(--gold)'}
                  onTouchEnd={e => e.currentTarget.style.color = 'var(--warm-white)'}
                >
                  {label}
                </motion.button>
              </li>
            ))}
          </motion.ul>

          {/* CTA */}
          <motion.div variants={bottomFadeVariants} style={{ marginTop: '2.5rem' }}>
            <button
              onClick={() => { setMenuOpen(false); openModal() }}
              style={{
                fontFamily: 'Epilogue, sans-serif',
                fontWeight: 500,
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                background: 'transparent',
                border: '1px solid var(--gold-40)',
                padding: '0.85rem 2rem',
                cursor: 'pointer',
                minHeight: '44px',
              }}
            >
              Book a Ritual
            </button>
          </motion.div>

          {/* Bottom ambient copy */}
          <motion.p
            variants={bottomFadeVariants}
            style={{
              position: 'absolute',
              bottom: 'calc(2rem + env(safe-area-inset-bottom))',
              left: '2.5rem',
              fontFamily: 'Epilogue, sans-serif',
              fontWeight: 300,
              fontSize: '0.58rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold-35)',
            }}
          >
            Los Angeles · Est. 1988 · By Appointment
          </motion.p>
        </motion.div>
      )}
    </>
  )
}
