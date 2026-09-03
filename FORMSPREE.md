# Formspree — forms, routing and auto-responder copy

Three forms, three inboxes. Routing lives in `js/main.js` (`FORMSPREE_*`
constants, chosen by `kind` in the submit handler).

| Page | Form ID | Auto-responder |
|---|---|---|
| `/free-7-day-pass` | `xaeyjpoa` | **live** — accurate, two small suggestions below |
| `/contact` | `xrpgkyqk` | none — optional, see below |
| `/personal-trainers` | `mvkorwrk` | **not set up** — copy below, ready to paste |

Formspree settings do not travel when a form ID changes, and all three IDs were
replaced in September 2026. The free-pass responder has been rebuilt on the new
form; the PT one has not.

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

## Free 7-Day Pass — form `xaeyjpoa` — LIVE

Set up and sending. Subject: *"You're in — here's how to start your free 7 days
at Compound"*. Body covers the key-tag step, the Calendly link, the walk-in
alternative, the address, free parking, and "Bring your training gear. That's
all you need."

**Checked against the site and it is accurate**: Calendly URL matches
`CALENDLY_URL` exactly, staffed hours match the footer, address matches, "about
five minutes" matches the page. It also passes every rule above — no mention of
cards, billing or what happens after seven days.

Two improvements worth making:

1. **It opens "Hey there," rather than using `{{ fname }}`.** The form collects
   the first name. `Hi {{ fname }},` is warmer, sits better in the register than
   "Hey there", and settles the long-standing question of whether the merge tag
   renders properly — which "Hey there" sidesteps rather than answers.
2. **Sender is `noreply@formspreemail.com`.** The email invites questions and
   routes them to WhatsApp, which mostly covers it, but replies go nowhere. If
   the plan allows a custom reply-to, point it at `hello@compoundgym.nz`.

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
