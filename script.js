// DOM Elemente
const elements = {
  startBtn: document.getElementById("startBtn"),
  shopBtn: document.getElementById("shopBtn"),
  tutorial: document.getElementById("tutorial"),
  tutorialCloseBtn: document.getElementById("tutorialCloseBtn"),
  loading: document.getElementById("loading"),
  gameContainer: document.getElementById("gameContainer"),
  questionText: document.getElementById("questionText"),
  answerList: document.getElementById("answerList"),
  nextBtn: document.getElementById("nextBtn"),
  ruffyImg: document.getElementById("ruffyImg"),
  ruffyText: document.getElementById("ruffyText"),
  checkpointNotification: document.getElementById("checkpointNotification"),
  xpAmount: document.getElementById("xpAmount"),
  shop: document.getElementById("shop"),
  closeShopBtn: document.getElementById("closeShopBtn"),
  shopItemsContainer: document.getElementById("shopItemsContainer"),
  shopXp: document.getElementById("shopXp"),
};

// Spielzustand
let currentQuestionIndex = 0;
let score = 0; // richtig beantwortete Fragen
let xp = 0;
let jokerUsedThisQuestion = false;

const QUESTIONS = [
  {
    question: "Wer ist der Kapitän der Strohhutpiraten?",
    answers: ["Ruffy", "Zorro", "Sanji", "Nami"],
    correct: 0,
    hint: "Er hat eine Strohhutmütze.",
    difficulty: "normal"
  },
  {
    question: "Wie heißt Ruffys Teufelsfrucht?",
    answers: ["Gum-Gum-Frucht", "Feuer-Frucht", "Blitz-Frucht", "Schlangen-Frucht"],
    correct: 0,
    hint: "Sie macht seinen Körper dehnbar.",
    difficulty: "normal"
  },
  {
    question: "Wer ist der Schwertkämpfer der Strohhutbande?",
    answers: ["Zorro", "Franky", "Chopper", "Brook"],
    correct: 0,
    hint: "Er hat drei Schwerter.",
    difficulty: "normal"
  },
  {
    question: "Was ist das Ziel von Ruffy?",
    answers: ["Piratenkönig werden", "König der Marines", "Schatzjäger", "Kapitän der Marine"],
    correct: 0,
    hint: "Er will den größten Schatz finden.",
    difficulty: "normal"
  },
  {
    question: "Wie heißt Ruffys Schiffsarzt?",
    answers: ["Chopper", "Sanji", "Robin", "Franky"],
    correct: 0,
    hint: "Er ist ein Rentier.",
    difficulty: "normal"
  },
  {
    question: "Welche Farbe hat Nami oft als Haarfarbe?",
    answers: ["Orange", "Blau", "Schwarz", "Grün"],
    correct: 0,
    hint: "Sie ist eine Navigatorin.",
    difficulty: "normal"
  },
  {
    question: "Wer kocht bei den Strohhüten?",
    answers: ["Sanji", "Zorro", "Franky", "Brook"],
    correct: 0,
    hint: "Er ist ein guter Koch und trägt eine Fliege.",
    difficulty: "normal"
  },
  {
    question: "Welches Tier ist Chopper?",
    answers: ["Rentier", "Hund", "Katze", "Vogel"],
    correct: 0,
    hint: "Er ist der Schiffsarzt.",
    difficulty: "normal"
  },
  {
    question: "Wer ist die Archäologin der Strohhutbande?",
    answers: ["Robin", "Nami", "Franky", "Chopper"],
    correct: 0,
    hint: "Sie kann alte Texte lesen.",
    difficulty: "normal"
  },
  {
    question: "Wie heißt das Schiff der Strohhutpiraten?",
    answers: ["Going Merry", "Thousand Sunny", "Moby Dick", "Red Force"],
    correct: 0,
    hint: "Es war das erste Schiff der Bande.",
    difficulty: "normal"
  },
  {
    question: "Wer ist der Musiker der Strohhüte?",
    answers: ["Brook", "Franky", "Zorro", "Sanji"],
    correct: 0,
    hint: "Er ist ein Skelett.",
    difficulty: "normal"
  },
  {
    question: "Was ist Sanjis Traum?",
    answers: ["Den All Blue finden", "Piratenkönig werden", "Erfinder werden", "König der Marines"],
    correct: 0,
    hint: "Ein legendäres Meer voller Fische.",
    difficulty: "normal"
  },
  {
    question: "Welche Teufelsfrucht hat Trafalgar Law gegessen?",
    answers: ["Ope Ope no Mi", "Gum-Gum-Frucht", "Mera Mera no Mi", "Hie Hie no Mi"],
    correct: 0,
    hint: "Er kann Räume manipulieren.",
    difficulty: "normal"
  },
  {
    question: "Wer ist der Anführer der Revolutionäre?",
    answers: ["Dragon", "Garcia", "Sabo", "Ivankov"],
    correct: 0,
    hint: "Er ist Ruffys Vater.",
    difficulty: "normal"
  },
  {
    question: "Wie heißt das Königreich von Nami?",
    answers: ["Kokon", "Dressrosa", "Alabasta", "Wano"],
    correct: 0,
    hint: "Sie stammt von dort.",
    difficulty: "normal"
  },
  {
    question: "Welche Frucht hat Smoker gegessen?",
    answers: ["Moku Moku no Mi", "Gum-Gum-Frucht", "Hie Hie no Mi", "Pika Pika no Mi"],
    correct: 0,
    hint: "Er kann Rauch kontrollieren.",
    difficulty: "normal"
  },
  {
    question: "Diese Frage ist wirklich schwer",
    answers: ["Antwort A", "Antwort B", "Antwort C", "Antwort D"],
    correct: 2,
    hint: "Denke gut nach, es ist eine harte Frage.",
    difficulty: "hard"
  },
  {
    question: "Was ist der Spitzname von Zorro?",
    answers: ["Piratenjäger", "Schwertmeister", "Der Grüne", "Der Blauhaarige"],
    correct: 0,
    hint: "Er ist ein Schwertkämpfer.",
    difficulty: "normal"
  },
  {
    question: "Wie heißt Ruffys Bruder?",
    answers: ["Sabo", "Ace", "Shanks", "Law"],
    correct: 0,
    hint: "Er ist Revolutionär.",
    difficulty: "normal"
  },
  {
    question: "Welcher Arzt gehört nicht zu den Strohhüten?",
    answers: ["Kureha", "Chopper", "Hiriluk", "Franky"],
    correct: 3,
    hint: "Er ist kein Arzt.",
    difficulty: "normal"
  },
];

