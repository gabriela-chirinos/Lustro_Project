import { useState, useEffect } from 'react'

function getBreakpoint(w) {
  if (w < 768)  return 'mobile'
  if (w < 1024) return 'tablet'
  return 'desktop'
}

export function useBreakpoint() {
  const [bp, setBp] = useState(() =>
    typeof window !== 'undefined' ? getBreakpoint(window.innerWidth) : 'desktop'
  )

  useEffect(() => {
    const handler = () => setBp(getBreakpoint(window.innerWidth))
    window.addEventListener('resize', handler, { passive: true })
    return () => window.removeEventListener('resize', handler)
  }, [])

  return {
    isMobile:          bp === 'mobile',
    isTablet:          bp === 'tablet',
    isDesktop:         bp === 'desktop',
    isMobileOrTablet:  bp !== 'desktop',
  }
}
