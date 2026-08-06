import { google } from 'googleapis';
import { store } from './store.js';

export function getOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
}

export function getAuthenticatedClient() {
  const client = getOAuth2Client();
  if (!store.tokens) {
    throw new Error('Not authenticated');
  }
  client.setCredentials(store.tokens);

  // Handle token refresh
  client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
      store.setTokens({ ...store.tokens, ...tokens });
    } else {
      store.setTokens({ ...store.tokens, ...tokens });
    }
  });

  return client;
}