// Shop Items
const SHOP_ITEMS = [
  { id: "hintJoker", name: "Hinweis-Joker (100 XP)", cost: 100, description: "Gibt bei einer Frage mehr Details." },
  { id: "skipJoker", name: "Frage überspringen (200 XP)", cost: 200, description: "Überspringt eine Frage." },
  { id: "doubleXp", name: "Doppel XP (300 XP)", cost: 300, description: "Verdoppelt XP für 5 Fragen." }
];

// Speichern & Laden
function saveGame() {
  localStorage.setItem("opQuizSave", JSON.stringify({ currentQuestionIndex, score, xp }));
}

function loadGame() {
  const save = localStorage.getItem("opQuizSave");
  if (save) {
    const data = JSON.parse(save);
    currentQuestionIndex = data.currentQuestionIndex;
    score = data.score;
    xp = data.xp;
    updateXPDisplay();
    return true;
  }
  return false;
}

// Anzeige aktualisieren
function updateXPDisplay() {
  elements.xpAmount.textContent = xp;
  elements.shopXp.textContent = xp;
}

function showLoading(show) {
  elements.loading.classList.toggle("hidden", !show);
}

function showCheckpointNotification() {
  elements.checkpointNotification.classList.remove("hidden");
  setTimeout(() => elements.checkpointNotification.classList.add("hidden"), 2500);
}

function showTutorial() {
  elements.tutorial.classList.remove("hidden");
  elements.gameContainer.classList.add("hidden");
  elements.shop.classList.add("hidden");
}

function hideTutorial() {
  elements.tutorial.classList.add("hidden");
  elements.gameContainer.classList.remove("hidden");
  elements.shop.classList.add("hidden");
}

function showShop() {
  elements.shop.classList.remove("hidden");
  elements.gameContainer.classList.add("hidden");
  elements.tutorial.classList.add("hidden");
  updateXPDisplay();
  renderShopItems();
}

function hideShop() {
  elements.shop.classList.add("hidden");
  elements.gameContainer.classList.remove("hidden");
  elements.tutorial.classList.add("hidden");
}

