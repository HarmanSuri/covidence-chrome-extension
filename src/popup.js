"use strict";
console.log("Hello, from popup.js");

function setBadgeText(enabled) {
  const text = enabled ? "ON" : "OFF";
  void chrome.action.setBadgeText({ text: text });
}

const enabledCheckbox = document.getElementById("enabled");
const autoCheckbox = document.getElementById("auto-start");
const timeInput = document.getElementById("scan-time");
const goalInput = document.getElementById("goal");
const resetButton = document.getElementById("reset");

chrome.storage.sync.get("enabled", (data) => {
  enabledCheckbox.checked = !!data.enabled;
  void setBadgeText(data.enabled);
});
enabledCheckbox.addEventListener("change", (event) => {
  if (event.target instanceof HTMLInputElement) {
    void chrome.storage.sync.set({ enabled: event.target.checked });
    void setBadgeText(event.target.checked);
    autoCheckbox.disabled = !event.target.checked;
    timeInput.disabled = !event.target.checked;
    goalInput.disabled = !event.target.checked;
  }
});

chrome.storage.sync.get("autoStart", (data) => {
  autoCheckbox.checked = !!data.autoStart;
});
autoCheckbox.addEventListener("change", (event) => {
  if (event.target instanceof HTMLInputElement) {
    void chrome.storage.sync.set({ autoStart: event.target.checked });
  }
});

chrome.storage.sync.get("scanTime", (data) => {
  timeInput.valueAsNumber = data.scanTime || "";
});
timeInput.addEventListener("change", (event) => {
  if (event.target instanceof HTMLInputElement) {
    let timeValue = event.target.value < 1 ? 1 : event.target.value;
    void chrome.storage.sync.set({ scanTime: timeValue });
    timeInput.valueAsNumber = timeValue;
  }
});

chrome.storage.sync.get("goal", (data) => {
  goalInput.valueAsNumber = data.goal || "";
});
goalInput.addEventListener("change", (event) => {
  if (event.target instanceof HTMLInputElement) {
    let goal = event.target.value < 1 ? 1 : event.target.value;
    void chrome.storage.sync.set({ goal: goal });
    goalInput.valueAsNumber = goal;
  }
});

resetButton.addEventListener("click", (event) => {
  if (event.target instanceof HTMLButtonElement) {
    void chrome.storage.sync.set({ scanned: 0 });
  }
});
