import { LitElement, html, css } from 'lit';

class SynkerTasks extends LitElement {
  static properties = {
    tasks: { type: Array },
    taskLists: { type: Array },
    loading: { type: Boolean },
    selectedList: { type: String },
    showCompleted: { type: Boolean },
    showCreateForm: { type: Boolean },
    newTaskTitle: { type: String },
    newTaskNotes: { type: String },
    newTaskDue: { type: String },
    creating: { type: Boolean },
    editingTask: { type: Object },
    togglingIds: { type: Object },
    online: { type: Boolean },
  };

  static styles = css`
    :host {
      display: block;
    }

    .list-tabs {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding: 4px 0 16px;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }

    .list-tabs::-webkit-scrollbar {
      display: none;
    }

    .list-tab {
      padding: 8px 18px;
      border-radius: 20px;
      border: none;
      background: white;
      font-family: 'Fredoka', sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #7c6fa0;
      cursor: pointer;
      white-space: nowrap;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      transition: all 0.2s ease;
    }

    .list-tab.active {
      background: linear-gradient(135deg, #6bcb77 0%, #4caf50 100%);
      color: white;
      box-shadow: 0 4px 16px rgba(107, 203, 119, 0.3);
    }

    .list-tab:active {
      transform: scale(0.95);
    }

    .add-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 14px;
      margin-bottom: 16px;
      border: 2px dashed #d4c8f0;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.6);
      font-family: 'Fredoka', sans-serif;
      font-size: 16px;
      font-weight: 500;
      color: #6c63ff;
      cursor: pointer;
      transition: all 0.2s ease;
      gap: 8px;
    }

    .add-btn:active {
      transform: scale(0.98);
      background: rgba(108, 99, 255, 0.05);
    }

    .create-form {
      background: white;
      border-radius: 20px;
      padding: 20px;
      margin-bottom: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      animation: slideUp 0.2s ease;
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .form-field {
      margin-bottom: 12px;
    }

    .form-field label {
      display: block;
      font-family: 'Fredoka', sans-serif;
      font-size: 13px;
      font-weight: 500;
      color: #7c6fa0;
      margin-bottom: 4px;
    }

    .form-field input,
    .form-field textarea {
      width: 100%;
      padding: 12px 14px;
      border: 2px solid #e8e0f5;
      border-radius: 12px;
      font-family: 'Fredoka', sans-serif;
      font-size: 15px;
      color: #4a3f6b;
      outline: none;
      transition: border-color 0.2s ease;
      box-sizing: border-box;
    }

    .form-field input:focus,
    .form-field textarea:focus {
      border-color: #6c63ff;
    }

    .form-field textarea {
      resize: vertical;
      min-height: 60px;
    }

    .form-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }

    .form-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 12px;
      font-family: 'Fredoka', sans-serif;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .form-btn:active {
      transform: scale(0.95);
    }

    .form-btn.cancel {
      background: #f0e6ff;
      color: #7c6fa0;
    }

    .form-btn.submit {
      background: linear-gradient(135deg, #6c63ff 0%, #5a4fcf 100%);
      color: white;
      box-shadow: 0 4px 12px rgba(108, 99, 255, 0.3);
    }

    .form-btn.submit:disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .toggle-completed {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 0;
      margin-bottom: 12px;
      font-family: 'Fredoka', sans-serif;
      font-size: 14px;
      color: #a094c4;
      cursor: pointer;
      border: none;
      background: none;
    }

    .toggle-icon {
      transition: transform 0.2s ease;
    }

    .toggle-completed.open .toggle-icon {
      transform: rotate(90deg);
    }

    .tasks-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .task-card {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 14px 16px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 3px 12px rgba(0, 0, 0, 0.05);
      animation: slideUp 0.3s ease forwards;
      opacity: 0;
      transition: transform 0.2s ease, opacity 0.2s ease;
    }

    .task-card:active {
      transform: scale(0.98);
    }

    .task-card.completed {
      opacity: 0.6;
    }

    .task-card.toggling {
      opacity: 0.4;
      pointer-events: none;
    }

    .task-checkbox {
      width: 28px;
      height: 28px;
      border-radius: 9px;
      border: 2.5px solid #d4c8f0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 1px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .task-checkbox:active {
      transform: scale(0.85);
    }

    .task-card.completed .task-checkbox {
      background: linear-gradient(135deg, #6bcb77 0%, #4caf50 100%);
      border-color: #4caf50;
    }

    .task-card.completed .task-checkbox::after {
      content: '✓';
      color: white;
      font-size: 15px;
      font-weight: 700;
    }

    .task-content {
      flex: 1;
    }

    .task-title {
      font-family: 'Fredoka', sans-serif;
      font-size: 15px;
      font-weight: 500;
      color: #4a3f6b;
    }

    .task-card.completed .task-title {
      text-decoration: line-through;
      color: #a094c4;
    }

    .task-meta {
      display: flex;
      gap: 12px;
      margin-top: 4px;
    }

    .task-due {
      font-family: 'Fredoka', sans-serif;
      font-size: 12px;
      color: #ff6b9d;
      font-weight: 500;
    }

    .task-notes {
      font-family: 'Fredoka', sans-serif;
      font-size: 12px;
      color: #a094c4;
      margin-top: 4px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .task-edit-btn {
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 50%;
      background: #eef;
      color: #6c63ff;
      font-size: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.6;
      flex-shrink: 0;
      margin-top: 1px;
      transition: all 0.2s ease;
    }

    .task-edit-btn:active {
      transform: scale(0.9);
      opacity: 1;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 48px 24px;
      text-align: center;
    }

    .empty-icon {
      font-size: 64px;
      margin-bottom: 16px;
      animation: bounce 2s ease-in-out infinite;
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }

    .empty-text {
      font-family: 'Fredoka', sans-serif;
      font-size: 18px;
      color: #7c6fa0;
      font-weight: 500;
    }

    .loading {
      display: flex;
      justify-content: center;
      padding: 48px;
    }

    .loading-dots {
      display: flex;
      gap: 8px;
    }

    .loading-dots span {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #6bcb77;
      animation: pulse 1.2s ease-in-out infinite;
    }

    .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
    .loading-dots span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes pulse {
      0%, 100% { transform: scale(0.8); opacity: 0.5; }
      50% { transform: scale(1.2); opacity: 1; }
    }
  `;

