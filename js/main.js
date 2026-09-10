// Mobile nav toggle
// Guarded, and it matters more than it looks: this is line 4 of a single file
// whose form handler sits ~300 lines below. An unguarded throw here would stop
// every line after it, so one missing element would silently disable all three
// lead-capture forms site-wide with nothing visible to notice.
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

// ---- CALENDLY -----------------------------------------------------
const CALENDLY_URL = "https://calendly.com/compoundgymnz/key-pickup";
const CALENDLY_TOUR_URL = "https://calendly.com/compoundgymnz/compound-tour";

// ---- ANNUAL / FLEXI PRICING TOGGLE -----------------------------------
// Flips one attribute; CSS does the swapping. Both prices are already in the
// DOM, so with JS off the page still shows annual pricing rather than nothing.
const pricingWrap = document.querySelector('.pricing-wrap');
if (pricingWrap) {
  // Prices are swapped by CSS off data-term, but a join button has to point at
  // a different signup URL per term, and CSS cannot change an href. Any link
  // carrying both data-href-annual and data-href-flexi gets repointed here.
  // Links without them (Check Eligibility, Claim Free 7-Day Pass) are ignored.
  const setTermHrefs = term => {
    pricingWrap.querySelectorAll('a[data-href-' + term + ']').forEach(a => {
      const href = a.getAttribute('data-href-' + term);
      if (href) a.setAttribute('href', href);
    });
  };
  setTermHrefs(pricingWrap.getAttribute('data-term') || 'annual');

  pricingWrap.querySelectorAll('[data-set-term]').forEach(btn => {
    btn.addEventListener('click', () => {
      const term = btn.getAttribute('data-set-term');
      if (pricingWrap.getAttribute('data-term') === term) return;
      pricingWrap.setAttribute('data-term', term);
      setTermHrefs(term);
      pricingWrap.querySelectorAll('[data-set-term]').forEach(b => {
        const on = b === btn;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-pressed', String(on));
      });
      if (typeof gtag === 'function') {
        gtag('event', 'pricing_term_toggle', { term });
      }
    });
  });
}

// ---- CALENDLY INLINE EMBED ------------------------------------------
// The booking widget is mounted straight into the success panel rather than
// sending people to calendly.com, so claiming a pass and booking the key-tag
// pickup are one uninterrupted step. Loaded on demand — only someone who has
// actually submitted a form ever pays for this script.
const CALENDLY_WIDGET_JS  = "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_WIDGET_CSS = "https://assets.calendly.com/assets/external/widget.css";
let calendlyLoader = null;

function loadCalendly() {
  if (calendlyLoader) return calendlyLoader;
  calendlyLoader = new Promise((resolve, reject) => {
    if (window.Calendly) return resolve();
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = CALENDLY_WIDGET_CSS;
    document.head.appendChild(css);
    const s = document.createElement('script');
    s.src = CALENDLY_WIDGET_JS;
    s.async = true;
    s.onload  = () => window.Calendly ? resolve() : reject(new Error('widget.js loaded but Calendly missing'));
    s.onerror = () => reject(new Error('widget.js blocked'));
    document.head.appendChild(s);
  });
  return calendlyLoader;
}

// Prefill goes through Calendly's JS API, not query params, so nobody's name
// and email end up in a URL. Ad blockers block Calendly often enough that the
// plain link under the widget is always on screen, not revealed on failure:
// widget.js can load and resolve and the calendar still never paint, and from
// here that case looks identical to success. If the widget cannot mount within
// 8s the embed is dropped and the link is promoted, since it is then the only
// way through.
function mountCalendly(panel, url, data) {
  const host = panel.querySelector('.calendly-embed');
  const fallback = panel.querySelector('.calendly-fallback');
  if (!host) return;

  let settled = false;
  const fail = () => {
    if (settled) return;
    settled = true;
    host.remove();
    if (fallback) fallback.classList.add('is-only');
  };
  const timer = setTimeout(fail, 8000);

  loadCalendly().then(() => {
    if (settled) return;
    clearTimeout(timer);
    settled = true;
    const first = (data && data.fname) || '';
    const last  = (data && data.lname) || '';
    // Both forms: Calendly uses firstName/lastName when the event is set to
    // collect them separately and falls back to the single name field when it
    // isn't, so sending both covers either configuration.
    window.Calendly.initInlineWidget({
      url,
      parentElement: host,
      prefill: {
        name: [first, last].filter(Boolean).join(' ').trim(),
        firstName: first,
        lastName: last,
        email: (data && data.email) || ''
      }
    });
  }).catch(() => { clearTimeout(timer); fail(); });
}

