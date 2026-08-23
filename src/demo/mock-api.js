import { lists, events, tasks, lastSync } from './mock-data.js';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function parseQuery(path) {
  const qs = path.split('?')[1];
  if (!qs) return {};
  return Object.fromEntries(new URLSearchParams(qs));
}

export async function mockRequest(path, init = {}) {
  const cleanPath = path.split('?')[0];
  const method = (init.method || 'GET').toUpperCase();
  await delay(150);

  if (method !== 'GET' && cleanPath !== '/sync') {
    return json({ error: 'Read-only demo' }, 405);
  }

  if (cleanPath === '/status') {
    return json({ authenticated: true, lastSync, syncInterval: 5 });
  }

  if (cleanPath === '/calendar/events') {
    return json({ events, lastSync });
  }

  const monthMatch = cleanPath.match(/^\/calendar\/events\/month\/(\d+)\/(\d+)$/);
  if (monthMatch) {
    const year = parseInt(monthMatch[1], 10);
    const month = parseInt(monthMatch[2], 10);
    const filtered = events.filter((e) => {
      const d = new Date(e.start.includes('T') ? e.start : `${e.start}T00:00:00`);
      return d.getFullYear() === year && d.getMonth() === month;
    });
    return json({ events: filtered });
  }

  if (cleanPath === '/tasks/lists') {
    return json({ lists });
  }

  if (cleanPath === '/tasks') {
    const { listId, completed } = parseQuery(path);
    let filtered = tasks;
    if (listId) filtered = filtered.filter((t) => t.listId === listId);
    if (completed !== undefined) {
      const show = completed === 'true';
      filtered = filtered.filter((t) => t.completed === show);
    }
    return json({ tasks: filtered, lastSync });
  }

  if (cleanPath === '/sync') {
    return json({ success: true, lastSync: new Date().toISOString() });
  }

  return json({ error: 'Not found' }, 404);
}
