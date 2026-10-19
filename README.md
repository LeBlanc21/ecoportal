# ecoPortal

Two separate apps sharing one design system.

```
packages/design/   globals.css (colors, type, spacing, shadows, motion tokens) + animations.css
apps/website/      Public marketing site (Next.js, SEO-friendly) + /api/contact
apps/portal/       Authenticated application (Vite + React), no marketing content
```

## Run
```
npm install
cp apps/website/.env.example apps/website/.env.local   # fill SMTP + CONTACT_RECIPIENT
cp apps/portal/.env.example apps/portal/.env           # VITE_DEV_AUTH_BYPASS=true for local demo only
npm run dev:website   # http://localhost:3000
npm run dev:portal    # http://localhost:5173
```

## Change colors, fonts, spacing
Edit `packages/design/globals.css`. Both apps update. Components use variables only. Add dark mode with a `[data-theme="dark"]` block.

## Replace images (website)
All images are named in `apps/website/src/config/assets.ts` and live in `apps/website/public/images/placeholders/`.
1. Drop your file in `public/images/` and change the `src` for that key (or overwrite the placeholder file, same name).
2. Set `alt` and `ratio` in the same entry. Space is reserved by the ratio, so layout never shifts.
3. Recommended: hero 4:3 (1600x1200), banners 21:9 (2100x900), cards 3:2 (1200x800), mobile 9:16. Use WebP/AVIF under ~200 KB, no text baked into images.
4. Decorative images get `alt=""`.

## Contact form
`ContactForm` (short/full) and `ContactCTA` are written once. `PageLayout` adds `ContactCTA` before the footer on every public page, so new pages get it by default. `/contact` passes `cta={false}` because its full form fills that slot. The API route validates, rate-limits (in-memory; use Redis for multiple servers), honeypots bots, and returns success only after SMTP accepts the message. With no SMTP configured it returns an error rather than a false success.

## Before launch
- Wire real authentication in `apps/portal/src/lib/auth.tsx` and enforce all permissions on the server.
- Replace the demo stats, copy, and demo dashboard data.
- Add a privacy policy page and link it from the consent checkbox.
