import { LitElement, html, css } from 'lit';

class SynkerNav extends LitElement {
  static properties = {
    currentView: { type: String },
  };

  static styles = css`
    :host {
      display: block;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
      padding-bottom: env(safe-area-inset-bottom, 0);
    }

    nav {
      display: flex;
      justify-content: center;
      gap: 8px;
      padding: 12px 24px;
      background: white;
      border-radius: 24px 24px 0 0;
      box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08);
    }

    button {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 10px 28px;
      border: none;
      border-radius: 16px;
      background: transparent;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      font-family: 'Fredoka', sans-serif;
      font-size: 12px;
      font-weight: 500;
      color: #a094c4;
    }

    button.active {
      background: linear-gradient(135deg, #6c63ff 0%, #5a4fcf 100%);
      color: white;
      transform: scale(1.05);
      box-shadow: 0 4px 16px rgba(108, 99, 255, 0.3);
    }

    button:active {
      transform: scale(0.95);
    }

    .nav-icon {
      font-size: 24px;
    }
  `;

  _switchView(view) {
    this.dispatchEvent(new CustomEvent('view-changed', { detail: { view } }));
  }

  render() {
    return html`
      <nav role="navigation" aria-label="Main navigation">
        <button
          class=${this.currentView === 'calendar' ? 'active' : ''}
          @click=${() => this._switchView('calendar')}
          aria-label="Calendar view"
          aria-current=${this.currentView === 'calendar' ? 'page' : 'false'}
        >
          <span class="nav-icon">📆</span>
          Calendar
        </button>
        <button
          class=${this.currentView === 'tasks' ? 'active' : ''}
          @click=${() => this._switchView('tasks')}
          aria-label="Tasks view"
          aria-current=${this.currentView === 'tasks' ? 'page' : 'false'}
        >
          <span class="nav-icon">✅</span>
          Tasks
        </button>
      </nav>
    `;
  }
}

customElements.define('synker-nav', SynkerNav);
