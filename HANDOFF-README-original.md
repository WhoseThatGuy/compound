# Compound Gym Website — Handoff to Claude Code

This document has everything needed to pick this project up in Claude Code. Give Claude Code this file plus `compound-gym-website.html` and it should have full context.

---

## What this is

A single self-contained HTML file (`compound-gym-website.html`, ~1MB) for **Compound Gym**, a 24/7 strength gym in Dunedin, NZ. No build step, no framework — vanilla HTML/CSS/JS in one file. All images are embedded as base64 data URIs directly in the file (done deliberately — see "Why one file" below).

**Live site for reference:** https://www.compoundgym.nz

---

## Why it's one file (and whether to change that)

It started as a single file so it would preview correctly in Claude.ai's chat interface (which can't render a page that references a separate `/images` folder) and so it could be dragged straight into Netlify/Vercel with zero setup.

**In Claude Code you're not bound by that constraint.** Worth considering a refactor into a normal project structure:
```
/compound-gym/
  index.html
  /css/styles.css
  /js/main.js
  /images/*.webp (extracted back out of base64)
```
This would make the file much easier to edit and let images be cached separately by the browser instead of bloating every page load. The base64 images can be extracted back to files — they're all standard webp.

---

## Real brand facts (verified from live site + brand guidelines PDF)

**Business:**
- Compound Gym, Dunedin, New Zealand — 24/7 strength/athlete-focused gym
- Located: Gate J, Level 2A, Forsyth Barr Stadium, 130 Anzac Avenue, Dunedin
- Staffed hours: Monday–Friday, 6am–7pm (24/7 key-tag access otherwise)
- WhatsApp: +64 27 341 1609 · Email: hello@compoundgym.nz
- Facebook: CompoundGymNz · Instagram: @compoundgymnz · YouTube: @compoundgymnz
- Google reviews: 4.9★ from 232 reviews (paraphrased on-site, not quoted verbatim — copyright)
- Brand tagline concept: "Est. 2023"

**Brand colors (exact hex, from official brand guidelines PDF):**
| Name | Hex | Use |
|---|---|---|
| Navy | `#222D3F` | Primary background |
| Olive | `#998651` | Primary accent / CTAs |
| Beige | `#EEE5CD` | Light text |
| Dusky Blue | `#9CA6B5` | Secondary/muted text |
| Black | `#000000` | Pure black option |

**Brand fonts (per official guidelines):**
- **Reem Kufi Medium** — main headings (✅ implemented, free on Google Fonts)
- **Reem Kufi Regular** — sub-headings (✅ implemented)
- **Gotham Medium** — mini-headings/eyebrows (⚠️ NOT free — currently substituted with **Montserrat SemiBold**)
- **Gotham Book** — body text (⚠️ NOT free — currently substituted with **Montserrat Regular**)

**→ Open item:** If the client has a licensed Gotham font file, swap it in for a fully accurate match. Until then, Montserrat is the placeholder.

