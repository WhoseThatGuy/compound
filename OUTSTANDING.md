# Outstanding — copy & content

Gaps left after the copy rework (Aug 2026). Grouped by what unblocks them.
See `README.md` → Open items for older technical/asset items (logo, fonts, raw photos).

---

## Recently closed

### 0. Formspree autoresponder — RESOLVED

The "No card needed, nothing to sign — after your 7 days, you decide" claim is
gone from the confirmation email, so it no longer contradicts `a76e5ef` and
`aae263a` or the no-billing-talk rule.

Worth one glance at the next test email to confirm the `{{ fname }}` merge tag
now renders a name rather than the literal placeholder.

### 16. Josh Skryba — RESOLVED

Confirmed **Skryba**. That is already what all five references use, across
`personal-trainers.html` and `personal-training-consult.html`. No change needed.

Loose end: `incoming-photos/` still has files under both spellings. Rename before
any of them get wired into a page.

---

## Blocked on someone else

Nothing here can be finished at a keyboard.

### 1. Five athletes, none of them speak
`index.html` (trust strip) · `athletes.html`

Oli Chignell, Rebekah Aitkenhead, Daniel Torr, Ella Rowe and Seb Ferro appear
with a name, a photo and a job title. Not one of them says a word.

This is the largest unused proof asset on the site. One sentence each on *what
they actually use* — "the turf's the only place in Dunedin I can do sled work in
July" — would outperform the entire equipment page for credibility.

Fallback if quotes can't be obtained: one line per athlete on what they train
here *for*. "Strength blocks between racing seasons" is sourceable without an
interview.

### 2. Photos for Billie Allan and Connor Bond
`index.html` (athlete strip)

Both are on the homepage strip as **initials on the gradient** — the fallback
this strip used before the other five were shot. Neither is on `athletes.html`
at all, because those cards use `.trainer-photo` which expects a real image and
would render a broken one.

When photos arrive it's a one-line swap per athlete on the homepage, plus adding
them to `athletes.html`.

**Also:** the strip wraps 4+3 at desktop with seven. One more athlete gives even
rows.

### 3. Culture-review pool — RESOLVED (`eae46dd`)

Seven new reviews placed. The Julia Morera / James X duplication across
`index.html` and `free-7-day-pass.html` is gone.

**Still owed:** those quotes were researched, not copied from the live Google
listing. Verify each against its original review before launch — misquoting a
named customer is Fair Trading Act exposure.

### 4. Sauna page — RESOLVED

Rebuilt to the review brief as a **second front door**, not just a membership
perk. Someone searching "infrared sauna Dunedin" now lands on unlimited sauna →
$16.95/week → and the whole gym comes with it.

**All the missing facts were supplied by Compound and are now on the page:**

- Booking is required. Members book in the Compound app; non-members are booked
  in by staff.
- **Staffed hours only** (Mon–Fri 6am–7pm), not 24/7.
- **Two saunas** — one in the women's changing room, one in the men's.
- Two people per sauna.
- 45-minute sessions.
- **One-off sessions are free.** Promoted from a grey footnote to its own
  section with its own CTA.

The FAQ went from 3 questions to 8, all operationally confirmed, all mirrored in
FAQPage structured data.

**Settled: it is two saunas, not one.** An earlier note in this file said a
single sauna. Plural was already correct across the rest of the site. `gym.html`
said "An infrared sauna, included" and now says two.

**Fixed as a consequence:** twelve sentences across five pages folded the sauna
into the gym's 24/7 claim — "full 24/7 access to the gym and saunas", "seven
days, any hour, sauna included". With the sauna on staffed hours and requiring a
booking, those were promises a free-pass holder would have found false on day
one. The two claims are now detached everywhere: the gym is 24/7, the sauna is
included.

**Still owed:** both sauna photos show an empty sauna. The review asked for one
of a member actually using it — natural, not staged spa photography.

### 5. Photo of Gate J
`contact.html`

The contact page now has a map and written directions. A photo of the actual
Gate J entrance would do more than either — it's the thing a first-timer is
looking for from the car park. Nothing in `images/` matches.

---

## Needs verifying on production

Couldn't be tested locally.

### GA4 — configured, awaiting a live booking

Done pre-launch:
- Key events verified. `Free_7_Day_Pass` matches on `page_path contains
  free-7-day-pass-confirmation`, which the virtual pageview in `js/main.js`
  satisfies. Conversion history stays comparable across cutover.
- `invitee_meeting_scheduled` (Calendly’s own) already covers every booking
  including key-pickup. Nothing needed creating.
- Cross-domain measurement set to `compoundgym.nz` + `calendly.com`.
- Deleted the dead `Gym_Tour_Booked` and `test_event_test` custom events.

Deliberately NOT done:
- `calendly_booked` left unstarred. Starring it alongside
  `invitee_meeting_scheduled` would double-count every booking. It stays a plain
  event — it carries `page_path`, which Calendly’s event does not, so it is
  the only way to tell a pass-page booking from a PT-consult one.

**Open risk:** under Squarespace, bookings were a full navigation to calendly.com.
They now happen in an iframe. Calendly’s GA integration should still fire from
inside it, but that is unproven. On the first live booking, check Realtime:
`invitee_meeting_scheduled` present → done. Absent → the iframe broke it, and
`calendly_booked` becomes the key event instead.

