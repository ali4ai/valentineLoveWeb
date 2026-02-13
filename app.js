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

// Put your own audio file here, e.g. "audio/our-song.mp3"
const customAudio = "audio/our-song.mp3";

const captions = [
  "My favorite smile",
  "The day everything changed",
  "Forever begins here",
  "Our happiest memory",
  "A moment of destiny",
  "Love in every glance",
  "My safe place",
  "My answered prayer",
  "Our forever chapter",
];

function imageFor(i) {
  return customImages[i] || fallbackImages[i] || fallbackImages[0];
}
function pimageFor(i) {
  return personalImages[i] || fallbackImages[i] || fallbackImages[0];
}

function addPhoto(container, src, alt, klass = "") {
  const el = document.createElement("article");
  el.className = `photo-card reveal ${klass}`;
  el.innerHTML = `<img src="${src}" alt="${alt}" onerror="this.onerror=null;this.src='${fallbackImages[0]}'"/>`;
  container.appendChild(el);
}

function build() {
  document.getElementById("heroBg").src = imageFor(10);
  document.getElementById("togetherPhoto").src = imageFor(8);
  document.getElementById("endingPhoto").src = imageFor(10);

  const left = document.getElementById("leftPhotos");
  const right = document.getElementById("rightPhotos");
  for (let i = 0; i < 4; i++) {
    addPhoto(left, pimageFor(i), `My photo ${i + 1}`, i % 2 ? "rot-r" : "rot-l");
    addPhoto(right, pimageFor(i + 2), `Lover photo ${i + 1}`, i % 2 ? "rot-l" : "rot-r");
  }

  const mLeft = document.getElementById("mergeLeft");
  const mRight = document.getElementById("mergeRight");
  for (let i = 0; i < 3; i++) {
    addPhoto(mLeft, pimageFor(i), `Merge left ${i + 1}`);
    addPhoto(mRight, pimageFor(i + 3), `Merge right ${i + 1}`);
  }

  const masonry = document.getElementById("masonry");
  for (let i = 0; i < 9; i++) {
    const cap = captions[i % captions.length];
    const card = document.createElement("article");
    card.className = `masonry-item reveal ${i % 3 === 0 ? "tall" : ""}`;
    card.innerHTML = `<img src="${imageFor(i)}" alt="Memory ${i + 1}" onerror="this.onerror=null;this.src='${fallbackImages[0]}'"/><span>${cap}</span>`;
    masonry.appendChild(card);
  }
}

function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => e.isIntersecting && e.target.classList.add("show"));
    },
    { threshold: 0.16 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

function typeWriter(text, i = 0) {
  const target = document.getElementById("typewriter");
  if (i === 0) target.textContent = "";
  if (i < text.length) {
    target.textContent += text[i];
    setTimeout(() => typeWriter(text, i + 1), 38);
  }
}

function confettiHearts(duration = 2200) {
  const canvas = document.getElementById("fxCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  const particles = Array.from({ length: 90 }, () => ({
    x: Math.random() * canvas.width,
    y: canvas.height + Math.random() * 50,
    s: Math.random() * 9 + 6,
    v: Math.random() * 2 + 1,
    a: Math.random() * Math.PI,
  }));
  const start = performance.now();
  let raf;

  function heart(x, y, size) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 18, size / 18);
    ctx.fillStyle = "#f85a9f";
    ctx.beginPath();
    ctx.moveTo(0, 6);
    ctx.bezierCurveTo(0, 0, -10, 0, -10, 6);
    ctx.bezierCurveTo(-10, 12, 0, 18, 0, 18);
    ctx.bezierCurveTo(0, 18, 10, 12, 10, 6);
    ctx.bezierCurveTo(10, 0, 0, 0, 0, 6);
    ctx.fill();
    ctx.restore();
  }

  function frame(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.y -= p.v;
      p.x += Math.sin(p.a) * 1.1;
      p.a += 0.06;
      heart(p.x, p.y, p.s);
    });
    if (t - start < duration) raf = requestAnimationFrame(frame);
    else {
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  raf = requestAnimationFrame(frame);
}

function setupAudio() {
  const audio = document.getElementById("bgMusic");
  const btn = document.getElementById("musicToggle");
  audio.src = customAudio;
  btn.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
        btn.textContent = "🎵 Music: On";
      } else {
        audio.pause();
        btn.textContent = "🎵 Music: Off";
      }
    } catch {
      btn.textContent = "🎵 Add your audio file";
    }
  });
}


function setupMemoryLightbox() {
  const masonry = document.getElementById("masonry");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");

  masonry.addEventListener("click", (e) => {
    const item = e.target.closest(".masonry-item");
    if (!item) return;
    const img = item.querySelector("img");
    if (!img) return;
    lightboxImg.src = img.currentSrc || img.src;
    lightbox.classList.remove("hidden");
    lightbox.setAttribute("aria-hidden", "false");
  });

  lightbox.addEventListener("click", () => {
    lightbox.classList.add("hidden");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
  });
}

build();
setupMemoryLightbox();
initReveal();
setupAudio();
typeWriter("Every moment with you feels magical. You are my today and all my tomorrows ❤️");

document.getElementById("foreverBtn").addEventListener("click", () => {
  document.getElementById("finalQuote").classList.remove("hidden");
  confettiHearts();
});