**Logo:**
- The real mark is a "C" shape built from 4 separated quadrant blocks (2 rounded like quarter-circles, 2 square) — per brand guidelines, it symbolically represents "a C for Compound, made up of separate parts, united."
- Currently implemented as a **hand-built SVG recreation** (inline in the HTML, search for `logo-mark`) based on studying the brand guidelines PDF and a photo of it on a staff shirt.
- **Two logo PNG files the client provided (`Tertiary_Black.png`, `Secondary_All_Black.png`) were corrupted/blank** — solid black across the entire canvas, no visible logo data. Need to ask the client to re-export these from their original design file (there's also `The_Compound_Social_Media.ai` — a 35-page Illustrator file with brand assets on early pages, which is where the SVG recreation was sourced from).
- **→ Open item:** Get clean logo PNG/SVG exports to replace the hand-built recreation for pixel-perfect accuracy.

---

## Site structure (current sections, in order)

1. **Nav** — logo, links (About / Memberships / Sauna / Free Pass / Athletes / Contact), "Free 7-Day Pass" CTA button
2. **Hero** (`#hero`, implicit) — real photo background (gym floor), headline, stats (650m² floor, 9 platforms, 24/7)
3. **About/Facilities** (`#about`) — 3 pillars (24/7 access, 9 platforms, 40m turf) + real photo gallery (3 images)
4. **Memberships** (`#pricing`) — 5 real membership tiers with real pricing (see below)
5. **Sauna** (`#sauna`) — recovery/infrared sauna section, softened health-claim language (see note below)
6. **Free Pass** (`#free-pass`) — checklist + real 3-step process (Claim → Key-tag → Train)
7. **Athletes** (`#trainers`) — 5 real named athlete endorsers + Google reviews summary
8. **Contact** (`#contact`) — contact info + enquiry form
9. **Footer** — logo, socials, copyright

## Real membership pricing (confirmed from live site — verify still current before going live)

| Tier | Annual | Flexi |
|---|---|---|
| Free 7-Day Pass | $0 | — |
| Off Peak (9am–3pm / 9pm–3am) | $16.95/wk | $19.95/wk |
| **Standard** (flagship, full 24/7) | $22.95/wk | $27.95/wk |
| Youth (U23) | $20.95/wk | $24.95/wk |
| First Responders | $20.95/wk | $24.95/wk |

All tiers: no joining fees, free training programme + 2 PT sessions, free parking & Wi-Fi. 10% off if pre-paid in full.

## Real athletes featured (with photo status)

| Name | Role | Photo status |
|---|---|---|
| Oli Chignell | World Cross Country Runner | ❌ Placeholder initials — need photo |
| Rebekah Aitkenhead | National Mile Champion | ❌ Placeholder initials — need photo |
| Daniel Torr | NZ Hockey Representative | ✅ Real photo embedded |
| Ella Rowe | International CrossFit Athlete | ❌ Placeholder initials — need photo |
| Seb Ferro | Oceania Games Sprinter | ✅ Real photo embedded |

**→ Open item:** get photos for the 3 remaining athletes and embed them the same way (base64, `object-fit: cover`, matching the Daniel/Seb pattern in the `.trainer-photo` divs).

---

## Integration placeholders that need real values

Search the file for these — both currently have dummy/placeholder values:

1. **Calendly booking link** — variable `CALENDLY_URL` in the `<script>` block. Needs the client's real Calendly scheduling URL.
2. **Zapier webhook** — variable `ZAPIER_WEBHOOK_URL` in the `<script>` block. Needs a real Zapier "Catch Hook" webhook URL so the contact form actually sends data somewhere. Currently the form just fails silently (shows an error message) since the URL is a placeholder.

Both are wired up and ready — the form already POSTs to the Zapier URL with `mode: "no-cors"`, and Calendly opens in a new tab. Just need real URLs.

---

## Content decisions worth knowing about

- **No fabricated pricing or facts.** Everywhere real data wasn't available (e.g. exact founding story details), the copy either uses only confirmed facts or is phrased generically rather than inventing specifics.
- **Sauna health claims were deliberately softened.** The real site's sauna page makes fairly confident claims ("boosts immunity," "burns calories") that overstate the actual evidence for infrared sauna use. Our version uses "many members find" / "may support" phrasing instead. If continuing this content, keep that softer framing — don't revert to the stronger claims.
- **Athlete photos are only used where identity is confirmed.** Two uploaded photos were initially mislabeled by the client as different people than the filenames/on-image text indicated — always double-check name-to-photo mapping before adding new athlete photos.
- **Brandfetch.com data was checked and rejected** — it returned a completely different, unrelated "Compound Gym" (1993 founding, different colors). Don't trust automated brand-lookup tools for this business without verifying against the actual client-provided brand guidelines PDF.

---

## Hosting notes

Currently designed for zero-config static hosting:
1. Rename `compound-gym-website.html` → `index.html`
2. Drag into Netlify or Vercel
3. Done — no build step needed

If refactored into a multi-file project in Claude Code, the same hosting approach works, just drag the whole folder instead of one file.
