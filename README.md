# 📅 Synker

A cheerful family calendar and task list PWA that syncs with Google Calendar and Google Tasks. Designed for touch-first kiosk displays with playful, mobile-game-style graphics.

## Features

- 📆 **Google Calendar** sync — view upcoming events in a beautiful card layout
- ✅ **Google Tasks** sync — browse all your task lists with due dates and status
- 🔄 **Auto-sync** — configurable periodic refresh (default: every 5 minutes)
- 👆 **Touch-first UX** — large touch targets, smooth animations, kiosk-friendly
- 📱 **PWA** — installable, works offline with cached data
- 🐳 **Docker** — one-command deploy on CasaOS or any Docker host

## Quick Start

### Prerequisites

1. Create a Google Cloud project at https://console.cloud.google.com
2. Enable the **Google Calendar API** and **Google Tasks API**
3. Create OAuth 2.0 credentials (Web application type)
4. Set the authorized redirect URI to `http://your-host:3001/api/auth/callback`

### Development

```bash
cp .env.example .env
# Edit .env with your Google credentials

npm install
npm run dev
```

Open http://localhost:3000 and click "Connect Google" to authenticate.

### Production (Docker)

```bash
cp .env.example .env
# Edit .env with your Google credentials

docker compose up -d
```

The app will be available at http://your-host:3001

### CasaOS

1. In CasaOS, go to App Store → Custom Install
2. Paste the `docker-compose.yml` contents
3. Set the environment variables with your Google credentials
4. Install and access via the CasaOS dashboard

## Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `GOOGLE_CLIENT_ID` | OAuth2 client ID | (required) |
| `GOOGLE_CLIENT_SECRET` | OAuth2 client secret | (required) |
| `GOOGLE_REDIRECT_URI` | OAuth2 redirect URI | `http://localhost:3001/api/auth/callback` |
| `SYNC_INTERVAL` | Minutes between auto-syncs | `5` |
| `CALENDAR_IDS` | Comma-separated calendar IDs | `primary` |
| `TASK_LIST_IDS` | Comma-separated Google Task list IDs to sync (empty = all) | *(all)* |
| `PORT` | Server port | `3001` |

## Architecture

```
synker/
├── server/           # Express.js API server
│   ├── index.js      # Entry point, cron, static serving
│   ├── routes/       # API route handlers
│   └── services/     # Google API sync, auth, in-memory store
├── src/              # Lit web components (frontend)
│   ├── app.js        # Main app shell
│   └── components/   # Calendar, Tasks, Nav, Header, Login
├── public/           # Static assets, SW, manifest
├── Dockerfile        # Multi-stage production build
└── docker-compose.yml
```

## Tech Stack

- **Frontend:** Lit 3, Vite, Web Components
- **Backend:** Node.js, Express, googleapis
- **Styling:** CSS with playful gradients and animations
- **Deployment:** Docker, CasaOS compatible
