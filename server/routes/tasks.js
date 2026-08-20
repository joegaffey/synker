import { Router } from 'express';
import { google } from 'googleapis';
import { getAuthenticatedClient } from '../services/google-auth.js';
import { store } from '../services/store.js';
import { syncTasks } from '../services/sync.js';

export const tasksRouter = Router();

tasksRouter.get('/lists', (req, res) => {
  if (!store.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json({ lists: store.taskLists });
});

tasksRouter.get('/', (req, res) => {
  if (!store.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const { listId, completed } = req.query;
  let tasks = store.tasks;

  if (listId) {
    tasks = tasks.filter(t => t.listId === listId);
  }
  if (completed !== undefined) {
    const showCompleted = completed === 'true';
    tasks = tasks.filter(t => t.completed === showCompleted);
  }

  res.json({ tasks, lastSync: store.lastSync });
});

// Create a new task
tasksRouter.post('/', async (req, res) => {
  if (!store.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const { title, notes, due, listId } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const auth = getAuthenticatedClient();
    const tasks = google.tasks({ version: 'v1', auth });

    const tasklist = listId || (store.taskLists[0]?.id) || '@default';

    const taskBody = {
      title,
      notes: notes || undefined,
      due: due || undefined,
    };

    const result = await tasks.tasks.insert({
      tasklist,
      requestBody: taskBody,
    });

    // Re-sync tasks to update local store
    await syncTasks();

    res.json({ success: true, task: result.data });
  } catch (err) {
    console.error('Failed to create task:', err.message);
    res.status(500).json({ error: 'Failed to create task', message: err.message });
  }
});

// Update a task
tasksRouter.patch('/:taskId', async (req, res) => {
  if (!store.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const { taskId } = req.params;
  const { title, notes, due, listId } = req.body;

  if (!listId) {
    return res.status(400).json({ error: 'listId is required' });
  }

  try {
    const auth = getAuthenticatedClient();
    const tasks = google.tasks({ version: 'v1', auth });

    const taskBody = {};
    if (title !== undefined) taskBody.title = title;
    if (notes !== undefined) taskBody.notes = notes || '';
    if (due !== undefined) taskBody.due = due || null;

    const result = await tasks.tasks.patch({
      tasklist: listId,
      task: taskId,
      requestBody: taskBody,
    });

    // Re-sync tasks to update local store
    await syncTasks();

    res.json({ success: true, task: result.data });
  } catch (err) {
    console.error('Failed to update task:', err.message);
    res.status(500).json({ error: 'Failed to update task', message: err.message });
  }
});

// Toggle task completion
tasksRouter.patch('/:taskId/toggle', async (req, res) => {
  if (!store.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const { taskId } = req.params;
  const { listId, completed } = req.body;

  if (!listId) {
    return res.status(400).json({ error: 'listId is required' });
  }

  try {
    const auth = getAuthenticatedClient();
    const tasks = google.tasks({ version: 'v1', auth });

    const status = completed ? 'completed' : 'needsAction';
    const update = {
      status,
      completed: completed ? new Date().toISOString() : null,
    };

    // If uncompleting, we need to clear the completed field
    if (!completed) {
      update.completed = null;
    }

    await tasks.tasks.patch({
      tasklist: listId,
      task: taskId,
      requestBody: update,
    });

    // Re-sync tasks to update local store
    await syncTasks();

    res.json({ success: true });
  } catch (err) {
    console.error('Failed to toggle task:', err.message);
    res.status(500).json({ error: 'Failed to toggle task', message: err.message });
  }
});
