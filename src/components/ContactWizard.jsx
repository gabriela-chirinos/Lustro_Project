import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import emailjs from '@emailjs/browser'
import gsap from 'gsap'

const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'

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

const PAIR_OPTIONS = [
  { value: '1',  label: '1 pair' },
  { value: '2',  label: '2 pairs' },
  { value: '3',  label: '3 pairs' },
  { value: '4+', label: '4 or more' },
]

const STEPS = [
  { id: 'name',    fields: ['name'],             heading: "Let's start\nwith your name." },
  { id: 'contact', fields: ['email', 'phone'],   heading: 'How can we\nreach you?' },
  { id: 'service', fields: ['service'],          heading: 'What brings\nyou in?' },
  { id: 'pairs',   fields: ['pairs'],            heading: 'How many\npairs?' },
  { id: 'notes',   fields: ['notes'],            heading: 'Tell us about\nyour shoes.' },
  { id: 'final',   fields: ['referral_source'],  heading: 'Almost\nthere.' },
]

function CheckmarkSVG() {
  const pathRef = useRef(null)
  useEffect(() => {
    const path = pathRef.current
    if (!path) return
    const len = path.getTotalLength()
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
    gsap.to(path, { strokeDashoffset: 0, duration: 0.7, delay: 0.3, ease: 'power2.out' })
  }, [])
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="28" stroke="var(--gold)" strokeWidth="1" opacity="0.4" />
      <path ref={pathRef} d="M18 30 L26 38 L42 22" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0 }),
}

const srOnly = {
  position: 'absolute', width: '1px', height: '1px', padding: 0,
  margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap', border: 0,
}

