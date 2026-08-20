// Dev-only mock server that fakes the Google integration with in-memory data.
// Lets you exercise the full UI (create/edit/delete/toggle) without Google.
//
// Run it, then point vite at it (npm run dev:client proxies /api -> :3001):
//   node server/mock.js
//
// Or build the frontend and test fully standalone:
//   npm run build && node server/mock.js   (serves dist on :3001)

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.MOCK_PORT || 3001;

app.use(express.json());

// ---------- Fake data helpers ----------
const pad = (n) => String(n).padStart(2, '0');
const fmt = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const daysFromNow = (n, hour) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  if (hour !== undefined) d.setHours(hour, 0, 0, 0);
  return d;
};

let seq = 1;
const nextId = (prefix) => `${prefix}${seq++}`;

const lists = [
  { id: '@default', title: 'Default List' },
  { id: 'groceries', title: 'Groceries 🛒' },
  { id: 'family', title: 'Family Plans' },
];

const events = [
  {
    id: 'ev1',
    calendarId: 'primary',
    title: 'Family Dinner 🍕',
    description: '',
    start: `${fmt(daysFromNow(0))}T18:30:00`,
    end: `${fmt(daysFromNow(0))}T20:00:00`,
    allDay: false,
    location: "Grandma's house",
    color: null,
    attendees: [],
  },
  {
    id: 'ev2',
    calendarId: 'primary',
    title: 'School Sports Day 🏃',
    description: 'Bring sunscreen and water',
    start: fmt(daysFromNow(2)),
    end: fmt(daysFromNow(2)),
    allDay: true,
    location: 'City park',
    color: null,
    attendees: [],
  },
  {
    id: 'ev3',
    calendarId: 'family',
    title: 'Dentist Appointment 🦷',
    description: '',
    start: `${fmt(daysFromNow(-1))}T09:00:00`,
    end: `${fmt(daysFromNow(-1))}T09:45:00`,
    allDay: false,
    location: 'Smile Dental',
    color: null,
    attendees: [],
  },
  {
    id: 'ev4',
    calendarId: 'primary',
    title: 'Weekend Road Trip 🚗',
    description: 'Pack the camping gear',
    start: fmt(daysFromNow(4)),
    end: fmt(daysFromNow(6)),
    allDay: true,
    location: 'Lakeview',
    color: null,
    attendees: [],
  },
];

const tasks = [
  { id: 't1', listId: '@default', listTitle: 'Default List', title: 'Buy milk 🥛', notes: 'Two litres', due: `${fmt(daysFromNow(0))}T00:00:00`, completed: false, completedAt: null, position: '00000000000000000001', parent: null },
  { id: 't2', listId: 'groceries', listTitle: 'Groceries 🛒', title: 'Vegetables for the week', notes: 'Tomatoes, lettuce, carrots', due: `${fmt(daysFromNow(1))}T00:00:00`, completed: false, completedAt: null, position: '00000000000000000002', parent: null },
  { id: 't3', listId: 'family', listTitle: 'Family Plans', title: 'Book cinema tickets 🎬', notes: 'Check times first', due: null, completed: false, completedAt: null, position: '00000000000000000003', parent: null },
  { id: 't4', listId: 'groceries', listTitle: 'Groceries 🛒', title: 'Pick up dry cleaning', notes: '', due: `${fmt(daysFromNow(-1))}T00:00:00`, completed: true, completedAt: `${fmt(daysFromNow(-1))}T10:00:00`, position: '00000000000000000004', parent: null },
];

const lastSync = new Date().toISOString();

// ---------- Auth ----------
app.get('/api/status', (req, res) => {
  res.json({ authenticated: true, lastSync, syncInterval: 5 });
});
app.get('/api/auth/status', (req, res) => {
  res.json({ authenticated: true });
});

// ---------- Calendar ----------
app.get('/api/calendar/events', (req, res) => {
  res.json({ events, lastSync });
});

app.get('/api/calendar/events/month/:year/:month', (req, res) => {
  const year = parseInt(req.params.year);
  const month = parseInt(req.params.month);
  const filtered = events.filter((e) => {
    const d = new Date(e.start.includes('T') ? e.start : `${e.start}T00:00:00`);
    return d.getFullYear() === year && d.getMonth() === month;
  });
  res.json({ events: filtered });
});

app.post('/api/calendar/events', (req, res) => {
  const { title, description, start, end, allDay, calendarId, location } = req.body;
  if (!title || !start) return res.status(400).json({ error: 'Title and start are required' });
  const event = {
    id: nextId('ev'),
    calendarId: calendarId || 'primary',
    title,
    description: description || '',
    start,
    end: end || start,
    allDay: !!allDay,
    location: location || '',
    color: null,
    attendees: [],
  };
  events.unshift(event);
  res.json({ success: true, event });
});

app.patch('/api/calendar/events/:eventId', (req, res) => {
  const event = events.find((e) => e.id === req.params.eventId);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  const { title, description, start, end, allDay, location } = req.body;
  if (title !== undefined) event.title = title;
  if (description !== undefined) event.description = description || '';
  if (location !== undefined) event.location = location || '';
  if (start) {
    event.start = start;
    event.end = end || start;
    event.allDay = !!allDay;
  }
  res.json({ success: true, event });
});

app.delete('/api/calendar/events/:eventId', (req, res) => {
  const idx = events.findIndex((e) => e.id === req.params.eventId);
  if (idx === -1) return res.status(404).json({ error: 'Event not found' });
  events.splice(idx, 1);
  res.json({ success: true });
});

// ---------- Tasks ----------
app.get('/api/tasks/lists', (req, res) => {
  res.json({ lists });
});

app.get('/api/tasks', (req, res) => {
  const { listId, completed } = req.query;
  let filtered = tasks;
  if (listId) filtered = filtered.filter((t) => t.listId === listId);
  if (completed !== undefined) {
    const show = completed === 'true';
    filtered = filtered.filter((t) => t.completed === show);
  }
  res.json({ tasks: filtered, lastSync });
});

app.post('/api/tasks', (req, res) => {
  const { title, notes, due, listId } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  const list = lists.find((l) => l.id === listId) || lists[0];
  const task = {
    id: nextId('t'),
    listId: list.id,
    listTitle: list.title,
    title,
    notes: notes || '',
    due: due || null,
    completed: false,
    completedAt: null,
    position: String(seq).padStart(20, '0'),
    parent: null,
  };
  tasks.unshift(task);
  res.json({ success: true, task });
});

app.patch('/api/tasks/:taskId', (req, res) => {
  const task = tasks.find((t) => t.id === req.params.taskId);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  const { title, notes, due } = req.body;
  if (title !== undefined) task.title = title;
  if (notes !== undefined) task.notes = notes || '';
  if (due !== undefined) task.due = due || null;
  res.json({ success: true, task });
});

app.patch('/api/tasks/:taskId/toggle', (req, res) => {
  const task = tasks.find((t) => t.id === req.params.taskId);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  task.completed = !task.completed;
  task.completedAt = task.completed ? new Date().toISOString() : null;
  res.json({ success: true });
});

// ---------- Sync ----------
app.post('/api/sync', (req, res) => {
  res.json({ success: true, lastSync: new Date().toISOString() });
});

// ---------- Static frontend (standalone mode) ----------
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🧪 Mock server (no Google) running on http://localhost:${PORT}`);
  console.log(`   Frontend: open this URL directly, or use vite on :3000`);
});
