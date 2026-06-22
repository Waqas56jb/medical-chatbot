# Medical Chatbot — Frontend

React frontend for the medical chatbot application, built with [Vite](https://vite.dev/) and React 19.

## Tech stack

- **React 19** + **Vite 8**
- **React Router** for routing
- Plain CSS (no UI framework)

## Project structure

```
client/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Route pages
│   ├── services/        # API client (backend integration)
│   ├── styles/          # Component styles
│   ├── App.jsx          # Root app + routes
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── .env.example         # Environment variable template
└── vite.config.js
```

## Getting started

```bash
cd client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command         | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start development server |
| `npm run build`| Production build         |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint               |

## Environment variables

Copy `.env.example` to `.env` and set your backend URL when ready:

```
VITE_API_URL=http://localhost:5000/api
```

## Backend integration

The chat UI currently uses a local placeholder in `src/hooks/useChat.js`. When your backend is ready, replace the mock response with a call to `sendChatMessage()` from `src/services/api.js`.
