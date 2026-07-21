// ---------- Footer: dynamic year and last modified date ----------
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = document.lastModified;

// ---------- Responsive hamburger menu ----------
const hamburger = document.querySelector('#hamburger');
const primaryNav = document.querySelector('#primary-nav');

hamburger.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  hamburger.querySelector('.hamburger-icon').innerHTML = isOpen ? '&times;' : '&#9776;';
});