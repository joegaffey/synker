// In-memory store for synced data and tokens
class Store {
  constructor() {
    this.tokens = null;
    this.events = [];
    this.tasks = [];
    this.taskLists = [];
    this.lastSync = null;
  }

  isAuthenticated() {
    return this.tokens !== null;
  }

  setTokens(tokens) {
    this.tokens = tokens;
  }

  setEvents(events) {
    this.events = events;
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }

  setTaskLists(taskLists) {
    this.taskLists = taskLists;
  }

  updateLastSync() {
    this.lastSync = new Date().toISOString();
  }
}

export const store = new Store();
