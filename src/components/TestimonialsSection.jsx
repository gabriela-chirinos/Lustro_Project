import { useEffect, useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'

const TESTIMONIALS = [
  {
    quote: "Brought my Allen Edmonds back from the dead. These are things you don't find anymore.",
    author: 'D.R.',
    role: 'Architect',
    location: 'Silver Lake',
  },
  {
    quote: "I've been going to the same cobbler for twenty years. Then I found Lustro. I don't go anywhere else.",
    author: 'M.V.',
    role: 'Attorney',
    location: 'Brentwood',
  },
  {
    quote: "My Saint Laurent Wyatts look better now than the day I bought them.",
    author: 'J.A.',
    role: 'Creative Director',
    location: 'West Hollywood',
  },
  {
    quote: "Quiet, thorough, no upsell. Exactly what I wanted.",
    author: 'T.K.',
    role: 'Producer',
    location: 'Los Angeles',
  },
  {
    quote: "The conditioning treatment on my Lobbs was transformative. You can feel the difference in how the leather moves.",
    author: 'R.O.',
    role: 'Restaurateur',
    location: 'Pasadena',
  },
]

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' })
  const intervalRef = useRef(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      emblaApi?.scrollNext()
    }, 5000)
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    startAutoPlay()
    emblaApi.on('select', () => setSelectedIndex(emblaApi.selectedScrollSnap()))
    emblaApi.on('pointerDown', () => clearInterval(intervalRef.current))
    emblaApi.on('pointerUp',   startAutoPlay)
    return () => clearInterval(intervalRef.current)
  }, [emblaApi, startAutoPlay])

  return (
    <section
      id="testimonials"
      style={{
        background: 'var(--warm-white)',
        padding: '8rem 0',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', padding: '0 5vw', marginBottom: '4rem' }}
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
          From the Client
        </p>
        <h2 style={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 700,
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          color: 'var(--charcoal)',
        }}>
          What they say.
        </h2>
      </motion.div>

      {/* Embla Carousel */}
      <div ref={emblaRef} style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', touchAction: 'pan-y' }}>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              style={{
                flex: '0 0 min(640px, 88vw)',
                marginRight: '2rem',
                padding: '3.5rem',
                background: 'var(--parchment)',
                position: 'relative',
              }}
            >
              {/* Decorative quote mark */}
              <div style={{
                position: 'absolute',
                top: '2rem',
                left: '3rem',
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                fontSize: '6rem',
                lineHeight: 1,
                color: 'var(--gold)',
                opacity: 0.25,
                userSelect: 'none',
              }}>
                "
              </div>

              <blockquote
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.2rem, 2.2vw, 1.55rem)',
                  lineHeight: 1.6,
                  color: 'var(--charcoal)',
                  marginBottom: '2rem',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                "{t.quote}"
              </blockquote>

              <div style={{ borderTop: '1px solid rgba(176,158,140,0.3)', paddingTop: '1.25rem' }}>
                <p style={{
                  fontFamily: 'Epilogue, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  color: 'var(--charcoal)',
                  marginBottom: '0.25rem',
                }}>
                  {t.author}
                </p>
                <p style={{
                  fontFamily: 'Epilogue, sans-serif',
                  fontWeight: 300,
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--taupe)',
                }}>
                  {t.role} · {t.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginTop: '2.5rem' }}>
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '8px 6px',
              cursor: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{
              display: 'block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: i === selectedIndex ? 'var(--gold)' : 'rgba(176,158,140,0.4)',
              transition: 'background 0.3s ease',
            }} />
          </button>
        ))}
      </div>
    </section>
  )
}
