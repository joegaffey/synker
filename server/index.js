import 'dotenv/config';
import express from 'express';
import path from 'path';
import fs from 'fs';
import https from 'https';
import { fileURLToPath } from 'url';
import cron from 'node-cron';
import { authRouter } from './routes/auth.js';
import { calendarRouter } from './routes/calendar.js';
import { tasksRouter } from './routes/tasks.js';
import { syncAll } from './services/sync.js';
import { store } from './services/store.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// API routes
app.use('/api/auth', authRouter);
app.use('/api/calendar', calendarRouter);
app.use('/api/tasks', tasksRouter);

// Manual sync endpoint
app.post('/api/sync', async (req, res) => {
  try {
    await syncAll();
    res.json({ success: true, lastSync: store.lastSync });
  } catch (err) {
    console.error('Manual sync failed:', err.message);
    res.status(500).json({ error: 'Sync failed', message: err.message });
  }
});

// Status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    authenticated: store.isAuthenticated(),
    lastSync: store.lastSync,
    syncInterval: process.env.SYNC_INTERVAL || 5,
  });
});

// Serve static files in production
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Schedule periodic sync
const interval = process.env.SYNC_INTERVAL || 5;
cron.schedule(`*/${interval} * * * *`, async () => {
  if (store.isAuthenticated()) {
    console.log(`[Sync] Running scheduled sync...`);
    try {
      await syncAll();
      console.log(`[Sync] Complete at ${store.lastSync}`);
    } catch (err) {
      console.error('[Sync] Failed:', err.message);
    }
  }
});

const httpsKeyPath = process.env.HTTPS_KEY;
const httpsCertPath = process.env.HTTPS_CERT;

let server;
if (httpsKeyPath && httpsCertPath) {
  try {
    server = https.createServer({
      key: fs.readFileSync(httpsKeyPath),
      cert: fs.readFileSync(httpsCertPath),
    }, app);
  } catch (err) {
    console.error(`[HTTPS] Failed to read certs (${httpsKeyPath}, ${httpsCertPath}):`, err.message);
    console.error('[HTTPS] Falling back to plain HTTP.');
    server = app;
  }
} else {
  server = app;
}

const scheme = server === app ? 'http' : 'https';

server.listen(PORT, () => {
  console.log(`🚀 Synker server running on ${scheme}://0.0.0.0:${PORT}`);
  console.log(`📅 Sync interval: every ${interval} minutes`);
});
