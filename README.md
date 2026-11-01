# Minimal Studio

A production-ready marketing site starter built with **Astro 7**, **Tailwind CSS 4** and **TypeScript**.

Minimal Studio is a single-page landing kit for studios, agencies, freelancers and product teams. It ships with a hero, logo cloud, work gallery, "how it works" steps, services, testimonials, pricing tiers, FAQ and call-to-action sections — all composed from small, reusable Astro components.

- **Zero client framework** — every section renders to static HTML.
- **Design tokens in CSS** — one `@theme` block controls the whole palette and font stack.
- **SEO out of the box** — canonical URL, Open Graph, Twitter cards, JSON-LD `WebSite` schema and a generated sitemap.
- **Typed, aliased imports** — any file under `src/` is importable with the `@/` alias.

---

## Table of contents

- [Tech stack](#tech-stack)
- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [How the page is composed](#how-the-page-is-composed)
- [Customization](#customization)
  - [Site URL and sitemap](#site-url-and-sitemap)
  - [SEO, Open Graph and structured data](#seo-open-graph-and-structured-data)
  - [Colors, fonts and design tokens](#colors-fonts-and-design-tokens)
  - [Content](#content)
  - [Images](#images)
- [Accessibility notes](#accessibility-notes)
- [Build and deployment](#build-and-deployment)
- [Troubleshooting](#troubleshooting)
- [License and attribution](#license-and-attribution)

---

## Tech stack

| Layer | Choice | Notes |
| :-- | :-- | :-- |
| Framework | [Astro 7](https://astro.build) | Static site generation, island-free output |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) | CSS-first config via `@theme`, no `tailwind.config.*` |
| Styling plugins | `@tailwindcss/forms`, `@tailwindcss/typography`, `tailwind-scrollbar-hide` | Loaded with `@plugin` |
| Build plugin | `@tailwindcss/vite` | Tailwind runs inside the Astro/Vite pipeline |
| SEO helper | `@lexingtonthemes/seo` | `<AstroSeo />` component for meta tags |
| Sitemap | `@astrojs/sitemap` | Emits `sitemap-index.xml` on build |
| Language | TypeScript | `strict`-friendly defaults, `@/*` path alias |
| Carousel | [Keen Slider](https://keen-slider.io) | Loaded from CDN in `BaseHead.astro` |

## Requirements

- **Node.js 22.12 or newer** (required by Astro 7; Node 22 LTS recommended)
- **npm 10 or newer** (pnpm, yarn and bun also work)

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

The site is served at <http://localhost:4321> by default. Astro picks `4321` unless occupied; the terminal prints the real port.

To produce a deployable build:

```bash
npm run build     # output goes to ./dist
npm run preview   # serve ./dist locally
```

## Available scripts

| Command | Action |
| :-- | :-- |
| `npm run dev` | Start the dev server with hot module reload |
| `npm start` | Alias for `npm run dev` |
| `npm run build` | Build the production site into `./dist` |
| `npm run preview` | Serve the built site locally |
| `npm run astro ...` | Run the Astro CLI directly, e.g. `npm run astro check` |
| `npm run astro --help` | Show Astro CLI help |

## Project structure

```
.
├── astro.config.mjs          # Astro config: Tailwind vite plugin, sitemap, site URL
├── package.json
├── tsconfig.json             # "@/*" -> "./src/*" path alias
├── .gitignore                # ignores node_modules/, dist/, .astro/, env files
├── LICENSE                   # GPL-3.0
└── src/
    ├── env.d.ts
    ├── pages/
    │   └── index.astro       # the only route — composes the landing sections
    ├── layouts/
    │   └── BaseLayout.astro  # <html>, nav, <main>, footer
    ├── components/
    │   ├── BaseHead.astro    # meta tags, SEO, fonts, global CSS import
    │   ├── global/
    │   │   ├── Navigation.astro
    │   │   ├── Footer.astro
    │   │   └── Cta.astro
    │   ├── landing/
    │   │   ├── Hero.astro
    │   │   ├── LogoCloud.astro
    │   │   ├── Work.astro
    │   │   ├── Howitworks.astro
    │   │   ├── Services.astro
    │   │   ├── Testimonials.astro
    │   │   ├── Pricing.astro
    │   │   └── Faq.astro
    │   └── assets/           # inline SVG logos (Astro, Figma, Stripe, ...)
    ├── images/
    │   ├── customers/        # customer avatars and logos
    │   └── work/             # portfolio screenshots
    └── styles/
        └── global.css        # Tailwind import, plugins, @theme tokens
```

## How the page is composed

`src/pages/index.astro` is the entire route. It renders `BaseLayout` and stacks the landing sections in order:

```astro
<BaseLayout>
  <Hero />
  <LogoCloud />
  <Work />
  <Howitworks />
  <Services />
  <Testimonials />
  <Pricing />
  <Faq />
  <Cta />
</BaseLayout>
```

`BaseLayout` wraps the slot with `Navigation` and `Footer`, and applies the page background (`bg-base-50`) plus a `2xl:max-w-screen-xl` centered container.

Each landing component owns its own data — arrays such as `pricingTiers` are declared in the component frontmatter and mapped in the template. Edit content where it lives; no CMS or global content file is required.

Adding a second page is a matter of creating a new file:

```astro
---
// src/pages/about.astro
import BaseLayout from "@/layouts/BaseLayout.astro";
---
<BaseLayout>
  <h1>About</h1>
</BaseLayout>
```

## Customization

### Site URL and sitemap

Set the production domain in `astro.config.mjs`. `@astrojs/sitemap` uses this value to build absolute URLs:

```js
export default defineConfig({
  site: "https://yourwebsite.com/",
  integrations: [sitemap()],
});
```

### SEO, Open Graph and structured data

All head metadata lives in `src/components/BaseHead.astro`:

- `<AstroSeo />` receives `title`, `description`, `canonical`, `openGraph` and `twitter` props.
- A JSON-LD `WebSite` object is serialized into the page.
- Fonts, the Keen Slider stylesheet and favicon links are also declared there.

Replace the placeholder values (`Your Page Title`, `Your Site Name`, `https://yoursite.com/`, `@yourhandle`) before going live. Add `og-image.jpg` at 1200×630 to your `public/` directory to match the configured Open Graph image.

### Colors, fonts and design tokens

Tailwind 4 has no JavaScript config file here. Everything is in `src/styles/global.css`:

```css
@import "tailwindcss";
@plugin "@tailwindcss/forms";
@plugin "@tailwindcss/typography";
@plugin "tailwind-scrollbar-hide";

@theme {
  --font-sans: Geist, sans-serif;
  --color-base-50: oklch(96.74% 0.001 286.38);
  /* ...base-100 through base-950... */
}
```

- Change `--font-sans` to swap the site font. If you leave the Geist stack, also update the Google Fonts `<link>` in `BaseHead.astro`.
- Change the `--color-base-*` scale to re-theme every surface. Classes such as `bg-base-50`, `text-base-900` and `border-base-200` follow automatically.
- Add new tokens inside the same `@theme` block; they become Tailwind utilities immediately.

### Content

| Section | File |
| :-- | :-- |
| Nav links, logo | `src/components/global/Navigation.astro` |
| Footer columns, legal line | `src/components/global/Footer.astro` |
| Hero headline and CTAs | `src/components/landing/Hero.astro` |
| Client logos | `src/components/landing/LogoCloud.astro` |
| Portfolio grid | `src/components/landing/Work.astro` |
| Process steps | `src/components/landing/Howitworks.astro` |
| Service cards | `src/components/landing/Services.astro` |
| Quotes | `src/components/landing/Testimonials.astro` |
| Pricing tiers | `src/components/landing/Pricing.astro` |
| FAQ items | `src/components/landing/Faq.astro` |
| Closing CTA | `src/components/global/Cta.astro` |

To remove a section, delete its import and tag from `src/pages/index.astro`.

### Images

- Local assets belong in `src/images/` and are referenced with the `@/images/...` alias or a relative import so Astro can optimize them.
- Static files that must keep an exact path (favicons, `manifest.webmanifest`, `robots.txt`) belong in `public/`.
- The current `public/` directory is empty; the favicon and manifest links in `BaseHead.astro` will 404 until you add those files.

## Accessibility notes

The template ships semantic landmarks (`<nav>`, `<main>`, `<footer>`), a single `<h1>` in the hero and descriptive `alt` text on imagery. Before shipping:

1. Verify color contrast for any token you change — `oklch` values are easy to nudge out of AA range.
2. Confirm every interactive element is reachable and visible on focus.
3. Run a Lighthouse or axe pass on a built page (`npm run build && npm run preview`).

## Build and deployment

The build is fully static. `npm run build` writes plain HTML, CSS and assets to `dist/`.

### Live site (GitHub Pages)

Deployed at **<https://girishlade111.github.io/minimalstudio/>**.

`.github/workflows/deploy.yml` builds on every push to `main` and deploys with the GitHub Pages artifact pipeline:

1. Checkout, Node 22, `npm ci`, `npm run build`.
2. `actions/configure-pages` and `actions/upload-pages-artifact` (path `./dist`).
3. `actions/deploy-pages` in the `github-pages` environment.

Pages is configured with **Build and deployment → Source: GitHub Actions**. Because the site is served from a subpath, `astro.config.mjs` sets:

```js
site: "https://girishlade111.github.io",
base: process.env.BASE_PATH || "/minimalstudio/",
```

Keep `base` in sync with the repository name. Root-relative links must use `import.meta.env.BASE_URL` as `Navigation.astro` does, otherwise they point at the domain root.

### Other hosts

**Vercel** — import the repository, framework preset **Astro**, build command `npm run build`, output directory `dist`.

**Netlify** — build command `npm run build`, publish directory `dist`.

**Cloudflare Pages** — build command `npm run build`, output directory `dist`, environment variable `NODE_VERSION=22`.

Remember to update `site` in `astro.config.mjs` and the canonical/Open Graph URLs in `BaseHead.astro` to the real domain before the first deploy.

## Troubleshooting

| Symptom | Cause and fix |
| :-- | :-- |
| Styles missing after `npm install` | Tailwind 4 needs the Vite plugin. Confirm `@tailwindcss/vite` is installed and registered in `astro.config.mjs`. |
| Port already in use | Run `npm run dev -- --port 4322`. |
| Sitemap has `yourwebsite.com` URLs | `site` in `astro.config.mjs` was not changed. |
| Build fails with "Node.js v20 is not supported by Astro" | Astro 7 needs Node 22.12+. The workflow pins Node 22; local machines must upgrade too. |
| Social previews show no image | `og-image.jpg` is not present in `public/`, or the URL in `BaseHead.astro` is still a placeholder. |
| TypeScript cannot resolve `@/...` | Confirm `tsconfig.json` still maps `"@/*": ["src/*"]` and that the editor uses the workspace TypeScript version. |

## License and attribution

Released under the **GPL-3.0** license — see [LICENSE](./LICENSE).

This project is based on an Astro and Tailwind CSS starter kit by [Lexington Themes](https://lexingtonthemes.com/). The original notice requires removing the author's name and associated links from the site before publishing it publicly; replace any remaining template branding with your own before launch.
