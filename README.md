# Compound Gym Website

Live site for reference: https://www.compoundgym.nz

Multi-page static site, refactored from a single-file HTML prototype (see `HANDOFF-README-original.md` for the original context doc). Structure:

```
/compound-gym/
  index.html          Home — hero, facility gallery, links to every other page
  memberships.html    Pricing / membership tiers
  sauna.html           Infrared sauna / recovery
  coaches.html         Coaching team
  free-pass.html       Free 7-day pass funnel (good paid-ads landing page)
  athletes.html        Athlete endorsers + Google reviews
  contact.html          Contact info + enquiry form (Calendly + Zapier live here)
  css/styles.css        Shared styles
  js/main.js            Shared JS — nav toggle everywhere, Calendly/contact-form
                         logic runs only on pages that have those elements
  images/*.webp         Photos (originals extracted from base64 + client-supplied)
  robots.txt, sitemap.xml
  README.md             (this file)
```

Each page has its own `<title>`, meta description, canonical URL, and Open Graph tags targeting a specific search intent (e.g. memberships.html targets "gym membership Dunedin"). The homepage carries `ExerciseGym` JSON-LD schema. Header/nav and footer are duplicated across pages (no build step / templating) — **if you edit the nav or footer, update it in all 7 files.**

No build step — serve the folder statically (e.g. `npx serve .`) and deploy as-is to Netlify/Vercel. Note: on hosts with automatic clean-URL redirects (Vercel does this by default for static sites), internal links using the `.html` extension will get a redirect hop to the extensionless URL — harmless, but if you want to avoid it, drop the `.html` from the internal `href`s.

## Brand facts

- Compound Gym, Dunedin, New Zealand — 24/7 strength/athlete-focused gym
- Gate J, Level 2A, Forsyth Barr Stadium, 130 Anzac Avenue, Dunedin
- Staffed Mon–Fri 6am–7pm (24/7 key-tag access otherwise)
- WhatsApp +64 27 341 1609 · hello@compoundgym.nz
- Facebook: CompoundGymNz · Instagram: @compoundgymnz · YouTube: @compoundgymnz
- Colors: Navy `#222D3F` · Olive `#998651` · Beige `#EEE5CD` · Dusky Blue `#9CA6B5` · Black `#000000`
- Fonts: Reem Kufi (headings, real), Montserrat (body/eyebrows — placeholder for licensed Gotham Book/Medium)

## Open items

> **Copy and content gaps live in [`OUTSTANDING.md`](OUTSTANDING.md)** — athlete
> quotes, missing photos, the sauna page's missing numbers, and what still needs
> verifying on production. The list below is the older technical/asset backlog.

1. **Logo — RESOLVED (Sept 2026).** Compound supplied clean vectors, now in `images/`: `logo-mark.svg` (the mark), `logo-lockup.svg` (mark + wordmark, the Primary logo) and `logo-lockup-white.svg`. The nav and footer carry the real Primary lockup inline with `fill="currentColor"`, so it takes the beige from CSS; `favicon.svg` is built from the real mark. The hand-built recreation is gone from every page.

   For the record, the trace was wrong in three ways: the bottom-right quadrant is square in the real mark but was rounded, the top-right radius was far too small, and every quadrant's *inner* corner is rounded in the real mark but was cut square. `logo-lockup-white.svg` is unused today — kept because it is the brand asset for light backgrounds.
2. **Gotham font** — if a licensed file becomes available, swap in for Montserrat.
3. **Unused source photos** — a few extra facility/action shots (`images/facility-cable-machine.webp`, `facility-leg-press.webp`, `facility-turf-2.webp`, `facility-turf-closeup.webp`, `facility-platforms-2.webp`, `action-sinead.webp`) were processed but not placed on the site yet — available if a page needs more imagery. Raw originals are in `incoming-photos/`.
4. **Fresh coach re-shoots sitting unprocessed** — `incoming-photos/Ben Thompson.webp`, `James.webp`, `Josh Drydon.webp`, `Josh Skyrbra.webp` (13–15MB each, full-resolution originals) look like a newer photo batch for coaches who already have optimized headshots live on `coaches.html`. Not yet compared against the current live photos or processed — check whether the client wants these swapped in before doing anything with them. `Team Photo.webp` (8.5MB) is also unplaced — no page currently designed for a group shot.
5. **Unverified name on Rebekah Aitkenhead's photo** — the source (`incoming-photos/Rebekah.jpg`) shows a race bib reading "Rebekah Greene," not Aitkenhead. Client supplied the file under the filename "Rebekah" with no correction when this was flagged, so it's live as Rebekah Aitkenhead — but double-check with the client if this ever comes up, given two athlete photos were mislabeled once before on this same page.

**Resolved recently:** Calendly URL is live (`js/main.js` → `CALENDLY_URL`, points at the real key-pickup booking link). Contact/free-pass forms now post to Formspree (`https://formspree.io/f/xqpzyrpq`) instead of the dead Zapier `no-cors` call, with real success/failure feedback. Katie Pugh removed from `coaches.html` (no longer with Compound); Sammy Burke's placeholder replaced with a real photo (`images/coach-sammy-burke.webp`, downsized from the 13.8MB `incoming-photos/Sammy.webp` original to 800×533 / ~20KB to match the other coach photos). All 3 remaining athlete photo gaps closed — Oli Chignell, Rebekah Aitkenhead, and Ella Rowe now have real photos (`images/trainer-*.webp`) on both `athletes.html` and the homepage trust strip, which previously showed initials-only for all 5 athletes despite photos existing for 2 of them (`.athlete-avatar` had no image support — added). Nav bug fixed: `.nav-links`/`.nav-cta` content didn't actually fit within the site's own 1180px desktop breakpoint, causing text to wrap onto two lines instead of collapsing to the mobile hamburger menu; tightened nav gap, added `white-space:nowrap`, and raised the mobile breakpoint from 880px to 1120px to give it margin.

## Content notes

- No fabricated pricing or facts — copy sticks to confirmed data or generic phrasing.
- Sauna health claims deliberately softened ("many members find" / "may support" rather than the live site's stronger claims) — keep that framing if extending this section.
- Double-check name-to-photo mapping before adding new athlete photos — two client-provided photos were previously mislabeled.
- Don't trust Brandfetch.com for this business — it previously returned an unrelated, differently-branded "Compound Gym".

## Membership pricing (verify still current before going live)

| Tier | Annual | Flexi |
|---|---|---|
| Free 7-Day Pass | $0 | — |
| Off Peak (9am–3pm / 9pm–3am) | $16.95/wk | $19.95/wk |
| Standard (flagship, full 24/7) | $22.95/wk | $27.95/wk |
| Youth (U23) | $20.95/wk | $24.95/wk |
| First Responders | $20.95/wk | $24.95/wk |

All tiers: no joining fees, free training programme + 2 PT sessions, free parking & Wi-Fi. 10% off if pre-paid in full.
