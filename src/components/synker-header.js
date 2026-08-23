import { LitElement, html, css } from 'lit';

class SynkerHeader extends LitElement {
  static properties = {
    syncing: { type: Boolean },
    lastSync: { type: String },
    online: { type: Boolean },
  };

  static styles = css`
    :host {
      display: block;
      padding: 16px;
      padding-top: env(safe-area-inset-top, 16px);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .brand-icon {
      font-size: 28px;
    }

    h1 {
      font-family: 'Fredoka', sans-serif;
      font-size: 28px;
      font-weight: 700;
      color: #4a3f6b;
    }

    .sync-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 10px 16px;
      background: white;
      border: none;
      border-radius: 20px;
      font-family: 'Fredoka', sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #6c63ff;
      cursor: pointer;
      box-shadow: 0 2px 12px rgba(108, 99, 255, 0.15);
      transition: all 0.2s ease;
    }

    .sync-btn:active {
      transform: scale(0.95);
    }

    .sync-btn.syncing {
      opacity: 0.7;
      pointer-events: none;
    }

    .sync-icon {
      display: inline-block;
      font-size: 16px;
      transition: transform 0.3s ease;
    }

    .sync-btn.syncing .sync-icon {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .last-sync {
      font-family: 'Fredoka', sans-serif;
      font-size: 12px;
      color: #a094c4;
      text-align: right;
      margin-top: 4px;
    }
  `;

  _formatLastSync() {
    if (!this.lastSync) return 'Never synced';
    const date = new Date(this.lastSync);
    const now = new Date();
    const diff = Math.floor((now - date) / 60000);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  _handleSync() {
    this.dispatchEvent(new CustomEvent('sync-requested'));
  }

  render() {
    return html`
      <div class="header">
        <div class="brand">
          <span class="brand-icon">📅</span>
          <h1>Synker</h1>
        </div>
        <div>
          <button
            class="sync-btn ${this.syncing ? 'syncing' : ''}"
            @click=${this._handleSync}
            ?disabled=${this.syncing || !this.online}
            aria-label="Sync with Google"
          >
            <span class="sync-icon">🔄</span>
            ${this.syncing ? 'Syncing...' : 'Sync'}
          </button>
          <div class="last-sync">${this._formatLastSync()}</div>
        </div>
      </div>
    `;
  }
}

customElements.define('synker-header', SynkerHeader);
