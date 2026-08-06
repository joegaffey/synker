import { google } from 'googleapis';
import { getAuthenticatedClient } from './google-auth.js';
import { store } from './store.js';

export async function syncCalendar() {
  const auth = getAuthenticatedClient();
  const calendar = google.calendar({ version: 'v3', auth });

  const calendarIds = (process.env.CALENDAR_IDS || 'primary').split(',').map(id => id.trim());

  const now = new Date();
  const timeMin = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const timeMax = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()).toISOString();

  const allEvents = [];

  for (const calendarId of calendarIds) {
    try {
      const res = await calendar.events.list({
        calendarId,
        timeMin,
        timeMax,
        singleEvents: true,
        orderBy: 'startTime',
        maxResults: 100,
      });

      const events = (res.data.items || []).map(event => ({
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
      console.error(`[Sync] Failed to fetch calendar ${calendarId}:`, err.message);
    }
  }

  store.setEvents(allEvents);
  return allEvents;
}

export async function syncTasks() {
  const auth = getAuthenticatedClient();
  const tasks = google.tasks({ version: 'v1', auth });

  // Get task lists
  const listRes = await tasks.tasklists.list({ maxResults: 20 });
  const taskLists = (listRes.data.items || []).map(list => ({
    id: list.id,
    title: list.title,
  }));
  store.setTaskLists(taskLists);

  const allTasks = [];

  for (const list of taskLists) {
    try {
      const res = await tasks.tasks.list({
        tasklist: list.id,
        maxResults: 100,
        showCompleted: true,
        showHidden: false,
      });

      const items = (res.data.items || []).map(task => ({
        id: task.id,
        listId: list.id,
        listTitle: list.title,
        title: task.title || '(No title)',
        notes: task.notes || '',
        due: task.due || null,
        completed: task.status === 'completed',
        completedAt: task.completed || null,
        position: task.position,
        parent: task.parent || null,
      }));

      allTasks.push(...items);
    } catch (err) {
      console.error(`[Sync] Failed to fetch tasks for ${list.title}:`, err.message);
    }
  }

  store.setTasks(allTasks);
  return allTasks;
}

export async function syncAll() {
  await Promise.all([syncCalendar(), syncTasks()]);
  store.updateLastSync();
}
