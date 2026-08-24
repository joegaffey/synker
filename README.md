# 📅 Synker

A cheerful family calendar and task list PWA that syncs with Google Calendar and Google Tasks. Designed for touch-first kiosk displays with playful, mobile-game-style graphics.

## Features

- 📆 **Google Calendar** sync — view, create, edit, and delete events in a beautiful card layout
- ✅ **Google Tasks** sync — browse, add, edit, and complete tasks across your task lists
- 🔄 **Auto-sync** — configurable periodic refresh (default: every 5 minutes); the kiosk display auto-refreshes every 30s and auto-recovers if it goes offline (e.g. waking from sleep)
- 👆 **Touch-first UX** — large touch targets, smooth animations, kiosk-friendly
- 📱 **PWA** — installable, works offline with cached data
- 🐳 **Docker** — one-command deploy on CasaOS or any Docker host

> 👀 **Try the live demo** (mock data, no login needed): https://joegaffey.com/synker/

## Quick Start

### Prerequisites

1. Create a Google Cloud project at https://console.cloud.google.com
2. Enable the **Google Calendar API** and **Google Tasks API**
3. Create OAuth 2.0 credentials (Web application type)
4. Set the authorized redirect URI to match your `GOOGLE_REDIRECT_URI` — for the SSH-tunnel setup below that's `https://localhost:3001/api/auth/callback`, or a public domain you own (e.g. `https://synker.example.com:3001/api/auth/callback`). Google requires `localhost` or a real registered domain — LAN IPs are rejected.

### Development

```bash
cp .env.example .env
# Edit .env with your Google credentials

npm install
npm run dev
```

Open http://localhost:3000 and click "Connect Google" to authenticate.

### Development without Google

A dev-only mock server fakes the Google integration with in-memory sample data, so you can test the UI (create/edit/delete/toggle) with no credentials:

```bash
npm run dev:mock        # serves the mock API on :3001
npm run dev:client      # in another terminal, vite on :3000 proxies /api to it
```

Or build and run it fully standalone: `npm run build && npm run dev:mock` → http://localhost:3001

### Live demo (GitHub Pages)

A read-only demo with the same mock data is auto-deployed to GitHub Pages on every push to `main`:

```bash
npm run build:demo      # vite build --base /synker/ --mode demo
```

The demo runs the mock API entirely in the browser (`src/demo/`), so it needs no backend. A GitHub Actions workflow (`deploy-demo.yml`) builds and deploys it to `dist/`.

### Production (Docker)

```bash
cp .env.example .env
# Edit .env with your Google credentials

docker compose up -d
```

The app will be available at http://your-host:3001 (or https://your-host:3001 when `HTTPS_KEY`/`HTTPS_CERT` are configured).

> **Note:** Google tokens are kept in memory only. Restarting the server or container clears authentication — click **Connect Google** once after each restart to re-authenticate.

### Accessing from another device (SSH tunnel)

If you browse to the app from another machine but keep the OAuth redirect URI set to `https://localhost:3001`, open an SSH tunnel so `localhost:3001` on your machine reaches the server:

```bash
ssh -L 3001:localhost:3001 user@your-host
```

Then open **https://localhost:3001** and authenticate. (Your browser will show a cert warning unless you install mkcert's root CA on that machine; the kiosk device that displays the app still reaches the server directly at **https://your-lan-ip:3001**.)

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
| `HTTPS_KEY` | Path to TLS private key (mkcert) to serve HTTPS; empty = HTTP | *(empty)* |
| `HTTPS_CERT` | Path to TLS certificate (mkcert) to serve HTTPS; empty = HTTP | *(empty)* |

> **HTTPS required for battery indicator, offline mode, and OAuth from the kiosk.** The Battery Status API and service workers only work over HTTPS (or `localhost`), and Google only accepts plain-HTTP OAuth redirect URIs on `localhost` (never on a LAN IP). Generate certs with [mkcert](https://github.com/FiloSottile/mkcert) (`mkcert your-lan-ip your-domain`), set `HTTPS_KEY`/`HTTPS_CERT`, and trust mkcert's root CA once on each device.

## Securing the network

Synker's API has **no built-in login** — any device that can reach port `3001` can view *and edit* your family's calendar and tasks through the server. It deliberately trusts the network it runs on, so on a home network the right way to keep neighbours, guests, and IoT devices out is to isolate the server and kiosk on their own network segment:

1. **VLAN / trusted SSID (preferred).** Put the server and kiosk on their own VLAN or a dedicated trusted SSID, and keep everyone else on the guest network (most access points have a "guest network" / "client isolation" setting that stops guests from reaching your LAN at all).
2. **If your router can't do VLANs**, the guest-network isolation feature is the equivalent lever — just verify guests really can't reach the trusted LAN.
3. **Static DHCP reservations** for the kiosk and server so their addresses never change.
4. **Keep internet access for the server.** Don't use Docker `internal: true` networks — the server must reach the internet for Google API sync. Isolation is done with ACLs at the router or host firewall, not by cutting the server off.
5. **Host firewall (recommended).** Docker publishes `3001:3001` on all interfaces, so on the server host allow only the kiosk IP(s) through, e.g. with UFW:

   ```bash
   sudo ufw allow from 192.168.1.50 to any port 3001 proto tcp   # kiosk
   sudo ufw deny 3001/tcp                                        # everyone else
   ```

   (Replace `192.168.1.50` with your kiosk's reserved address.)

6. **HTTPS still matters.** Network isolation keeps strangers off, but calendar and task data still travels in plaintext between the kiosk and the server over HTTP — see the HTTPS note in Configuration above for serving over TLS with mkcert.

> **Why no login?** Synker is a single-user family appliance: it has no accounts, passwords, or sessions — anyone who can reach it is treated as family. If you can't isolate the network (e.g. a flat subnet you don't control), put a reverse proxy with basic auth in front of it instead.

## Architecture

```
synker/
├── server/           # Express.js API server
│   ├── index.js      # Entry point, cron, static serving
│   ├── mock.js       # Dev-only mock server (no Google needed)
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
