// Watches the page and shows a floating "Remove popup" button while a
// div[role="presentation"] exists. Uses countPopups/removePopups from remove.js.

(() => {
  const TAG = "vzy-popup-remover";

  // If the extension was reloaded, drop the button left by the old instance.
  document.querySelectorAll(TAG).forEach((el) => el.remove());

  // Shadow DOM keeps the page's CSS from restyling the button.
  const host = document.createElement(TAG);
  const shadow = host.attachShadow({ mode: "closed" });
  shadow.innerHTML = `
    <style>
      button {
        all: initial;
        position: fixed;
        right: calc(16px + env(safe-area-inset-right));
        bottom: calc(16px + env(safe-area-inset-bottom));
        z-index: 2147483647;
        min-height: 48px;
        padding: 0 20px;
        border-radius: 24px;
        background: #d93025;
        color: #fff;
        font: 600 16px system-ui, sans-serif;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
        cursor: pointer;
        touch-action: manipulation;
      }
      button[hidden] { display: none; }
    </style>
    <button type="button" hidden>✕ Remove popup</button>
  `;
  const button = shadow.querySelector("button");

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    removePopups();
    update();
  });

  function update() {
    button.hidden = countPopups() === 0;
  }

  // Appended to <html>, not <body>, so it sits above body-level modals.
  document.documentElement.appendChild(host);
  update();

  let scheduled = false;
  new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      update();
    });
  }).observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["role"]
  });
})();
