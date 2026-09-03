# Cutover — Squarespace to Vercel

How to point `compoundgym.nz` at this repo without breaking email.

Canonical hostname is **`compoundgym.nz`** (apex, no www). Decided Sept 2026.
The repo is already consistent with it: 9 canonical tags, 9 `og:url`s,
`sitemap.xml`, and a `vercel.json` rule sending `www` → apex.

---

## Read this part before touching anything

**DNS for this domain is hosted by Squarespace.** The nameservers are
`ns01–ns04.squarespacedns.com` plus `dns1–dns4.p05.nsone.net`. That means:

> **Do not cancel the Squarespace subscription until DNS has been moved
> somewhere else.** Cancelling takes the DNS zone with it, and the domain stops
> resolving — email included.

**Three records have nothing to do with the website and must survive:**

| Record | Value | What breaks without it |
|---|---|---|
| `MX` | `smtp.google.com` (priority 1) | **All email to @compoundgym.nz.** Google Workspace. |
| `TXT` on apex | `google-site-verification=O9QXOavZPtWt59cJOEWPbzAq1nFTItBAgrpyY9ORtYs` | Search Console verification — needed most in the weeks *after* a migration |
| `TXT` on `_dmarc` | `v=DMARC1; p=none;` | DMARC policy |

The plan below **does not touch any of them**, which is the main reason to
prefer it.

**Noticed in passing, unrelated to the cutover:** there is no `SPF` record
(`v=spf1 …`) on the apex. Mail flows through Google Workspace without one, but
it weakens deliverability. Worth adding separately — not part of this job, and
not something to change on cutover day.

---

## The plan: change two records, leave the nameservers alone

Rather than moving nameservers to Vercel, edit the two website records inside
Squarespace's DNS panel. Email, verification and DMARC are untouched because
they're different records, and rollback is putting the old values back.

Current website records:

```
compoundgym.nz        A      198.185.159.144, 198.185.159.145,
                             198.49.23.144, 198.49.23.145      (Squarespace)
www.compoundgym.nz    CNAME  ext-sq.squarespace.com            (Squarespace)
```

### The two records to set — confirmed 3 Sept 2026

Both hostnames are now attached to the `compoundgym` project, and Vercel
returned these:

```
compoundgym.nz        A      76.76.21.21            (delete all four Squarespace A records)
www.compoundgym.nz    CNAME  cname.vercel-dns.com   (replace ext-sq.squarespace.com)
```

Vercel's CLI offered `A 76.76.21.21` for **both**. That works, but a `CNAME` is
the better choice for `www`: it follows Vercel wherever its IPs move, and it is
a like-for-like swap of the CNAME already there. `cname.vercel-dns.com` was
checked and resolves to live Vercel addresses.

Only the apex genuinely needs the A record, because a zone apex cannot hold a
CNAME.

---

## Steps

### 1. Authenticate the CLI

```
vercel login
```

Only you can complete this — it prints a code and opens a browser.

### 2. Create and link the project

```
vercel link
```

Framework preset: **Other**. Build command: **none**. Output directory: **the
repo root**. This is pre-built static HTML; `build.js` only injects the shared
nav and footer and has already been run — nothing needs to build on Vercel.

Connecting the GitHub repo instead is fine and gives automatic deploys on push.
Either way the settings above apply.

### 3. Deploy a preview and check it

```
vercel
```

Gives a `*.vercel.app` URL that nothing points at. On it, confirm:

- [ ] `/gym-equipment` → 301 → `/gym`
- [ ] `/personal-training-consult` → 301 → `/personal-trainers#request`
- [ ] `/dunedin-gym-blog/3-factors` → 301 → `/`
- [ ] A made-up URL renders the branded 404, not Vercel's default
- [ ] `/OUTSTANDING.md` returns 404 — `.vercelignore` is working
- [ ] Claim the free pass end to end; the Calendly widget mounts and a booking
      lands in Calendly
- [ ] `/contact?interest=Sponsorship%20request` preselects the dropdown
- [ ] GA4 realtime records a pageview and `calendly_booked`

### 4. Add the domain in Vercel — DONE 3 Sept 2026

Both `compoundgym.nz` and `www.compoundgym.nz` are attached to the `compoundgym`
project. They report "not configured" and will keep doing so until the records
in the next step are changed — that is expected, not an error.

### 5. Lower the TTL first, if Squarespace lets you

A day ahead, drop the TTL on the A and CNAME records to 300 seconds. It means a
rollback takes minutes rather than hours. If Squarespace won't allow it, carry
on — just know rollback is slower.

### 6. Change the two records

In Squarespace DNS, replace the four apex `A` records with Vercel's, and repoint
the `www` `CNAME`. **Change nothing else on that screen.**

### 7. Wait, then verify

```
curl -sSI https://compoundgym.nz/           # expect 200, no Squarespace header
curl -sSI https://www.compoundgym.nz/       # expect 301 -> https://compoundgym.nz/
curl -sS https://compoundgym.nz/gym -o /dev/null -w "%{http_code}\n"   # 200
```

Then confirm email still works by sending a message to `hello@compoundgym.nz`
from an outside address. **Do this the same day.**

---

## After it's live

- [ ] Submit `https://compoundgym.nz/sitemap.xml` in Search Console
- [ ] Add the apex as a new property in Search Console if only `www` is verified
- [ ] Use the **Change of Address** tool only if the *domain* changed — it did
      not here, so skip it
- [ ] Watch Coverage for a fortnight; a temporary rise in redirects is expected
      and correct
- [ ] Check the first live Calendly booking fires `invitee_meeting_scheduled`
      in GA4 (see `OUTSTANDING.md` → GA4)
- [ ] Only once all of the above is settled, decide what to do with the
      Squarespace subscription — and move DNS somewhere else *before*
      cancelling it

---

## Rollback

Put the original values back:

```
compoundgym.nz        A      198.185.159.144, 198.185.159.145,
                             198.49.23.144, 198.49.23.145
www.compoundgym.nz    CNAME  ext-sq.squarespace.com
```

The Squarespace site is still there and still serving until it's cancelled, so
rollback is a DNS edit and a wait. Nothing else needs undoing.

---

## Known, accepted, not blocking

**Fourteen blog posts all redirect to `/`.** Google treats a mass redirect to
the homepage as a soft 404, so those pages pass little or no value. Deliberately
deferred. Search Console is verified on this domain, so the blog posts' actual
impressions can be checked before deciding whether any deserve a real
destination. Options, best first: point the ones with traffic at a relevant page
(`/gym`, `/personal-trainers`); let the rest return 410 Gone; or leave them
pointing at `/`.

**6 of 27 indexed URLs get one extra redirect hop** from the www → apex change.
The other 21 were changing destination regardless. A 301 passes full ranking
signal; expect a few weeks of fluctuation, not a loss.
