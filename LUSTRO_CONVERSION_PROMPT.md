# Lustro — Conversion & Quality Improvements
## Prompt for Claude Code

You are working on a React + Vite website for **Lustro**, a luxury bespoke shoe care and restoration service in Los Angeles. The stack is: React, Vite, Tailwind CSS (mostly inline styles are used — keep this convention), GSAP ScrollTrigger, Framer Motion, Lenis smooth scroll, Embla Carousel, React Hook Form.

**Root:** `src/`  
**Key rule:** All programmatic scrolling must use `window.__lenis?.scrollTo(el, { offset: -80 })`. Do not use `window.scrollTo` or `scrollIntoView`. Do not swap out any animation libraries. Do not refactor working components unless a specific change is listed below.

Work through the items below in order. Each phase should be committed before moving to the next. Confirm each change before proceeding if there is any ambiguity.

---

## PHASE 1 — Launch Blockers (nothing ships until these are done)

### 1.1 — Wire the contact form to a real backend
**File:** `src/components/ContactSection.jsx`  
**Problem:** `onSubmit` currently only calls `setTimeout` and sets `submitted = true`. No data goes anywhere. Real leads are silently discarded.  
**Fix:** Integrate **EmailJS** (client-side, no backend needed, free tier is sufficient for a small service business). 

Steps:
1. `npm install @emailjs/browser`
2. Replace the fake `onSubmit` with a real EmailJS send using `emailjs.sendForm()` or `emailjs.send()`.
3. Add three placeholder constants at the top of the file (clearly commented):
   ```js
   const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'   // replace before launch
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'  // replace before launch
   const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'   // replace before launch
   ```
4. The template should pass: name, email, phone, service, notes, referral_source (new field — see item 1.3).
5. Keep the existing animated confirmation state on success.
6. On error, show an inline error message below the submit button (in `var(--rose-dust)`, same style as field validation errors): `"Something went wrong. Please email us directly at hello@lustro.studio"`

### 1.2 — Add photo upload to the contact form
**File:** `src/components/ContactSection.jsx`  
**Problem:** The FAQ says "Send us a photograph when you book if you're unsure" and the form copy says "photographs are welcome" — but there is no file input. This is a broken promise.  
**Fix:** Add an optional file input between the Notes textarea and the Submit button:
- Label: `"Attach a photo (optional)"` in the same eyebrow style (Epilogue, 0.62rem, uppercase, var(--mid))
- `<input type="file" accept="image/*">` styled to match the underline field aesthetic: transparent background, bottom border only, padding `0.75rem 0`
- Max one file. No required validation.
- Pass the file reference through to EmailJS if the template supports attachments, otherwise note it in the email body as "Client attempted to attach a photo — follow up to request it."

### 1.3 — Add "How did you hear about us?" to the contact form
**File:** `src/components/ContactSection.jsx`  
**Problem:** For a new business, acquisition source tracking is critical. There is currently no way to know if clients are coming from Instagram, Google, word of mouth, etc.  
**Fix:** Add a `<select>` field between the Service dropdown and the Notes textarea:
- Placeholder option: `"How did you hear about us?"`  
- Options: `Instagram`, `Google Search`, `Word of mouth`, `Walked by the studio`, `Other`
- Register as `referral_source` in React Hook Form. Not required.
- Style identical to the existing Service dropdown.

### 1.4 — Replace placeholder email with real one (flag for client review)
**Files:** `src/components/ContactSection.jsx`, `src/components/Footer.jsx` (if present)  
**Problem:** `hello@lustro.studio` is a placeholder. It appears in the contact section left column and in the error fallback message.  
**Action:** Add a comment `// TODO: Replace with real email before launch` on every line where `hello@lustro.studio` appears. Do not change the value yet — just make it impossible to miss.

---

## PHASE 2 — Conversion Wins (high impact)

### 2.1 — Add a pricing FAQ question
**File:** `src/components/FAQSection.jsx`  
**Problem:** "How much does it cost?" is the most obvious visitor question and it is completely absent. Without a price anchor, high-intent visitors leave to search for comparable services and don't return.  
**Fix:** Add this as the **first** item in the `FAQS` array (before "Do you work on sneakers?"):
```js
{
  q: 'How much does it cost?',
  a: "Services start from $65 for a hand shine and conditioning. A full restoration — resoling, colour correction, deep leather repair — typically ranges from $180 to $380 depending on the work required. We provide a firm, itemised quote before any work begins. No surprises.",
}
```
> **Note to client:** Adjust prices to reflect actual rates before launch.

