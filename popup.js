const statusEl = document.getElementById("status");
const button = document.getElementById("remove");
let tabId;

async function init() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !isVzyUrl(tab.url)) {
    statusEl.textContent = "Not a VZY page";
    return;
  }
  tabId = tab.id;
  const count = await runInTab(tabId, countPopups);
  if (count > 0) {
    statusEl.textContent = `${count} popup(s) found`;
    button.disabled = false;
  } else {
    statusEl.textContent = "No popup found";
  }
}

button.addEventListener("click", async () => {
  button.disabled = true;
  try {
    const removed = await runInTab(tabId, removePopups);
    statusEl.textContent = `Removed ${removed}`;
  } catch (err) {
    statusEl.textContent = `Error: ${err.message}`;
  }
});

init().catch((err) => {
  statusEl.textContent = `Error: ${err.message}`;
});
