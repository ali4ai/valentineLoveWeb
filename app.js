const cardData = [
  { title: "🌸 The Unexpected Beginning", message: "From one small moment, our forever story quietly began." },
  { title: "🌹 The Beautiful Secret", message: "My heart knew your name before I ever said it." },
  { title: "🌺 The Moment Truth Bloomed", message: "Love became real the day your smile became my home." },
  { title: "💕 Falling Deeper", message: "With every memory, I found new reasons to love you more." },
  { title: "🌷 Your Beauty", message: "Your soul is the most beautiful place my heart has known." },
  { title: "🌙 My Gratitude", message: "Every dua of mine carries your name with gratitude." },
  { title: "🤍 My Peace", message: "You are the calm that softens every storm in me." },
  { title: "💍 My Future With You", message: "I dream of building every tomorrow with you." },
  { title: "🌸 My Duas For You", message: "May our love always be protected, blessed, and pure." },
  { title: "🌟 917 Days Together", message: "917 days of memories, laughter, growth, and endless love." },
  { title: "❤️ My Forever Valentine", message: "You are my today, tomorrow, and forever." },
];

const customImages = Array.from({ length: 11 }, (_, i) => `images/cards/card${i + 1}.png`);
const personalImages = Array.from({ length: 6 }, (_, i) => `images/personal/card${i + 1}.jpg`);

const fallbackImages = [
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1519736709093-9f90a9591489?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1464863979621-258859e62245?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1504198322253-cfa87a0ff25f?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1452690700222-8a2a2a109f4c?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=1400&q=80",
];

const sections = {
  landing: document.getElementById("landing"),
  story: document.getElementById("story"),
  final: document.getElementById("final"),
};

const storySlides = document.getElementById("storySlides");
const photoWheel = document.getElementById("photoWheel");
let swiperInstance = null;

function showSection(id) {
  Object.values(sections).forEach((el) => {
    el.classList.remove("active");
    el.classList.add("hidden");
  });
  sections[id].classList.remove("hidden");
  sections[id].classList.add("active");
}

function imageFor(index) {
  return customImages[index] || fallbackImages[index] || fallbackImages[0];
}

function pimageFor(index) {
  return personalImages[index] || fallbackImages[index] || fallbackImages[0];
}

function renderWheel() {
  const nodes = cardData
    .map((card, i) => {
      const angle = (360 / cardData.length) * i;
      const fallback = personalImages || personalImages[0];
      return `<div class="wheel-item" style="--angle:${angle}deg"><img src="${pimageFor(i)}" alt="${card.title}" onerror="this.onerror=null;this.src='${fallback}'" /></div>`;
    })
    .join("");
  photoWheel.innerHTML = nodes;
}

function renderSlides() {
  storySlides.innerHTML = cardData
    .map((card, i) => {
      const fallback = fallbackImages[i] || fallbackImages[0];
      return `<div class="swiper-slide"><article class="love-slide"><img class="slide-bg portrait" src="${imageFor(i)}" alt="${card.title}" onerror="this.onerror=null;this.src='${fallback}'" /><div class="slide-overlay"></div><div class="slide-content" data-swiper-parallax="-120"><h3>${card.title}</h3><p>${card.message}</p></div></article></div>`;
    })
    .join("");
}

function initSwiper() {
  renderSlides();
  swiperInstance = new Swiper("#loveSwiper", {
    effect: "creative",
    speed: 900,
    loop: true,
    centeredSlides: true,
    slidesPerView: 1,
    grabCursor: true,
    parallax: true,
    creativeEffect: {
      prev: { shadow: true, translate: ["-120%", 0, -500], rotate: [0, -20, 0], opacity: 0.45 },
      next: { shadow: true, translate: ["120%", 0, -500], rotate: [0, 20, 0], opacity: 0.45 },
    },
    autoplay: { delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true },
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  });
}

function launchConfetti(duration = 2600) {
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    r: Math.random() * 5 + 3,
    d: Math.random() * 3 + 2,
    c: ["#f9518d", "#ffd166", "#ffffff", "#c77dff"][Math.floor(Math.random() * 4)],
  }));

  let raf;
  const start = performance.now();
  function frame(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      p.y += p.d;
      p.x += Math.sin(p.y * 0.02);
      if (p.y > canvas.height + 10) p.y = -10;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c;
      ctx.fill();
    }
    if (t - start < duration) raf = requestAnimationFrame(frame);
    else {
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  raf = requestAnimationFrame(frame);
}

renderWheel();
initSwiper();

document.getElementById("startJourney").addEventListener("click", () => {
  showSection("story");
  swiperInstance?.autoplay?.start();
});

document.getElementById("showFinal").addEventListener("click", () => {
  showSection("final");
  launchConfetti();
});

document.getElementById("restartJourney").addEventListener("click", () => {
  showSection("landing");
});
