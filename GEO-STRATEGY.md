# GEO Strategy: lustro.studio
**Date:** 2026-05-10
**Mode:** Strategy — Offensive (pre-launch, zero current AI citations)
**GEO Score:** 25/100

---

## GEO Audit

### Score Breakdown

| Pillar | Score | Max |
|--------|-------|-----|
| Evidence Density | 8 | 35 |
| Structure & Position | 8 | 25 |
| Authority Signals | 5 | 25 |
| AI Crawlability | 4 | 15 |
| **Total** | **25** | **100** |

### Pillar Details

**Evidence Density — 8/35**
- ✅ Specific numbers exist: "37 years", "$15 deposit", "$65 starting rate" — 3 numbers with units
- ❌ Zero external citations anywhere on the site
- ❌ No expert quotes from named third parties (the client reviews are a start but not expert citations)
- ⚠️ Named entities: Carlos (partial — no full name, no sameAs), "West Hollywood, CA" (pass)
- ❌ No original first-party data publication (e.g., "what leather restoration actually costs in LA")

**Structure & Position — 8/25**
- ❌ React SPA (CSR) — AI crawlers see blank HTML. All structure is invisible until JS executes.
- ❌ No TL;DR or Key Takeaways box visible to crawlers
- ⚠️ FAQPage schema added (fix applied). FAQ content exists but is JS-rendered.
- ⚠️ Heading hierarchy exists in components but not in static HTML
- ❌ No comparison tables in static HTML

**Authority Signals — 5/25**
- ❌ No author byline in schema with sameAs links
- ⚠️ Carlos mentioned in FounderSection but schema only has jobTitle (no Wikipedia, LinkedIn, or ORCID)
- ❌ No dateModified on content — freshness signal missing
- ⚠️ "37 years in the craft" is a first-party credential claim — good, but unsupported by any external citation
- ❌ No press coverage, no external validators cited

**AI Crawlability — 4/15**
- ✅ robots.txt created (fix applied) — all major AI bots explicitly allowed
- ✅ llms.txt created (fix applied)
- ✅ Canonical URL present
- ✅ HTTPS (will be enforced at hosting)
- ❌ **React SPA (CSR only)** — this is the critical blocker. GPTBot, ClaudeBot, PerplexityBot all render JS poorly or not at all. The entire site content is invisible.
- ❌ No `<time>` tags with dateModified
- ⚠️ Schema validates structure-wise but telephone and exact address are empty

### Vetoes Triggered
- **No identifiable author in schema** — Carlos has no sameAs links. Cap at 60 would apply, but score is already 25.

---

## What Was Fixed in This Session

| Fix | File | Impact |
|-----|------|--------|
| Created robots.txt — all AI bots allowed | /public/robots.txt | Critical |
| Created sitemap.xml | /public/sitemap.xml | High |
| Created llms.txt with content map | /public/llms.txt | High |
| FAQPage JSON-LD schema (5 Q&As) | index.html | High |
| Person schema for Carlos | index.html | Medium |
| og:url meta tag | index.html | Low |

---

## 30-Day Plan — On-Site Fixes (before or at launch)

These block all GEO progress until resolved.

### Priority 1: Fix the CSR rendering problem
The entire site is a React SPA rendered client-side. This means:
- Google sees `<div id="root"></div>` on first crawl
- GPTBot, ClaudeBot, PerplexityBot see nothing

**Fix options (pick one):**
- **Easiest:** Use `vite-plugin-ssg` to statically generate HTML at build time
- **Better:** Deploy on Vercel with `@vercel/og` and server-side rendering via Vite SSR
- **Minimum viable:** Inline the critical content (hero headline, FAQ answers, services list) directly in `index.html` before the React bundle. This gives crawlers something to read while JS loads.

### Priority 2: Real OG image (1200×630px)
The current OG image is `favicon-512.png` (512×512). All major platforms crop this. Create a proper 1200×630 image with the Lustro wordmark on dark background.

### Priority 3: Schema completion
Before launch, fill in:
- `telephone` — real phone number
- `streetAddress` — exact studio address
- `image` — real OG image URL (not favicon)
- Carlos's `sameAs` — at minimum an Instagram link

### Priority 4: Google Business Profile
Create and verify the GBP listing for Lustro. This is the #1 citation source for:
- Google AI Overviews on local queries
- Gemini responses to "best shoe care Los Angeles"
- Apple Maps / Siri

