# Lustro — Code Agent Brief
**Project:** Bespoke shoe care service website (React + Vite + GSAP + Framer Motion + Lenis)  
**Stack:** React, Tailwind CSS, GSAP ScrollTrigger, Framer Motion, Lenis smooth scroll, Embla Carousel, React Hook Form  
**Root:** `src/`

---

## Already Fixed (do not redo)
- ✅ Mobile cursor hidden — `src/index.css` media query updated to `(hover: none), (pointer: coarse)` with `!important`; `CustomCursor.jsx` bails out early on touch devices
- ✅ `BrushParallax` section height reduced to `60vh / 380px min` on mobile via `.brush-parallax-section` CSS class
- ✅ Hero etymology corner text hidden on mobile via `.hero-etymology` CSS class

---

## Issues to Fix

### 1 — Philosophy Section: Background doesn't go full-width on wide viewports
**File:** `src/components/PhilosophySection.jsx`  
**Problem:** The `<section>` element itself is styled with `maxWidth: '1200px'` and `margin: '0 auto'`, so the `background: var(--warm-white)` only covers 1200px — exposing the body cream colour on either side at wide viewports.  
**Fix:** Remove `maxWidth`, `margin: '0 auto'`, `display: 'grid'`, `gridTemplateColumns`, and `gap` from the `<section>` inline style. Wrap the two child divs (`.philosophy-left` and `.philosophy-right`) in a new inner `<div>` that carries those grid/max-width styles. Keep the `background`, `padding`, `position: 'relative'` and `ref={sectionRef}` on the `<section>` itself.

```jsx
// BEFORE (abbreviated):
<section ref={sectionRef} className="philosophy-grid" style={{ background: 'var(--warm-white)', padding: '8rem 0', display: 'grid', gridTemplateColumns: '40% 1fr', maxWidth: '1200px', margin: '0 auto', ... }}>
  <div ref={leftRef} className="philosophy-left">...</div>
  <div className="philosophy-right">...</div>
</section>

// AFTER:
<section ref={sectionRef} style={{ background: 'var(--warm-white)', padding: '8rem 0', position: 'relative' }}>
  <div className="philosophy-grid" style={{ display: 'grid', gridTemplateColumns: '40% 1fr', gap: '0 4rem', maxWidth: '1200px', margin: '0 auto' }}>
    <div ref={leftRef} className="philosophy-left">...</div>
    <div className="philosophy-right">...</div>
  </div>
</section>
```

> **Note:** The GSAP sticky-pin uses `sectionRef` (the `<section>`) as the trigger and `leftRef` (the left column div) as the pinned element — moving the grid to an inner div does not break this.

---

### 2 — Typo in Philosophy Section heading
**File:** `src/components/PhilosophySection.jsx` — line ~108  
**Problem:** "Everytime" is not a word.  
**Fix:** Change the h2 text from `"Everytime."` to `"Every time."` (two words).

```jsx
// BEFORE:
Hard Work.<br />
<em>Everytime. No Shortcuts</em>

// AFTER:
Hard Work.<br />
<em>Every time. No shortcuts.</em>
```

---

### 3 — CTA copy is inconsistent across the site
**Problem:** Three different phrases are used for the same booking action across the page:
- Hero section: `"Request an Appointment"`
- Nav button (desktop): `"Schedule A Refresh"`
- CTA Strip: `"Schedule a Refresh"`
- Mobile menu: `"Book a Ritual"`

**Fix:** Standardise to `"Book a Ritual"` everywhere — it's the most on-brand. Update all four locations:

| File | Location | Current text |
|------|----------|-------------|
| `src/components/HeroSection.jsx` | CTA button | `"Request an Appointment"` |
| `src/components/Nav.jsx` | Desktop nav button | `"Schedule A Refresh"` |
| `src/components/Nav.jsx` | Mobile menu button | `"Book a Ritual"` ✅ already correct |
| `src/components/CTAStrip.jsx` | Strip button | `"Schedule a Refresh"` |

---

### 4 — Testimonial carousel dots don't reflect the active slide
**File:** `src/components/TestimonialsSection.jsx`  
**Problem:** Dot indicators are hardcoded — the first dot is always gold. The Embla `select` event is never subscribed to.  
**Fix:** Track selected index in state and update on Embla's `select` event.

```jsx
// Add state:
const [selectedIndex, setSelectedIndex] = useState(0)

// Inside the useEffect that sets up emblaApi:
emblaApi.on('select', () => setSelectedIndex(emblaApi.selectedScrollSnap()))

// In the dot buttons, replace hardcoded logic:
// BEFORE:
background: i === 0 ? 'var(--gold)' : 'rgba(176,158,140,0.4)',

// AFTER:
background: i === selectedIndex ? 'var(--gold)' : 'rgba(176,158,140,0.4)',
```

---

### 5 — Timeline: blank milestone entry + "Today" copy will age
**File:** `src/components/TimelineSection.jsx`  
**Problem:** The `MILESTONES` array has an empty object between 1997 and 2015, and the 2026 entry is hardcoded with `title: 'Today'` which will be inaccurate next year.

