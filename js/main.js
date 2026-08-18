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
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqpzyrpq";

const form = document.getElementById('contactForm');
if (form) {
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = "Sending...";

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        status.textContent = "Thanks — we'll be in touch shortly.";
        form.reset();
      } else {
        status.textContent = "Something went wrong sending that. Please call or email us directly.";
      }
    } catch (err) {
      status.textContent = "Something went wrong sending that. Please call or email us directly.";
    }
  });
}
