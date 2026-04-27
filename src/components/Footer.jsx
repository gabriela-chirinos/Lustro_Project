import { motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Rituals',    href: '#rituals'    },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'History',    href: '#timeline'   },
  { label: 'FAQ',        href: '#faq'        },
  { label: 'Contact',    href: '#contact'    },
]

export default function Footer() {
  const scrollTo = (href) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      const lenis = window.__lenis
      if (lenis) lenis.scrollTo(el, { offset: -80 })
      else el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer
      style={{
        background: 'var(--deep)',
        padding: '5rem 5vw 3rem',
        color: 'var(--taupe)',
      }}
    >
      <div
        className="footer-grid"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr',
          gap: '0 4rem',
          marginBottom: '4rem',
        }}
      >
        {/* Col 1 — Wordmark + etymology */}
        <div>
          <p style={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 600,
            fontSize: '1.8rem',
            color: 'var(--warm-white)',
            marginBottom: '1rem',
            letterSpacing: '0.04em',
          }}>
            Lustro
          </p>
          <p style={{
            fontFamily: 'Epilogue, sans-serif',
            fontWeight: 500,
            fontSize: '0.65rem',
            letterSpacing: '0.12em',
            color: 'var(--gold-90)',
            lineHeight: 1.8,
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}>
            lus·tro<br />
            <span style={{ fontStyle: 'italic', textTransform: 'none', letterSpacing: '0.05em', display: 'block', marginTop: '0.2rem', fontWeight: 400 }}>
              to shine, to illuminate,<br />to purify through polish
            </span>
          </p>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 500,
            fontSize: '1.05rem',
            lineHeight: 1.75,
            color: 'var(--cream-85)',
            maxWidth: '280px',
          }}>
            Bespoke shoe care &amp; leather restoration. Los Angeles. Est. 1988.
          </p>
        </div>

        {/* Col 2 — Navigation */}
        <div>
          <p style={{
            fontFamily: 'Epilogue, sans-serif',
            fontWeight: 500,
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--gold-72)',
            marginBottom: '1.5rem',
          }}>
            Navigation
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <button
                  onClick={() => scrollTo(href)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: 'Epilogue, sans-serif',
                    fontWeight: 400,
                    fontSize: '0.8rem',
                    letterSpacing: '0.08em',
                    color: 'var(--cream-72)',
                    cursor: 'none',
                    transition: 'color 0.2s ease',
                    padding: 0,
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--cream-72)'}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Contact */}
        <div>
          <p style={{
            fontFamily: 'Epilogue, sans-serif',
            fontWeight: 500,
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--gold-72)',
            marginBottom: '1.5rem',
          }}>
            Studio
          </p>
          <div style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 400,
            fontSize: '0.95rem',
            lineHeight: 1.8,
            color: 'var(--cream-65)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}>
            <div>
              <a
                href="https://maps.google.com/?q=West+Hollywood,+CA"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <p style={{ color: 'var(--cream-82)' }}>West Hollywood, CA {/* TODO: Replace with real Google Maps URL with exact studio address before launch */}</p>
              </a>
              <p>By Appointment Only</p>
            </div>
            <div>
              <p>Tuesday – Saturday</p>
              <p>10:00 am – 5:00 pm</p>
            </div>
            <button
              onClick={() => scrollTo('#contact')}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'Epilogue, sans-serif',
                fontWeight: 500,
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                cursor: 'none',
                padding: 0,
                textAlign: 'left',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Request Appointment →
            </button>
            <a
              href="https://instagram.com/lustrostudio"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'Epilogue, sans-serif',
                fontWeight: 400,
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                textDecoration: 'none',
              }}
            >
              @lustrostudio →
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid var(--taupe-15)',
        paddingTop: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
      }}>
        <p style={{
          fontFamily: 'Epilogue, sans-serif',
          fontWeight: 400,
          fontSize: '0.62rem',
          letterSpacing: '0.1em',
          color: 'var(--taupe-60)',
          textTransform: 'uppercase',
        }}>
          © {new Date().getFullYear()} Lustro. All rights reserved.
        </p>
        <p style={{
          fontFamily: 'Epilogue, sans-serif',
          fontWeight: 400,
          fontSize: '0.62rem',
          letterSpacing: '0.1em',
          color: 'var(--taupe-50)',
          textTransform: 'uppercase',
        }}>
          Los Angeles · Est. 1988
        </p>
      </div>
    </footer>
  )
}
