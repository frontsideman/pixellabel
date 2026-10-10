import { lockScroll, unlockScroll } from './scroll-lock.js';

const projects = {
  allergenchecker: { title: 'AllergenChecker', category: '5.1 / iOS application', asset: 'allergenchecker', description: 'Created an iOS application that helps identify allergens in food products using a barcode scan or a photograph of the product ingredient list.', stack: ['iOS', 'Barcode scanning', 'Ingredient photos'] },
  competition: { title: 'Competition', category: '5.2 / iOS application', asset: 'competitions', description: 'Created Competition, an iOS application for goal-based competitions in private groups. Members compete on activity, reading, step counts and other goals supported by the Apple ecosystem, using their iPhone and Apple Watch.', stack: ['iOS', 'SwiftUI', 'Apple Watch', 'Nuxt', 'Directus'] },
  aibook: { title: 'AIBook', category: '5.3 / Product development', asset: 'aibook', description: 'Created AIBook.', stack: ['Product development'] },
  auto: { title: 'BestAutoService.by', category: '5.4 / Business website', asset: 'auto', description: 'WordPress website for BestAutoService.by, an automotive service business. Work included website development, design, content creation and SEO.', stack: ['WordPress', 'SEO', 'Content', 'Design', 'MCP'], url: 'https://bestautoservice.by/' }
};
export class HorizontalProjects {
  constructor(preferences) {
    this.preferences = preferences;
    this.section = document.querySelector('#projects');
    this.stage = this.section.querySelector('.projects-stage');
    this.viewport = this.section.querySelector('.project-viewport');
    this.track = this.section.querySelector('.project-track');
    this.cards = [...this.track.children];
    this.previous = this.section.querySelector('[data-project-prev]');
    this.next = this.section.querySelector('[data-project-next]');
    this.count = this.section.querySelector('.project-count');
    this.indicator = this.section.querySelector('.project-progress span');
    this.media = matchMedia('(min-width: 1024px) and (pointer: fine)');
    this.index = 0; this.pending = false;
    this.previous.addEventListener('click', () => this.go(this.index - 1));
    this.next.addEventListener('click', () => this.go(this.index + 1));
    this.viewport.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); this.go(this.index + (event.key === 'ArrowRight' ? 1 : -1)); }
    });
    this.viewport.addEventListener('focusin', event => { const card=event.target.closest('.project-card'); if(card && event.target.matches(':focus-visible')) this.go(this.cards.indexOf(card)); });
    this.viewport.addEventListener('scroll', () => { if(!this.pinned) this.updateNative(); }, {passive:true});
    window.addEventListener('scroll', () => this.schedule(), {passive:true});
    // Late metrics change distances, not the user's scroll position.
    this.media.addEventListener('change', () => this.measure());
    preferences.addEventListener('change', () => this.measure());
    new ResizeObserver(() => this.refresh()).observe(this.viewport);
    document.fonts.ready.then(() => this.refresh());
    this.track.querySelectorAll('img').forEach(image => image.addEventListener('load', () => this.refresh()));
    this.measure();
  }
  measure() {
    this.pinned = this.cards.length > 1 && this.media.matches && !this.preferences.reduced;
    this.section.classList.toggle('is-pinned', this.pinned);
    this.distance = Math.max(0, this.track.scrollWidth - this.viewport.clientWidth);
    this.step = this.cards[1] ? this.cards[1].offsetLeft - this.cards[0].offsetLeft : 0;
    if(this.pinned) {
      this.viewport.scrollLeft = 0;
      this.section.style.height = `${this.stage.offsetHeight + this.distance}px`;
    } else {
      this.section.style.height = '';
      this.track.style.removeProperty('--project-x');
      this.stage.style.removeProperty('--panorama-x');
      this.viewport.scrollLeft = Math.min(this.index * this.step, this.distance);
    }
    this.update();
  }
  refresh() {
    if(!this.cards.length) return;
    this.distance = Math.max(0, this.track.scrollWidth - this.viewport.clientWidth);
    this.step = this.cards[1] ? this.cards[1].offsetLeft - this.cards[0].offsetLeft : 0;
    if(this.pinned) this.section.style.height = `${this.stage.offsetHeight + this.distance}px`;
    this.update();
  }
  schedule() {
    if (!this.pinned || this.pending) return;
    this.pending = true;
    requestAnimationFrame(() => { this.pending = false; this.update(); });
  }
  update() {
    if(!this.pinned) { this.updateNative(); return; }
    const top = this.section.getBoundingClientRect().top;
    const distance = Math.min(this.distance, Math.max(0, -top));
    this.track.style.setProperty('--project-x', `${-distance}px`);
    this.stage.style.setProperty('--panorama-x', `${-distance * .025}px`);
    this.setIndex(distance >= this.distance - 4 ? this.cards.length - 1 : Math.min(this.cards.length - 1, this.step ? Math.round(distance / this.step) : 0), this.distance ? distance / this.distance : 0);
  }
  updateNative() {
    const distance = this.viewport.scrollLeft;
    this.setIndex(distance >= this.distance - 4 ? this.cards.length - 1 : Math.min(this.cards.length - 1, this.step ? Math.round(distance / this.step) : 0), this.distance ? distance / this.distance : 0);
  }
  setIndex(index, progress) {
    const total = this.cards.length;
    this.index = total ? Math.max(0, Math.min(total - 1, index)) : 0;
    const text = `5.${total ? this.index + 1 : 0} / 5.${total}`;
    if(this.count.textContent !== text) this.count.textContent = text;
    this.previous.disabled = !total || this.index === 0;
    this.next.disabled = !total || this.index === total - 1;
    this.indicator.style.width = total ? `${100 / total}%` : '0%';
    this.indicator.style.setProperty('--progress-x', `${Math.max(0,Math.min(1,progress))*Math.max(0,total-1)*100}%`);
  }
  go(index) {
    if (!this.cards.length) return;
    index = Math.max(0, Math.min(this.cards.length-1,index));
    const distance = index === this.cards.length-1 ? this.distance : Math.min(this.distance,index*this.step);
    if(this.pinned) {
      const y = this.section.getBoundingClientRect().top + scrollY + distance;
      window.scrollTo({top:y,behavior:this.preferences.reduced?'instant':'smooth'});
    } else this.viewport.scrollTo({left:distance,behavior:this.preferences.reduced?'instant':'smooth'});
  }
}
export function setupProjectDialogs() {
  const dialog = document.querySelector('#project-dialog');
  let returnFocus;
  document.querySelectorAll('.project-open').forEach(button => button.addEventListener('click', () => {
    const data = projects[button.closest('[data-project]').dataset.project];
    returnFocus = button;
    dialog.querySelector('#project-dialog-title').textContent = data.title;
    dialog.querySelector('.dialog-category').textContent = data.category;
    dialog.querySelector('.dialog-description').textContent = data.description;
    dialog.querySelector('.dialog-art').src = `${import.meta.env.BASE_URL}artwork/${data.asset}.webp`;
    dialog.querySelector('.dialog-tags').replaceChildren(...data.stack.map(tag => { const span = document.createElement('span'); span.textContent = tag; return span; }));
    const visit = dialog.querySelector('.dialog-visit');
    visit.hidden = !data.url;
    if (data.url) visit.href = data.url;
    else visit.removeAttribute('href');
    dialog.showModal();
    lockScroll(dialog);
  }));
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if(event.target === dialog) { const r = dialog.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { unlockScroll(dialog); returnFocus?.focus({preventScroll:true}); });
  window.addEventListener('popstate', () => { if(dialog.open) dialog.close(); });
}
