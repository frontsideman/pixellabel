export class MotionPreferences extends EventTarget {
  constructor() {
    super();
    this.button = document.querySelector('#motion-toggle');
    this.mode = document.documentElement.dataset.motion || 'on';
    this.apply();
    this.button.addEventListener('click', () => this.set(this.reduced ? 'on' : 'reduced'));

  }
  get reduced() { return this.mode === 'reduced'; }
  set(mode, persist = true) {
    this.mode = mode;
    if (persist) try { localStorage.setItem('portfolio-motion-v2', mode); } catch {}
    this.apply();
    this.dispatchEvent(new Event('change'));
  }
  apply() {
    document.documentElement.dataset.motion = this.mode;
    this.button.textContent = `Motion: ${this.reduced ? 'Reduced' : 'On'}`;
    this.button.setAttribute('aria-pressed', String(this.reduced));
  }
}

export class AmbientMotionController {
  constructor(preferences) {
    this.preferences = preferences;
    this.scenes = [...document.querySelectorAll('[data-scene]')];
    this.intersections = new Map();
    this.observer = new IntersectionObserver(entries => {
      for (const entry of entries) this.intersections.set(entry.target, entry.isIntersecting);
      this.update();
    }, { rootMargin: '100px' });
    this.scenes.forEach(scene => { scene.dataset.active = 'false'; this.observer.observe(scene); });
    document.addEventListener('visibilitychange', () => this.update());
    preferences.addEventListener('change', () => this.update());
    this.update();
  }
  update() {
    document.documentElement.classList.toggle('page-hidden', document.hidden);
    for (const scene of this.scenes) {
      scene.dataset.active = String(!document.hidden && !this.preferences.reduced && !!this.intersections.get(scene));
    }
  }
}

export function setupReveals(preferences) {
  if (preferences.reduced) return;
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 4 * 65, 195)}ms`;
    observer.observe(el);
  });
  preferences.addEventListener('change', () => {
    if (preferences.reduced) document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  });
}

export function setupIntro(preferences) {
  const hero = document.querySelector('.hero');
  const skip = document.querySelector('.intro-skip');
  let visited = false; try { visited = !!sessionStorage.getItem('portfolio-visited'); } catch {}
  if (visited || preferences.reduced) return;
  hero.classList.add('has-intro'); skip.hidden = false;
  const finish = () => { hero.classList.remove('has-intro'); skip.hidden = true; try { sessionStorage.setItem('portfolio-visited', '1'); } catch {} };
  const timeout = setTimeout(finish, 2300);
  skip.addEventListener('click', () => { clearTimeout(timeout); finish(); }, { once: true });
  preferences.addEventListener('change', () => { if(preferences.reduced) { clearTimeout(timeout); finish(); } });
}
