# Pacifica Archery — Website

A brand-new, mobile-first, statically-rendered marketing & booking site. No build step, no framework, no dependencies — just open it or serve the folder. Fully crawlable/indexable (fixes the SPA-invisibility risk), fast, and accessible (WCAG-AA, keyboard-navigable, reduced-motion aware).

## Run it locally

From this `/website` folder:

```bash
# Python (any 3.x)
python -m http.server 8000

# or Node
npx serve .
```

Then open **http://localhost:8000**.

> Open the files directly (`file://`) and most things work, but a local server is recommended so the Google Maps embed, social-share links, and clean URLs behave like production.

## Pages

| File | Page |
|---|---|
| `index.html` | Home — hero, inclusivity, how-it-works, dynamic pricing preview, location teaser, reviews, share, CTAs |
| `pricing.html` | Rates & Bundles — front options + one unified, column-aligned rate sheet (Happy Hour / Weekday / Weekend / What's included) banded by category: Range & Gear, Training, Bundles, Private Events |
| `first-time.html` | First Time? Start Here — beginner funnel, what to expect/wear, entry points, FAQ (with FAQ schema) |
| `lessons.html` | Lessons & Training — classes, private, JOAD, leagues |
| `groups.html` | Groups & Events — birthdays, corporate/team-building, date nights, private group spec |
| `location.html` | Location & Parking — map, Get Directions, FREE PARKING badge, directions, hours (Sunday included), click-to-call |
| `about.html` | About — family story, stats, staff, inclusivity |
| `products.html` | Products & Brands — reproduces the live `/products` page: categories with outbound brand links (no images) |
| `book.html` | Book Now hub — routes to the existing booking + waiver system |
| `assets/css/styles.css` | Design system |
| `assets/js/main.js` | Nav, pricing toggle, scroll reveal, social sharing |

## ⚠️ Before you go live — 3 things to wire up

1. **Booking URL (required).** Open `book.html` and replace the placeholder
   `https://www.pacificaarchery.com/book-online`
   on the `#bookCta` link with Pacifica's live online-booking + liability-waiver link.
   Every "Book Now" button on the site routes here, so this is the only place to change.

2. **Confirm prices & hours.** The dynamic **weekday/weekend** pricing reflects the recommended model in
   `../Pacifica_Archery_Business_Analysis.md` (§6); weekdays are the ~25% discount band. If the owner adopts
   different numbers, update them in `pricing.html`, `index.html`, and `groups.html` (search for
   `data-weekday` / `data-weekend`). **Hours follow the report's §5 schedule: Wed–Fri 1:00–8:00 PM, Sat & Sun
   10:00 AM–8:00 PM, closed Mon & Tue** (41 hrs/week). These are set in every footer, the `location.html`
   hours table, and the `schema.org` opening-hours markup in `index.html` + `location.html`. The weekday
   pricing band is **Wed–Fri** and Midweek Happy Hour is **Wed–Fri before 5 pm**.

3. **Domain & social handles.** The canonical/OG URLs use `https://www.pacificaarchery.com/`. Point the
   site there and confirm the TikTok/Instagram profile links in `assets/js/main.js` (`actions.tt` / `actions.ig`)
   match the real handles.

## Images

Real photos provided by the shop are in `assets/img/` with clean names (e.g. `hero-archer-draw.webp`,
`staff-team.webp`, `storefront.webp`). Descriptive `alt` text is set throughout.

**About page:** uses the real staff roster and bios (Joe Snell, Beth Snell, Nathan Tamayo, Eric Ashton, Christ Estoque, Gabi Mello). Photo↔name pairing was matched by best guess from filenames — please confirm. **Christ Estoque** is shown as a styled "CE" monogram tile until a portrait is provided; drop his photo into `assets/img/` and swap the monogram `<div>` for an `<img>`. Gabi's photo is reserved for the First Time page + the About roster only.

**Optional upgrades / remaining slots to fill with fresh capture:**
- **Hero background video** (Home): a 6–10s muted loop of an arrow hitting a target would lift the hero further. Drop it in and swap the `<img>` in `.hero__media` for a `<video autoplay muted loop playsinline>`.
- **First-timer reaction clips** for the social feed (not on-site, but the share buttons amplify them).
- **A bright, decluttered range photo** for the "How it works" / Lessons sections once the cheap space refresh (lighting/paint) is done — current photos are good but a refreshed room shoots better.
- **Diverse archers / cultural-event imagery** for the Asian-American campaign (Lunar New Year / Chuseok).

## SEO / sharing built in
Per-page `<title>` + meta description; Open Graph + Twitter cards (rich link previews); `schema.org`
LocalBusiness + SportsActivityLocation JSON-LD (hours, geo, price range, 4.7★); FAQPage schema on
First-Time; `sitemap.xml` + `robots.txt`. Social share supports TikTok, Instagram, X, Facebook, WhatsApp,
SMS, and native share / copy-link.

## Tech notes
- Plain HTML/CSS/JS. Google Fonts (Archivo / Inter / Yuji Syuku) load via `<link>` with system-font fallbacks if offline.
- No tracking/analytics included — add your GA4 / Meta Pixel snippet before launch if desired.
- `_preview_*.png` files (if present) are local QA screenshots and can be deleted.