### 2.2 — Reorder the page sections
**File:** `src/App.jsx`  
**Problem:** The current order after the CTA strip is: `CTAStrip → TimelineSection → FAQSection → ContactSection`. The Timeline (brand history) is brand content, not conversion content. It interrupts the path to booking.  
**Fix:** Reorder to: `CTAStrip → FAQSection → ContactSection → TimelineSection`  
The Timeline should sit before the Footer as evergreen brand content, not as a conversion obstacle.

```jsx
// BEFORE:
<CTAStrip />
<TimelineSection />
<FAQSection />
<ContactSection />

// AFTER:
<CTAStrip />
<FAQSection />
<ContactSection />
<TimelineSection />
```

### 2.3 — Upgrade the hero CTA button from ghost to filled
**File:** `src/components/HeroSection.jsx`  
**Problem:** The "Book a Ritual" button is transparent with a faint border on a dark video background. It is the primary action on the entire page and it looks secondary. Ghost buttons perform significantly worse as primary CTAs.  
**Fix:** Change the button's default (non-hover) state to filled gold:
```jsx
// BEFORE default state:
color: 'var(--warm-white)',
background: 'transparent',
border: '1px solid rgba(196,168,130,0.6)',

// AFTER default state:
color: 'var(--deep)',
background: 'var(--gold)',
border: '1px solid var(--gold)',
```
And update `whileHover` to invert: dark background, gold text:
```jsx
whileHover={{ backgroundColor: 'var(--deep)', color: 'var(--gold)', borderColor: 'var(--deep)' }}
```

### 2.4 — Reduce hero CTA animation delay
**File:** `src/components/HeroSection.jsx`  
**Problem:** `containerVariants` has `delayChildren: 0.4` and `staggerChildren: 0.15`. With 4 animated children before the button, the CTA doesn't appear until ~1.0 second after load. On mobile, users bounce before it's visible.  
**Fix:**
```jsx
// BEFORE:
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
}

// AFTER:
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.10, delayChildren: 0.2 } },
}
```

### 2.5 — Add a post-gallery CTA
**File:** `src/components/BeforeAfterGallery.jsx`  
**Problem:** The before/after gallery is the strongest conversion asset on the page — it shows the actual work. But there is no call to action after it. The moment a visitor sees a transformation and thinks "I want that" there is nowhere for that energy to go.  
**Fix:** At the bottom of the `BeforeAfterGallery` component, after the gallery container and before the closing `</section>`, add:
```jsx
<motion.div
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-60px' }}
  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
  style={{ textAlign: 'center', marginTop: '4rem' }}
>
  <motion.button
    onClick={() => {
      const el = document.getElementById('contact')
      if (el) window.__lenis?.scrollTo(el, { offset: -80 })
    }}
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
      padding: '0.9rem 2.4rem',
      cursor: 'none',
    }}
  >
    Book a Ritual
  </motion.button>
</motion.div>
```

### 2.6 — Add "What happens next" to the contact section left column
**File:** `src/components/ContactSection.jsx`  
**Problem:** "We respond within 24–48 hours" is mentioned but there is no clarity on what happens after that. Uncertainty after form submission increases abandonment.  
**Fix:** Below the email link in the left column, add a numbered 3-step flow:
```jsx
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
        fontWeight: 300,
        fontSize: '0.95rem',
        color: 'var(--mid)',
        lineHeight: 1.6,
      }}>
        {step}
      </span>
    </div>
  ))}
</div>
```

### 2.7 — Add a trust signal near the submit button
**File:** `src/components/ContactSection.jsx`  
**Problem:** No reassurance near the form submission point. Privacy anxiety is a real friction factor.  
**Fix:** Directly below the Submit button, add:
```jsx
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
```

### 2.8 — Make the address a Google Maps link
**Files:** `src/components/ContactSection.jsx`, `src/components/Footer.jsx`  
**Problem:** "West Hollywood, CA" is mentioned in multiple places but is never tappable. On mobile, users expect addresses to open Maps.  
**Fix:** Wrap every occurrence of the studio address with:
```jsx
<a
  href="https://maps.google.com/?q=West+Hollywood,+CA"
  target="_blank"
  rel="noopener noreferrer"
  style={{ color: 'inherit', textDecoration: 'none' }}
>
  West Hollywood, CA
</a>
```
> **Note to client:** Replace the Google Maps URL with the exact studio address before launch.

