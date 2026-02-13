import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "REPLACE_ME",
  authDomain: "REPLACE_ME",
  projectId: "REPLACE_ME",
  storageBucket: "REPLACE_ME",
  messagingSenderId: "REPLACE_ME",
  appId: "REPLACE_ME",
};

let db = null;
const isFirebaseConfigured = !Object.values(firebaseConfig).some((v) => v === "REPLACE_ME");
if (isFirebaseConfigured) {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}

const defaultPortraits = [
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519736709093-9f90a9591489?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1464863979621-258859e62245?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
];

const customPortraits = [
  "images/cards/card1.png",
  "images/cards/card2.png",
  "images/cards/card3.png",
  "images/cards/card4.png",
  "images/cards/card5.png",
];

const sections = {
  landing: document.getElementById("landing"),
  story: document.getElementById("story"),
  memories: document.getElementById("memories"),
  questionnaire: document.getElementById("questionnaire"),
  ending: document.getElementById("ending"),
};

const storyCards = [
  {
    title: "Our First Meeting",
    body: "The day we met felt like finding a missing piece of my heart. I still remember that first moment and the calm happiness it gave me.",
  },
  {
    title: "From Friends to Us",
    body: "Our conversations, our shared Computer Science world, and all those little moments slowly became the best part of every day.",
  },
  {
    title: "When I Realized",
    body: "I realized I loved you when your smile started feeling like home and your happiness became the thing I cared for most.",
  },
  {
    title: "Why You Are Special",
    body: "You are kind, brilliant, and endlessly supportive. You are the person who makes every difficult day feel lighter.",
  },
  {
    title: "Our Future Dreams",
    body: "A life with love, growth, shared goals, and peaceful evenings together. I can see us building something beautiful forever.",
  },
];

const questions = [
  {
    section: "Section 1 — Our Love Story (Past & Memories)",
    key: "firstSpecialMoment",
    prompt: "When did you first feel I was special?",
    type: "text",
  },
  {
    section: "Section 1 — Our Love Story (Past & Memories)",
    key: "favoriteMemory",
    prompt: "What is your favorite memory of us together?",
    type: "paragraph",
  },
  {
    section: "Section 1 — Our Love Story (Past & Memories)",
    key: "smileMoment",
    prompt: "Which moment made you smile the most because of me?",
    type: "text",
  },
  {
    section: "Section 1 — Our Love Story (Past & Memories)",
    key: "oneWordRelationship",
    prompt: "How would you describe our relationship in one word?",
    type: "text",
  },
  {
    section: "Section 1 — Our Love Story (Past & Memories)",
    key: "funniestPlayfulThing",
    prompt: "What is the funniest or most playful thing we’ve done together?",
    type: "text",
  },
  {
    section: "Section 2 — Present Feelings",
    key: "loveMost",
    prompt: "What do you love most about me?",
    type: "text",
  },
  {
    section: "Section 2 — Present Feelings",
    key: "qualityLoved",
    prompt: "Which of my qualities makes you feel loved and cared for?",
    type: "text",
  },
  {
    section: "Section 2 — Present Feelings",
    key: "happinessScale",
    prompt: "How happy do you feel when we are together?",
    type: "slider",
    min: 1,
    max: 10,
  },
  {
    section: "Section 2 — Present Feelings",
    key: "emojiFeeling",
    prompt: "Which emoji best describes your feelings for me right now?",
    type: "choice",
    options: ["❤️", "😍", "🥰", "💕", "🌹"],
  },
  {
    section: "Section 2 — Present Feelings",
    key: "firstHeartFeeling",
    prompt: "When you think of us, what feeling comes to your heart first?",
    type: "text",
  },
  {
    section: "Section 3 — Future Together",
    key: "usIn5Years",
    prompt: "Where do you see us in 5 years?",
    type: "paragraph",
  },
  {
    section: "Section 3 — Future Together",
    key: "futureGoals",
    prompt: "What dreams or goals do you want us to achieve together?",
    type: "paragraph",
  },
  {
    section: "Section 3 — Future Together",
    key: "futureLifeFeeling",
    prompt: "What do you hope our life together will feel like?",
    type: "text",
  },
  {
    section: "Section 3 — Future Together",
    key: "futureMemories",
    prompt: "What kind of memories do you want us to create in the coming years?",
    type: "paragraph",
  },
  {
    section: "Section 3 — Future Together",
    key: "wishOrDua",
    prompt: "Write one wish or prayer (dua) for our love and future together.",
    type: "paragraph",
  },
];

