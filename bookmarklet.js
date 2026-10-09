// Readable source of the bookmarklet in README.md.
// Removes every <div role="presentation"> and re-enables page scrolling.
(() => {
  const popups = document.querySelectorAll('div[role="presentation"]');
  popups.forEach((el) => el.remove());
  for (const el of [document.documentElement, document.body]) {
    if (el && el.style.overflow === "hidden") el.style.overflow = "";
  }
  alert(`Removed ${popups.length} popup(s)`);
})();
