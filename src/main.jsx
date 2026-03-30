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

// Expose lenis globally so GSAP ScrollTrigger can sync
window.__lenis = lenis

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// ─── Mount ─────────────────────────────────────────────────
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