### 2.9 — Upgrade testimonial social proof
**File:** `src/components/TestimonialsSection.jsx`  
**Problem:** All five testimonials use initials only (e.g. "D.R., Architect"). This reads as fabricated to new visitors, which undermines the credibility of the entire social proof section.  
**Fix (two options — choose one):**

**Option A (preferred):** Replace initials with first name + last initial format. Example: `'D.R.'` → `'David R.'`. Update the `author` field for all five TESTIMONIALS entries with first names. Check with client for real names or realistic first names.

**Option B:** Add a source badge to each card — a small Google star rating element below the author line:
```jsx
<div style={{ display: 'flex', gap: '2px', marginTop: '0.5rem' }}>
  {[...Array(5)].map((_, i) => (
    <span key={i} style={{ color: 'var(--gold)', fontSize: '0.7rem' }}>★</span>
  ))}
  <span style={{
    fontFamily: 'Epilogue, sans-serif',
    fontWeight: 300,
    fontSize: '0.55rem',
    letterSpacing: '0.1em',
    color: 'var(--taupe)',
    marginLeft: '0.5rem',
    textTransform: 'uppercase',
    alignSelf: 'center',
  }}>
    via Google
  </span>
</div>
```
> **Note:** Only use Option B if these are real Google reviews. Do not add a fake source badge.

### 2.10 — Add a sticky mobile booking bar
**File:** Create `src/components/MobileBookingBar.jsx` and import it in `src/App.jsx`  
**Problem:** On mobile, once a visitor scrolls past the hero, there is no persistent way to book without scrolling all the way to the bottom. The desktop nav has a "Book a Ritual" button — mobile doesn't.  
**Fix:** Create a fixed bottom bar that appears on mobile only, after the user scrolls past the hero (~100vh):

```jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBreakpoint } from '../hooks/useBreakpoint.js'

export default function MobileBookingBar() {
  const { isMobileOrTablet } = useBreakpoint()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!isMobileOrTablet) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 150,
            padding: '1rem 1.5rem',
            paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))',
            background: 'rgba(26,23,20,0.95)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(196,168,130,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: '0.95rem',
            color: 'rgba(245,240,232,0.65)',
          }}>
            Ready to restore your shoes?
          </p>
          <button
            onClick={() => {
              const el = document.getElementById('contact')
              if (el) window.__lenis?.scrollTo(el, { offset: -80 })
            }}
            style={{
              fontFamily: 'Epilogue, sans-serif',
              fontWeight: 500,
              fontSize: '0.65rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--deep)',
              background: 'var(--gold)',
              border: 'none',
              padding: '0.7rem 1.4rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              minHeight: '44px',
            }}
          >
            Book a Ritual
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

Import and add `<MobileBookingBar />` inside `AppShell` in `src/App.jsx`, after `<BackToTop />`.

---

## PHASE 3 — Code Brief Bug Fixes (from LUSTRO_CODE_BRIEF.md)

Work through all items in `LUSTRO_CODE_BRIEF.md` that are not already marked ✅:

### 3.1 — Philosophy Section background fix (Issue #1)
See LUSTRO_CODE_BRIEF.md § Issue 1 for exact before/after code.

### 3.2 — Fix typo: "Everytime" → "Every time." (Issue #2)
**File:** `src/components/PhilosophySection.jsx`

### 3.3 — Standardise CTA copy to "Book a Ritual" everywhere (Issue #3)
**Files:** `src/components/HeroSection.jsx` (eyebrow label "Request an Appointment"), `src/components/Nav.jsx` (desktop button), `src/components/CTAStrip.jsx` (button text).  
Note: After Phase 2 changes, also update the new gallery CTA (item 2.5) and mobile bar (item 2.10) — both already use "Book a Ritual" ✅.

### 3.4 — Testimonial dot active state fix (Issue #4)
Already implemented in current code (selectedIndex state + emblaApi.on('select')) — verify it is working correctly.

### 3.5 — Timeline: remove blank entry, change "Today" to "Present" (Issue #5)
**File:** `src/components/TimelineSection.jsx`

### 3.6 — Testimonial dot touch targets (Issue #6)
**File:** `src/components/TestimonialsSection.jsx` — add `padding: '10px', boxSizing: 'content-box'` to each dot button.

### 3.7 — Native select cursor fix (Issue #10)
**File:** `src/components/ContactSection.jsx` — remove `cursor: 'none'` from the service select field style.

### 3.8 — FAQ: remove empty first entry (Issue #8)
**File:** `src/components/FAQSection.jsx` — verify no empty entries in the FAQS array. (Note: current code appears clean — confirm.)

### 3.9 — Add Instagram to Footer (Issue #12)
**File:** `src/components/Footer.jsx`  
Add: `@lustrostudio →` linking to `https://instagram.com/lustrostudio` in the footer.  
Add `// TODO: Replace with real Instagram handle before launch` comment.

