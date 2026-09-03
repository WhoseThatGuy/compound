# Formspree — forms, routing and auto-responder copy

Three forms, three inboxes. Routing lives in `js/main.js` (`FORMSPREE_*`
constants, chosen by `kind` in the submit handler).

| Page | Form ID | Auto-responder |
|---|---|---|
| `/free-7-day-pass` | `xaeyjpoa` | **needs recreating** — see below |
| `/contact` | `xrpgkyqk` | none — optional, see below |
| `/personal-trainers` | `mvkorwrk` | **copy below, ready to paste** |

Formspree settings do not travel when a form ID changes. All three IDs were
replaced in September 2026, so every auto-responder has to be set up again on
the new form.

---

## Rules any of these emails must follow

These are the same rules the site copy follows, and they matter more in an
email because it arrives unprompted.

1. **Never mention cards, billing, contracts, or a trial turning into a
   membership — not even to deny them.** "No card needed" and "nothing to
   cancel" are both breaches. A previous version of the free-pass responder had
   exactly that copy and it was removed. A form set up from a Formspree
   template is the most likely place for it to come back.
2. **Don't raise a worry in order to dismiss it.** No "don't be nervous", no
   "everyone starts somewhere", no "nobody's watching".
3. **Say what happens next, concretely.** That is the entire job of the email.
4. **Plain New Zealand register.** No exclamation marks, no aphorisms, no
   "we're thrilled". Short sentences.
5. **"free PT session"** — never "your first session is free". The site
   deliberately states the offer as an action rather than a rule, because
   members get two included sessions and the two phrasings were being read as
   the same thing.

---

## Personal Training — form `mvkorwrk`

**Available merge tags** (from the form fields):
`{{ fname }}` `{{ lname }}` `{{ email }}` `{{ phone }}` `{{ message }}`
`{{ trainer }}` `{{ membership }}`

### Subject

```
Your free PT session at Compound
```

### Message

```
Hi {{ fname }},

Thanks for the request — it's come through.

We'll match you with a trainer based on what you're training for and when
you can train, then come back to you to sort a time.

What you told us you're training for:
{{ message }}

Trainer you asked for: {{ trainer }}

Your free session is a chance to meet your trainer, talk through your
training and get started together. If you want to keep training together
after that, you book future sessions directly with them — each trainer sets
their own rates and availability.

If you'd rather talk it through first, WhatsApp us on +64 27 341 1609 or
just reply to this email.

See you on the floor,

Compound
Gate J, Level 2A, Forsyth Barr Stadium
130 Anzac Avenue, Dunedin
compoundgym.nz
```

### One thing to add before you turn it on

**A timeframe.** "We'll come back to you" is the weakest line in the email —
it is the one thing the reader actually wants to know and it currently says
nothing. Replace it with whatever is honestly true:

> We'll come back to you within one working day to sort a time.

Only promise what the team will actually hit. A missed promise here is worse
than no promise, because this email is the first thing a new client ever
receives from Compound.

---

## Free 7-Day Pass — form `xaeyjpoa`

**Needs recreating.** The onboarding responder lived on the old form ID and did
not move. This one matters most: someone claims a pass and expects to hear
something.

Check against rule 1 above especially — the old version of this email said
*"No card needed, nothing to sign — after your 7 days, you decide"* and that
was removed for breaching it.

Merge tags: `{{ fname }}` `{{ lname }}` `{{ email }}` `{{ phone }}`

---

## Contact — form `xrpgkyqk`

No auto-responder, and it is the least necessary of the three — a general
enquiry gets a human reply. Worth adding only if replies sometimes take more
than a day, in which case a two-line acknowledgement stops people wondering
whether the form worked.

Merge tags: `{{ fname }}` `{{ lname }}` `{{ email }}` `{{ phone }}`
`{{ interest }}` `{{ message }}`

---

## Also worth checking on all three

- **Notification recipient** — where the submission itself lands.
- **Spam filtering.** None of the forms has a honeypot or captcha of its own,
  so Formspree's filtering is the only thing between you and junk.
- **No-JS fallback.** The forms have no `action` attribute; submission is
  entirely JavaScript. If a visitor's JS fails, the form silently does nothing
  and the lead is lost without trace. Adding
  `action="https://formspree.io/f/<id>" method="POST"` to each `<form>` would
  make it degrade gracefully.
