# Atual APIs Dashboard

A comprehensive API dashboard built with **Next.js 14** (App Router) and **Tailwind CSS**, serving collections of projects, movies, products, wallpapers, and more — all from a single interface.

## ✨ Features

- **🗂️ 13 Category Views** — Browse projects, movies, products, wallpapers, CDNs, packages, and more
- **🔍 Live Search** — Filter items in real-time across all categories
- **🔐 API Authentication** — Protected endpoints with API key, bearer token, and password-based auth
- **🖼️ Wallpaper Lightbox** — Full-screen gallery viewer with keyboard navigation
- **🎬 Movie Catalog** — Posters, ratings, genres, and download links
- **🛍️ Product Catalog** — Pricing, colors, ratings, and stock info
- **🌙 Dark Theme** — Sleek dark UI with animated gradients and glass effects

## 📁 Project Structure

```
src/
├── app/
│   ├── [slug]/            # Dynamic category pages (13 categories)
│   │   └── page.tsx
│   ├── api/
│   │   ├── [category]/    # Dynamic API routes (13 endpoints)
│   │   │   └── route.ts
│   │   ├── auth/          # Auth configuration endpoint
│   │   ├── index/         # Index listing endpoint
│   ├── layout.tsx         # Root layout with navbar
│   ├── page.tsx           # Landing page with category grid
│   └── globals.css        # Global styles and utilities
├── components/
│   ├── Navbar.tsx         # Navigation bar
│   ├── CategoryPage.tsx   # Reusable category listing component
│   ├── MoviesPage.tsx     # Custom movies catalog view
│   ├── ProductsPage.tsx   # Custom products catalog view
│   └── WallpapersPage.tsx # Custom wallpapers gallery view
└── lib/
    ├── data.ts            # Data imports and TypeScript types
    └── auth.ts            # Authentication validation utilities
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/atual-apis.git
cd atual-apis

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📡 API Endpoints

All data is served as JSON via RESTful API endpoints:

| Endpoint | Description |
|----------|-------------|
| `GET /api/index` | Index of all categories with auth info |
| `GET /api/auth` | Full auth configuration documentation |
| `GET /api/projects` | Web development projects |
| `GET /api/movies` | Movie collection with downloads |
| `GET /api/products` | Tech products catalog |
| `GET /api/wallpapers` | Wallpaper collection |
| `GET /api/backend` | Backend projects |
| `GET /api/repositories` | Open source repositories |
| `GET /api/apps` | Mobile and desktop applications |
| `GET /api/cdns` | CDN resources |
| `GET /api/js-libraries` | JavaScript libraries |
| `GET /api/mini-projects` | Small projects and experiments |
| `GET /api/php-projects` | PHP-based web projects |
| `GET /api/incomplete-projects` | Work in progress projects |
| `GET /api/mongodb` | MongoDB database projects |
| `GET /api/packages` | npm packages |

### Authentication

Protected endpoints require one of:

- **API Key:** `X-API-Key` header or `api_key` query param
- **Bearer Token:** `Authorization: Bearer <token>` header
- **Page Password:** `X-Page-Password` header or `password` query param

See `auth.json` for credential configuration.

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS 3
- **Icons:** Lucide React
- **Language:** TypeScript
- **Data:** Static JSON files

## 📁 Data Sources

Data is sourced from static JSON files in the project root:

```
├── index.json              # Category index with auth metadata
├── auth.json               # Authentication configuration
├── Projects/               # Project data files
├── Movies/
├── Products/
└── Wallpapers/
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source. See the LICENSE file for details.
