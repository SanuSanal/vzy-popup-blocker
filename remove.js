// Shared by popup.js, background.js and content.js.

const VZY_PATTERNS = [
  "*://vzy.com/*",
  "*://*.vzy.com/*",
  "*://vzy.one/*",
  "*://*.vzy.one/*"
];

function isVzyUrl(url) {
  try {
    return /(^|\.)vzy\.(com|one)$/.test(new URL(url).hostname);
  } catch {
    return false;
  }
}

// Runs inside the page.
function countPopups() {
  return document.querySelectorAll('div[role="presentation"]').length;
}

// Runs inside the page.
function removePopups() {
  const popups = document.querySelectorAll('div[role="presentation"]');
  popups.forEach((el) => el.remove());
  // Modals often lock scrolling; undo that.
  for (const el of [document.documentElement, document.body]) {
    if (el && el.style.overflow === "hidden") el.style.overflow = "";
  }
  return popups.length;
}

async function runInTab(tabId, func) {
  const [result] = await chrome.scripting.executeScript({
    target: { tabId },
    func
  });
  return result?.result;
}
