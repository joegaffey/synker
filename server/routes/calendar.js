import { Router } from 'express';
import { google } from 'googleapis';
import { getAuthenticatedClient } from '../services/google-auth.js';
import { store } from '../services/store.js';
import { syncCalendar } from '../services/sync.js';

export const calendarRouter = Router();

calendarRouter.get('/events', (req, res) => {
  if (!store.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json({
    events: store.events,
    lastSync: store.lastSync,
  });
});

// Fetch events for a specific month (on-demand, not cached)
calendarRouter.get('/events/month/:year/:month', async (req, res) => {
  if (!store.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const year = parseInt(req.params.year);
  const month = parseInt(req.params.month); // 0-indexed

  if (isNaN(year) || isNaN(month) || month < 0 || month > 11) {
    return res.status(400).json({ error: 'Invalid year or month' });
  }

  try {
    const auth = getAuthenticatedClient();
    const calendar = google.calendar({ version: 'v3', auth });
    const calendarIds = (process.env.CALENDAR_IDS || 'primary').split(',').map(id => id.trim());

    const timeMin = new Date(year, month, 1).toISOString();
    const timeMax = new Date(year, month + 1, 1).toISOString();

    const allEvents = [];

    for (const calendarId of calendarIds) {
      try {
        const result = await calendar.events.list({
          calendarId,
          timeMin,
          timeMax,
          singleEvents: true,
          orderBy: 'startTime',
          maxResults: 100,
        });

        const events = (result.data.items || []).map(event => ({
          id: event.id,
          calendarId,
          title: event.summary || '(No title)',
          description: event.description || '',
          start: event.start?.dateTime || event.start?.date,
          end: event.end?.dateTime || event.end?.date,
          allDay: !event.start?.dateTime,
          location: event.location || '',
          color: event.colorId || null,
          attendees: (event.attendees || []).map(a => ({
            name: a.displayName || a.email,
            email: a.email,
            response: a.responseStatus,
          })),
        }));

        allEvents.push(...events);
      } catch (err) {
        console.error(`[Month] Failed to fetch calendar ${calendarId}:`, err.message);
      }
    }

    res.json({ events: allEvents });
  } catch (err) {
    console.error('Failed to fetch month events:', err.message);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

calendarRouter.get('/events/today', (req, res) => {
  if (!store.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const todayEvents = store.events.filter(event => {
    if (!event.start) return false;
    if (!event.start.includes('T')) return event.start === today;
    const d = new Date(event.start);
    const eventDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return eventDate === today;
  });

  res.json({ events: todayEvents, lastSync: store.lastSync });
});

// Create a new event
calendarRouter.post('/events', async (req, res) => {
  if (!store.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const { title, description, start, end, allDay, calendarId, location, timeZone } = req.body;
  if (!title || !start) {
    return res.status(400).json({ error: 'Title and start are required' });
  }

  try {
    const auth = getAuthenticatedClient();
    const calendar = google.calendar({ version: 'v3', auth });

    const targetCalendar = calendarId || (process.env.CALENDAR_IDS || 'primary').split(',')[0].trim();
    const tz = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;

    let event;
    if (allDay) {
      event = {
        summary: title,
        description: description || undefined,
        location: location || undefined,
        start: { date: start },
        end: { date: end || start },
      };
    } else {
      event = {
        summary: title,
        description: description || undefined,
        location: location || undefined,
        start: { dateTime: start, timeZone: tz },
        end: { dateTime: end || new Date(new Date(start).getTime() + 3600000).toISOString(), timeZone: tz },
      };
    }

    const result = await calendar.events.insert({
      calendarId: targetCalendar,
      requestBody: event,
    });

    // Re-sync to update local store
    await syncCalendar();

    res.json({ success: true, event: result.data });
  } catch (err) {
    console.error('Failed to create event:', err.message);
    res.status(500).json({ error: 'Failed to create event', message: err.message });
  }
});

// Update an event
calendarRouter.patch('/events/:eventId', async (req, res) => {
  if (!store.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const { eventId } = req.params;
  const { title, description, start, end, allDay, calendarId, location, timeZone } = req.body;

  if (!calendarId) {
    return res.status(400).json({ error: 'calendarId is required' });
  }

  try {
    const auth = getAuthenticatedClient();
    const calendar = google.calendar({ version: 'v3', auth });

    const event = {};
    if (title !== undefined) event.summary = title;
    if (description !== undefined) event.description = description || undefined;
    if (location !== undefined) event.location = location || undefined;

    if (start) {
      const tz = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (allDay) {
        event.start = { date: start };
        event.end = { date: end || start };
      } else {
        event.start = { dateTime: start, timeZone: tz };
        event.end = { dateTime: end || new Date(new Date(start).getTime() + 3600000).toISOString(), timeZone: tz };
      }
    }

    const result = await calendar.events.patch({
      calendarId,
      eventId,
      requestBody: event,
    });

    // Re-sync to update local store
    await syncCalendar();

    res.json({ success: true, event: result.data });
  } catch (err) {
    console.error('Failed to update event:', err.message);
    res.status(500).json({ error: 'Failed to update event', message: err.message });
  }
});

// Delete an event
calendarRouter.delete('/events/:eventId', async (req, res) => {
  if (!store.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const { eventId } = req.params;
  const { calendarId } = req.body;

  if (!calendarId) {
    return res.status(400).json({ error: 'calendarId is required' });
  }

  try {
    const auth = getAuthenticatedClient();
    const calendar = google.calendar({ version: 'v3', auth });

    await calendar.events.delete({
      calendarId,
      eventId,
    });

    // Re-sync to update local store
    await syncCalendar();

    res.json({ success: true });
  } catch (err) {
    console.error('Failed to delete event:', err.message);
    res.status(500).json({ error: 'Failed to delete event', message: err.message });
  }
});
