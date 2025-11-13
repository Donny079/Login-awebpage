// Demo credentials stored in JS (as requested)
const DEMO_EMAIL = 'test@example.com';
const DEMO_PASSWORD = '1234';

// Simple DOM helpers
const qs = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

document.addEventListener('DOMContentLoaded', () => {
  const modal = qs('#login-modal');
  const openLogin = qs('#open-login');
  const openLoginCta = qs('#open-login-cta');
  const getStarted = qs('#get-started');
  const modalClose = qs('#modal-close');
  const modalBackdrop = qs('#modal-backdrop');
  const loginForm = qs('#login-form');
  const alertBox = qs('#login-alert');
  const featureCards = qsa('.feature-card');
  const heroCopy = qs('.hero-copy');
  const cardIll = qs('.card-illustration');

  // show modal
  [openLogin, openLoginCta, getStarted].forEach(el => {
    if (!el) return;
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  function openModal(){
    modal.setAttribute('aria-hidden', 'false');
    setTimeout(()=>qs('#email').focus(), 120);
  }
  function closeModal(){
    modal.setAttribute('aria-hidden', 'true');
    alertBox.hidden = true;
  }

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  // form validation and server-side auth via /api/login
  if (loginForm) {
    loginForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const email = qs('#email').value.trim();
      const password = qs('#password').value.trim();

      if(!email || !password){
        showAlert('Please enter both email and password.');
        return;
      }

      // simple validation pattern
      if(!/^\S+@\S+\.\S+$/.test(email)){
        showAlert('Please enter a valid email address.');
        return;
      }

      // POST to server API for authentication
      try{
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
          body: JSON.stringify({email, password})
        });

        let data = {};
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          try {
            data = await res.json();
          } catch(parseErr){
            console.warn('Failed to parse JSON response', parseErr);
          }
        }

        if(res.ok && data.success){
          showAlert(data.message || 'Login successful! Redirecting...', false);
          setTimeout(()=>{ window.location.href = '/dashboard'; }, 700);
        } else {
          const message = data && data.message ? data.message : (res.statusText || 'Invalid credentials. Please try again.');
          showAlert(message);
        }

      } catch(err){
        console.error('Login error', err);
        showAlert('Unable to reach server. Please try again later.');
      }
    });
  }

  function showAlert(message, isError = true){
    alertBox.hidden = false;
    alertBox.textContent = message;
    if(isError){
      alertBox.style.background = '#ffeef0';
      alertBox.style.color = '#9b1c1c';
    } else {
      alertBox.style.background = 'linear-gradient(90deg,#e6f6ff,#f0fff4)';
      alertBox.style.color = '#064e3b';
    }
  }

  // Entrance animations when elements come into view
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
      }
    });
  },{threshold:0.12});

  featureCards.forEach(c=>observer.observe(c));
  if(heroCopy) observer.observe(heroCopy);
  if(cardIll) observer.observe(cardIll);

  // mobile nav toggle (very small)
  const navToggle = qs('.nav-toggle');
  const navLinks = qs('.nav-links');
  if(navToggle){
    navToggle.addEventListener('click', ()=>{
      if(navLinks.style.display === 'flex') navLinks.style.display = '';
      else navLinks.style.display = 'flex';
    });
  }

  // smooth highlight on nav click
  qsa('.nav-link').forEach(a=>a.addEventListener('click', ()=>{
    // close mobile nav
    if(window.innerWidth < 600 && navLinks) navLinks.style.display = '';
  }));

});
