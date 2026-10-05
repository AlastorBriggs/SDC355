# Tevin Donegan — Portfolio Page

An interactive personal portfolio site built as part of my JavaScript
coursework. It showcases a small set of projects, my skills, and a contact
form, with several client-side interactivity features driven by JavaScript.

---

## Overview

The page is a single-page portfolio that demonstrates a range of front-end
techniques: dynamic DOM manipulation, event handling, persistent storage
(session storage, local storage, and cookies), form validation, and live
feedback.

### Features

- **Dynamic project cards** rendered from an array of custom JavaScript
  objects and persisted in `sessionStorage`.
- **Skills list** generated with a JavaScript `for` loop.
- **Conditional featured content** that shows or hides sections based on
  the number of projects displayed.
- **Dark mode toggle** with the user's preference saved in `localStorage`.
- **Welcome notification** that slides in after a short delay.
- **Live-validated contact form** with a timed "Sending message..." →
  "Message sent successfully!" confirmation.
- **Fully responsive** layout with a media query for smaller screens.

---

## Languages and Libraries

### Languages
- **HTML5** — page structure
- **CSS3** — layout, colors, dark mode, transitions
- **JavaScript (ES5/ES6)** — interactivity and storage

### Libraries and CDNs
- **Modernizr** (`modernizr.custom.05819.js`) — feature detection for
  older browsers
- **jQuery** (`3.6.0`) — DOM selection and event handling (loaded from CDN)
- **validator.js** (`13.11.0`) — input validation for email, URLs, and
  integers (loaded from CDN)

### Browser APIs Used
- `sessionStorage` — stores project data for the current tab
- `localStorage` — persists the dark mode preference
- `document.cookie` — (used in earlier exercises; not required on this page)

---

## Dependencies

| Dependency | Version | Source | Purpose |
|---|---|---|---|
| Modernizr | custom build | Local file | Cross-browser feature detection |
| jQuery | 3.6.0 | `code.jquery.com` | DOM manipulation and events |
| validator.js | 13.11.0 | `cdn.jsdelivr.net` | Field validation rules |

**Internet connection required:** jQuery and validator.js load from public
CDNs. If you need offline support, download both libraries and update the
`<script src>` paths in the HTML to point to local copies.

---

## Project Structure

---

## Getting Started

### Option 1 — Run with XAMPP (recommended)

1. Install [XAMPP](https://www.apachefriends.org/) if it isn't already
   installed.
2. Copy this folder into `C:\xampp\htdocs\` (Windows) or
   `/Applications/XAMPP/htdocs/` (macOS).
3. Start **Apache** from the XAMPP Control Panel.
4. Open your browser and go to: http://localhost/your-folder-name/

5. The portfolio page loads and all features work.

### Option 2 — Open directly

You can double-click `Final Project.html` to open it in a browser via the
`file://` protocol. Most features work, but storage APIs (session storage,
local storage, cookies) behave inconsistently on `file://` URLs — serving
through Apache is the reliable way to test.

---

## Usage Notes

- **Dark mode** — toggle the checkbox at the top of the page. Your
preference is remembered on the next visit.
- **Projects** — cards are generated dynamically from JavaScript objects
stored in session storage. Clearing your browser's session storage and
reloading rebuilds them from the source array.
- **Contact form** — submit it to see the timed confirmation. The form
fields clear themselves after a successful send.
- **Welcome notification** — appears at the top of the page 1.5 seconds
after load and disappears after 6 seconds.

---

## Author

**Tevin Donegan**
Software Development student, ECPI University

---

## License

This project was created for educational purposes as part of ECPI
coursework. Feel free to reference it, but please don't submit it as your
own work.

