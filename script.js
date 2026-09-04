const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const cards = document.querySelectorAll('.draggable-card');

let activeCard = null;
let offsetX = 0;
let offsetY = 0;
let topZ = 10;

cards.forEach(card => {
  card.addEventListener('mousedown', startDrag);
  card.addEventListener('touchstart', startDragTouch, { passive: false });
});

function startDrag(e) {
  activeCard = e.currentTarget;
  topZ++;
  activeCard.style.zIndex = topZ;

  const rect = activeCard.getBoundingClientRect();
  const parentRect = activeCard.parentElement.getBoundingClientRect();

  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;

  activeCard.dataset.parentLeft = parentRect.left;
  activeCard.dataset.parentTop = parentRect.top;

  document.addEventListener('mousemove', dragCard);
  document.addEventListener('mouseup', stopDrag);
}

function dragCard(e) {
  if (!activeCard) return;

  const parentLeft = parseFloat(activeCard.dataset.parentLeft);
  const parentTop = parseFloat(activeCard.dataset.parentTop);

  activeCard.style.left = `${e.clientX - parentLeft - offsetX}px`;
  activeCard.style.top = `${e.clientY - parentTop - offsetY}px`;
  activeCard.style.right = 'auto';
  activeCard.style.bottom = 'auto';
}

function stopDrag() {
  document.removeEventListener('mousemove', dragCard);
  document.removeEventListener('mouseup', stopDrag);
  activeCard = null;
}

function startDragTouch(e) {
  e.preventDefault();
  activeCard = e.currentTarget;
  topZ++;
  activeCard.style.zIndex = topZ;

  const touch = e.touches[0];
  const rect = activeCard.getBoundingClientRect();
  const parentRect = activeCard.parentElement.getBoundingClientRect();

  offsetX = touch.clientX - rect.left;
  offsetY = touch.clientY - rect.top;

  activeCard.dataset.parentLeft = parentRect.left;
  activeCard.dataset.parentTop = parentRect.top;

  document.addEventListener('touchmove', dragCardTouch, { passive: false });
  document.addEventListener('touchend', stopDragTouch);
}

function dragCardTouch(e) {
  if (!activeCard) return;
  e.preventDefault();

  const touch = e.touches[0];
  const parentLeft = parseFloat(activeCard.dataset.parentLeft);
  const parentTop = parseFloat(activeCard.dataset.parentTop);

  activeCard.style.left = `${touch.clientX - parentLeft - offsetX}px`;
  activeCard.style.top = `${touch.clientY - parentTop - offsetY}px`;
  activeCard.style.right = 'auto';
  activeCard.style.bottom = 'auto';
}

function stopDragTouch() {
  document.removeEventListener('touchmove', dragCardTouch);
  document.removeEventListener('touchend', stopDragTouch);
  activeCard = null;
}