const fieldStyle = (hasError) => ({
  background: 'transparent',
  border: 'none',
  borderBottom: `1px solid ${hasError ? 'var(--rose-dust)' : 'var(--taupe-40)'}`,
  width: '100%',
  padding: '0.85rem 0',
  fontFamily: '"Cormorant Garamond", serif',
  fontSize: 'max(16px, 1rem)',
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

export default function ContactWizard() {
  const [stepIndex, setStepIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [selectedPairs, setSelectedPairs] = useState('')
  const [selectedReferral, setSelectedReferral] = useState('')
  const [photoFile, setPhotoFile] = useState(null)
  const firstInputRef = useRef(null)

  const {
    register,
    trigger,
    getValues,
    setValue,
    formState: { errors },
  } = useForm()

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 10)
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  const step = STEPS[stepIndex]
  const progress = ((stepIndex + 1) / STEPS.length) * 100

  useEffect(() => {
    const t = setTimeout(() => firstInputRef.current?.focus(), 120)
    return () => clearTimeout(t)
  }, [stepIndex])

  const goNext = async () => {
    const valid = await trigger(step.fields)
    if (!valid) return
    setDirection(1)
    setStepIndex(i => i + 1)
  }

  const goBack = () => {
    setDirection(-1)
    setStepIndex(i => i - 1)
  }

  const onSubmit = async () => {
    setSubmitError(false)
    setIsSubmitting(true)
    const data = getValues()
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name:            data.name,
        email:           data.email,
        phone:           data.phone || 'Not provided',
        service:         selectedService,
        pairs:           selectedPairs,
        notes:           data.notes || 'None',
        referral_source: selectedReferral || 'Not specified',
        photo_note:      photoFile
          ? `Client attached: ${photoFile.name}. Follow up to request.`
          : 'No photo attached.',
      }, EMAILJS_PUBLIC_KEY)
      setSubmitted(true)
    } catch {
      setSubmitError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          minHeight: '80svh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '1.5rem',
          padding: '3rem 2rem',
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
          We'll review your request and respond within 24–48 hours with appointment availability.
        </p>
        <div style={{ borderTop: '1px solid var(--taupe-25)', paddingTop: '1.25rem', width: '100%' }}>
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
    )
  }

  return (
    <div style={{
      minHeight: '80svh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--warm-white)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Sticky header — progress + back */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'var(--warm-white)',
        paddingBottom: '0',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.25rem 2rem 1rem',
        }}>
          <button
            onClick={goBack}
            disabled={stepIndex === 0}
            aria-label="Go to previous step"
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'Epilogue, sans-serif',
              fontWeight: 300,
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: stepIndex === 0 ? 'transparent' : 'var(--taupe)',
              cursor: stepIndex === 0 ? 'default' : 'pointer',
              padding: 0,
              transition: 'color 0.2s',
              pointerEvents: stepIndex === 0 ? 'none' : 'auto',
            }}
          >
            ← Back
          </button>
          <p style={{
            fontFamily: 'Epilogue, sans-serif',
            fontWeight: 300,
            fontSize: '0.58rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--taupe)',
          }}>
            {stepIndex + 1} of {STEPS.length}
          </p>
        </div>

        {/* Progress bar */}
        <div
          role="progressbar"
          aria-label={`Step ${stepIndex + 1} of ${STEPS.length}`}
          aria-valuenow={stepIndex + 1}
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          style={{
            height: '1px',
            background: 'var(--taupe-20)',
            position: 'relative',
          }}
        >
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              background: 'var(--gold)',
            }}
          />
        </div>
      </div>

      {/* Step content */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: '3rem 2rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem',
              minHeight: '100%',
            }}
          >
            {/* Step heading */}
            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              fontSize: 'clamp(1.6rem, 6vw, 2.2rem)',
              lineHeight: 1.2,
              color: 'var(--charcoal)',
              whiteSpace: 'pre-line',
            }}>
              {step.heading}
            </h2>

            {/* Step fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {step.id === 'name' && (
                <div>
                  <label htmlFor="wiz-name" style={srOnly}>Full Name</label>
                  <input
                    ref={firstInputRef}
                    id="wiz-name"
                    {...register('name', {
                      required: 'Your full name is required.',
                      validate: v => v.trim().split(/\s+/).length >= 2 || 'Please enter first and last name.',
                    })}
                    placeholder="First & Last Name"
                    style={fieldStyle(errors.name)}
                    aria-describedby={errors.name ? 'wiz-name-error' : undefined}
                  />
                  {errors.name && <span id="wiz-name-error" role="alert" style={errorStyle}>{errors.name.message}</span>}
                </div>
              )}

              {step.id === 'contact' && (
                <>
                  <div>
                    <label htmlFor="wiz-email" style={srOnly}>Email Address</label>
                    <input
                      ref={firstInputRef}
                      id="wiz-email"
                      type="email"
                      {...register('email', {
                        required: 'Email is required.',
                        pattern: { value: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/, message: 'Please enter a valid email.' },
                      })}
                      placeholder="Email Address"
                      style={fieldStyle(errors.email)}
                      aria-describedby={errors.email ? 'wiz-email-error' : undefined}
                    />
                    {errors.email && <span id="wiz-email-error" role="alert" style={errorStyle}>{errors.email.message}</span>}
                  </div>
                  <div>
                    <label htmlFor="wiz-phone" style={srOnly}>Phone Number</label>
                    <input
                      id="wiz-phone"
                      type="tel"
                      {...(() => {
                        const reg = register('phone', {
                          required: 'Phone number is required.',
                          pattern: { value: /^\d{3}-\d{3}-\d{4}$/, message: 'Please enter a valid phone number.' },
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
                      placeholder="555-555-5555"
                      style={fieldStyle(errors.phone)}
                      aria-describedby={errors.phone ? 'wiz-phone-error' : undefined}
                    />
                    {errors.phone && <span id="wiz-phone-error" role="alert" style={errorStyle}>{errors.phone.message}</span>}
                  </div>
                </>
              )}

              {step.id === 'service' && (
                <div>
                  <input
                    {...register('service', { required: 'Please select a service.' })}
                    type="hidden"
                    value={selectedService}
                  />
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.75rem',
                  }}>
                    {SERVICES.map(s => {
                      const isSelected = selectedService === s
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => {
                            setSelectedService(s)
                            setValue('service', s, { shouldValidate: true })
                          }}
                          style={{
                            background: isSelected ? 'var(--gold-15)' : 'transparent',
                            border: `1px solid ${isSelected ? 'var(--gold)' : 'var(--taupe-30)'}`,
                            padding: '1rem 0.75rem',
                            fontFamily: '"Cormorant Garamond", serif',
                            fontWeight: isSelected ? 500 : 400,
                            fontSize: '0.95rem',
                            color: isSelected ? 'var(--charcoal)' : 'var(--mid)',
                            textAlign: 'left',
                            lineHeight: 1.4,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            gridColumn: s === 'Not sure — need assessment' ? '1 / -1' : 'auto',
                          }}
                        >
                          {s}
                        </button>
                      )
                    })}
                  </div>
                  {errors.service && !selectedService && (
                    <span role="alert" style={{ ...errorStyle, marginTop: '0.75rem' }}>{errors.service.message}</span>
                  )}
                </div>
              )}

              {step.id === 'pairs' && (
                <div>
                  <input
                    {...register('pairs', { required: 'Please select the number of pairs.' })}
                    type="hidden"
                    value={selectedPairs}
                  />
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.75rem',
                    marginBottom: '1.25rem',
                  }}>
                    {PAIR_OPTIONS.map(({ value, label }) => {
                      const isSelected = selectedPairs === value
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => {
                            setSelectedPairs(value)
                            setValue('pairs', value, { shouldValidate: true })
                          }}
                          style={{
                            background: isSelected ? 'var(--gold-15)' : 'transparent',
                            border: `1px solid ${isSelected ? 'var(--gold)' : 'var(--taupe-30)'}`,
                            padding: '1.25rem 0.75rem',
                            fontFamily: '"Cormorant Garamond", serif',
                            fontWeight: isSelected ? 500 : 400,
                            fontSize: '1.05rem',
                            color: isSelected ? 'var(--charcoal)' : 'var(--mid)',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {label}
                        </button>
                      )
                    })}
                  </div>
                  {/* Multi-pair note */}
                  {(selectedPairs === '3' || selectedPairs === '4+') && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontStyle: 'italic',
                        fontWeight: 400,
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                        color: 'var(--gold)',
                      }}
                    >
                      Multi-pair rates apply. We'll include pricing details when we confirm your appointment.
                    </motion.p>
                  )}
                  {errors.pairs && !selectedPairs && (
                    <span role="alert" style={{ ...errorStyle, marginTop: '0.5rem' }}>{errors.pairs.message}</span>
                  )}
                </div>
              )}

              {step.id === 'notes' && (
                <div>
                  <label htmlFor="wiz-notes" style={srOnly}>Tell us about your shoes</label>
                  <textarea
                    ref={firstInputRef}
                    id="wiz-notes"
                    {...register('notes', {
                      required: 'Please describe your shoes.',
                      validate: v => v.trim().split(/\s+/).filter(Boolean).length >= 3 || 'Please share a bit more: brand, condition, what you need.',
                    })}
                    placeholder="Brand, condition, concerns..."
                    rows={5}
                    style={{ ...fieldStyle(errors.notes), resize: 'none' }}
                    aria-describedby={errors.notes ? 'wiz-notes-error' : undefined}
                  />
                  {errors.notes && <span id="wiz-notes-error" role="alert" style={errorStyle}>{errors.notes.message}</span>}
                </div>
              )}

              {step.id === 'final' && (
                <>
                  {/* Referral chips */}
                  <div>
                    <p style={{
                      fontFamily: 'Epilogue, sans-serif',
                      fontWeight: 300,
                      fontSize: '0.6rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--mid)',
                      marginBottom: '1rem',
                    }}>
                      How did you hear about us? (optional)
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                      {REFERRAL_SOURCES.map(s => {
                        const isSelected = selectedReferral === s
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setSelectedReferral(isSelected ? '' : s)}
                            style={{
                              background: isSelected ? 'var(--gold-15)' : 'transparent',
                              border: `1px solid ${isSelected ? 'var(--gold)' : 'var(--taupe-30)'}`,
                              padding: '0.5rem 1rem',
                              fontFamily: 'Epilogue, sans-serif',
                              fontWeight: 300,
                              fontSize: '0.65rem',
                              letterSpacing: '0.08em',
                              color: isSelected ? 'var(--charcoal)' : 'var(--mid)',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            {s}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Photo upload */}
                  <div>
                    <p style={{
                      fontFamily: 'Epilogue, sans-serif',
                      fontWeight: 300,
                      fontSize: '0.6rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--mid)',
                      marginBottom: '0.75rem',
                    }}>
                      Attach a photo (optional)
                    </p>
                    <label
                      htmlFor="wiz-photo"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        borderBottom: '1px solid var(--taupe-40)',
                        padding: '0.85rem 0',
                        cursor: 'pointer',
                      }}
                    >
                      <span style={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: '0.95rem',
                        color: photoFile ? 'var(--charcoal)' : 'var(--taupe)',
                        fontStyle: photoFile ? 'normal' : 'italic',
                      }}>
                        {photoFile ? photoFile.name : 'Choose a photo…'}
                      </span>
                      <input
                        id="wiz-photo"
                        type="file"
                        accept="image/*"
                        onChange={e => setPhotoFile(e.target.files?.[0] ?? null)}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>

                  {submitError && (
                    <span style={{ ...errorStyle, marginTop: 0 }}>
                      Something went wrong. Please email us at lustroshoecare@gmail.com
                    </span>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom action button */}
      <div style={{
        padding: '1.5rem 2rem',
        paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
        background: 'var(--warm-white)',
      }}>
        {stepIndex < STEPS.length - 1 ? (
          <button
            onClick={goNext}
            style={{
              width: '100%',
              fontFamily: 'Epilogue, sans-serif',
              fontWeight: 500,
              fontSize: '0.72rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--charcoal)',
              background: 'transparent',
              border: '1px solid var(--gold)',
              padding: '1.1rem',
              cursor: 'pointer',
              transition: 'background 0.25s, color 0.25s',
            }}
            onTouchStart={e => {
              e.currentTarget.style.background = 'var(--gold)'
              e.currentTarget.style.color = 'var(--deep)'
            }}
            onTouchEnd={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--charcoal)'
            }}
          >
            Next →
          </button>
        ) : (
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            style={{
              width: '100%',
              fontFamily: 'Epilogue, sans-serif',
              fontWeight: 500,
              fontSize: '0.72rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--charcoal)',
              background: 'transparent',
              border: '1px solid var(--gold)',
              padding: '1.1rem',
              cursor: isSubmitting ? 'wait' : 'pointer',
              opacity: isSubmitting ? 0.6 : 1,
              transition: 'background 0.25s, color 0.25s',
            }}
          >
            {isSubmitting ? 'Sending…' : 'Send Request'}
          </button>
        )}
        <p style={{
          fontFamily: 'Epilogue, sans-serif',
          fontWeight: 300,
          fontSize: '0.55rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--taupe)',
          textAlign: 'center',
          marginTop: '0.75rem',
        }}>
          Your details are private and never shared.
        </p>
      </div>
    </div>
  )
}
