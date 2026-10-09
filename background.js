importScripts("remove.js");

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "remove-popup",
    title: "Remove popup",
    contexts: ["page"],
    documentUrlPatterns: VZY_PATTERNS
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "remove-popup" && tab?.id) {
    runInTab(tab.id, removePopups).catch(console.error);
  }
});

chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "remove-popup") return;
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  if (tab?.id && isVzyUrl(tab.url)) {
    runInTab(tab.id, removePopups).catch(console.error);
  }
});
