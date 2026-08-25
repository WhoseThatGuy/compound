# Outstanding — copy & content

Gaps left after the copy rework (Aug 2026). Grouped by what unblocks them.
See `README.md` → Open items for older technical/asset items (logo, fonts, raw photos).

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

### 3. The culture-review pool is exhausted
`index.html` · `free-7-day-pass.html`

Both pages now lead with reviews about the people and the atmosphere rather than
the equipment, which is right — but there are only about six such reviews
published anywhere on the site, and both pages want the best of them.

Current overlap: **Julia Morera appears on both pages**, and **James X** is a
card on the homepage and the featured quote on the free-pass page.

Pulling four or five more from Google — people talking about the atmosphere,
feeling welcome, being motivated, or training hard — fixes both pages at once.
Use people's actual words; don't reword them to fit.

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

### 12. Zone 1 lists no equipment
`gym-equipment.html`

"Get moving before you load the bar" sits among four zones full of specifics and
looks like a gap. Name what's in it, or fold it into Zone 5.

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
