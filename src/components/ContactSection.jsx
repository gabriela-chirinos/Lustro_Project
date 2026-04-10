import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import gsap from 'gsap'

const SERVICES = [
  'Hand Shine',
  'Deep Conditioning',
  'Colour Revival',
  'Full Restoration',
  'Not sure — need assessment',
]

function CheckmarkSVG() {
  const pathRef = useRef(null)

  useEffect(() => {
    const path = pathRef.current
    if (!path) return
    const len = path.getTotalLength()
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 0.7,
      delay: 0.3,
      ease: 'power2.out',
    })
  }, [])

  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="28" stroke="var(--gold)" strokeWidth="1" opacity="0.4" />
      <path
        ref={pathRef}
        d="M18 30 L26 38 L42 22"
        stroke="var(--gold)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (_data) => {
    // Simulate async submission
    await new Promise(r => setTimeout(r, 600))
    setSubmitted(true)
  }

  const fieldStyle = (hasError) => ({
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${hasError ? 'var(--rose-dust)' : 'rgba(176,158,140,0.4)'}`,
    outline: 'none',
    width: '100%',
    padding: '0.75rem 0',
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: '1.1rem',
    color: 'var(--charcoal)',
    transition: 'border-color 0.25s ease',
  })

  const errorStyle = {
    fontFamily: 'Epilogue, sans-serif',
    fontWeight: 300,
    fontSize: '0.62rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--rose-dust)',
    marginTop: '0.4rem',
    display: 'block',
  }

  return (
    <section
      id="contact"
      style={{
        background: 'var(--warm-white)',
        padding: '8rem 5vw',
      }}
    >
      <div className="contact-grid" style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 6rem' }}>

        {/* Left — editorial text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="contact-left"
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: '2rem' }}
        >
          <p style={{
            fontFamily: 'Epilogue, sans-serif',
            fontWeight: 300,
            fontSize: '0.62rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--mid)',
            marginBottom: '1.5rem',
          }}>
            Request an Appointment
          </p>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            lineHeight: 1.15,
            color: 'var(--charcoal)',
            marginBottom: '2rem',
          }}>
            Every restoration<br />
            <em style={{ fontWeight: 400 }}>begins with a conversation.</em>
          </h2>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 300,
            fontSize: '1.05rem',
            lineHeight: 1.8,
            color: 'var(--mid)',
            marginBottom: '2.5rem',
          }}>
            We respond to all requests within 24–48 hours. Please describe the condition of your shoes in as much detail as you can — photographs are welcome.
          </p>
          <div style={{ borderTop: '1px solid rgba(176,158,140,0.25)', paddingTop: '2rem' }}>
            <p style={{
              fontFamily: 'Epilogue, sans-serif',
              fontWeight: 300,
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--taupe)',
              marginBottom: '0.5rem',
            }}>
              Studio Hours
            </p>
            <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 300,
              fontSize: '0.95rem',
              color: 'var(--mid)',
              lineHeight: 1.7,
              marginBottom: '1.25rem',
            }}>
              Tuesday – Saturday<br />
              10:00 am – 5:00 pm<br />
              West Hollywood, CA
            </p>
            <a
              href="mailto:hello@lustro.studio"
              style={{
                fontFamily: 'Epilogue, sans-serif',
                fontWeight: 300,
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                color: 'var(--gold)',
                textDecoration: 'none',
              }}
            >
              hello@lustro.studio
            </a>
          </div>
        </motion.div>

        {/* Right — form or confirmation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                onSubmit={handleSubmit(onSubmit)}
                style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                noValidate
              >
                {/* Name */}
                <div>
                  <input
                    {...register('name', { required: 'Your name is required.' })}
                    placeholder="Full Name"
                    style={fieldStyle(errors.name)}
                  />
                  {errors.name && <span style={errorStyle}>{errors.name.message}</span>}
                </div>

                {/* Email */}
                <div>
                  <input
                    {...register('email', {
                      required: 'Email is required.',
                      pattern: { value: /\S+@\S+\.\S+/, message: 'Please enter a valid email.' },
                    })}
                    type="email"
                    placeholder="Email Address"
                    style={fieldStyle(errors.email)}
                  />
                  {errors.email && <span style={errorStyle}>{errors.email.message}</span>}
                </div>

                {/* Phone */}
                <div>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="Phone (optional)"
                    style={fieldStyle(false)}
                  />
                </div>

                {/* Service */}
                <div>
                  <select
                    {...register('service', { required: 'Please select a service.' })}
                    defaultValue=""
                    style={fieldStyle(errors.service)}
                  >
                    <option value="" disabled>Service Required</option>
                    {SERVICES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.service && <span style={errorStyle}>{errors.service.message}</span>}
                </div>

                {/* Notes */}
                <div>
                  <textarea
                    {...register('notes')}
                    placeholder="Tell us about your shoes — brand, condition, concerns..."
                    rows={4}
                    style={{
                      ...fieldStyle(false),
                      resize: 'none',
                    }}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ backgroundColor: 'var(--gold)', color: 'var(--deep)' }}
                  transition={{ duration: 0.25 }}
                  style={{
                    fontFamily: 'Epilogue, sans-serif',
                    fontWeight: 500,
                    fontSize: '0.72rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--charcoal)',
                    background: 'transparent',
                    border: '1px solid var(--gold)',
                    padding: '1rem',
                    cursor: isSubmitting ? 'wait' : 'none',
                    opacity: isSubmitting ? 0.6 : 1,
                    alignSelf: 'flex-start',
                    minWidth: '200px',
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Request'}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  padding: '3rem',
                  background: 'var(--parchment)',
                }}
              >
                <CheckmarkSVG />
                <h3 style={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 600,
                  fontSize: '1.55rem',
                  color: 'var(--charcoal)',
                }}>
                  Request received.
                </h3>
                <p style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontWeight: 300,
                  fontSize: '1.05rem',
                  lineHeight: 1.75,
                  color: 'var(--mid)',
                }}>
                  We'll review your request and respond within 24–48 hours with appointment availability. Thank you for reaching out.
                </p>
                <div style={{ borderTop: '1px solid rgba(176,158,140,0.25)', paddingTop: '1.25rem' }}>
                  <p style={{
                    fontFamily: 'Epilogue, sans-serif',
                    fontWeight: 300,
                    fontSize: '0.65rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--taupe)',
                  }}>
                    Lustro · West Hollywood, CA
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
