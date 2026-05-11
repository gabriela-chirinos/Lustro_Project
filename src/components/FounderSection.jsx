import { motion } from 'framer-motion'
import { useBooking } from '../context/BookingContext.jsx'

const REVIEWS = [
  {
    quote: "My shoes came back with a shine I did not expect. I booked again before I left.",
    author: 'Drew M.',
    location: 'Los Angeles',
  },
  {
    quote: "I brought two pairs of expensive Italian boots. He restored both. I tipped him well and I will go back regularly.",
    author: 'Andrew C.',
    location: 'Marina del Rey',
  },
  {
    quote: "My old boots looked like I had just broken them in for the first time. I will be back.",
    author: 'Ava J.',
    location: 'Los Angeles',
  },
]

export default function FounderSection() {
  const { openModal } = useBooking()

  return (
    <section
      id="founder"
      style={{
        background: 'var(--deep)',
        padding: '8rem 5vw',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ghost number background */}
      <span
        className="ghost-number"
        style={{
          position: 'absolute',
          right: '-2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(12rem, 22vw, 20rem)',
          lineHeight: 1,
          opacity: 0.06,
          color: 'var(--gold)',
          WebkitTextStroke: '1px var(--gold)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        37
      </span>

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '3.5rem' }}
        >
          <div style={{ width: '2rem', height: '1px', background: 'var(--gold-50)', flexShrink: 0 }} />
          <p style={{
            fontFamily: 'Epilogue, sans-serif',
            fontWeight: 300,
            fontSize: '0.62rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--gold-72)',
          }}>
            The Craftsman
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="founder-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0 6rem',
          alignItems: 'start',
        }}>

          {/* Left — bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: 'var(--warm-white)',
              lineHeight: 1.05,
              marginBottom: '0.5rem',
              letterSpacing: '-0.01em',
            }}>
              Carlos.
            </h2>
            <p style={{
              fontFamily: 'Epilogue, sans-serif',
              fontWeight: 300,
              fontSize: '0.62rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '2.5rem',
            }}>
              Founder, 37 years in the craft
            </p>

            <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 300,
              fontSize: '1.2rem',
              lineHeight: 1.75,
              color: 'var(--cream-65)',
              marginBottom: '1.5rem',
            }}>
              Carlos has spent 37 years in the craft. Every technique he uses was
              built through repetition, not instruction. He learned what leather
              responds to, what it resists, and how time changes both. His
              reputation was never announced. It accumulated, one pair at a time,
              through the work itself.
            </p>

            <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 300,
              fontSize: '1.2rem',
              lineHeight: 1.75,
              color: 'var(--cream-50)',
              marginBottom: '3rem',
            }}>
              He now works by appointment. Fewer clients. More time per pair.
              Every shoe that comes through his hands is handled by one person,
              start to finish. That is the standard he keeps.
            </p>

            <motion.button
              onClick={openModal}
              whileHover={{ backgroundColor: 'var(--gold)', color: 'var(--deep)', borderColor: 'var(--gold)' }}
              transition={{ duration: 0.25 }}
              style={{
                fontFamily: 'Epilogue, sans-serif',
                fontWeight: 500,
                fontSize: '0.68rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                background: 'transparent',
                border: '1px solid var(--gold-40)',
                padding: '0.8rem 2rem',
                cursor: 'pointer',
              }}
            >
              Book with Carlos
            </motion.button>
          </motion.div>

          {/* Right — reviews */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0' }}
          >
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                style={{
                  borderTop: '1px solid var(--gold-10)',
                  padding: '1.75rem 0',
                  ...(i === REVIEWS.length - 1 ? { borderBottom: '1px solid var(--gold-10)' } : {}),
                }}
              >
                <p style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  fontSize: '1.25rem',
                  lineHeight: 1.7,
                  color: 'var(--cream-72)',
                  marginBottom: '1rem',
                }}>
                  &#8220;{r.quote}&#8221;
                </p>
                <p style={{
                  fontFamily: 'Epilogue, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.72rem',
                  letterSpacing: '0.08em',
                  color: 'var(--cream-65)',
                }}>
                  {r.author} · {r.location}
                </p>
              </div>
            ))}

            <p style={{
              fontFamily: 'Epilogue, sans-serif',
              fontWeight: 300,
              fontSize: '0.58rem',
              letterSpacing: '0.08em',
              color: 'var(--taupe-50)',
              marginTop: '1.25rem',
            }}>
              Collected from clients across years of work in Los Angeles.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
