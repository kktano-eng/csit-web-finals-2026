// Mobile menu
const btn = document.getElementById('menu');
const nav = document.getElementById('nav');

btn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});

nav.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', false);
  }
});

// Starfield background
const c = document.getElementById('stars');
const x = c.getContext('2d');
let W, H, stars = [];

function size() {
  W = c.width = innerWidth;
  H = c.height = innerHeight;
  stars = Array.from({ length: Math.min(220, Math.floor(W * H / 6000)) }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.4 + .2,
    p: Math.random() * 6.28,
    s: Math.random() * .02 + .005,
    warm: Math.random() < .2
  }));
}

function draw(t) {
  x.clearRect(0, 0, W, H);
  for (const s of stars) {
    const a = .4 + .6 * Math.abs(Math.sin(s.p + t * s.s * .1));
    x.fillStyle = s.warm ? `rgba(255,190,100,${a})` : `rgba(220,225,255,${a})`;
    x.beginPath();
    x.arc(s.x, s.y, s.r, 0, 6.28);
    x.fill();
    s.y += s.r * .03;
    if (s.y > H) s.y = 0;
  }
  if (!matchMedia('(prefers-reduced-motion:reduce)').matches) requestAnimationFrame(draw);
}

addEventListener('resize', size);
size();
requestAnimationFrame(draw);