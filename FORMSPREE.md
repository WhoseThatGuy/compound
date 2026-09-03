# Formspree — forms, routing and auto-responder copy

Three forms, three inboxes. Routing lives in `js/main.js` (`FORMSPREE_*`
constants, chosen by `kind` in the submit handler).

| Page | Form ID | Auto-responder |
|---|---|---|
| `/free-7-day-pass` | `xaeyjpoa` | **live** — accurate, two small suggestions below |
| `/contact` | `xrpgkyqk` | none — optional, see below |
| `/personal-trainers` | `mvkorwrk` | **live** — copy below is what it was built from |

Formspree settings do not travel when a form ID changes, and all three IDs were
replaced in September 2026. Both responders have since been rebuilt on the new
forms.

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

## Personal Training — form `mvkorwrk` — LIVE

**Fields submitted:** `fname` `lname` `name` `email` `phone` `message`
`trainer` `membership` `interest` `page`

Note `{{ fname }}` is known not to render. Use `{{ name }}` — see the free-pass
section below for why.

### Subject

```
Your free PT session at Compound
```

### Message

```
Hi {{ name }},

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

### The one thing that was left blank

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

**Reply-to is already set to `hello@compoundgym.nz` on all three forms**, so the
`noreply@formspreemail.com` in the From line is cosmetic — replies do reach a
real inbox. Nothing to do.

**"Hey there," rather than a first name — because `{{ fname }}` does not work.**
Compound has tried it and it renders nothing. "Hey there" is the working
fallback, not an oversight.

A likely cause, now addressed in the code: the forms collect `fname` and
`lname` separately because that is nicer to fill in, and **nothing was sending a
plain `name`** — which is the conventional field these templates key off. The
submit handler now adds one:

    name: "Rhys Taylor"     alongside fname / lname

So **`{{ name }}` is worth trying** where `{{ fname }}` failed. It also makes
the notification email show a readable name instead of two separate lines.

If `{{ name }}` fails too, the next thing to check is whether Formspree's
auto-responder templating works at all with **JSON submissions** — these forms
post `Content-Type: application/json` rather than form-encoded, and that is the
kind of difference that quietly disables field substitution. Only Formspree's
own docs or support can settle that; do not spend an afternoon guessing.

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

- **Notification recipient** — where the submission itself lands. Reply-to is
  confirmed as `hello@compoundgym.nz` on all three.
- **Spam filtering.** None of the forms has a honeypot or captcha of its own,
  so Formspree's filtering is the only thing between you and junk.
- **No-JS fallback — DONE.** Each form now carries
  `action="https://formspree.io/f/<its own id>" method="POST"`. With JS running
  the handler calls `preventDefault()` and posts via fetch, so this never fires;
  verified that submitting still shows the inline panel and does not navigate.
  Without JS the browser posts natively and the lead is captured, at the cost of
  landing on Formspree's own thank-you page instead of the panel.

  Two fields are JS-built and so are **absent from a native fallback post**:
  `page` and `name`. Everything the form actually collects is carried, because
  every field has a `name` attribute.

- **Honeypot — skipped deliberately.** Formspree's own filtering is the only
  spam protection. Add `_gotcha` if junk starts arriving; until then it solves a
  problem that may not exist.

---

## The single point of failure, and the decision about it

**Every lead on this site passes through Formspree.** All three forms post to
it, the Google Sheet and the Slack message are both downstream of it, and the
no-JS fallback posts there too. Nothing is written to storage Compound
controls.

So if Formspree has an outage, silently drops a submission, or the account
lapses over an expired card, **a lead disappears with no record anywhere** —
and nobody would know, because the failure mode is an absence and nothing
alerts on one.

**This was reviewed in September 2026 and accepted.** At current volume the
risk is small and rebuilding lead capture onto owned infrastructure would cost
more than it saves. Two mitigations make it cheap to live with:

**Watch for silence.** Once a week, compare the row count in the leads Sheet
against the `Free_7_Day_Pass` event count in GA4 for the same period. They
should track. A divergence is the only signal this failure produces.

**Keep the Formspree notification address off `@compoundgym.nz`.** If alerts
only go to an address on the domain, one Google Workspace problem takes the
leads and the warning about the leads at the same time. A second recipient on
a different domain costs nothing.

**Keep the billing card current.** The most likely cause of a total outage here
is not Formspree failing; it is a payment failing.
