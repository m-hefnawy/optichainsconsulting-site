# OptiChains Consulting – Website

A production-ready static website for **OptiChains Consulting Services** built
with plain HTML5, CSS3, and vanilla JavaScript. No frameworks, no build tools,
no dependencies — just three files you can open in a browser or deploy to any
static host in seconds.

---

## Live Site

[https://optichainsconsulting.com](https://optichainsconsulting.com)

---

## File Structure

```
optichainsconsulting-site/
├── index.html   ← All page content and markup
├── style.css    ← All styling (colors, layout, responsive rules)
├── script.js    ← Mobile nav, scroll animations, form handling
└── README.md    ← This file
```

---

## How to Run Locally

No server needed. Just open `index.html` in any modern browser:

```
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

Or serve with any simple HTTP server if you prefer:

```bash
# Python 3
python -m http.server 8080

# Node.js (npx)
npx serve .
```

Then visit `http://localhost:8080`.

---

## How to Edit Content

All visible text lives in **`index.html`**. Each section has a clearly labelled
HTML comment, e.g.:

```html
<!-- ══ HERO SECTION ══ -->
<!-- ══ SERVICES SECTION ══ -->
<!-- ══ CONTACT / LEAD SECTION ══ -->
```

Search for the section comment and edit the text within the relevant element.

### Key locations

| What to change | Where in index.html |
|---|---|
| Company name / brand | `.brand` elements in `<header>` and `<footer>` |
| Hero headline | `<h1 id="hero-heading">` |
| Hero subheadline | `.hero-sub` paragraph |
| Service card text | `<article class="card">` elements inside `#services` |
| Industries | `.industry-tile` elements inside `#industries` |
| Approach steps | `<li class="approach-step">` elements inside `#approach` |
| Why OptiChains cards | `.why-card` elements inside `#why` |
| About copy | `.about-copy` inside `#about` |
| Contact email / LinkedIn | `<ul class="contact-list">` inside `#contact` |
| Footer tagline | `.footer-tagline` |
| SEO title & description | `<title>` and `<meta name="description">` in `<head>` |
| Open Graph tags | `<meta property="og:*">` in `<head>` |

---

## How to Change Colors

All design tokens are at the **top of `style.css`** inside the `:root {}` block
(Section 1: CSS Custom Properties). Change a value there and every component
using that token updates automatically.

```css
:root {
  --color-primary:       #1a4b8c;   /* ← Main brand blue */
  --color-accent:        #0ea5e9;   /* ← Highlight / CTA blue */
  --color-dark:          #1a1f2e;   /* ← Dark backgrounds */
  /* … */
}
```

---

## How to Connect the Contact Form

The form currently intercepts submission and shows an informational message
(no backend required for the demo). To receive real submissions, choose one
of these options and update `index.html` and `script.js` accordingly:

### Option A – Formspree (recommended for GitHub Pages)

1. Create a free account at [formspree.io](https://formspree.io).
2. Create a new form and copy your endpoint URL
   (e.g. `https://formspree.io/f/xyzabcde`).
3. In `index.html`, add `action="https://formspree.io/f/xyzabcde"` and
   `method="POST"` to the `<form>` element.
4. In `script.js`, remove (or comment out) the `contactForm.addEventListener`
   block so the browser handles the native POST.

### Option B – Netlify Forms

1. Deploy the site to [Netlify](https://netlify.com).
2. Add the `netlify` attribute to the `<form>` element in `index.html`.
3. Remove the form submit event listener in `script.js`.

### Option C – Custom backend / API

Replace the placeholder block in `script.js` (clearly commented) with a
`fetch()` POST to your own endpoint.

---

## Publishing on GitHub Pages

### Step 1 – Push to GitHub

```bash
git init
git add .
git commit -m "Initial website"
git remote add origin https://github.com/<your-username>/optichainsconsulting-site.git
git push -u origin main
```

### Step 2 – Enable GitHub Pages

1. Go to your repository on GitHub.
2. Click **Settings → Pages**.
3. Under **Source**, select **Deploy from a branch**.
4. Choose branch `main` and folder `/ (root)`.
5. Click **Save**.

GitHub Pages will publish your site at:
`https://<your-username>.github.io/optichainsconsulting-site/`

---

## Connecting a Custom Domain (optichainsconsulting.com)

### Step 1 – Add a CNAME file

Create a file named `CNAME` (no extension) in the repository root:

```
optichainsconsulting.com
```

Commit and push it.

### Step 2 – Configure DNS

Log in to your domain registrar and add these DNS records:

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | `<your-username>.github.io` |

### Step 3 – Enable HTTPS in GitHub Pages settings

After DNS propagates (up to 24 hours), go to **Settings → Pages** and tick
**Enforce HTTPS**.

---

## Notes

- **No stock images** are used. Visual elements use pure CSS shapes,
  SVG icons, and Unicode characters only.
- **No external libraries** are loaded. The site is fully self-contained.
- **Accessibility**: semantic HTML, ARIA attributes, skip-link, focus states,
  and keyboard-friendly navigation are included.
- **SEO**: `<title>`, `<meta description>`, Open Graph tags, and a canonical
  URL placeholder are included in `<head>`.
- **Form**: production form handling requires an external service
  (Formspree, Netlify Forms) or a custom backend API as described above.

