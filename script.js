const unlockButton = document.querySelector('#unlockButton');
const story = document.querySelector('#story');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function burstConfetti() {
  if (typeof confetti !== 'function') return;
  confetti({ particleCount: 70, spread: 90, startVelocity: 28, origin: { y: 0.62 }, colors: ['#e7a1b1', '#e6bb83', '#f9edf1', '#a94d70'] });
  setTimeout(() => confetti({ particleCount: 30, spread: 70, origin: { x: 0.82, y: 0.5 }, colors: ['#e7a1b1', '#e6bb83'] }), 180);
}

unlockButton.addEventListener('click', () => {
  burstConfetti();
  story.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('.reason-card').forEach((card) => {
  card.addEventListener('click', () => card.classList.toggle('is-open'));
});

const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightboxImage');
const lightboxCaption = document.querySelector('#lightboxCaption');
document.querySelectorAll('.photo-card').forEach((card) => {
  card.addEventListener('click', () => {
    lightboxImage.src = card.dataset.image;
    lightboxImage.alt = card.querySelector('img').alt;
    lightboxCaption.textContent = card.dataset.caption;
    if (typeof lightbox.showModal === 'function') lightbox.showModal();
    else lightbox.setAttribute('open', '');
  });
});
document.querySelector('.modal-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });

const candles = [...document.querySelectorAll('.candle')];
const celebration = document.querySelector('#celebration');
candles.forEach((candle) => candle.addEventListener('click', () => {
  if (candle.classList.contains('is-out')) return;
  candle.classList.add('is-out');
  burstConfetti();
  if (candles.every((item) => item.classList.contains('is-out'))) {
    setTimeout(() => celebration.classList.add('is-visible'), 450);
  }
}));
document.querySelector('#closeCelebration').addEventListener('click', () => celebration.classList.remove('is-visible'));

const song = document.querySelector('#futureVideo');
const musicToggle = document.querySelector('#musicToggle');
musicToggle.addEventListener('click', async () => {
  if (song.paused) {
    try { await song.play(); } catch (error) { musicToggle.setAttribute('aria-label', 'The soundtrack could not be played'); return; }
    musicToggle.parentElement.classList.add('is-playing');
    musicToggle.querySelector('.play-icon').textContent = 'Ⅱ';
    musicToggle.setAttribute('aria-label', 'Pause our song');
  } else {
    song.pause();
    musicToggle.parentElement.classList.remove('is-playing');
    musicToggle.querySelector('.play-icon').textContent = '▶';
    musicToggle.setAttribute('aria-label', 'Play our song');
  }
});