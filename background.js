importScripts("remove.js");

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  chrome.contextMenus.create({
    id: "remove-popup",
    title: "Remove popup",
    contexts: ["page"],
    documentUrlPatterns: VZY_PATTERNS
  });

  // Manifest content scripts only run on pages loaded after install, so add
  // the floating button to vzy tabs that are already open.
  if (reason !== "install" && reason !== "update") return;
  const tabs = await chrome.tabs.query({ url: VZY_PATTERNS });
  for (const tab of tabs) {
    chrome.scripting
      .executeScript({ target: { tabId: tab.id }, files: ["remove.js", "content.js"] })
      .catch(() => {}); // e.g. discarded tabs
  }
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