  constructor() {
    super();
    this.tasks = [];
    this.taskLists = [];
    this.loading = true;
    this.selectedList = null;
    this.showCompleted = false;
    this.showCreateForm = false;
    this.newTaskTitle = '';
    this.newTaskNotes = '';
    this.newTaskDue = '';
    this.creating = false;
    this.editingTask = null;
    this.togglingIds = new Set();
    this._fetchData();
  }

  async _fetchData() {
    this.loading = true;
    try {
      const [listsRes, tasksRes] = await Promise.all([
        fetch('/api/tasks/lists'),
        fetch('/api/tasks'),
      ]);
      const listsData = await listsRes.json();
      const tasksData = await tasksRes.json();
      this.taskLists = listsData.lists || [];
      this.tasks = tasksData.tasks || [];
      if (!this.selectedList && this.taskLists.length > 0) {
        this.selectedList = this.taskLists[0].id;
      }
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    } finally {
      this.loading = false;
    }
  }

  refresh() {
    this._fetchData();
  }

  _getFilteredTasks() {
    if (!this.selectedList) return [];
    return this.tasks.filter(t => t.listId === this.selectedList);
  }

  _formatDue(dueStr) {
    if (!dueStr) return null;
    const due = new Date(dueStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (due.toDateString() === today.toDateString()) return '📌 Today';
    if (due.toDateString() === tomorrow.toDateString()) return '📌 Tomorrow';
    if (due < today) return '⚠️ Overdue';
    return `📅 ${due.toLocaleDateString('en', { month: 'short', day: 'numeric' })}`;
  }

  _toDateInputValue(isoStr) {
    if (!isoStr) return '';
    const d = new Date(isoStr);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  _startEdit(task) {
    this.editingTask = task;
    this.newTaskTitle = task.title;
    this.newTaskNotes = task.notes || '';
    this.newTaskDue = this._toDateInputValue(task.due);
    this.showCreateForm = true;
  }

  _closeForm() {
    this.showCreateForm = false;
    this.editingTask = null;
  }

  async _handleSubmit(e) {
    e.preventDefault();
    if (!this.newTaskTitle.trim()) return;

    this.creating = true;
    try {
      const listId = this.editingTask
        ? this.editingTask.listId
        : this.selectedList;

      const body = {
        title: this.newTaskTitle.trim(),
        listId,
      };
      if (this.newTaskNotes.trim()) body.notes = this.newTaskNotes.trim();
      if (this.newTaskDue) body.due = new Date(this.newTaskDue).toISOString();

      const isEditing = !!this.editingTask;
      const url = isEditing
        ? `/api/tasks/${encodeURIComponent(this.editingTask.id)}`
        : '/api/tasks';
      const method = isEditing ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        this.newTaskTitle = '';
        this.newTaskNotes = '';
        this.newTaskDue = '';
        this.showCreateForm = false;
        this.editingTask = null;
        await this._fetchData();
      }
    } catch (err) {
      console.error('Failed to save task:', err);
    } finally {
      this.creating = false;
    }
  }

  async _handleToggle(task) {
    const newSet = new Set(this.togglingIds);
    newSet.add(task.id);
    this.togglingIds = newSet;

    try {
      const res = await fetch(`/api/tasks/${task.id}/toggle`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listId: task.listId,
          completed: !task.completed,
        }),
      });