**Fix:**
1. Remove the blank/empty entry from the `MILESTONES` array.
2. Consider adding a meaningful milestone between 1997 and 2015 (e.g. a notable client, move to West Hollywood, etc.) — check with the brand owner.
3. Change `title: 'Today'` to `title: 'Present'` to keep it evergreen.

---

### 6 — Testimonial dot touch targets are too small
**File:** `src/components/TestimonialsSection.jsx`  
**Problem:** The dot buttons are `6×6px` with `padding: 0` — well below the WCAG 44×44px minimum touch target.  
**Fix:** Add `padding: '10px'` to each dot button (the visual dot stays 6px, but the tap area expands to 26px — acceptable for a secondary control).

```jsx
// BEFORE:
style={{ width: '6px', height: '6px', ..., padding: 0 }}

// AFTER:
style={{ width: '6px', height: '6px', ..., padding: '10px', boxSizing: 'content-box' }}
```

---

### 7 — Hero video: add aria-hidden (decorative content)
**File:** `src/components/HeroSection.jsx`  
**Problem:** The background video is decorative (no content) but is not marked up as such, which can confuse screen readers.  
**Fix:** Add `aria-hidden="true"` to the `<video>` element.

```jsx
<video ref={videoRef} autoPlay muted loop playsInline aria-hidden="true" style={...}>
```

---

### 8 — FAQ: missing first question (blank array slot)
**File:** `src/components/FAQSection.jsx`  
**Problem:** The `FAQS` array starts with an empty entry (a dangling comma before the first real question). This renders an empty accordion item.  
**Fix:** Remove the empty entry at the top of the `FAQS` array. The first real question is `"Do you work on sneakers?"`.

```js
// BEFORE:
const FAQS = [
  ,   // ← remove this
  { q: 'Do you work on sneakers?', ... },
  ...
]

// AFTER:
const FAQS = [
  { q: 'Do you work on sneakers?', ... },
  ...
]
```

---

### 9 — FAQSection: heading style mismatch
**File:** `src/components/FAQSection.jsx`  
**Problem:** The section header uses a plain `"FAQs"` h2. Every other section uses a two-line poetic heading pattern with an eyebrow label.  
**Fix (optional, discuss with brand):** Replace the heading with:

```jsx
<h2 ...>
  Common questions.<br />
  <em style={{ fontWeight: 400 }}>Honest answers.</em>
</h2>
```

---

### 10 — Native `<select>` has `cursor: none`
**File:** `src/components/ContactSection.jsx` — line ~221  
**Problem:** The service dropdown has `cursor: none` in its inline style, which can produce an invisible cursor on the dropdown on some browsers and defeats the mobile cursor fix.  
**Fix:** Remove `cursor: 'none'` from the select's style object entirely. The global CSS cursor rules will handle it correctly.

```jsx
// BEFORE:
style={{ ...fieldStyle(errors.service), cursor: 'none' }}

// AFTER:
style={fieldStyle(errors.service)}
```

---

### 11 — Add a direct contact alternative (email or phone)
**File:** `src/components/ContactSection.jsx`  
**Problem:** There is no email address or phone number anywhere on the site. For a luxury by-appointment service some clients will not fill out a form.  
**Fix:** Below the studio hours block in the left column, add a contact line:

```jsx
<a
  href="mailto:hello@lustro.studio"
  style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 300, fontSize: '0.85rem',
           letterSpacing: '0.08em', color: 'var(--gold)', textDecoration: 'none' }}
>
  hello@lustro.studio
</a>
```

> Replace the email address with the real one before launch.

---

### 12 — Add Instagram to the Footer
**File:** `src/components/Footer.jsx`  
**Problem:** No social media links in the footer. For a visual luxury service in LA, Instagram is a primary discovery channel.  
**Fix:** Add a fourth column (or append to Col 3) with:

```jsx
<a
  href="https://instagram.com/lustrostudio"
  target="_blank"
  rel="noopener noreferrer"
  style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 300, fontSize: '0.65rem',
           letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)',
           textDecoration: 'none' }}
>
  @lustrostudio →
</a>
```

> Replace with the real Instagram handle before launch.

---

### 13 — Testimonials section has no `id` attribute
**File:** `src/components/TestimonialsSection.jsx`  
**Problem:** All other scrollable sections have `id` attributes. Testimonials doesn't — this isn't referenced in the nav, so it's low priority, but consistent markup is good practice.  
**Fix:** Add `id="testimonials"` to the `<section>` element.

---

## Notes for Your Code Agent

- All animations are handled by **GSAP ScrollTrigger** and **Framer Motion** — do not swap these out.
- Smooth scrolling is via **Lenis** exposed on `window.__lenis`. Any programmatic scroll should use `window.__lenis?.scrollTo(el, { offset: -80 })` pattern as used throughout.
- Tailwind is available but the project mostly uses inline styles for component-specific styling. Keep this convention.
- The `useBreakpoint` hook at `src/hooks/useBreakpoint.js` is available for JS-side responsive logic.
- Build with `npm run build` (Vite). Dev server: `npm run dev`.
