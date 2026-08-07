import { LitElement, html, css } from 'lit';

class SynkerCalendar extends LitElement {
  static properties = {
    events: { type: Array },
    loading: { type: Boolean },
    selectedDate: { type: String },
    viewYear: { type: Number },
    viewMonth: { type: Number },
    showCreateForm: { type: Boolean },
    newEventTitle: { type: String },
    newEventLocation: { type: String },
    newEventDate: { type: String },
    newEventStartTime: { type: String },
    newEventEndTime: { type: String },
    newEventAllDay: { type: Boolean },
    newEventCalendar: { type: String },
    creating: { type: Boolean },
    deletingId: { type: String },
    confirmDeleteId: { type: String },
    calendars: { type: Array },
  };

  static styles = css`
    :host {
      display: block;
    }

    .month-nav {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-bottom: 12px;
    }

    .month-nav-btn {
      font-family: 'Fredoka', sans-serif;
      font-size: 24px;
      font-weight: 600;
      color: #6c63ff;
      background: white;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .month-nav-btn:active {
      transform: scale(0.9);
      background: #f0eeff;
    }

    .month-label {
      font-family: 'Fredoka', sans-serif;
      font-size: 20px;
      font-weight: 600;
      color: #4a3f6b;
      text-align: center;
    }

    .date-strip {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      padding: 4px 0 16px;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }

    .date-strip::-webkit-scrollbar {
      display: none;
    }

    .date-chip {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 8px 10px;
      border-radius: 14px;
      background: white;
      border: none;
      cursor: pointer;
      min-width: 48px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      transition: all 0.2s ease;
      font-family: 'Fredoka', sans-serif;
      position: relative;
    }

    .date-chip.active {
      background: linear-gradient(135deg, #ff6b9d 0%, #ff8a80 100%);
      color: white;
      transform: scale(1.08);
      box-shadow: 0 4px 16px rgba(255, 107, 157, 0.3);
    }

    .date-chip.today {
      border: 2px solid #ff6b9d;
    }

    .date-chip.has-events::after {
      content: '';
      position: absolute;
      bottom: 4px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #6c63ff;
    }

    .date-chip.active.has-events::after {
      background: white;
    }

    .date-chip:active {
      transform: scale(0.95);
    }

    .date-day {
      font-size: 10px;
      font-weight: 500;
      text-transform: uppercase;
      opacity: 0.7;
    }

    .date-num {
      font-size: 18px;
      font-weight: 700;
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
    .form-field select {
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
      background: white;
    }

    .form-field input:focus,
    .form-field select:focus {
      border-color: #6c63ff;
    }

    .form-row {
      display: flex;
      gap: 10px;
    }

    .form-row .form-field {
      flex: 1;
    }

    .form-toggle {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 0;
      font-family: 'Fredoka', sans-serif;
      font-size: 14px;
      color: #7c6fa0;
      cursor: pointer;
    }

    .form-toggle input[type="checkbox"] {
      width: 20px;
      height: 20px;
      accent-color: #6c63ff;
    }

    .form-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      margin-top: 16px;
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

    .section-title {
      font-family: 'Fredoka', sans-serif;
      font-size: 16px;
      font-weight: 600;
      color: #7c6fa0;
      margin: 16px 0 10px;
    }

    .events-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .event-card {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 14px;
      background: white;
      border-radius: 18px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
      transition: transform 0.2s ease;
      animation: slideUp 0.3s ease forwards;
      opacity: 0;
      position: relative;
    }

    .event-card:active {
      transform: scale(0.98);
    }

    .event-card.deleting {
      opacity: 0.4;
      pointer-events: none;
    }

    .event-time-badge {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8px 10px;
      background: linear-gradient(135deg, #6c63ff 0%, #5a4fcf 100%);
      border-radius: 12px;
      color: white;
      min-width: 56px;
    }

    .event-time-badge.all-day {
      background: linear-gradient(135deg, #ffd93d 0%, #ffb347 100%);
    }

    .event-time-hour {
      font-family: 'Fredoka', sans-serif;
      font-size: 14px;
      font-weight: 700;
    }

    .event-time-period {
      font-family: 'Fredoka', sans-serif;
      font-size: 10px;
      font-weight: 500;
      opacity: 0.8;
    }

    .event-details {
      flex: 1;
    }

    .event-title {
      font-family: 'Fredoka', sans-serif;
      font-size: 15px;
      font-weight: 600;
      color: #4a3f6b;
      margin-bottom: 2px;
    }

    .event-meta {
      font-family: 'Fredoka', sans-serif;
      font-size: 12px;
      color: #a094c4;
    }

    .event-date-label {
      font-family: 'Fredoka', sans-serif;
      font-size: 12px;
      color: #a094c4;
      margin-top: 2px;
    }

    .event-delete-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 50%;
      background: #fee;
      color: #ff4444;
      font-size: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.6;
      transition: all 0.2s ease;
    }

    .event-delete-btn:active {
      transform: scale(0.9);
      opacity: 1;
    }

    .confirm-delete {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      animation: fadeIn 0.15s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .confirm-delete .form-btn {
      padding: 8px 16px;
      font-size: 13px;
    }

    .confirm-delete .form-btn.delete {
      background: linear-gradient(135deg, #ff4444 0%, #cc0000 100%);
      color: white;
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
      background: #6c63ff;
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
    this.events = [];
    this.loading = true;
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    this.selectedDate = todayStr;
    this.viewYear = now.getFullYear();
    this.viewMonth = now.getMonth();
    this.showCreateForm = false;
    this.newEventTitle = '';
    this.newEventLocation = '';
    this.newEventDate = todayStr;
    this.newEventStartTime = '09:00';
    this.newEventEndTime = '10:00';
    this.newEventAllDay = false;
    this.newEventCalendar = 'primary';
    this.creating = false;
    this.deletingId = null;
    this.confirmDeleteId = null;
    this.calendars = [];
    this._fetchEvents();
  }

  async _fetchEvents() {
    this.loading = true;
    try {
      const res = await fetch('/api/calendar/events');
      const data = await res.json();
      this.events = data.events || [];
      // Extract unique calendars
      const calSet = new Map();
      for (const event of this.events) {
        if (!calSet.has(event.calendarId)) {
          calSet.set(event.calendarId, event.calendarId);
        }
      }
      this.calendars = Array.from(calSet.keys());
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      this.loading = false;
    }
  }

  refresh() {
    this._fetchEvents();
  }

  _getMonthDates() {
    const today = new Date();
    const year = this.viewYear;
    const month = this.viewMonth;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dates = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      dates.push({
        date: dateStr,
        day: d.toLocaleDateString('en', { weekday: 'short' }),
        num: day,
        isToday: d.toDateString() === today.toDateString(),
      });
    }
    return dates;
  }

  _getLocalDate(dateStr) {
    if (!dateStr) return '';
    // All-day events are just YYYY-MM-DD, no conversion needed
    if (!dateStr.includes('T')) return dateStr;
    // Timed events: parse and extract local date
    const d = new Date(dateStr);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  _getDatesWithEvents() {
    const set = new Set();
    for (const event of this.events) {
      const date = this._getLocalDate(event.start);
      if (date) set.add(date);
    }
    return set;
  }

  _getSelectedDayEvents() {
    return this.events.filter(event => {
      const eventDate = this._getLocalDate(event.start);
      return eventDate === this.selectedDate;
    });
  }

  _getUpcomingEvents() {
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    return this.events
      .filter(event => {
        const eventDate = this._getLocalDate(event.start);
        return eventDate >= today;
      })
      .sort((a, b) => (a.start || '').localeCompare(b.start || ''))
      .slice(0, 10);
  }

  _formatTime(dateStr) {
    if (!dateStr || !dateStr.includes('T')) return { hour: '☀️', period: 'All Day' };
    const date = new Date(dateStr);
    const hours = date.getHours();
    const mins = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return { hour: `${hour12}:${mins}`, period };
  }

  _formatDateLabel(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' });
  }

  _selectDate(date) {
    this.selectedDate = date;
    this.newEventDate = date;
  }

  _prevMonth() {
    if (this.viewMonth === 0) {
      this.viewMonth = 11;
      this.viewYear--;
    } else {
      this.viewMonth--;
    }
    this._scrolled = false;
    this._fetchMonthEvents();
  }

  _nextMonth() {
    if (this.viewMonth === 11) {
      this.viewMonth = 0;
      this.viewYear++;
    } else {
      this.viewMonth++;
    }
    this._scrolled = false;
    this._fetchMonthEvents();
  }

  async _fetchMonthEvents() {
    const now = new Date();
    // If navigating back to current month, use the cached sync data
    if (this.viewYear === now.getFullYear() && this.viewMonth === now.getMonth()) {
      this._fetchEvents();
      return;
    }
    this.loading = true;
    try {
      const res = await fetch(`/api/calendar/events/month/${this.viewYear}/${this.viewMonth}`);
      const data = await res.json();
      this.events = data.events || [];
    } catch (err) {
      console.error('Failed to fetch month events:', err);
    } finally {
      this.loading = false;
    }
  }

  _calendarLabel(id) {
    if (id === 'primary') return 'Primary';
    if (id.startsWith('family')) return 'Family';
    // Shorten long IDs
    return id.split('@')[0].slice(0, 12) + '...';
  }

  async _handleCreate(e) {
    e.preventDefault();
    if (!this.newEventTitle.trim()) return;

    this.creating = true;
    try {
      const body = {
        title: this.newEventTitle.trim(),
        calendarId: this.newEventCalendar,
        allDay: this.newEventAllDay,
      };

      if (this.newEventLocation.trim()) {
        body.location = this.newEventLocation.trim();
      }

      if (this.newEventAllDay) {
        body.start = this.newEventDate;
        body.end = this.newEventDate;
      } else {
        body.start = `${this.newEventDate}T${this.newEventStartTime}:00`;
        body.end = `${this.newEventDate}T${this.newEventEndTime}:00`;
      }

      const res = await fetch('/api/calendar/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        this.newEventTitle = '';
        this.newEventLocation = '';
        this.newEventAllDay = false;
        this.showCreateForm = false;
        await this._fetchEvents();
      }
    } catch (err) {
      console.error('Failed to create event:', err);
    } finally {
      this.creating = false;
    }
  }

  async _handleDelete(event) {
    this.deletingId = event.id;
    try {
      const res = await fetch(`/api/calendar/events/${encodeURIComponent(event.id)}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ calendarId: event.calendarId }),
      });

      if (res.ok) {
        this.confirmDeleteId = null;
        await this._fetchEvents();
      }
    } catch (err) {
      console.error('Failed to delete event:', err);
    } finally {
      this.deletingId = null;
    }
  }

  updated() {
    const todayChip = this.shadowRoot.querySelector('.date-chip.today');
    if (todayChip && !this._scrolled) {
      todayChip.scrollIntoView({ inline: 'center', behavior: 'smooth' });
      this._scrolled = true;
    }
  }

  render() {
    const dates = this._getMonthDates();
    const datesWithEvents = this._getDatesWithEvents();
    const selectedDayEvents = this._getSelectedDayEvents();
    const upcomingEvents = this._getUpcomingEvents();
    const monthLabel = new Date(this.viewYear, this.viewMonth).toLocaleDateString('en', { month: 'long', year: 'numeric' });

    return html`
      <div class="month-nav">
        <button class="month-nav-btn" @click=${this._prevMonth} aria-label="Previous month">‹</button>
        <span class="month-label">${monthLabel}</span>
        <button class="month-nav-btn" @click=${this._nextMonth} aria-label="Next month">›</button>
      </div>

      <div class="date-strip" role="listbox" aria-label="Date selection">
        ${dates.map(d => html`
          <button
            class="date-chip ${d.date === this.selectedDate ? 'active' : ''} ${d.isToday ? 'today' : ''} ${datesWithEvents.has(d.date) ? 'has-events' : ''}"
            @click=${() => this._selectDate(d.date)}
            role="option"
            aria-selected=${d.date === this.selectedDate}
            aria-label="${d.day} ${d.num}"
          >
            <span class="date-day">${d.day}</span>
            <span class="date-num">${d.num}</span>
          </button>
        `)}
      </div>

      ${this.showCreateForm ? this._renderCreateForm() : html`
        <button class="add-btn" @click=${() => { this.showCreateForm = true; }}>
          <span>📅</span> New Event
        </button>
      `}

      ${this.loading ? html`
        <div class="loading">
          <div class="loading-dots"><span></span><span></span><span></span></div>
        </div>
      ` : html`
        ${selectedDayEvents.length > 0 ? html`
          <div class="section-title">📌 ${this._formatDateLabel(this.selectedDate)}</div>
          <div class="events-list" role="list" aria-label="Events for selected date">
            ${selectedDayEvents.map((event, i) => this._renderEventCard(event, i, false))}
          </div>
        ` : ''}

        <div class="section-title">🗓️ Upcoming</div>
        ${upcomingEvents.length === 0 ? html`
          <div class="empty-state">
            <div class="empty-icon">🌴</div>
            <div class="empty-text">Nothing planned — enjoy the month!</div>
          </div>
        ` : html`
          <div class="events-list" role="list" aria-label="Upcoming events">
            ${upcomingEvents.map((event, i) => this._renderEventCard(event, i, true))}
          </div>
        `}
      `}
    `;
  }

  _renderCreateForm() {
    const calendarIds = this.calendars.length > 0 ? this.calendars : ['primary'];

    return html`
      <form class="create-form" @submit=${this._handleCreate}>
        <div class="form-field">
          <label for="event-title">What's happening?</label>
          <input
            id="event-title"
            type="text"
            placeholder="e.g. Family dinner 🍕"
            .value=${this.newEventTitle}
            @input=${(e) => { this.newEventTitle = e.target.value; }}
            autofocus
          >
        </div>

        <div class="form-field">
          <label for="event-location">Where? (optional)</label>
          <input
            id="event-location"
            type="text"
            placeholder="e.g. Grandma's house"
            .value=${this.newEventLocation}
            @input=${(e) => { this.newEventLocation = e.target.value; }}
          >
        </div>

        <div class="form-field">
          <label for="event-calendar">Calendar</label>
          <select
            id="event-calendar"
            .value=${this.newEventCalendar}
            @change=${(e) => { this.newEventCalendar = e.target.value; }}
          >
            ${calendarIds.map(id => html`
              <option value=${id}>${this._calendarLabel(id)}</option>
            `)}
          </select>
        </div>

        <div class="form-field">
          <label for="event-date">Date</label>
          <input
            id="event-date"
            type="date"
            .value=${this.newEventDate}
            @input=${(e) => { this.newEventDate = e.target.value; }}
          >
        </div>

        <label class="form-toggle">
          <input
            type="checkbox"
            .checked=${this.newEventAllDay}
            @change=${(e) => { this.newEventAllDay = e.target.checked; }}
          >
          All day event
        </label>

        ${!this.newEventAllDay ? html`
          <div class="form-row">
            <div class="form-field">
              <label for="event-start">Start</label>
              <input
                id="event-start"
                type="time"
                .value=${this.newEventStartTime}
                @input=${(e) => { this.newEventStartTime = e.target.value; }}
              >
            </div>
            <div class="form-field">
              <label for="event-end">End</label>
              <input
                id="event-end"
                type="time"
                .value=${this.newEventEndTime}
                @input=${(e) => { this.newEventEndTime = e.target.value; }}
              >
            </div>
          </div>
        ` : ''}

        <div class="form-actions">
          <button
            type="button"
            class="form-btn cancel"
            @click=${() => { this.showCreateForm = false; }}
          >Cancel</button>
          <button
            type="submit"
            class="form-btn submit"
            ?disabled=${!this.newEventTitle.trim() || this.creating}
          >${this.creating ? 'Creating...' : 'Add Event 🎉'}</button>
        </div>
      </form>
    `;
  }

  _renderEventCard(event, index, showDate) {
    const time = this._formatTime(event.start);
    const dateLabel = showDate ? this._formatDateLabel((event.start || '').split('T')[0]) : null;
    const isDeleting = this.deletingId === event.id;
    const isConfirming = this.confirmDeleteId === event.id;

    return html`
      <div class="event-card ${isDeleting ? 'deleting' : ''}" role="listitem" style="animation-delay: ${index * 0.05}s">
        <div class="event-time-badge ${event.allDay ? 'all-day' : ''}">
          <span class="event-time-hour">${time.hour}</span>
          <span class="event-time-period">${time.period}</span>
        </div>
        <div class="event-details">
          <div class="event-title">${event.title}</div>
          ${event.location ? html`<div class="event-meta">📍 ${event.location}</div>` : ''}
          ${dateLabel ? html`<div class="event-date-label">📅 ${dateLabel}</div>` : ''}
        </div>
        <button
          class="event-delete-btn"
          @click=${() => { this.confirmDeleteId = event.id; }}
          aria-label="Delete event ${event.title}"
        >🗑️</button>

        ${isConfirming ? html`
          <div class="confirm-delete">
            <button class="form-btn cancel" @click=${() => { this.confirmDeleteId = null; }}>Keep</button>
            <button class="form-btn delete" @click=${() => this._handleDelete(event)}>Delete</button>
          </div>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('synker-calendar', SynkerCalendar);
