// ===== Theme Toggle =====
const themeBtn = document.getElementById('theme-toggle');

function setTheme(mode) {
  if (mode === 'dark') {
    document.body.classList.add('dark-mode');
    themeBtn.textContent = '☀ Light Mode';
    localStorage.setItem('ef-theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    themeBtn.textContent = '☾ Dark Mode';
    localStorage.setItem('ef-theme', 'light');
  }
}

const saved = localStorage.getItem('ef-theme') || 'light';
setTheme(saved);

themeBtn.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark-mode');
  setTheme(isDark ? 'light' : 'dark');
});

// ===== Active Nav on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => observer.observe(s));

// ===== Skill Tabs =====
const skillTabs = document.querySelectorAll('.skill-tab');
const skillDetails = document.querySelectorAll('.skill-detail');

skillTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.skill;
    skillTabs.forEach(t => t.classList.remove('active'));
    skillDetails.forEach(d => d.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById('skill-' + target);
    if (panel) panel.classList.add('active');
  });
});

if (skillTabs.length) skillTabs[0].click();

// ===== Contact Form Validation =====
const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nameEl   = document.getElementById('name');
  const emailEl  = document.getElementById('email');
  const msgEl    = document.getElementById('message');
  const nameErr  = document.getElementById('name-err');
  const emailErr = document.getElementById('email-err');
  const msgErr   = document.getElementById('msg-err');
  const success  = document.getElementById('form-success');

  // Reset
  [nameEl, emailEl, msgEl].forEach(el => el.classList.remove('error'));
  [nameErr, emailErr, msgErr].forEach(el => el.classList.remove('visible'));
  success.classList.remove('visible');

  let valid = true;
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nameEl.value.trim()) {
    nameEl.classList.add('error');
    nameErr.textContent = 'Please enter your name.';
    nameErr.classList.add('visible');
    valid = false;
  }

  if (!emailEl.value.trim()) {
    emailEl.classList.add('error');
    emailErr.textContent = 'Email address is required.';
    emailErr.classList.add('visible');
    valid = false;
  } else if (!emailRe.test(emailEl.value.trim())) {
    emailEl.classList.add('error');
    emailErr.textContent = 'Please enter a valid email.';
    emailErr.classList.add('visible');
    valid = false;
  }

  if (!msgEl.value.trim()) {
    msgEl.classList.add('error');
    msgErr.textContent = 'Message cannot be empty.';
    msgErr.classList.add('visible');
    valid = false;
  }

  if (valid) {
    success.classList.add('visible');
    form.reset();
  }
});
