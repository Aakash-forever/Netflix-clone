# Netflix Clone 🎬

A clean Next.js app that showcases movies and TV shows from TMDB.

## Why It’s Cool ✨
- Auto-rotating hero banner with trailers on demand.
- Curated rows for trending, popular, top-rated, action, and TV.
- Instant search via serverless `/api/search`.
- “My List” saved locally and synced across tabs.
- Lightweight UI: Tailwind CSS v4 + lucide icons.

## Stack 🧰
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 for styling
- Axios + TMDB API for data

## Quick Start 🚀
1. Install deps: `npm install`
2. Add `.env.local`:
   ```
   NEXT_PUBLIC_TMDB_TOKEN=<<your_tmdb_read_access_token>>
   ```
3. Run dev server: `npm run dev`
4. Open: http://localhost:3000

## Project Map 🗺️
- `app/` routes (`/`, `/search`, `/movies`, `/tv`, `/mylist`, APIs)
- `components/` UI pieces (Hero, rows, layout, headings)
- `hooks/useMyList.ts` saved-list logic
- `lib/tmdb.ts` TMDB client helpers

## Scripts 📜
- `npm run dev` — start dev
- `npm run build` — production build
- `npm start` — serve build
- `npm run lint` — lint code

## Notes 🧠
- Hero trailers load lazily to keep first paint light.
- My List uses localStorage + a custom `my-list-changed` event for cross-tab sync.

## Deploy 📦
- Vercel-ready. Set `NEXT_PUBLIC_TMDB_TOKEN` in project env vars.

## License 📝
MIT
