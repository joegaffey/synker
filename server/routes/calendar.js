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

calendarRouter.get('/events/today', (req, res) => {
  if (!store.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const today = new Date().toISOString().split('T')[0];
  const todayEvents = store.events.filter(event => {
    const eventDate = event.start?.split('T')[0] || event.start;
    return eventDate === today;
  });

  res.json({ events: todayEvents, lastSync: store.lastSync });
});

// Create a new event
calendarRouter.post('/events', async (req, res) => {
  if (!store.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const { title, description, start, end, allDay, calendarId, location } = req.body;
  if (!title || !start) {
    return res.status(400).json({ error: 'Title and start are required' });
  }

  try {
    const auth = getAuthenticatedClient();
    const calendar = google.calendar({ version: 'v3', auth });

    const targetCalendar = calendarId || 'primary';

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
        start: { dateTime: start, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone },
        end: { dateTime: end || new Date(new Date(start).getTime() + 3600000).toISOString(), timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone },
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
