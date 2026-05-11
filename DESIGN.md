# Lustro — Design System

## Visual Theme
Dark-anchored luxury editorial. Dark hero and dark founder section bracket warm neutral content sections. The rhythm is: dark → light → dark → light → dark. Sections never feel the same twice.

## Color Strategy
Restrained. Warm neutrals dominate. Gold accent appears at ≤15% of any surface. Opacity scales used extensively for subtlety (--gold-10 through --gold-90, --taupe-15 through --taupe-60, --cream-35 through --cream-88).

## Color Tokens (CSS custom properties)
```
--cream:      #F5F0E8
--parchment:  #EDE6D6
--warm-white: #FAF8F4
--charcoal:   #2C2825
--deep:       #1A1714
--taupe:      #B09E8C
--rose-dust:  #C08E9A
--sage:       #8A9C8D
--rust:       #9B6B52
--gold:       #C4A882
--mid:        #6B5E54
```
Opacity variants defined as named tokens: --gold-10 through --gold-90, --taupe-15 through --taupe-60, --cream-35 through --cream-88, --deep-30 through --deep-95.

## Typography
- **Display**: Playfair Display, weight 700/600/400. Used for hero headlines, section H2s, wordmark.
- **Editorial body**: Cormorant Garamond, weight 300/400/600, italic variants. Used for paragraph copy, pull quotes, review text.
- **UI labels**: Epilogue, weight 300/500/900. Uppercase, wide letter-spacing (0.08–0.22em). Used for eyebrows, CTAs, nav, metadata.
- Base font-size: 18px desktop, 20px mobile.
- Body line-height: 1.65.

## Spacing System
Fluid spacing via clamp() and vw. Section padding: ~8rem 5vw (desktop), 5rem 5vw (mobile). No fixed spacing scale — values chosen contextually. Max-width containers: 900px–1100px.

## Components

### CTA Button (ghost style)
```jsx
border: '1px solid var(--gold-40)'
background: 'transparent'
color: 'var(--gold)'
padding: '0.8rem 2rem'
fontFamily: 'Epilogue'
fontWeight: 500
fontSize: '0.68rem'
letterSpacing: '0.16em'
textTransform: 'uppercase'
// Hover: backgroundColor: 'var(--gold)', color: 'var(--deep)'
```

### Ghost Numbers
```css
.ghost-number {
  -webkit-text-stroke: 1px var(--taupe-35);
  color: transparent;
  font-family: 'Playfair Display';
  font-weight: 700;
}
```

### Form Fields
```css
.form-field {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--taupe);
  font-family: 'Cormorant Garamond';
}
```

### Divider / eyebrow pattern
2rem gold-50 line + small Epilogue uppercase label, 0.62rem, letterSpacing 0.22em.

## Motion
Framer Motion for section/element reveals: `initial={{ opacity: 0, y: 20 }}`, `whileInView={{ opacity: 1, y: 0 }}`. Duration 0.7–0.85s. Ease [0.16, 1, 0.3, 1] (expo-out). `viewport={{ once: true, margin: '-80px' }}`. Lenis + GSAP ScrollTrigger for scroll-linked parallax.

## Layout Patterns
- Full-bleed sections with inline padding (5vw)
- Two-column grids: philosophy (60/40), founder (50/50), footer (1.5fr 1fr 1fr)
- Mobile: all grids stack to single column via CSS class overrides in index.css
- Ghost numbers positioned absolute, large (clamp 10–22rem), opacity 0.03–0.06, decorative

## Dark Sections
Background: var(--deep). Text: var(--cream-*) variants. Gold accent only. Used for: Hero, FounderSection, Footer.

## No Dark Mode
Single theme only. Design is dark/light alternating by section, not by system preference.