// Fragen und Antworten laden
function loadQuestion() {
  showLoading(true);
  jokerUsedThisQuestion = false;

  setTimeout(() => {
    showLoading(false);

    if (currentQuestionIndex >= QUESTIONS.length) {
      alert("Du hast alle Fragen geschafft! Glückwunsch!");
      resetGame();
      return;
    }

    const q = QUESTIONS[currentQuestionIndex];

    // Ruffys Bild setzen
    if ((currentQuestionIndex + 1) % 17 === 0) {
      elements.ruffyImg.src = "images/mini-ruffy-nachdenklich.png";
      elements.ruffyText.textContent = "Diese Frage ist wirklich schwer.";
    } else {
      elements.ruffyImg.src = "images/mini-ruffy-normal.png";
      elements.ruffyText.textContent = "";
    }

    elements.questionText.textContent = q.question;
    elements.answerList.innerHTML = "";

    q.answers.forEach((answer, index) => {
      const li = document.createElement("li");
      li.textContent = answer;
      li.addEventListener("click", () => selectAnswer(index));
      elements.answerList.appendChild(li);
    });

    elements.nextBtn.classList.add("hidden");
  }, 800);
}

function selectAnswer(selectedIndex) {
  if (elements.nextBtn.classList.contains("hidden") === false) return; // Bereits beantwortet

  const q = QUESTIONS[currentQuestionIndex];
  const allAnswers = elements.answerList.children;

  // Antworten deaktivieren
  Array.from(allAnswers).forEach((li) => li.style.pointerEvents = "none");

  if (selectedIndex === q.correct) {
    // Richtig
    xp += 10;
    score++;
    updateXPDisplay();

    // Kurz das "mini-ruffy.png" zeigen
    elements.ruffyImg.src = "images/mini-ruffy.png";
    elements.ruffyText.textContent = "Richtig!";
    setTimeout(() => {
      // Nach kurzer Zeit zurück
      if ((currentQuestionIndex + 1) % 17 === 0) {
        elements.ruffyImg.src = "images/mini-ruffy-nachdenklich.png";
        elements.ruffyText.textContent = "Diese Frage ist wirklich schwer.";
      } else {
        elements.ruffyImg.src = "images/mini-ruffy-normal.png";
        elements.ruffyText.textContent = "";
      }
    }, 1000);

    // Checkpoint alle 5 richtig beantworteten Fragen
    if (score % 5 === 0) {
      saveGame();
      showCheckpointNotification();
    }

  } else {
    // Falsch
    elements.ruffyImg.src = "images/mini-ruffy-sad.png";
    elements.ruffyText.textContent = "Falsch!";
  }

  // Richtige Antwort markieren
  allAnswers[q.correct].style.backgroundColor = "#0f0";

  // Falsche Antwort ggf. rot markieren
  if (selectedIndex !== q.correct) {
    allAnswers[selectedIndex].style.backgroundColor = "#f00";
  }

  elements.nextBtn.classList.remove("hidden");
}

function nextQuestion() {
  currentQuestionIndex++;
  loadQuestion();
}

// Reset Spiel
function resetGame() {
  currentQuestionIndex = 0;
  score = 0;
  xp = 0;
  updateXPDisplay();
  loadQuestion();
}

// Shop Items rendern
function renderShopItems() {
  elements.shopItemsContainer.innerHTML = "";
  SHOP_ITEMS.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("shop-item");
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p>Kosten: ${item.cost} XP</p>
      <button ${xp < item.cost ? "disabled" : ""}>Kaufen</button>
    `;
    const btn = div.querySelector("button");
    btn.addEventListener("click", () => buyItem(item));
    elements.shopItemsContainer.appendChild(div);
  });
}

// Item kaufen
function buyItem(item) {
  if (xp < item.cost) {
    alert("Nicht genug XP!");
    return;
  }
  xp -= item.cost;
  updateXPDisplay();
  alert(`Du hast "${item.name}" gekauft! (Noch keine Implementierung)`);
  renderShopItems();
}

// Event Listeners
elements.startBtn.addEventListener("click", () => {
  showTutorial();
});

elements.tutorialCloseBtn.addEventListener("click", () => {
  hideTutorial();
  loadQuestion();
  elements.startBtn.classList.add("hidden");
  elements.shopBtn.classList.remove("hidden");
});

elements.nextBtn.addEventListener("click", () => {
  nextQuestion();
});

elements.shopBtn.addEventListener("click", () => {
  showShop();
});

elements.closeShopBtn.addEventListener("click", () => {
  hideShop();
});

// Lade Spielstand
if (!loadGame()) {
  // Kein Spielstand, Tutorial zeigen, Shop verstecken bis Spielstart
  elements.shopBtn.classList.add("hidden");
  showTutorial();
} else {
  // Spielstand geladen, direkt Frage laden
  elements.startBtn.classList.add("hidden");
  elements.shopBtn.classList.remove("hidden");
  loadQuestion();
  elements.gameContainer.classList.remove("hidden");
}
