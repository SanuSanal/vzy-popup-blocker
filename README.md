# VZY Popup Blocker

A small Chrome extension that removes `<div role="presentation">` popups on **vzy.com** and **vzy.one** (including subdomains).

## Desktop (Windows, Mac, Linux, Chromebook)

### Install
1. Download **[vzy-popup-blocker.zip](https://github.com/SanuSanal/vzy-popup-blocker/releases/latest/download/vzy-popup-blocker.zip)** from the [latest release](https://github.com/SanuSanal/vzy-popup-blocker/releases/latest).
2. Unzip it to a folder you'll keep. Chrome loads the extension from that folder, so don't delete it.
3. Open `chrome://extensions` (Edge: `edge://extensions`).
4. Turn on **Developer mode** (top right).
5. Click **Load unpacked** and select the unzipped folder (the one containing `manifest.json`).
6. Optional: click the puzzle-piece icon in the toolbar and pin **VZY Popup Blocker**.

To update, download the new zip, replace the folder's contents, and click the reload icon on the extension card.

### Use
Three ways to remove the popup on a vzy page:

| Trigger | How |
|---|---|
| Toolbar button | Click the extension icon. It shows how many popups were found. Click **Remove popup**. |
| Right-click menu | Right-click anywhere on the page and choose **Remove popup**. |
| Keyboard shortcut | Press **Alt+Shift+X**. To change it, go to `chrome://extensions/shortcuts`. |

### Using vzy as an installed app
If you installed vzy as an app (⋮ → Cast, save and share → Install page as app), its window has no normal toolbar, so the extension icon might not show. Use the **right-click menu** or **Alt+Shift+X** there instead.

### After editing the code
Go to `chrome://extensions` and click the reload icon on the extension card.

---

## Mobile and tablets

Chrome for Android, and Chrome or Safari on iPhone/iPad, **can't run extensions**. You have these options:

### Android phone or tablet: use a browser that supports extensions
Some Chromium-based Android browsers can load Chrome extensions, for example **Microsoft Edge** (if your version has an *Extensions* item in its menu) or **Yandex Browser**. Menu names differ by browser and version, but the steps are roughly:

1. Download [vzy-popup-blocker.zip](https://github.com/SanuSanal/vzy-popup-blocker/releases/latest/download/vzy-popup-blocker.zip) on your device.
2. In the browser, open its extensions page (for example `edge://extensions` or `browser://extensions`).
3. Turn on **Developer mode**.
4. Choose **Load unpacked** / **+ (from .zip/.crx)** and pick the zip or the unzipped folder.
5. On a vzy page, open the browser menu → Extensions → **VZY Popup Blocker** → **Remove popup**.

There's no right-click on touch screens, and the keyboard shortcut only works with a physical keyboard attached.

### iPhone and iPad
You can't install an extension file you have locally. **Orion** (by Kagi) supports Chrome extensions, but only ones published to the Chrome Web Store. Use the bookmarklet below instead.

### Any mobile browser: bookmarklet
A bookmarklet is a bookmark that runs a bit of JavaScript. This one does the same thing as the extension. Copy this whole line:

```text
javascript:(()=>{const p=document.querySelectorAll('div[role="presentation"]');p.forEach(e=>e.remove());[document.documentElement,document.body].forEach(e=>{if(e&&e.style.overflow==='hidden')e.style.overflow=''});alert('Removed '+p.length+' popup(s)')})();
```

(Readable source: [bookmarklet.js](bookmarklet.js).)

**Chrome on Android (phone or tablet)**
1. Open any page, tap ⋮ → ☆ to bookmark it.
2. ⋮ → Bookmarks → long-press the new bookmark → **Edit**.
3. Change the name to `vzyfix` and replace the URL with the line above. Save.
4. On a vzy page, tap the address bar, type `vzyfix`, and tap the bookmark suggestion. Opening it from the bookmarks list doesn't run it, so use the address bar.

**Safari on iPhone or iPad**
1. Open any page, tap Share → **Add Bookmark**, and save it as `vzyfix`.
2. Open Bookmarks → **Edit** → tap `vzyfix` and replace the address with the line above.
3. On a vzy page, open Bookmarks and tap `vzyfix`.

Bookmarklets need the browser's address bar or bookmarks. If you added vzy to your home screen as an app, they won't work there. Open the site in a normal browser tab instead.

---

## Building a release

```powershell
./build.ps1
```

This creates `dist/vzy-popup-blocker.zip`, with `manifest.json` at the root of the zip.

Publishing a release on GitHub builds the zip and attaches it automatically (see [.github/workflows/release.yml](.github/workflows/release.yml)):

1. Bump `version` in `manifest.json` (e.g. `1.0.1`), commit and push.
2. Create a release whose tag is `v` + that version (e.g. `v1.0.1`), on GitHub or with `gh release create v1.0.1 --generate-notes`.

The workflow fails if the tag doesn't match the manifest version. To rebuild the zip for an existing release, run the workflow manually from the Actions tab and enter the tag.
