import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import brushesImg from '../assets/images/brushes.png'

gsap.registerPlugin(ScrollTrigger)

export default function BrushParallax() {
  const sectionRef = useRef(null)
  const imgRef     = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const img     = imgRef.current
    if (!section || !img) return

    const ctx = gsap.context(() => {
      gsap.to(img, {
        y: '-10%', // subtle parallax
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '640px',
        background: 'var(--parchment)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Subtle wallpaper image */}
      <img
        ref={imgRef}
        src={brushesImg}
        alt="Shoe care brushes"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          willChange: 'transform',
          mixBlendMode: 'multiply',
          opacity: 0.2,
          filter: 'brightness(0.5) saturate(0)', // muted shadow effect
          zIndex: 1,
        }}
      />

      {/* Radial vignette overlay for depth */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, var(--parchment) 80%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Text — each line animates in individually on scroll */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          marginBottom: '3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
          overflow: 'hidden',
        }}
      >
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0 }}
          style={{
            fontFamily: 'Epilogue, sans-serif',
            fontWeight: 600,
            fontSize: '1rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--taupe)',
          }}
        >
          The Tools of the Trade
        </motion.p>

        {/* Line 1 */}
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontStyle: 'italic',
            fontWeight: 200,
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            color: 'var(--charcoal)',
            lineHeight: 1.3,
          }}
        >
          Every brush has a purpose.
        </motion.p>

        {/* Line 2 */}
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.34 }}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontStyle: 'italic',
            fontWeight: 200,
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            color: 'var(--charcoal)',
            lineHeight: 1.3,
          }}
        >
          Every purpose, a technique.
        </motion.p>
      </div>
    </section>
  )
}