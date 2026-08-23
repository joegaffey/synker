import { LitElement, html, css } from 'lit';
import './components/synker-login.js';
import './components/synker-calendar.js';
import './components/synker-tasks.js';
import './components/synker-nav.js';
import './components/synker-header.js';
import './components/synker-battery.js';

class SynkerApp extends LitElement {
  static properties = {
    authenticated: { type: Boolean },
    currentView: { type: String },
    syncing: { type: Boolean },
    lastSync: { type: String },
    online: { type: Boolean },
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: linear-gradient(180deg, #f0e6ff 0%, #e8f4fd 50%, #fce4ec 100%);
      overflow: hidden;
      position: relative;
    }

    .content {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 16px;
      padding-bottom: 80px;
      -webkit-overflow-scrolling: touch;
    }

    .bubbles {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }

    .bubble {
      position: absolute;
      border-radius: 50%;
      opacity: 0.15;
      animation: float 8s ease-in-out infinite;
    }

    .bubble:nth-child(1) {
      width: 80px; height: 80px;
      background: #ff6b9d;
      top: 10%; left: 5%;
      animation-delay: 0s;
    }
    .bubble:nth-child(2) {
      width: 120px; height: 120px;
      background: #6c63ff;
      top: 60%; right: -20px;
      animation-delay: 2s;
    }
    .bubble:nth-child(3) {
      width: 60px; height: 60px;
      background: #ffd93d;
      top: 30%; right: 10%;
      animation-delay: 4s;
    }
    .bubble:nth-child(4) {
      width: 100px; height: 100px;
      background: #6bcb77;
      bottom: 20%; left: -10px;
      animation-delay: 1s;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-20px) scale(1.05); }
    }

    .main-content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .offline-banner {
      background: linear-gradient(135deg, #ffd93d 0%, #ffb347 100%);
      color: #4a3f6b;
      font-family: 'Fredoka', sans-serif;
      font-size: 13px;
      font-weight: 600;
      text-align: center;
      padding: 6px 12px;
      z-index: 2;
    }
  `;

  constructor() {
    super();
    this.authenticated = false;
    this.currentView = 'calendar';
    this.syncing = false;
    this.lastSync = null;
    this.online = navigator.onLine;
    this._onOnline = () => { this.online = true; };
    this._onOffline = () => { this.online = false; };
    window.addEventListener('online', this._onOnline);
    window.addEventListener('offline', this._onOffline);
    this._checkAuth();
    this._registerSW();
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    window.removeEventListener('online', this._onOnline);
    window.removeEventListener('offline', this._onOffline);
  }

  async _registerSW() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('/sw.js');
      } catch (err) {
        console.warn('SW registration failed:', err);
      }
    }
  }

  async _checkAuth() {
    try {
      const res = await fetch('/api/status');
      const data = await res.json();
      this.authenticated = data.authenticated;
      this.lastSync = data.lastSync;
    } catch (err) {
      console.error('Status check failed:', err);
    }
  }

  async _handleSync() {
    this.syncing = true;
    try {
      const res = await fetch('/api/sync', { method: 'POST' });
      const data = await res.json();
      this.lastSync = data.lastSync;
      // Trigger re-render of child components
      this.requestUpdate();
      this.shadowRoot.querySelector('synker-calendar')?.refresh?.();
      this.shadowRoot.querySelector('synker-tasks')?.refresh?.();
    } catch (err) {
      console.error('Sync failed:', err);
    } finally {
      this.syncing = false;
    }
  }

  _handleNavChange(e) {
    this.currentView = e.detail.view;
  }

  render() {
    if (!this.authenticated) {
      return html`
        <div class="bubbles">
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
        </div>
        <synker-login></synker-login>
        <synker-battery></synker-battery>
      `;
    }

    return html`
      <div class="bubbles">
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
      </div>
      <div class="main-content">
        ${this.online ? '' : html`<div class="offline-banner">🔌 Read-only — offline</div>`}
        <synker-header
          .syncing=${this.syncing}
          .lastSync=${this.lastSync}
          .online=${this.online}
          @sync-requested=${this._handleSync}
        ></synker-header>
        <div class="content">
          ${this.currentView === 'calendar'
            ? html`<synker-calendar .online=${this.online}></synker-calendar>`
            : html`<synker-tasks .online=${this.online}></synker-tasks>`}
        </div>
        <synker-nav
          .currentView=${this.currentView}
          @view-changed=${this._handleNavChange}
        ></synker-nav>
      </div>
      <synker-battery></synker-battery>
    `;
  }
}

customElements.define('synker-app', SynkerApp);
