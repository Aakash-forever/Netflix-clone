# 🎬 Netflix Clone

A portfolio-grade streaming UI built with **Next.js** (App Router), **React 19**, and **Tailwind CSS v4**. Browse real TMDB data with an auto-rotating hero, curated carousels, instant search, and a “My List” synced across tabs—wrapped in a sleek, responsive interface.

---

## 🚀 Live Demo

> https://netflix-clone-jbgi.vercel.app/

---

## ✨ Features

- 🔥 **Auto-rotating hero** with backdrop art and inline trailer preview.
- 🎯 **Curated rows** for trending, popular, top-rated, action, and TV.
- 🧭 **Instant search** via serverless API route.
- 📌 **“My List”** persisted in localStorage and synced across tabs.
- 📱 **Fully responsive** layout with mobile nav + desktop sidebar.
- ⚡ **SSR/Streaming** with Next.js App Router for fast first paint.

---

## 🧑‍💻 Tech Stack

| Category   | Technology              |
| ---------- | ----------------------- |
| Framework  | Next.js 16 (App Router) |
| Library    | React 19                |
| Styling    | Tailwind CSS v4         |
| Data API   | TMDB (v4 Read Token)    |
| HTTP       | Axios                   |
| Icons      | lucide-react            |
| Deployment | Vercel-ready            |

---

## 📸 Screenshots

### Home

![home page](<Screenshot 2026-02-24 165900.png>)

### Trending Rows

![trending rows](<Screenshot 2026-02-24 170000.png>)

### Search

![search page](<Screenshot 2026-02-24 170033.png>)

### My List

![my list page](<Screenshot 2026-02-24 170201.png>)

---

## 📡 APIs Used

### 🎞️ TMDB API

Provides trending, popular, top-rated, genre-filtered movies/TV, search results, and trailers (videos endpoint). Requires a TMDB **v4 Read Access Token** passed as a bearer token.

---

## 🎯 Learning Outcomes

- Real-world API integration and error handling.
- SSR + streaming data with the App Router.
- Responsive layouts for mobile and desktop navigation patterns.
- Client state for watchlists using localStorage + cross-tab sync.
- Component-driven UI with Tailwind utility patterns.

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Aakash-forever/Netflix-clone.git

cd netflix

# Install dependencies
npm install

# Add environment variables
echo "NEXT_PUBLIC_TMDB_TOKEN=<your_tmdb_v4_read_token>" > .env.local

# Start the development server
npm run dev
```

---

## 🤝 Contributing

Issues and PRs are welcome! Fork the repo, create a feature branch, and submit a pull request.

---

## 📄 License

MIT

---

⭐ If you enjoy this project, please give it a star on GitHub!