// The inline widget never navigates, so the outbound click tracker below can't
// see it. Calendly posts its own lifecycle events to the parent frame instead —
// event_scheduled is the one that means a booking actually happened, which is a
// better signal than the click ever was.
let calendlyBookedSent = false;
// One claim is one Lead. The submit handler already refuses re-entry, but the
// latch makes double-counting impossible even if showSuccess were ever called
// twice for one visit.
let passLeadSent = false;
window.addEventListener('message', (e) => {
  if (!/^https:\/\/([a-z0-9-]+\.)?calendly\.com$/.test(e.origin)) return;
  const name = e.data && e.data.event;
  if (name !== 'calendly.event_scheduled' || typeof gtag !== 'function') return;
  if (calendlyBookedSent) return;
  calendlyBookedSent = true;
  gtag('event', 'calendly_booked', { page_path: window.location.pathname });
});

// ---- CALENDLY OUTBOUND TRACKING ------------------------------------
// Calendly runs on its own domain, so GA4 records the booking page itself
// (/compoundgymnz/<event>) but nothing about the click that sent someone
// there. Track the click on our side so the drop-off between claiming a
// pass and actually booking the key-tag setup is visible.
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href*="calendly.com/"]');
  if (!link || typeof gtag !== 'function') return;
  const slug = (link.getAttribute('href').split('calendly.com/')[1] || '').split(/[?#]/)[0];
  gtag('event', 'calendly_click', {
    calendly_event: slug,            // e.g. compoundgymnz/key-pickup
    link_text: link.textContent.trim().slice(0, 100),
    page_path: window.location.pathname
  });
});

// ---- FORMS -> FORMSPREE --------------------------------------------
// One endpoint per destination, because they want different treatment: the
// free-pass form has the onboarding auto-responder attached, PT requests need
// matching to a trainer, and general enquiries just need answering.
const FORMSPREE_FREEPASS = "https://formspree.io/f/xaeyjpoa";  // /free-7-day-pass
const FORMSPREE_CONTACT  = "https://formspree.io/f/xrpgkyqk";  // /contact
const FORMSPREE_PT       = "https://formspree.io/f/mvkorwrk";  // /personal-trainers

// ---- CONTACT: ROUTE TO THE BETTER FLOW -------------------------------
// Three enquiries already have a dedicated flow that does more than a message
// would: the pass form books a key-tag, the PT form matches a trainer, the
// tour link books a time. When one of those is chosen, swap the message box
// and submit button for a link straight there.
const INTEREST_ROUTES = {
  'Free 7-Day Pass': {
    href: '/free-7-day-pass#claim',
    cta: 'Claim Free 7-Day Pass',
    text: "You can claim your pass and book your key-tag pickup in one go — no need to message us first."
  },
  'Personal Training': {
    href: '/personal-trainers#request',
    cta: 'Book A Free PT Session',
    // "Your first session is free" deliberately avoided: stating it as a rule
    // is what had people reconciling it against the two sessions included with
    // a membership instead of booking.
    text: "Tell us what you're training for on the PT form and we'll match you with a trainer for a free session."
  },
  'Gym Tour': {
    href: 'https://calendly.com/compoundgymnz/compound-tour',
    cta: 'Book A Gym Tour',
    text: 'Pick a time that suits and we’ll show you around the floor.',
    external: true
  }
};

(() => {
  const sel = document.querySelector('#interest');
  const panel = document.getElementById('interestRedirect');
  const messageField = document.getElementById('messageField');
  if (!sel || !panel || !messageField) return;

  const submitBtn = sel.form && sel.form.querySelector('button[type="submit"]');
  const link = panel.querySelector('a');
  const text = panel.querySelector('.interest-redirect-text');

  function apply() {
    const route = INTEREST_ROUTES[sel.value];
    panel.hidden = !route;
    messageField.hidden = !!route;
    if (submitBtn) submitBtn.hidden = !!route;
    if (!route) return;
    text.textContent = route.text;
    link.textContent = route.cta;
    link.href = route.href;
    if (route.external) { link.target = '_blank'; link.rel = 'noopener'; }
    else { link.removeAttribute('target'); link.removeAttribute('rel'); }
  }

  sel.addEventListener('change', apply);
  apply();
})();