### 6. The 301 from `/personal-training-consult`
`vercel.json`

Redirects to `/personal-trainers#request`. Vercel redirects don't run under
local `npx serve`, so this only proves out once deployed. Worth one click.

### 7. Calendly inline booking, end to end
`js/main.js` → `mountCalendly()`

The widget mounts, prefills name/email through the JS API, and falls back to a
plain link if blocked. What's never been done is an **actual booking** — that
would put a real appointment in the Calendly.

Worth doing once: submit the free-pass form, pick a slot, confirm the
`calendly_booked` event lands in GA4 realtime.

### 8. Contact deep-link `?interest=` — RESOLVED locally

`/contact?interest=Sauna` was tested end to end in the local preview and works:
the dropdown preselects "Sauna", the redirect panel stays hidden (correct — no
route is defined for Sauna, so the message field is the right destination) and
the message field shows.

The earlier note here said the local preview strips query strings. It does not.

Two buttons rely on this: sponsorship on `/about-us`, and **Book A Sauna
Session** on `/dunedin-gym-sauna`. Still worth one click on production.

---

## Copy still to do

Small, no dependencies.

### 9. No route to the Free 7-Day Pass from the nav
`partials/nav.html`

The "Free Pass" text link was removed (it duplicated the gold CTA), and then the
gold CTA was removed too (`8a27c5f`). Between them the navigation now has no
path to the pass at all — only in-page CTAs and the footer.

Deliberate on both counts, but worth a second look as a combined effect.

### 10. Membership join buttons leave the site unannounced
`gym-memberships.html`

"Join Off Peak" / "Join Standard" jump straight to an external GymMaster portal.
No warning, no context. Suggested micro-copy under each:

> Takes about three minutes on our member portal. No joining fee, no sign-up call.

### 11. Off Peak's 9pm–3am window is unexplained
`gym-memberships.html`

Reads like a typo. If it's real, say why — e.g. "the two windows when there's
always a platform free."

### 12. Confirm the equipment list — mostly RESOLVED
`gym.html`

**Zone 1 — confirmed by Compound.** Treadmills, Concept2 erg bikes, kettlebells,
dumbbells, swiss balls, medicine balls, resistance bands, foam rollers and
trigger-point balls. Now on the page, plus a new **Warm-up & Mobility** column in
the equipment directory.

**Rowers — confirmed by Compound.** Concept2. Named in the equipment directory,
the Zone 5 description and the HYROX answer. This was the brand the review
called out as worth real search traffic.

**Racks — confirmed by Compound.** Nine platforms, never all nine in use at
once. That is the whole claim the FAQ makes now.

**Retracted:** an earlier draft of this FAQ said "it gets busier between about
4pm and 7pm." Nobody at Compound said that and nothing on the site supports it.
It was invented, and it had reached the FAQ structured data, where Google would
have read it as fact. Removed in `c28c578`. Do not reintroduce a busy-time
window without someone at the gym stating one.

Also retracted: the claim that Concept2's air bike and erg bike are the same
machine. They are two different products, so the air bikes and the Zone 1 erg
bikes are not a double-count.

**Still owed:**

- **Air bike brand.** Zone 1's erg bikes are Concept2; the Conditioning air
  bikes are still listed with no brand because none was given.
- **Zone 4 specifics.** Listed as kettlebells and functional equipment. Anything
  else?
- **Machine names.** "Selectorised" and "plate-loaded" are categories, not
  models.

### 12b. Gallery — Compound is handling it
`gym.html`

The review asked for fewer duplicate angles and more people mid-lift. Compound
said they'll improve the photos. Nothing to do at a keyboard until they land.

### 13. "Purpose-built for training — not converted into it" is still on About
`about-us.html` (~line 117)

Cut from the homepage hero for being unpicturable — *converted from what?* — and
because it may not survive the fact that this is Level 2A of a stadium that
opened in 2011. The About page still runs it.

---

## Facts to confirm

### 14. Free first PT session
`personal-trainers.html`

Now published as the page's primary offer. **The trainers need briefing**, and
someone needs to own enquiry → match → booking before this gets traffic.

The form captures an "Already a member?" flag so the team can tell a new
client's free session from a member's two included ones.

### 15. About page date vs brand date
`about-us.html`

Footer says **Est. 2023** (the Compound brand). About says *"In 2024 we stopped
trying to be [an everybody's gym]"* and *"Thirty years in Dunedin"* (the gym).

Both the '90s and 2023 are correct and refer to different things — confirmed.
But the brand launching in 2023 and the repositioning being described as 2024 is
a one-year gap worth resolving.

### 17. Ten raw JPGs sitting untracked
`images/`

`Daniel Torr.jpg`, `Dumbbell Area 1.jpg`, `Dumbbell Area 2.jpg`, `IMG_4251.jpg`,
`IMG_5392.jpg`, `IMG_9422.jpg`, `IMG_9425.jpg`, `IMG_9426 (1).jpg`,
`IMG_9426.jpg`, `Upper Area 1.jpg`.

Untracked and unoptimised — the rest of `images/` is `.webp` with `-400`/`-600`
srcset variants. Needs converting before use.
