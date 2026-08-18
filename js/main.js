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
const calendlyLink = document.getElementById('calendlyLink');
if (calendlyLink) {
  calendlyLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(CALENDLY_URL, "_blank");
  });
}

// ---- CONTACT / FREE-PASS FORMS -> FORMSPREE ------------------------
// Free-pass claims go to the form with the onboarding auto-response;
// general enquiries go to the plain contact form.
const FORMSPREE_FREEPASS = "https://formspree.io/f/xqpzyrpq";
const FORMSPREE_CONTACT  = "https://formspree.io/f/xppaozgn";

const form = document.getElementById('contactForm');
if (form) {
  const status = document.getElementById('formStatus');

  // After a successful submit, the next step (key-tag setup) is offered
  // immediately instead of leaving the prospect waiting on a reply.
  function showSuccess(isFreePass) {
    const panel = document.createElement('div');
    panel.className = 'form-success';
    panel.setAttribute('role', 'status');
    if (isFreePass) {
      panel.innerHTML = `
        <h3>You're in.</h3>
        <p>Your free 7-day pass is claimed. Book your 5-minute key-tag setup and you could be training this week.</p>
        <a class="btn btn-primary" href="${CALENDLY_URL}" target="_blank" rel="noopener">Book Your Key-Tag Setup</a>
        <p class="success-note">Or just walk in during staffed hours — Mon–Fri 6am–7pm, Gate J, Level 2A, Forsyth Barr Stadium, 130 Anzac Avenue.</p>
        <p class="success-note">No card needed. No obligation after your 7 days.</p>`;
    } else {
      panel.innerHTML = `
        <h3>Got it.</h3>
        <p>Thanks — we'll be back to you shortly.</p>
        <p class="success-note">Need us sooner? WhatsApp <a href="https://wa.me/64273411609">+64 27 341 1609</a>, or <a href="${CALENDLY_URL}" target="_blank" rel="noopener">book a key-tag setup time</a>.</p>`;
    }
    form.replaceWith(panel);
    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = "Sending...";

    const data = Object.fromEntries(new FormData(form).entries());
    data.page = window.location.pathname;

    // The free-pass page form has no interest dropdown; on the contact page
    // only "Free 7-Day Pass" enquiries get the pass onboarding panel.
    const interestSel = form.querySelector('#interest');
    const isFreePass = !interestSel || interestSel.value === 'Free 7-Day Pass';

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
        showSuccess(isFreePass);
      } else {
        status.textContent = "Something went wrong sending that. Please call or email us directly.";
      }
    } catch (err) {
      status.textContent = "Something went wrong sending that. Please call or email us directly.";
    }
  });
}
