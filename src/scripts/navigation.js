import { lockScroll, unlockScroll } from './scroll-lock.js';

const worlds = {
  home: ['hero', '#ffcc86'], about: ['about', '#56d1c8'], skills: ['skills', '#abeb7a'],
  projects: ['projects', '#fc8ac1'], experience: ['experience', '#ffd166'],
  services: ['services', '#f7ebc9'], contact: ['contact', '#ba9cff']
};
export function setupNavigation() {
  const dialog = document.querySelector('#menu');
  const toggle = document.querySelector('.menu-toggle');
  const images = [...dialog.querySelectorAll('.menu-image')];
  let front = 0, request = 0, focusReturn;
  const open = () => { focusReturn = document.activeElement; dialog.showModal(); lockScroll(dialog); toggle.setAttribute('aria-expanded', 'true'); };
  const close = () => dialog.close();
  toggle.addEventListener('click', open);
  dialog.querySelector('.menu-close').addEventListener('click', close);
  dialog.addEventListener('close', () => { unlockScroll(dialog); toggle.setAttribute('aria-expanded', 'false'); focusReturn?.focus({ preventScroll: true }); });
  for(const link of dialog.querySelectorAll('nav a')) {
    const theme = () => {
      const [asset, color] = worlds[link.dataset.menuTheme];
      dialog.style.setProperty('--menu-color', color);
      const id = ++request;
      const next = images[1 - front];
      // Use the already loaded public asset paths instead of bundling a duplicate.
      const publicUrl = `${import.meta.env.BASE_URL}artwork/${asset}.webp`;
      if (images[front].src.endsWith(`/artwork/${asset}.webp`)) return;
      next.src = publicUrl;
      const swap = () => { if (request !== id || next.src !== new URL(publicUrl, location.href).href) return; images[front].classList.remove('active'); next.classList.add('active'); front = 1 - front; };
      if (next.complete && next.naturalWidth) swap(); else next.onload = swap;
    };
    link.addEventListener('pointerenter', theme); link.addEventListener('focus', theme);
    link.addEventListener('click', () => {
      const target = document.querySelector(link.hash);
      close();
      requestAnimationFrame(() => { target?.scrollIntoView({ behavior: document.documentElement.dataset.motion === 'reduced' ? 'instant' : 'smooth' }); target?.setAttribute('tabindex', '-1'); target?.focus({ preventScroll: true }); });
    });
  }
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', scrollY > 65);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const navLinks = [...document.querySelectorAll('.desktop-nav a')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => a.boundingClientRect.top-b.boundingClientRect.top);
    if (!visible.length) return;
    const id = visible[0].target.id;
    navLinks.forEach(link => { if(link.hash === `#${id}`) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current'); });
  }, { rootMargin: '-15% 0px -55% 0px' });
  sections.forEach(section => observer.observe(section));
  window.addEventListener('popstate', () => { if(dialog.open) close(); });
}