const form = document.getElementById('contactForm');
if (form) {
  const status = document.getElementById('formStatus');

  // Pages can deep-link into a specific enquiry: /contact?interest=Sponsorship
  // request. Matched case-insensitively so the link doesn't silently break if
  // the option's wording is edited later.
  const wanted = new URLSearchParams(window.location.search).get('interest');
  const interestField = form.querySelector('#interest');
  // Guard on .options: on the PT page #interest is a hidden input, not a
  // select, and spreading undefined would throw before the form ever renders.
  if (wanted && interestField && interestField.options) {
    const match = [...interestField.options]
      .find(o => o.text.toLowerCase() === wanted.trim().toLowerCase());
    if (match) interestField.value = match.value;
  }

  // After a successful submit, the next step (key-tag setup or tour) is
  // offered immediately instead of leaving the prospect waiting on a reply.
  function showSuccess(kind, data) {
    const panel = document.createElement('div');
    panel.className = 'form-success';
    panel.setAttribute('role', 'status');
    if (kind === 'pass') {
      // Says the pass is claimed and nothing more. Choosing a time is the next
      // step and is optional — the lead is already saved by the time this
      // renders, so this must not read as an appointment confirmation.
      panel.innerHTML = `
        <h3>Your free pass is claimed.</h3>
        <p>Choose a time below for your first visit. Allow 15 minutes for your welcome and key-tag setup. Bring your training gear if you'd like to work out while you're here.</p>
        <div class="calendly-embed"></div>
        <p class="calendly-fallback">Calendar not loading? <a href="${CALENDLY_URL}" target="_blank" rel="noopener">Open the booking page</a>.</p>
        <p class="success-note">Prefer to drop in? Come during staffed hours, Monday–Friday, 6am–7pm, and we'll help you get started.</p>
        <p class="success-note">Find us at Gate J, Level 2A, Forsyth Barr Stadium, 130 Anzac Avenue.</p>`;
    } else if (kind === 'tour') {
      panel.innerHTML = `
        <h3>Good call.</h3>
        <p>Pick a time below and we'll show you around the floor — no workout required.</p>
        <div class="calendly-embed"></div>
        <p class="calendly-fallback">Calendar not loading? <a href="${CALENDLY_TOUR_URL}" target="_blank" rel="noopener">Open the booking page</a>.</p>
        <p class="success-note">Or just drop in during staffed hours — Mon–Fri 6am–7pm, Gate J, Level 2A, Forsyth Barr Stadium.</p>`;
    } else if (kind === 'pt') {
      panel.innerHTML = `
        <h3>Request received.</h3>
        <p>We'll go through it and come back to you with the trainer who fits what you're training for.</p>
        <p class="success-note">Need to talk to us sooner? Message us on WhatsApp <a href="https://wa.me/64273411609">+64 27 341 1609</a></p>
        <p class="success-note">Your first 2 sessions are included with every membership.</p>`;
    } else {
      panel.innerHTML = `
        <h3>Got it.</h3>
        <p>Thanks — we'll be back to you shortly.</p>
        <p class="success-note">Need to talk to us sooner? Message us on WhatsApp <a href="https://wa.me/64273411609">+64 27 341 1609</a></p>`;
    }
    // The old Squarespace site redirected claimants to a real
    // /free-7-day-pass-confirmation page, and the GA4 key event is defined on
    // that pageview. This panel replaces the form in place with no navigation,
    // so send the pageview manually — same path, so the existing key event and
    // its history keep working without touching the GA4 config.
    if (kind === 'pass' && typeof gtag === 'function') {
      gtag('event', 'page_view', {
        page_title: 'Free 7-Day Pass Confirmation',
        page_location: window.location.origin + '/free-7-day-pass-confirmation',
        page_path: '/free-7-day-pass-confirmation'
      });
    }

    // Meta's conversion was a URL rule on /free-7-day-pass-confirmation, a page
    // the old Squarespace site navigated to. This site never leaves the form
    // page — the panel replaces it in place — so that URL 404s and the rule can
    // never match again. A real event replaces it.
    //
    // Lead rather than a custom event: it is a standard event, so Meta ad
    // delivery can optimise for it. content_name narrows a custom conversion to
    // the pass specifically, leaving room for the contact and PT forms to send
    // their own Leads later without polluting this one.
    //
    // typeof guard because ad blockers remove fbq, and an unguarded call here
    // would throw before the panel is inserted — costing the visitor the
    // booking step to save an analytics event.
    if (kind === 'pass' && !passLeadSent && typeof fbq === 'function') {
      passLeadSent = true;
      fbq('track', 'Lead', {
        content_name: 'Free 7-Day Pass',
        content_category: 'Membership trial'
      });
    }

    // The nav's gold CTA points at #claim — the form we are about to replace.
    // Once the pass is claimed it would only scroll back to this panel, and a
    // "Free 7-Day Pass" button above a page saying the pass is claimed reads
    // as a mistake. Retire it, on this page only. (The floating pill used to
    // carry this same problem and was handled the same way before it went.)
    if (kind === 'pass') {
      const navCta = document.querySelector('.nav-cta');
      if (navCta) navCta.remove();
    }

    // The card's heading, its lede and the trailing walk-in note are siblings
    // of <form>, not children of it, so replacing the form alone left "Claim
    // your pass — four fields, about 30 seconds" sitting above "You're in",
    // and stranded the walk-in note below the Calendly widget where it
    // duplicated the one inside the panel. Retire the whole pre-submit card.
    const card = form.closest('.pass-form-card');
    if (card) {
      Array.prototype.forEach.call(card.children, el => {
        if (el !== form) {
          el.hidden = true;
          el.style.display = 'none';   // beats any display rule on h2/p
        }
      });
    }

    // Must be in the DOM before Calendly mounts into it.
    form.replaceWith(panel);
    if (kind === 'pass') mountCalendly(panel, CALENDLY_URL, data);
    if (kind === 'tour') mountCalendly(panel, CALENDLY_TOUR_URL, data);
    // 'start', not 'center' — with the calendar embedded the panel is taller
    // than the viewport, and centring it hides the heading off the top.
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // A second click while the first request is in flight would post the lead
  // twice: two Formspree submissions, two rows in the Sheet, two auto-responder
  // emails to the same person. The button is disabled for the duration and the
  // handler latches, because a slow network is exactly when people click again.
  let sending = false;
  const submitBtn = form.querySelector('button[type="submit"]');
  const release = () => {
    sending = false;
    if (submitBtn) submitBtn.disabled = false;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (sending) return;
    sending = true;
    if (submitBtn) submitBtn.disabled = true;
    status.textContent = "Sending...";

    const data = Object.fromEntries(new FormData(form).entries());
    data.page = window.location.pathname;

    // The forms collect first and last name separately because that is better
    // to fill in, but nothing was sending a plain `name`. Formspree's
    // notification and auto-responder templates key off conventional field
    // names, and {{ fname }} has not worked in the responder — this gives it a
    // standard field to reference, and makes the notification email show a
    // readable name instead of two separate lines.
    const fullName = [data.fname, data.lname].filter(Boolean).join(' ').trim();
    if (fullName) data.name = fullName;

    // The free-pass page form has no interest dropdown; on the contact page
    // the selected interest decides which onboarding panel appears.
    const interestSel = form.querySelector('#interest');
    const isFreePass = !interestSel || interestSel.value === 'Free 7-Day Pass';
    const kind = isFreePass ? 'pass'
      : interestSel.value === 'Gym Tour' ? 'tour'
      : interestSel.value === 'Personal Training' ? 'pt'
      : 'general';

    // Route on `kind` rather than a two-way isFreePass test, so the PT page
    // keeps its own inbox instead of riding along with general enquiries.
    const endpoint = kind === 'pass' ? FORMSPREE_FREEPASS
      : kind === 'pt' ? FORMSPREE_PT
      : FORMSPREE_CONTACT;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        showSuccess(kind, data);
      } else {
        release();
        status.innerHTML = "That didn't send. Try again, or WhatsApp us on <a href=\"https://wa.me/64273411609\">+64 27 341 1609</a> and we'll sort it.";
      }
    } catch (err) {
      release();
      status.innerHTML = "That didn't send. Try again, or WhatsApp us on <a href=\"https://wa.me/64273411609\">+64 27 341 1609</a> and we'll sort it.";
    }
  });
}
