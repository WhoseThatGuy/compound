// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

// ---- CALENDLY -----------------------------------------------------
const CALENDLY_URL = "https://calendly.com/compoundgymnz/key-pickup";
const CALENDLY_TOUR_URL = "https://calendly.com/compoundgymnz/compound-tour";

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

// ---- CONTACT / FREE-PASS FORMS -> FORMSPREE ------------------------
// Free-pass claims go to the form with the onboarding auto-response;
// general enquiries go to the plain contact form.
const FORMSPREE_FREEPASS = "https://formspree.io/f/xqpzyrpq";
const FORMSPREE_CONTACT  = "https://formspree.io/f/xppaozgn";

const form = document.getElementById('contactForm');
if (form) {
  const status = document.getElementById('formStatus');

  // After a successful submit, the next step (key-tag setup or tour) is
  // offered immediately instead of leaving the prospect waiting on a reply.
  function showSuccess(kind) {
    const panel = document.createElement('div');
    panel.className = 'form-success';
    panel.setAttribute('role', 'status');
    if (kind === 'pass') {
      panel.innerHTML = `
        <h3>You're in.</h3>
        <p>Your free 7-day pass is claimed. Book your 5-minute key-tag setup and you could be training this week.</p>
        <a class="btn btn-primary" href="${CALENDLY_URL}" target="_blank" rel="noopener">Book Your Key-Tag Setup</a>
        <p class="success-note">Or just walk in during staffed hours — Mon–Fri 6am–7pm, Gate J, Level 2A, Forsyth Barr Stadium, 130 Anzac Avenue.</p>
        <p class="success-note">No obligation after your 7 days — if it's not the right fit, no hard feelings.</p>`;
    } else if (kind === 'tour') {
      panel.innerHTML = `
        <h3>Good call.</h3>
        <p>Pick a time below and we'll show you around the floor — no workout required.</p>
        <a class="btn btn-primary" href="${CALENDLY_TOUR_URL}" target="_blank" rel="noopener">Book Your Gym Tour</a>
        <p class="success-note">Or just drop in during staffed hours — Mon–Fri 6am–7pm, Gate J, Level 2A, Forsyth Barr Stadium.</p>`;
    } else if (kind === 'pt') {
      panel.innerHTML = `
        <h3>Request received.</h3>
        <p>We'll go through it and come back to you with the trainer who fits what you're training for.</p>
        <p class="success-note">Need us sooner? WhatsApp <a href="https://wa.me/64273411609">+64 27 341 1609</a>.</p>
        <p class="success-note">Your first 2 sessions are included with every membership.</p>`;
    } else {
      panel.innerHTML = `
        <h3>Got it.</h3>
        <p>Thanks — we'll be back to you shortly.</p>
        <p class="success-note">Need us sooner? WhatsApp <a href="https://wa.me/64273411609">+64 27 341 1609</a>, or <a href="${CALENDLY_URL}" target="_blank" rel="noopener">book a key-tag setup time</a>.</p>`;
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

    // The floating CTA points at the form we just replaced — once the pass is
    // claimed it only scrolls back to this panel, so retire it.
    const floatCta = document.getElementById('floatCta');
    if (floatCta) floatCta.remove();

    form.replaceWith(panel);
    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = "Sending...";

    const data = Object.fromEntries(new FormData(form).entries());
    data.page = window.location.pathname;

    // The free-pass page form has no interest dropdown; on the contact page
    // the selected interest decides which onboarding panel appears.
    const interestSel = form.querySelector('#interest');
    const isFreePass = !interestSel || interestSel.value === 'Free 7-Day Pass';
    const kind = isFreePass ? 'pass'
      : interestSel.value === 'Gym Tour' ? 'tour'
      : interestSel.value === 'Personal Training' ? 'pt'
      : 'general';

    try {
      const res = await fetch(isFreePass ? FORMSPREE_FREEPASS : FORMSPREE_CONTACT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        showSuccess(kind);
      } else {
        status.textContent = "Something went wrong sending that. Please call or email us directly.";
      }
    } catch (err) {
      status.textContent = "Something went wrong sending that. Please call or email us directly.";
    }
  });
}