const answers = {};
let storyIndex = 0;
let questionIndex = 0;

const storyCard = document.getElementById("storyCard");
const typewriter = document.getElementById("typewriter");
const daysTogether = document.getElementById("daysTogether");
const loveMeter = document.getElementById("loveMeter");
const questionText = document.getElementById("questionText");
const answerInputWrap = document.getElementById("answerInputWrap");
const progressBar = document.getElementById("progressBar");
const compiledMessage = document.getElementById("compiledMessage");
const successStatus = document.getElementById("successStatus");
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");
const portraitGallery = document.getElementById("portraitGallery");
const emojiReaction = document.getElementById("emojiReaction");
const questionSectionTag = document.getElementById("questionSectionTag");

function showSection(id) {
  Object.values(sections).forEach((el) => {
    el.classList.remove("active");
    el.classList.add("hidden");
  });
  sections[id].classList.remove("hidden");
  sections[id].classList.add("active");
}

function safePortrait(index) {
  return customPortraits[index] || defaultPortraits[index] || defaultPortraits[0];
}

function renderStory() {
  const card = storyCards[storyIndex];
  const fallback = defaultPortraits[storyIndex] || defaultPortraits[0];
  storyCard.innerHTML = `
    <div class="story-image-wrap">
      <img src="${safePortrait(storyIndex)}" alt="Love memory card ${storyIndex + 1}" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'" />
    </div>
    <div class="story-content">
      <h2>${card.title}</h2>
      <p>${card.body}</p>
      <p><strong>Card ${storyIndex + 1}/${storyCards.length}</strong></p>
      <p class="small-hint">Optimized for love-letter portraits (1024×1536) with text.</p>
    </div>`;
}

function renderPortraitGallery() {
  portraitGallery.innerHTML = storyCards
    .map((_, idx) => {
      const fallback = defaultPortraits[idx] || defaultPortraits[0];
      return `<div class="portrait-card"><img src="${safePortrait(idx)}" alt="Memory portrait ${idx + 1}" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'" /></div>`;
    })
    .join("");
}

function animateTypewriter(text, i = 0) {
  if (i === 0) {
    typewriter.textContent = "";
  }
  if (i < text.length) {
    typewriter.textContent += text[i];
    setTimeout(() => animateTypewriter(text, i + 1), 28);
  }
}

function setupMemories() {
  const startDate = new Date("2024-02-14");
  const now = new Date();
  const days = Math.max(0, Math.floor((now - startDate) / (1000 * 60 * 60 * 24)));
  daysTogether.textContent = `${days} days of love and counting...`;
  animateTypewriter(
    "You are my favorite notification, my best algorithm, and my forever person. Every chapter with you is my favorite one."
  );
  renderPortraitGallery();
  setTimeout(() => {
    loveMeter.style.width = "100%";
  }, 300);
}

function getCurrentValue() {
  const q = questions[questionIndex];
  if (q.type === "choice") {
    const checked = answerInputWrap.querySelector('input[name="emojiChoice"]:checked');
    return checked ? checked.value : "";
  }
  if (q.type === "slider") {
    const slider = answerInputWrap.querySelector("input[type='range']");
    return slider ? slider.value : "";
  }
  const input = answerInputWrap.querySelector("input, textarea");
  return input ? input.value.trim() : "";
}

function renderInputForQuestion(q) {
  const existingValue = answers[q.key] ?? "";

  if (q.type === "paragraph") {
    answerInputWrap.innerHTML = `<textarea id="dynamicAnswer" rows="4" placeholder="Write your answer...">${existingValue}</textarea>`;
    return;
  }

  if (q.type === "slider") {
    const value = existingValue || String(q.max);
    answerInputWrap.innerHTML = `
      <div class="slider-wrap">
        <input id="dynamicAnswer" type="range" min="${q.min}" max="${q.max}" value="${value}" />
        <p id="sliderValue">${value}/10</p>
      </div>`;

    const slider = document.getElementById("dynamicAnswer");
    const sliderValue = document.getElementById("sliderValue");
    slider.addEventListener("input", () => {
      sliderValue.textContent = `${slider.value}/10`;
    });
    return;
  }

  if (q.type === "choice") {
    answerInputWrap.innerHTML = `<div class="choice-grid">${q.options
      .map((opt) => {
        const checked = existingValue === opt ? "checked" : "";
        return `<label class="choice-pill"><input type="radio" name="emojiChoice" value="${opt}" ${checked} /><span>${opt}</span></label>`;
      })
      .join("")}</div>`;
    return;
  }

  answerInputWrap.innerHTML = `<input id="dynamicAnswer" type="text" placeholder="Type your answer..." value="${existingValue}" />`;
}