      if (res.ok) {
        await this._fetchData();
      }
    } catch (err) {
      console.error('Failed to toggle task:', err);
    } finally {
      const updated = new Set(this.togglingIds);
      updated.delete(task.id);
      this.togglingIds = updated;
    }
  }

  render() {
    if (this.loading) {
      return html`
        <div class="loading">
          <div class="loading-dots"><span></span><span></span><span></span></div>
        </div>
      `;
    }

    const filteredTasks = this._getFilteredTasks();
    const pendingTasks = filteredTasks.filter(t => !t.completed);
    const completedTasks = filteredTasks.filter(t => t.completed);

    return html`
      <div class="list-tabs" role="tablist" aria-label="Task lists">
        ${this.taskLists.map(list => html`
          <button
            class="list-tab ${this.selectedList === list.id ? 'active' : ''}"
            @click=${() => { this.selectedList = list.id; }}
            role="tab"
            aria-selected=${this.selectedList === list.id}
          >${list.title}</button>
        `)}
      </div>

      ${this.showCreateForm ? html`
        <form class="create-form" @submit=${this._handleSubmit}>
          <div class="form-field">
            <label for="task-title">What needs doing?</label>
            <input
              id="task-title"
              type="text"
              placeholder="e.g. Buy milk 🥛"
              .value=${this.newTaskTitle}
              @input=${(e) => { this.newTaskTitle = e.target.value; }}
              autofocus
            >
          </div>
          <div class="form-field">
            <label for="task-notes">Notes (optional)</label>
            <textarea
              id="task-notes"
              placeholder="Any extra details..."
              .value=${this.newTaskNotes}
              @input=${(e) => { this.newTaskNotes = e.target.value; }}
            ></textarea>
          </div>
          <div class="form-field">
            <label for="task-due">Due date (optional)</label>
            <input
              id="task-due"
              type="date"
              .value=${this.newTaskDue}
              @input=${(e) => { this.newTaskDue = e.target.value; }}
            >
          </div>
          <div class="form-actions">
            <button
              type="button"
              class="form-btn cancel"
              @click=${this._closeForm}
            >Cancel</button>
            <button
              type="submit"
              class="form-btn submit"
              ?disabled=${!this.newTaskTitle.trim() || this.creating}
            >${this.creating
              ? (this.editingTask ? 'Saving...' : 'Adding...')
              : (this.editingTask ? 'Save Changes 💾' : 'Add Task ✨')}</button>
          </div>
        </form>
      ` : (this.online ? html`
        <button class="add-btn" @click=${() => { this.showCreateForm = true; }}>
          <span>➕</span> New Task
        </button>
      ` : '')}
      ${pendingTasks.length === 0 && !this.showCompleted ? html`
        <div class="empty-state">
          <div class="empty-icon">🎉</div>
          <div class="empty-text">All done! You're a star! ⭐</div>
        </div>
      ` : html`
        <div class="tasks-list" role="list" aria-label="Tasks">
          ${pendingTasks.map((task, i) => this._renderTask(task, i, false))}
        </div>
      `}

      ${completedTasks.length > 0 ? html`
        <button
          class="toggle-completed ${this.showCompleted ? 'open' : ''}"
          @click=${() => { this.showCompleted = !this.showCompleted; }}
          aria-expanded=${this.showCompleted}
        >
          <span class="toggle-icon">▶</span>
          ${completedTasks.length} completed
        </button>
        ${this.showCompleted ? html`
          <div class="tasks-list" role="list" aria-label="Completed tasks">
            ${completedTasks.map((task, i) => this._renderTask(task, i, true))}
          </div>
        ` : ''}
      ` : ''}
    `;
  }

  _renderTask(task, index, completed) {
    const due = this._formatDue(task.due);
    const toggling = this.togglingIds.has(task.id);

    return html`
      <div
        class="task-card ${completed ? 'completed' : ''} ${toggling ? 'toggling' : ''}"
        role="listitem"
        style="animation-delay: ${index * 0.03}s"
      >
        <div
          class="task-checkbox"
          role="checkbox"
          aria-checked=${completed}
          aria-label="Mark ${task.title} as ${completed ? 'incomplete' : 'complete'}"
          tabindex="0"
          @click=${this.online ? () => this._handleToggle(task) : undefined}
          @keydown=${this.online ? (e) => { if (e.key === 'Enter' || e.key === ' ') this._handleToggle(task); } : undefined}
        ></div>
        <div class="task-content">
          <div class="task-title">${task.title}</div>
          <div class="task-meta">
            ${due ? html`<span class="task-due">${due}</span>` : ''}
          </div>
          ${task.notes ? html`<div class="task-notes">${task.notes}</div>` : ''}
        </div>
        ${this.online ? html`
          <button
            class="task-edit-btn"
            @click=${() => this._startEdit(task)}
            aria-label="Edit task ${task.title}"
          >✏️</button>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('synker-tasks', SynkerTasks);