### Priority 5: Content page for leather care
Add one static, crawlable page (or a properly SSR'd route):
**"How to care for leather shoes — A craftsman's guide"**
Target query: "how to care for leather shoes"
Include: 5+ specific stats with sources, 2+ named expert quotes (e.g., Saphir's technical guidance), numbered steps, HowTo schema. This single page will drive more AI citations than 10 more booking CTAs.

---

## 60-Day Plan — Authority Building

### Off-site signals that AI engines actually read

**Reddit (Gemini + ChatGPT):**
- Create an account under Carlos's name
- Post in r/goodyearwelt: "37 years in shoe care — AMA" — this is genuinely newsworthy in that community
- Answer questions in r/malefashionadvice, r/losangeles, r/findfashion about leather shoe care
- Subreddits to target: r/goodyearwelt, r/alden, r/cordovan, r/malefashionadvice

**Yelp (Local authority):**
- Claim the Lustro business listing on Yelp
- The prior reviews from Carlos's earlier work can be noted in the business description
- Yelp citations appear frequently in Perplexity and ChatGPT for local service queries

**Nextdoor:**
- List the business — West Hollywood / Silver Lake / Beverly Hills neighborhoods
- Nextdoor content is indexed by Google and cited in AI Overviews for hyperlocal queries

**First-party data publication:**
Publish one piece of original data that only Lustro can own:
> "What luxury shoe restoration actually costs in Los Angeles — a 2026 market breakdown"
Include: average prices for hand shine, conditioning, resoling, colour correction across LA service providers. Real numbers. Carlos has 37 years of market knowledge — this is genuinely citable.

**Press angle:**
The "by appointment only, one craftsman handles every pair" positioning is a real story for:
- LA Weekly
- Robb Report (luxury lifestyle)
- Grailed / StyleForum (men's leather community)
- LAist

One mention in any of these = ChatGPT citation probability increases substantially.

---

## 90-Day Plan — Engine-Specific Moves

### ChatGPT
**Target queries:**
- "best shoe shine Los Angeles"
- "luxury shoe restoration Los Angeles"
- "shoe care service Los Angeles pickup"

**Moves:**
- Wikipedia/Wikidata stub for Carlos or for Lustro (requires notability — a press mention first)
- Comprehensive leather care guide (long-form, well-cited, structured for extraction)
- Author entity established: Carlos's Instagram + any press mentions as sameAs

### Perplexity
**Target queries:**
- "shoe restoration Los Angeles 2026"
- "how much does shoe restoration cost Los Angeles"

**Moves:**
- Keep the leather care guide fresh — update it monthly (Perplexity weights recency heavily)
- Use `<time datetime="2026-05-10">` tags on all content
- Add `dateModified` to all JSON-LD

### Gemini
**Target queries:**
- "shoe shine near me Los Angeles"
- "luxury shoe care appointment Los Angeles"

**Moves:**
- Google Business Profile is mandatory — Gemini uses GBP data heavily
- Reddit presence (r/losangeles, r/westhollyood community advice)
- Google AI Overviews for local service = GBP + top organic rank + FAQ schema (all three required)

### Claude (Anthropic)
**Target queries:**
- "who does luxury shoe restoration in Los Angeles"
- "how to restore leather shoes"

**Moves:**
- Long-form, primary-sourced leather care guide (Claude weights evidence and citations heavily)
- Named author with credentials
- Methodological transparency ("Carlos has done this for 37 years and here is what he has observed")

### Google AI Overviews
**Target queries:**
- "shoe restoration Los Angeles"
- "leather shoe conditioning service Los Angeles"

**Moves:**
- Win the featured snippet for FAQ questions (FAQ schema + direct answer in first 40 words)
- Must rank top 10 organically first — GEO does not bypass SEO here
- Focus local SEO: GBP + consistent NAP citations + local backlinks (LA-based directories)

---

## Measurement Setup

### Manual baseline (start now, before launch)
Every 2 weeks, run these 5 queries across ChatGPT, Perplexity, Claude, and Gemini. Log: cited Y/N, position, sentiment.

1. "best shoe care Los Angeles"
2. "luxury shoe restoration Los Angeles"
3. "shoe shine appointment Los Angeles"
4. "how much does shoe restoration cost Los Angeles"
5. "how to care for leather dress shoes"

### Citation tracking tools
- **gego** (open source): https://github.com/AI2HU/gego — self-hosted, tracks citations across all four engines
- **llmopt** (open source): https://github.com/jonradoff/llmopt — richer scoring + MCP integration

### Content KPIs per page
- GEO Score (re-audit every 60 days)
- Position in AI answer (1st sentence / 1st paragraph / body / not cited)
- Organic traffic (Google Search Console after indexing)

---

## Summary: Top 5 Actions Right Now

| # | Action | Owner | Effort | Impact |
|---|--------|-------|--------|--------|
| 1 | Add SSR/prerendering to the React build | Dev | Med | Critical |
| 2 | Claim Google Business Profile | Carlos | Low | Critical |
| 3 | Create 1200×630 OG image | Design | Low | High |
| 4 | Fill phone + address in schema | Carlos | Low | High |
| 5 | Post Carlos AMA in r/goodyearwelt | Carlos | Low | High (ChatGPT + Reddit) |

---

## Files Created in This Session

- `/public/robots.txt` — AI crawlers explicitly allowed
- `/public/sitemap.xml` — ready for Google Search Console submission
- `/public/llms.txt` — content map for AI engines
- `index.html` — FAQPage schema, Person schema for Carlos, og:url tag
- `~/.claude/skills/seo/output/lustro.studio-audit.json` — machine-readable audit
