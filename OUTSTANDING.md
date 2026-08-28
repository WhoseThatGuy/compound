# Outstanding — copy & content

Gaps left after the copy rework (Aug 2026). Grouped by what unblocks them.
See `README.md` → Open items for older technical/asset items (logo, fonts, raw photos).

---

## Urgent — live and wrong

### 0. The Formspree autoresponder contradicts the site
Formspree dashboard · no repo change needed

The free-pass confirmation email still says:

> No card needed, nothing to sign — after your 7 days, you decide.

That claim was cut from the site in `a76e5ef` ("Fix **false** auto-signup/
no-obligation claims") and `aae263a`. The site now carries no card, signing or
trial-conversion language anywhere. The email undoes both commits, in writing,
to every person who claims a pass.

Replace with: **"Bring your training gear. That’s all you need."**

Also on that email:
- `{{ fname }}` renders literally. Try `{{fname}}` without spaces, or confirm the
  autoresponse is built in Formspree’s template editor rather than pasted HTML.
  If it will not resolve, cut it — "Hey there," beats a visible broken merge tag.
- Sender is `noreply@formspreemail.com` and Gmail flags it **External**. A
  `compoundgym.nz` sender needs a paid tier and a DNS record. Deliverability
  risk on the one email carrying the booking link and the address.

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

### 4. Sauna page has no numbers
`dunedin-gym-sauna.html`

Not one figure on the entire page. How many saunas? How hot? How long is a
session? Do you book, or walk in?

"Included, not upsold" is one of the sharpest lines on the site and nothing on
the page lets a reader picture what's included. This is the least specific page
on a site whose equipment page names the bar manufacturer.

Needs: sauna count, walk distance from the floor, booking policy.

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

### 8. Contact deep-link `?interest=`
`js/main.js`

`/contact?interest=Sponsorship%20request` should preselect the dropdown. The
local preview strips query strings, so the matching logic was tested directly
(exact, case-insensitive and whitespace-tolerant all resolve) but the
end-to-end path is unproven. The sponsorship button on `/about-us` uses it.

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

### 12. Confirm the equipment list — RESOLVED in part
`gym.html`

Zone 1 now names treadmills and warm-up/mobility equipment, and there's a full
equipment directory under **What's in the gym**.

**Still owed:** every item in that directory was taken from claims already made
elsewhere on the site — nothing was inferred from photographs. But the review
asked for the real list from Compound, and these are still missing:

- **Brand names.** Only Eleiko and Industrial Athletic are confirmed. The review
  suggested Concept2 rowers and Assault bikes; those are *not* on the page
  because nothing confirms them. If they're right, name them — they're worth
  real search traffic.
- **Zone 1 specifics.** "Treadmills and equipment for warming up and mobility"
  came from the review, not from Compound. What's actually in there?
- **Zone 4 specifics.** Listed as kettlebells and functional equipment. Anything
  else?
- **Machine names.** "Selectorised" and "plate-loaded" are categories, not
  models.
- **Peak-times answer.** The FAQ says it gets busier 4–7pm and you can *usually*
  get a platform. Deliberately not an absolute promise — confirm it's accurate.

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

### 16. Josh Skryba / Skyrba
`personal-trainers.html`

Site uses **Skryba**. The PT brief spelled it **Skyrba**. `incoming-photos/` has
both spellings on different files. Confirm with him.

### 17. Ten raw JPGs sitting untracked
`images/`

`Daniel Torr.jpg`, `Dumbbell Area 1.jpg`, `Dumbbell Area 2.jpg`, `IMG_4251.jpg`,
`IMG_5392.jpg`, `IMG_9422.jpg`, `IMG_9425.jpg`, `IMG_9426 (1).jpg`,
`IMG_9426.jpg`, `Upper Area 1.jpg`.

Untracked and unoptimised — the rest of `images/` is `.webp` with `-400`/`-600`
srcset variants. Needs converting before use.
