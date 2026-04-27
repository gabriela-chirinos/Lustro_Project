// Lustro Site — Live Headed Audit
import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:5173'

test.describe('Lustro — Security & Accessibility Audit', () => {

  test('Page loads and has correct title', async ({ page }) => {
    await page.goto(BASE)
    await expect(page).toHaveTitle(/Lustro/)
    console.log('✅ Title OK:', await page.title())
  })

  test('SECURITY: EmailJS credentials should not be placeholder strings', async ({ page }) => {
    await page.goto(BASE)
    const source = await page.content()
    const hasPlaceholderServiceId = source.includes('YOUR_SERVICE_ID')
    const hasPlaceholderKey = source.includes('YOUR_PUBLIC_KEY')
    console.log('🔐 EmailJS SERVICE_ID is placeholder:', hasPlaceholderServiceId)
    console.log('🔐 EmailJS PUBLIC_KEY is placeholder:', hasPlaceholderKey)
    expect(hasPlaceholderServiceId, 'EmailJS credentials must be moved to env vars, not hardcoded').toBe(false)
  })

  test('SECURITY: Structured data should not have placeholder phone', async ({ page }) => {
    await page.goto(BASE)
    const ldJson = await page.$eval(
      'script[type="application/ld+json"]',
      el => el.textContent
    )
    const hasPlaceholderPhone = ldJson.includes('YOUR_PHONE_NUMBER')
    console.log('🔐 LD+JSON placeholder phone found:', hasPlaceholderPhone)
    expect(hasPlaceholderPhone, 'Real phone number is missing from structured data').toBe(false)
  })

  test('A11Y: Page should have exactly one h1', async ({ page }) => {
    await page.goto(BASE)
    await page.waitForTimeout(1500)
    const h1s = await page.$$('h1')
    console.log(`📋 Number of h1 elements: ${h1s.length}`)
    for (const h1 of h1s) {
      console.log('  h1 text:', await h1.textContent())
    }
    expect(h1s.length, 'Page should have exactly one <h1>').toBe(1)
  })

  test('A11Y: Form inputs should have associated labels', async ({ page }) => {
    await page.goto(BASE)
    await page.waitForTimeout(800)
    await page.locator('#contact').scrollIntoViewIfNeeded()
    await page.waitForTimeout(800)

    const inputs = await page.$$('input:not([type="file"]):not([type="hidden"]), textarea, select')
    let unlabelled = 0
    for (const input of inputs) {
      const id = await input.getAttribute('id')
      const ariaLabel = await input.getAttribute('aria-label')
      const ariaLabelledBy = await input.getAttribute('aria-labelledby')
      const hasLabel = id ? await page.$(`label[for="${id}"]`) : null
      if (!hasLabel && !ariaLabel && !ariaLabelledBy) {
        const name = await input.getAttribute('name') || 'unknown'
        console.log(`❌ Unlabelled input: name="${name}"`)
        unlabelled++
      }
    }
    console.log(`📋 Unlabelled inputs: ${unlabelled}`)
    expect(unlabelled, 'All form inputs should have associated labels').toBe(0)
  })

  test('A11Y: FAQ accordion buttons should have aria-expanded', async ({ page }) => {
    await page.goto(BASE)
    await page.waitForTimeout(800)
    await page.locator('#faq').scrollIntoViewIfNeeded()
    await page.waitForTimeout(800)

    const faqButtons = await page.$$('#faq button')
    let missingAriaExpanded = 0
    for (const btn of faqButtons) {
      const expanded = await btn.getAttribute('aria-expanded')
      if (expanded === null) {
        const text = (await btn.textContent())?.trim().slice(0, 40)
        console.log(`❌ FAQ button missing aria-expanded: "${text}"`)
        missingAriaExpanded++
      }
    }
    console.log(`📋 FAQ buttons missing aria-expanded: ${missingAriaExpanded}`)
    expect(missingAriaExpanded, 'FAQ accordion buttons must have aria-expanded').toBe(0)
  })

  test('A11Y: Before/After slider should have role=slider', async ({ page }) => {
    await page.goto(BASE)
    await page.waitForTimeout(800)
    const sliders = await page.$$('[role="slider"]')
    console.log(`📋 Before/After sliders with role="slider": ${sliders.length}`)
    expect(sliders.length, 'Before/After sliders must have role="slider"').toBeGreaterThan(0)
  })

  test('A11Y: Gallery images should all have alt text', async ({ page }) => {
    await page.goto(BASE)
    await page.waitForTimeout(800)
    const imgs = await page.$$('img:not([aria-hidden="true"])')
    let missingAlt = 0
    for (const img of imgs) {
      const alt = await img.getAttribute('alt')
      if (!alt) {
        const src = await img.getAttribute('src')
        console.log(`❌ Missing alt text: ${src}`)
        missingAlt++
      }
    }
    console.log(`📋 Images missing alt text: ${missingAlt}`)
    expect(missingAlt, 'All visible images must have alt text').toBe(0)
  })

  test('A11Y: Mobile hamburger button should have aria-label', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto(BASE)
    await page.waitForTimeout(800)
    const hamburger = await page.$('button[aria-label]')
    console.log('📋 Hamburger has aria-label:', !!hamburger)
    expect(hamburger, 'Hamburger button must have aria-label').toBeTruthy()
  })

  test('PERF: Gallery images should use lazy loading', async ({ page }) => {
    await page.goto(BASE)
    const galleryImgs = await page.$$('section img[loading="lazy"]')
    console.log(`📋 Images with loading="lazy": ${galleryImgs.length}`)
    expect(galleryImgs.length, 'Gallery images should use loading="lazy"').toBeGreaterThan(0)
  })

  test('SECURITY: Content-Security-Policy meta tag should be present', async ({ page }) => {
    await page.goto(BASE)
    const cspMeta = await page.$('meta[http-equiv="Content-Security-Policy"]')
    console.log('🔐 CSP meta tag present:', !!cspMeta)
    expect(cspMeta, 'A Content-Security-Policy meta tag should be present').toBeTruthy()
  })

  test('RESPONSIVE: Mobile booking bar appears after scrolling past hero', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto(BASE)
    await page.waitForTimeout(1500)
    await page.mouse.wheel(0, 900)
    await page.waitForTimeout(1200)
    const bookingBar = await page.$('.mobile-booking-bar, [data-testid="mobile-booking-bar"]')
    console.log('📋 Mobile booking bar visible after scroll:', !!bookingBar)
  })

  test('INTERACTION: Clicking Book a Ritual scrolls to contact', async ({ page }) => {
    await page.goto(BASE)
    await page.waitForTimeout(1500)
    const bookBtn = page.locator('button').filter({ hasText: 'Book a Ritual' }).first()
    await bookBtn.click()
    await page.waitForTimeout(1200)
    const contactSection = await page.locator('#contact').boundingBox()
    const scrollY = await page.evaluate(() => window.scrollY)
    console.log(`📋 ScrollY after click: ${scrollY}, Contact top: ${contactSection?.y}`)
  })

})