---

## PHASE 4 — SEO & Technical

### 4.1 — Add Schema.org LocalBusiness structured data
**File:** `index.html`  
**Problem:** There is no machine-readable business data. Google cannot surface this business in local search results ("shoe restoration Los Angeles") without it.  
**Fix:** Add inside `<head>`:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Lustro",
  "description": "Premium bespoke shoe care and leather restoration in Los Angeles. By appointment only.",
  "url": "https://lustro.studio",
  "telephone": "YOUR_PHONE_NUMBER",
  "email": "hello@lustro.studio",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "West Hollywood",
    "addressRegion": "CA",
    "addressCountry": "US"
  },
  "openingHours": ["Tu-Sa 10:00-17:00"],
  "priceRange": "$$",
  "image": "https://lustro.studio/og-image.jpg",
  "sameAs": ["https://instagram.com/lustrostudio"]
}
</script>
```
> **Note to client:** Fill in real phone number, exact address, and real URLs before launch.

### 4.2 — Add video poster/fallback image
**File:** `src/components/HeroSection.jsx`  
**Problem:** If the hero video fails to load (slow connection, low data mode, corporate network), the hero section shows only a dark overlay over the body background color. There is no fallback.  
**Fix:** 
1. Take a still frame from the hero video and save it as `src/assets/images/hero-poster.jpg` (or use the first frame). Aim for ~100–200KB.
2. Add `poster={heroPoster}` to the `<video>` element (import the image at the top of the file).

### 4.3 — Update meta description with a price anchor
**File:** `index.html`  
**Problem:** The meta description has no price signal. Adding one improves click-through from Google search results.  
**Fix:**
```html
<!-- BEFORE: -->
<meta name="description" content="Premium bespoke shoe care and leather restoration in Los Angeles. By appointment only. Hand shine, deep conditioning, colour revival, and full restoration. Est. 1988." />

<!-- AFTER: -->
<meta name="description" content="Premium bespoke shoe care and leather restoration in Los Angeles. Starting from $65. By appointment only. Hand shine, deep conditioning, colour revival, and full restoration." />
```
> **Note:** Adjust price to match real starting rate.

---

## Guard Rails — Do Not Change

- Do not change the color palette (`src/index.css` `:root` variables)
- Do not swap Framer Motion, GSAP, or Lenis for other libraries
- Do not convert inline styles to Tailwind classes
- Do not split components into separate CSS files
- All programmatic scrolling must use `window.__lenis?.scrollTo(el, { offset: -80 })`
- `cursor: none` on `body` (in `src/index.css`) is intentional — the custom cursor handles it; do not remove
- Do not remove or alter the noise texture overlay (`body::before` in `src/index.css`)
- Do not modify `src/hooks/useBreakpoint.js`
- The `useBreakpoint` hook's `isMobileOrTablet` is the correct way to gate mobile vs desktop behavior

---

## Confirmation Checklist Before Launch

- [ ] EmailJS credentials replaced (service ID, template ID, public key)
- [ ] `hello@lustro.studio` replaced with real email address in ContactSection and Footer
- [ ] Instagram handle `@lustrostudio` verified as real and active
- [ ] Google Maps URL updated with exact studio street address
- [ ] Schema.org phone number and full address filled in
- [ ] Pricing in FAQ question 1 verified against actual rates
- [ ] Testimonial names updated with permission from real clients (or Google review badge added)
- [ ] Hero video poster image created and added
- [ ] Meta description price updated to match real starting rate
