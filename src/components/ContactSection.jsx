import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import emailjs from '@emailjs/browser'
import gsap from 'gsap'
import { useBreakpoint } from '../hooks/useBreakpoint.js'
import ContactWizard from './ContactWizard'

// TODO: Replace with real EmailJS credentials before launch
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'   // replace before launch
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'  // replace before launch
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'   // replace before launch

const SERVICES = [
  'Hand Shine',
  'Deep Conditioning',
  'Colour Revival',
  'Full Restoration',
  'Not sure — need assessment',
]

const REFERRAL_SOURCES = [
  'Instagram',
  'Google Search',
  'Word of mouth',
  'Walked by the studio',
  'Other',
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
  const { isMobile } = useBreakpoint()
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const formRef = useRef(null)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm()

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 10)
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  const onSubmit = async (data) => {
    setSubmitError(false)
    try {
      const fileInput = formRef.current?.querySelector('input[type="file"]')
      const hasFile = fileInput?.files?.length > 0

      const templateParams = {
        name: data.name,
        email: data.email,
        phone: data.phone || 'Not provided',
        service: data.service,
        notes: data.notes || 'None',
        referral_source: data.referral_source || 'Not specified',
        photo_note: hasFile
          ? `Client attached a photo: ${fileInput.files[0].name}. Follow up to request it if the template does not include attachments.`
          : 'No photo attached.',
      }

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      setSubmitted(true)
    } catch (_err) {
      setSubmitError(true)
    }
  }

  const fieldStyle = (hasError) => ({
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${hasError ? 'var(--rose-dust)' : 'var(--taupe-40)'}`,
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

  const eyebrowLabelStyle = {
    fontFamily: 'Epilogue, sans-serif',
    fontWeight: 300,
    fontSize: '0.62rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'var(--mid)',
    display: 'block',
    marginBottom: '0.5rem',
  }

  // Visually hidden but accessible to screen readers
  const srOnly = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    whiteSpace: 'nowrap',
    border: 0,
  }

  return (
    <section
      id="contact"
      style={{
        background: 'var(--warm-white)',
        padding: '8rem 5vw',
      }}
    >
      {/* Mobile-only section header — contact-left is hidden on mobile so this bridges the gap */}
      <motion.div
        className="contact-mobile-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: '2.5rem' }}
      >
        <p style={{
          fontFamily: 'Epilogue, sans-serif',
          fontWeight: 300,
          fontSize: '0.62rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--mid)',
          marginBottom: '0.75rem',
        }}>
          Request an Appointment
        </p>
        <h2 style={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 700,
          fontSize: 'clamp(1.8rem, 7vw, 2.4rem)',
          lineHeight: 1.15,
          color: 'var(--charcoal)',
        }}>
          Every restoration<br />
          <em style={{ fontWeight: 400 }}>begins with a conversation.</em>
        </h2>
      </motion.div>

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
          <div style={{ borderTop: '1px solid var(--taupe-25)', paddingTop: '2rem' }}>
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
              <a
                href="https://maps.google.com/?q=West+Hollywood,+CA"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                West Hollywood, CA {/* TODO: Replace with real Google Maps URL with exact studio address before launch */}
              </a>
            </p>
            <a
              href="mailto:hello@lustro.studio" // TODO: Replace with real email before launch
              style={{
                fontFamily: 'Epilogue, sans-serif',
                fontWeight: 500,
                fontSize: '0.9rem',
                letterSpacing: '0.08em',
                color: 'var(--gold)',
                textDecoration: 'none',
              }}
            >
              hello@lustro.studio {/* TODO: Replace with real email before launch */}
            </a>

            {/* What happens next */}
            <div style={{ marginTop: '2.5rem' }}>
              <p style={{
                fontFamily: 'Epilogue, sans-serif',
                fontWeight: 300,
                fontSize: '0.62rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--mid)',
                marginBottom: '1.25rem',
              }}>
                What happens next
              </p>
              {[
                'We review your request and assess the work',
                'We send you appointment times within 48 hours',
                'You confirm — we handle everything from there',
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '0.85rem', alignItems: 'flex-start' }}>
                  <span style={{
                    fontFamily: 'Epilogue, sans-serif',
                    fontWeight: 300,
                    fontSize: '0.6rem',
                    letterSpacing: '0.12em',
                    color: 'var(--gold)',
                    minWidth: '16px',
                    paddingTop: '0.1rem',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontWeight: 400,
                    fontSize: '0.95rem',
                    color: 'var(--charcoal)',
                    lineHeight: 1.6,
                  }}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right — form, wizard (mobile), or confirmation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {isMobile ? (
            <ContactWizard />
          ) : (
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                ref={formRef}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                onSubmit={handleSubmit(onSubmit)}
                style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                noValidate
              >
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" style={srOnly}>Full Name</label>
                  <input
                    id="contact-name"
                    {...register('name', {
                      required: 'Your full name is required.',
                      validate: v =>
                        v.trim().split(/\s+/).length >= 2 || 'Please enter your first and last name.',
                    })}
                    placeholder="First & Last Name"
                    style={fieldStyle(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  />
                  {errors.name && <span id="contact-name-error" role="alert" style={errorStyle}>{errors.name.message}</span>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" style={srOnly}>Email Address</label>
                  <input
                    id="contact-email"
                    {...register('email', {
                      required: 'Email is required.',
                      pattern: {
                        value: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
                        message: 'Please enter a valid email address.',
                      },
                    })}
                    type="email"
                    placeholder="Email Address"
                    style={fieldStyle(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  />
                  {errors.email && <span id="contact-email-error" role="alert" style={errorStyle}>{errors.email.message}</span>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="contact-phone" style={srOnly}>Phone Number</label>
                  <input
                    id="contact-phone"
                    {...(() => {
                      const reg = register('phone', {
                        required: 'Phone number is required.',
                        pattern: {
                          value: /^\d{3}-\d{3}-\d{4}$/,
                          message: 'Please enter a valid phone number.',
                        },
                      })
                      return {
                        ...reg,
                        onChange: (e) => {
                          const formatted = formatPhone(e.target.value)
                          e.target.value = formatted
                          setValue('phone', formatted, { shouldValidate: errors.phone ? true : false })
                          return reg.onChange(e)
                        },
                      }
                    })()}
                    type="tel"
                    placeholder="555-555-5555"
                    style={fieldStyle(errors.phone)}
                    aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                  />
                  {errors.phone && <span id="contact-phone-error" role="alert" style={errorStyle}>{errors.phone.message}</span>}
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="contact-service" style={srOnly}>Service Required</label>
                  <select
                    id="contact-service"
                    {...register('service', { required: 'Please select a service.' })}
                    defaultValue=""
                    style={fieldStyle(errors.service)}
                    aria-describedby={errors.service ? 'contact-service-error' : undefined}
                  >
                    <option value="" disabled>Service Required</option>
                    {SERVICES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.service && <span id="contact-service-error" role="alert" style={errorStyle}>{errors.service.message}</span>}
                </div>

                {/* How did you hear about us */}
                <div>
                  <label htmlFor="contact-referral" style={srOnly}>How did you hear about us?</label>
                  <select
                    id="contact-referral"
                    {...register('referral_source')}
                    defaultValue=""
                    style={fieldStyle(false)}
                  >
                    <option value="" disabled>How did you hear about us?</option>
                    {REFERRAL_SOURCES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="contact-notes" style={srOnly}>Tell us about your shoes</label>
                  <textarea
                    id="contact-notes"
                    {...register('notes', {
                      required: 'Please describe your shoes.',
                      validate: v =>
                        v.trim().split(/\s+/).filter(Boolean).length >= 3 ||
                        'Please share a bit more — brand, condition, what you need.',
                    })}
                    placeholder="Tell us about your shoes — brand, condition, concerns..."
                    rows={4}
                    style={{
                      ...fieldStyle(errors.notes),
                      resize: 'none',
                    }}
                    aria-describedby={errors.notes ? 'contact-notes-error' : undefined}
                  />
                  {errors.notes && <span id="contact-notes-error" role="alert" style={errorStyle}>{errors.notes.message}</span>}
                </div>

                {/* Photo upload */}
                <div>
                  <label style={eyebrowLabelStyle}>
                    Attach a photo (optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid var(--taupe-40)',
                      outline: 'none',
                      width: '100%',
                      padding: '0.75rem 0',
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: '1rem',
                      color: 'var(--mid)',
                    }}
                  />
                </div>

                {/* Submit */}
                <div>
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

                  <p style={{
                    fontFamily: 'Epilogue, sans-serif',
                    fontWeight: 300,
                    fontSize: '0.58rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--taupe)',
                    marginTop: '0.75rem',
                  }}>
                    Your details are private and never shared.
                  </p>

                  {submitError && (
                    <span style={{ ...errorStyle, marginTop: '0.75rem', display: 'block' }}>
                      Something went wrong. Please email us directly at hello@lustro.studio {/* TODO: Replace with real email before launch */}
                    </span>
                  )}
                </div>
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
                <div style={{ borderTop: '1px solid var(--taupe-25)', paddingTop: '1.25rem' }}>
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
          )}
        </motion.div>
      </div>
    </section>
  )
}
