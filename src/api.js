import { mockRequest } from './demo/mock-api.js';

const DEMO = import.meta.env.VITE_DEMO === 'true';

export function api(path, init) {
  if (DEMO) return mockRequest(path, init);
  return fetch(`/api${path}`, init);
}
