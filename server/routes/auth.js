import { Router } from 'express';
import { getOAuth2Client } from '../services/google-auth.js';
import { store } from '../services/store.js';
import { syncAll } from '../services/sync.js';

export const authRouter = Router();

const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/tasks',
];

authRouter.get('/login', (req, res) => {
  const client = getOAuth2Client();
  const url = client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
  });
  res.redirect(url);
});

authRouter.get('/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).send('Missing authorization code');
  }

  try {
    const client = getOAuth2Client();
    const { tokens } = await client.getToken(code);
    store.setTokens(tokens);

    // Trigger initial sync
    await syncAll();

    // Redirect back to app
    res.redirect('/');
  } catch (err) {
    console.error('Auth callback error:', err.message);
    res.status(500).send('Authentication failed');
  }
});

authRouter.get('/status', (req, res) => {
  res.json({ authenticated: store.isAuthenticated() });
});

authRouter.post('/logout', (req, res) => {
  store.setTokens(null);
  res.json({ success: true });
});
