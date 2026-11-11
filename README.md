# covidence-chrome-extension

> **A Chrome extension to help with initial paper screening in Covidence**
<img width="200" alt="image" src="https://github.com/user-attachments/assets/f8d45cd5-0258-4fb1-9cd2-d911efe5c6ca" />
<img width="800" alt="image" src="https://github.com/user-attachments/assets/d7128d9c-883b-47af-854f-22dda12a1bee" />

---

## Description
When conducting research, especially literature reviews, the first step is to gather many research papers. After gathering the papers, you need to narrow them down to fit your inclusion/exclusion criteria, which can be very time-consuming.

This Chrome extension helps with the initial paper abstract and title screening, which should be relatively quick. It works within a common screening tool, [Covidence](https://app.covidence.org/), by providing a timer to limit screening time and a goal tracker to aim for a certain number of papers screened.

## Quick Start
### 1. Install Extension
```bash
# Clone the repository
git clone https://github.com/HarmanSuri/covidence-chrome-extension.git
```

### 2. Load in Chrome
Navigate to [chrome://extensions/](chrome://extensions/) and turn Developer Mode on in the top right

Click "Load unpacked" and open the src file from the cloned project.
<img width="1535" height="169" alt="image" src="https://github.com/user-attachments/assets/307c280e-2803-4004-9c8e-a42dc9f6623e" />

The extension should've been added. If it doesn't appear in the toolbar immediately, click on the Extensions icon and pin "Covidence Speed Scanner"

## Usage
Click on the extension icon to load the extension.

On Covidence, press "e" to begin the timer. Then simply vote on a paper as normal, whether that's before the timer is done or after.

To change the extension's settings, click on the extension in the toolbar:
- Enable Extension: Turn the extension on or off
- Autostart Timer: When this is on, the timer automatically begins after voting on a paper
- Scan time: How many seconds you have to scan a paper
- Goal: How many papers you aim to screen
- Reset: Reset the goal tracker
