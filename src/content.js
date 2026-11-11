let timeToScan = 30;
let timerInterval;
let goal = 100;
let scanned = 0;

// timer display
const containerDiv = document.createElement("div");
const headerDiv = document.createElement("div");
const timerDiv = document.createElement("div");
const countDiv = document.createElement("div");

containerDiv.id = "covidence-container";
headerDiv.id = "covidence-header";
timerDiv.id = "covidence-timer";
countDiv.id = "covidence-count";

containerDiv.append(timerDiv);
containerDiv.append(countDiv);

document.body.appendChild(containerDiv);

// Enable content script by default
let enabled = true;
let autoStart = false;
const keys = ["enabled", "autoStart", "scanTime", "goal", "scanned"];

updateCount(scanned);
updateTimer(timeToScan);

chrome.storage.sync.set({ scanned: scanned });

chrome.storage.sync.get(keys, (data) => {
  if (data.enabled === false) {
    enabled = false;
  }
  if (data.autoStart === true) {
    autoStart = true;
  }
  if (data.scanTime) {
    timeToScan = data.scanTime;
  }
  if (data.goal) {
    goal = data.goal;
  }
  if (data.scanned) {
    scanned = data.scanned;
  }
});

chrome.storage.onChanged.addListener((changes, _area) => {
  if (changes.enabled) {
    enabled = !!changes.enabled.newValue;
  }
  if (changes.autoStart) {
    autoStart = !!changes.autoStart.newValue;
  }
  if (changes.scanTime) {
    timeToScan = changes.scanTime.newValue;
  }
  if (changes.goal) {
    goal = changes.goal.newValue;
    updateCount(scanned);
  }
  if (changes.scanned) {
    scanned = changes.scanned.newValue;
    updateCount(scanned);
  }
});

function startTimer() {
  let timeRemaining = timeToScan;

  updateTimer(timeRemaining);
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timeRemaining--;

    updateTimer(timeRemaining);

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      timerDiv.textContent = "Time's up";
      containerDiv.style.backgroundColor = "red";

      setTimeout(() => {
        containerDiv.style.backgroundColor = "#1e293b";
      }, 1000);
    }
  }, 1000);
}

function endTimer() {}

function updateTimer(time) {
  const seconds = time;
  timerDiv.textContent = `Time to review: ${seconds}`;
}

function updateCount(count) {
  chrome.storage.sync.set({ scanned: count });
  countDiv.textContent = `Papers remaining: ${goal - count}`;
}

document.addEventListener("keydown", (e) => {
  // Prevent hotkeys when typing in input/textarea elements
  if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

  const key = e.key.toLowerCase();

  if (enabled && key === "e") {
    startTimer();
  }
});

document.addEventListener("click", (e) => {
  let buttonType = e.target.dataset.pendoKey;
  if (autoStart && buttonType) {
    startTimer();
  }

  if (buttonType === "vote-button") {
    scanned++;
  } else if (buttonType === "undo-vote") {
    scanned--;
  }
  updateCount(scanned);
});

const observer = new MutationObserver(() => {
  startTimer();
});
