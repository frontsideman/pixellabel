const owners = new Set();

export function lockScroll(owner) {
  owners.add(owner);
  document.body.classList.add('scroll-locked');
}

export function unlockScroll(owner) {
  owners.delete(owner);
  document.body.classList.toggle('scroll-locked', owners.size > 0);
}
