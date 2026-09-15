# DREEZZ — Follow the feeling

A mobile-first house-music website for Tampa DJ Dreezz. Built with React, Vinext and Cloudflare Workers / D1. The uploaded rooftop photos anchor a sunset, lime and pink identity.

## Included

- Responsive fan site with reduced-motion support, loading/error states and keyboard-accessible forms and dialogs.
- Find My DJ: interactive Leaflet / CARTO map, headphone marker, venue check-in, 15-second refresh and automatic event-end expiry. No background GPS tracking. Explicit preview mode is separate from live status.
- Event calendar and downloadable ICS files. Public event times display in America/New_York.
- Durable fan signups, duplicate protection, unsubscribe, consent copy and subscriber CSV export.
- Durable event booking inquiries and private backstage review.
- Backstage event creation/editing/removal and live check-in controls.
- Official store and support URL settings. Merchandise remains an explicitly labeled concept until the store is connected; no simulated checkout or fake charges.

## Launch configuration

1. Set hosted `ADMIN_EMAILS` to the comma-separated ChatGPT sign-in emails of Dreezz and trusted managers. Backstage and all administrative APIs deny access unless the authenticated email is allowed. Never trust visitors merely because they can sign in.
2. Open `/backstage`, add actual event dates, venue addresses and map coordinates. Press **Go live here** during the event; the marker expires at the scheduled end. End check-in early when necessary.
3. Add official HTTPS store and support payment links in Backstage → Store. Product fulfillment, taxes, payment accounts and prices belong to the connected store.
4. Export subscribers to the chosen email platform. This version stores subscriptions and inquiries; it does not send automatic campaigns or booking emails. Honor unsubscribe requests before sending exported-list campaigns.
5. Review and configure the deployed site's audience before sharing publicly. The initial Sites deployment is private.

## Development

Use the pnpm version in `package.json`, then `pnpm install`, `pnpm dev`, and `pnpm build`. Cloudflare bindings are declared in `.openai/hosting.json`; `DB` is required. Copy `.env.example` to `.env` for local configuration. Keep secrets out of Git.

Generate schema migrations with `pnpm db:generate`. The checked-in Drizzle migration creates the D1 tables. Sites applies migrations at publish time. On another Cloudflare deployment, configure D1 and apply migrations before serving the Worker.

Sites-specific ChatGPT authentication relies on trusted dispatch headers; do not deploy unmodified authentication behind an arbitrary public proxy that accepts those headers from visitors. Use an appropriate trusted identity integration if migrating hosting.

Map tiles require internet access and retain OpenStreetMap and CARTO attribution. Typography uses Google Fonts with system fallbacks. Instagram access was unavailable during authoring; the supplied profile screenshots and photos provided the visual reference.

## Validation

Production build and TypeScript checks; migration execution, duplicate subscription handling, unsubscribe and rate-counter queries checked with SQLite. No browser QA or payment-provider transaction was performed. WebMCP map navigation is feature-detected; a supported validation context was unavailable.