function renderQuestion() {
  const q = questions[questionIndex];
  questionText.textContent = q.prompt;
  questionSectionTag.textContent = q.section;
  progressBar.style.width = `${((questionIndex + 1) / questions.length) * 100}%`;
  emojiReaction.textContent = q.type === "choice" ? "💖" : q.type === "slider" ? "😊" : "🥰";
  renderInputForQuestion(q);
}

function saveCurrentAnswer() {
  const q = questions[questionIndex];
  answers[q.key] = getCurrentValue();
}

async function saveResponses() {
  const payload = {
    partnerName: "Sumia",
    answers,
    submittedAt: isFirebaseConfigured ? serverTimestamp() : new Date().toISOString(),
    deviceInfo: navigator.userAgent,
  };

  if (!db) {
    localStorage.setItem("valentineResponses", JSON.stringify(payload));
    return { ok: true, fallback: true };
  }

  await addDoc(collection(db, "valentineResponses"), payload);
  return { ok: true, fallback: false };
}

function launchConfetti(duration = 3500) {
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 130 }, () => ({
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
      if (p.y > canvas.height + 10) {
        p.y = -10;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c;
      ctx.fill();
    }
    if (t - start < duration) {
      raf = requestAnimationFrame(frame);
    } else {
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  raf = requestAnimationFrame(frame);
}

document.getElementById("startJourney").addEventListener("click", () => {
  showSection("story");
  renderStory();
});

document.getElementById("prevStory").addEventListener("click", () => {
  storyIndex = Math.max(0, storyIndex - 1);
  renderStory();
});

document.getElementById("nextStory").addEventListener("click", () => {
  if (storyIndex < storyCards.length - 1) {
    storyIndex += 1;
    renderStory();
  } else {
    showSection("memories");
    setupMemories();
  }
});

document.getElementById("toQuestions").addEventListener("click", () => {
  showSection("questionnaire");
  renderQuestion();
});

document.getElementById("prevQuestion").addEventListener("click", () => {
  saveCurrentAnswer();
  questionIndex = Math.max(0, questionIndex - 1);
  renderQuestion();
});

document.getElementById("nextQuestion").addEventListener("click", async () => {
  saveCurrentAnswer();
  const currentQuestion = questions[questionIndex];

  if (!answers[currentQuestion.key]) {
    return;
  }

  if (questionIndex < questions.length - 1) {
    questionIndex += 1;
    renderQuestion();
    return;
  }

  showSection("ending");
  compiledMessage.textContent = `Your words made this journey even more special. My favorite memory from your answers: "${answers.favoriteMemory || "Every moment with you"}". Thank you for being my peace, my partner, and my forever love.`;
  launchConfetti();

  try {
    const result = await saveResponses();
    successStatus.textContent = result.fallback
      ? "Saved safely on this device. Add Firebase config to upload to Firestore."
      : "Your responses were saved to Firebase successfully!";
  } catch (err) {
    successStatus.textContent = "I couldn't upload right now, but the love is still valid forever ❤️";
    console.error(err);
  }
});

document.getElementById("restartJourney").addEventListener("click", () => {
  storyIndex = 0;
  questionIndex = 0;
  showSection("landing");
});

musicToggle.addEventListener("click", async () => {
  try {
    if (bgMusic.paused) {
      await bgMusic.play();
      musicToggle.textContent = "🎵 Music: On";
    } else {
      bgMusic.pause();
      musicToggle.textContent = "🎵 Music: Off";
    }
  } catch {
    musicToggle.textContent = "🎵 Tap again to enable";
  }
});
