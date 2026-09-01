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

Confirmed **Skryba**. That is what every reference on `personal-trainers.html`
uses. No change needed.

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

**The Athletes page is now built to receive this.** The review wants each card
to grow a `Meet <name> →` link to its own story page — sport, what they're
training for, how they train, why here, photography, video. The cards were
deliberately left thin (name, achievement, sport) so that link is a one-line
addition rather than a rebuild. Nothing is linked yet because no story pages
exist; don't add the links until they do.

Breadth over accolades is the goal when adding athletes: running, hockey,
CrossFit, football, rugby, weightlifting, HYROX, motocross, sprinting. Five
athletes across five sports today. The point is that Compound reads as a gym
for athletes rather than a gym known for one sport.

### 1b. The review pool is thin, and the real one is not
`athletes.html` · site-wide

Fourteen review quotes are placed across the site and **not one is a duplicate**
— but that is now the constraint rather than an achievement. The Athletes page
asked for a quote about atmosphere and culture, and the best available was Manu
McCallum's "Super good vibe!", which spends its first sentence on squat racks.

There are **230+ real Google reviews** and only fourteen have been mined. There
is almost certainly a better culture quote sitting in the live listing. Worth
an hour reading them, especially for anything about other members, the training
environment, or people training seriously.

Ties into item 3: the placed quotes were researched rather than copied from the
live listing, and still need verifying against their originals before launch.

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

**Confirmed by Compound:** "unlimited" is accurate — all members get unlimited
sauna access. Booking, staffed hours and the 45-minute slot are the shape of it,
not a cap on it, and they are all stated on the page. The word stays.

**Parked by Compound:** both sauna photos show an empty sauna, and the review
asked for one of a member actually using it. Fine as-is for now — pick this up
only if the photos get reshot anyway.

**Noted, no action:** sauna access ends at 7pm on weekdays and is unavailable at
weekends, which is a real limit on using this page as a front door for people
who want a sauna after work or on a Saturday. That is an operations question,
not a copy one. The page states the hours plainly and does not work around them.

### 4c. Two gym photos are now unused site-wide

Trimming The Gym page from ten photos to six left `facility-cable-machine`
and `facility-dumbbells-2` referenced by no page at all. They were dropped as
duplicates of shots the hero already carries.

Left in `images/` rather than deleted — they are fine photos and cost nothing
sitting there. Delete only if the folder is being tidied deliberately.

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

**Now load-bearing.** `personal-training-consult.html` has been deleted, so this
redirect is the only thing standing between an old inbound link — or a
Google-indexed URL — and a 404. Do not remove it.

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

### 9. Nav route to the Free 7-Day Pass — RESOLVED

The gold CTA is back in the header on all nine pages, and the floating pill
in the bottom-right corner is gone. Between them the site went from two
persistent CTAs, to none, to one.

The pill was removed completely — markup from the footer partial, 
rules from the CSS, and the JS that retired it after a claim. The nav CTA
inherits that last behaviour: on  it removes itself once the
form is submitted, because it points at  and that form no longer
exists on a page confirming the pass is claimed.

It reads "Free 7-Day Pass", collapsing to "Free Pass" under 520px. Kept that
wording rather than "Claim" so it matches the one offer name used everywhere
else on the site.

### 10. Join buttons — term-specific links DONE
`gym-memberships.html` · `js/main.js`

The Annual/Flexi toggle now repoints each plan's join button at its own
GymMaster signup link, verified in both directions and back again:

| Plan     | Annual     | Flexi      |
|----------|------------|------------|
| Off Peak | a46d9225…  | ed252a4a…  |
| Standard | a8b542b8…  | f01d549b…  |

The static `href` on each button is the **annual** URL, so a visitor with JS
off still lands on the plan the page is displaying.

All four return 200. The two Off Peak pages self-identify as "Off Peak Annual
(Weekly)" and "Off Peak Flexi (Weekly)", matching their labels. Standard-Annual
showed "Annual Weekly"; **Standard-Flexi was confirmed only as a 200** — the
plan name was not read before GymMaster rate-limited the checks. Worth one
human click to confirm it opens the Flexi plan and not the annual one.

Youth & First Responder has no term link by design — it routes to `/contact` for an eligibility check.

**Still open:** both buttons leave for an external portal with no warning.
Suggested micro-copy under each:

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

### 13. "Purpose-built for training — not converted into it" — RESOLVED

Gone. The About page was rebuilt to the review brief and the line went with it,
along with two others the brief called out: "nobody's watching to judge where
you're starting from" (raises being judged in order to deny it) and "We didn't
set out to build a culture" (describes the culture by first disowning it).

Also gone: "we stopped trying to be an everybody's gym", which defined Compound
by what it stopped being.

---

## Facts to confirm

### 14. Free first PT session
`personal-trainers.html`

Now published as the page's primary offer. **The trainers need briefing**, and
someone needs to own enquiry → match → booking before this gets traffic.

The form captures an "Already a member?" flag so the team can tell a new
client's free session from a member's two included ones.

### 15. About page date vs brand date — RESOLVED

**It is 2023.** The review brief said 2024; Compound confirmed 2023, which is
also what the footer's Est. 2023 has always said. Changed in three places on
`about-us.html`: the body copy, the meta description and the og:description.

The gym dates to the early '90s and the Compound brand to 2023. Two different
things, both correct, and the site no longer implies a third date.

**Stats confirmed by Compound** and safe to leave: 30+ years in Dunedin, 635
members, 10k+ Dunedinites through the doors, $12k+ donated locally. Worth a
re-check whenever the About page is next touched, since three of the four only
move upwards.

### 17. Ten raw JPGs sitting untracked
`images/`

`Daniel Torr.jpg`, `Dumbbell Area 1.jpg`, `Dumbbell Area 2.jpg`, `IMG_4251.jpg`,
`IMG_5392.jpg`, `IMG_9422.jpg`, `IMG_9425.jpg`, `IMG_9426 (1).jpg`,
`IMG_9426.jpg`, `Upper Area 1.jpg`.

Untracked and unoptimised — the rest of `images/` is `.webp` with `-400`/`-600`
srcset variants. Needs converting before use.
