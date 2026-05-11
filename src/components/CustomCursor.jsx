import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Don't activate on touch / coarse-pointer devices
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches
    if (isTouch) {
      dot.style.display  = 'none'
      ring.style.display = 'none'
      return
    }

    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top  = `${mouseY}px`
    }

    document.addEventListener('mousemove', onMove)

    let rafId
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = `${ringX}px`
      ring.style.top  = `${ringY}px`
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    const onEnter = () => {
      ring.style.width  = '48px'
      ring.style.height = '48px'
      ring.style.borderColor = 'var(--gold)'
      dot.style.transform = 'translate(-50%, -50%) scale(0.4)'
    }
    const onLeave = () => {
      ring.style.width  = '32px'
      ring.style.height = '32px'
      ring.style.borderColor = 'var(--gold-60)'
      dot.style.transform = 'translate(-50%, -50%) scale(1)'
    }

    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ position: 'fixed', pointerEvents: 'none', zIndex: 10000,
          width: '8px', height: '8px', background: 'var(--charcoal)',
          borderRadius: '50%', transform: 'translate(-50%, -50%)',
          transition: 'transform 0.15s ease, background 0.2s ease',
        }}
      />
      <div
        ref={ringRef}
        style={{ position: 'fixed', pointerEvents: 'none', zIndex: 10000,
          width: '32px', height: '32px',
          border: '1px solid var(--gold-60)',
          borderRadius: '50%', transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease',
        }}
      />
    </>
  )
}
