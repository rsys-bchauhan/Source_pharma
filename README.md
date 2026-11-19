# XYZ Pharmaceuticals – Corporate Website

A professional static website for a pharmaceutical company, built with [Eleventy (11ty)](https://www.11ty.dev/) and ready to deploy on **Cloudflare Pages** from **GitHub**.

## Pages

| Page | File | Notes |
|------|------|-------|
| Home | `src/index.njk` | Hero slider, feature boxes, welcome, categories, speciality, latest products, partner banner, counters, testimonials |
| About | `src/about.njk` | Sample content – replace with real details |
| Products | `src/products.njk` | Generated from `src/_data/products.json`, with a category filter |
| Quality | `src/quality.njk` | **Blank** – fill in your content |
| Why XYZ | `src/why-us.njk` | **Blank** – fill in your content (menu label uses `shortName`) |
| Contact | `src/contact.njk` | Contact details plus a simple form |
| Privacy / Terms | `src/privacy.njk`, `src/terms.njk` | Generic templates – have them legally reviewed |
| 404 | `src/404.njk` | Served automatically by Cloudflare Pages |

## Change the company name and logo (one place)

Edit **`src/_data/site.json`**:

```json
{
  "name": "XYZ Pharmaceuticals",      // full name, shown in the header, footer, titles and content
  "shortName": "XYZ",                  // used in "Why XYZ" and in short mentions
  "legalName": "XYZ Pharmaceuticals Pvt. Ltd.",
  "tagline": "...",
  "description": "...",
  "url": "https://your-domain.com",   // your live domain, used for SEO/sitemap
  "logo": "/assets/images/logo.svg",
  "favicon": "/assets/images/favicon.svg",
  "contact": { "email": "...", "phone": "...", "address": "...", "hours": "..." },
  "social": { "facebook": "", "instagram": "", "linkedin": "", "twitter": "" }  // icons appear only when a URL is set
}
```

(JSON does not allow comments; the ones above are only for explanation.)

To change the **logo**, either replace `src/assets/images/logo.svg` with your file, or add a new file (e.g. `logo.png`) to `src/assets/images/` and update `"logo"` in `site.json`.

## Edit products

Edit **`src/_data/products.json`**. Each product looks like this:

```json
{
  "name": "Paracetamol Tablets",
  "strength": "500 mg",
  "form": "Tablet",
  "category": "Analgesics & Antipyretics",
  "indication": "Relief of mild to moderate pain and fever.",
  "description": "Short description...",
  "pack": "10 x 10 Tablets",
  "featured": true
}
```

- New categories appear in the filter buttons and footer automatically. The first four are shown as "Categories" on the Home page.
- Products with `"featured": true` are shown as "Latest Products" on the Home page.
- Product thumbnails are drawn automatically from `form` (Tablet, Capsule, Softgel, Suspension/Syrup, Sachet).
- Category links use the URL hash, e.g. `/products/#diabetes-care` opens the Products page pre-filtered.

## Layout

All pages share the same frame: a navy top bar (address, phone, email, social icons), a white header with an orange underline and a "Product List" button, a banner with breadcrumb on inner pages (`src/_includes/partials/page-hero.njk`), and a dark four-column footer. Sample text on the Home page (hero, testimonials, counters) should be replaced with your own.

## Change colours

The theme colours are CSS variables at the top of `src/assets/css/styles.css` (`--primary` navy, `--secondary` royal blue, `--accent` orange-red, etc.). Fonts are Raleway (headings) and Roboto (body), loaded in `src/_includes/layouts/base.njk`.

## Run locally

Requires Node.js 18 or newer.

```bash
npm install
npm start        # dev server with live reload at http://localhost:8080
npm run build    # production build into ./_site
```

## Publish to GitHub

```bash
git init
git add .
git commit -m "Initial website"
git branch -M main
git remote add origin https://github.com/<your-user>/<your-repo>.git
git push -u origin main
```

## Deploy to Cloudflare Pages

1. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git**.
2. Select your GitHub repository.
3. Build settings:
   - **Framework preset:** Eleventy (or None)
   - **Build command:** `npm run build`
   - **Build output directory:** `_site`
   - **Environment variable (optional):** `NODE_VERSION` = `20`
4. Click **Save and Deploy**. Every push to `main` then redeploys automatically.
5. (Optional) Add your own domain under **Custom domains**, then update `"url"` in `site.json`.

`src/_headers` adds basic security and caching headers on Cloudflare Pages.

## Contact form

Because the site is static, the contact form uses `mailto:` by default, which opens the visitor's email app. To receive submissions directly, point the form `action` in `src/contact.njk` to a service such as Formspree, or to a Cloudflare Pages Function.
