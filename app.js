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
  "When did you first feel I am special?",
  "What is your favorite memory with me?",
  "What do you love most about us?",
  "Who is the better programmer? 😄",
  "Which language best describes our love? (Python/Java/C++/LoveScript ❤️)",
  "Where do you see us in 5 years?",
  "Are you ready for lifetime debugging with me?",
];

const answers = Array(questions.length).fill("");
let storyIndex = 0;
let questionIndex = 0;

const storyCard = document.getElementById("storyCard");
const typewriter = document.getElementById("typewriter");
const daysTogether = document.getElementById("daysTogether");
const loveMeter = document.getElementById("loveMeter");
const questionText = document.getElementById("questionText");
const answerInput = document.getElementById("answerInput");
const progressBar = document.getElementById("progressBar");
const compiledMessage = document.getElementById("compiledMessage");
const successStatus = document.getElementById("successStatus");
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");

function showSection(id) {
  Object.values(sections).forEach((el) => {
    el.classList.remove("active");
    el.classList.add("hidden");
  });
  sections[id].classList.remove("hidden");
  sections[id].classList.add("active");
}

function renderStory() {
  const card = storyCards[storyIndex];
  storyCard.innerHTML = `<h2>${card.title}</h2><p>${card.body}</p><p><strong>Card ${storyIndex + 1}/${storyCards.length}</strong></p>`;
}

function animateTypewriter(text, i = 0) {
  if (i === 0) typewriter.textContent = "";
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
  setTimeout(() => {
    loveMeter.style.width = "100%";
  }, 300);
}

function renderQuestion() {
  questionText.textContent = questions[questionIndex];
  answerInput.value = answers[questionIndex] || "";
  progressBar.style.width = `${((questionIndex + 1) / questions.length) * 100}%`;
}

async function saveResponses() {
  const payload = {
    partnerName: "Sumia",
    answers: Object.fromEntries(questions.map((q, i) => [`q${i + 1}`, answers[i]])),
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
  answers[questionIndex] = answerInput.value.trim();
  questionIndex = Math.max(0, questionIndex - 1);
  renderQuestion();
});

document.getElementById("nextQuestion").addEventListener("click", async () => {
  answers[questionIndex] = answerInput.value.trim();
  if (!answers[questionIndex]) {
    answerInput.focus();
    return;
  }

  if (questionIndex < questions.length - 1) {
    questionIndex += 1;
    renderQuestion();
    return;
  }

  showSection("ending");
  compiledMessage.textContent = `Your answers made this journey even more special. My favorite part: "${answers[1]}". Thank you for being my peace, my partner, and my forever love.`;
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
