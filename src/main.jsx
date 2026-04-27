import React from 'react'
import ReactDOM from 'react-dom/client'
import Lenis from 'lenis'
import App from './App.jsx'
import './index.css'

// ─── Lenis Smooth Scroll ────────────────────────────────────
const lenis = new Lenis({
  lerp: 0.1,
  smoothWheel: true,
  syncTouch: false,
})

// Expose lenis globally so GSAP ScrollTrigger can sync.
// Lenis is driven exclusively by the GSAP ticker in LenisScrollTriggerSync
// (App.jsx) — do NOT add a separate requestAnimationFrame loop here, as that
// would cause Lenis to advance twice per frame.
window.__lenis = lenis

// ─── Mount ─────────────────────────────────────────────────
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
