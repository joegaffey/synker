import { LitElement, html, css } from 'lit';

class SynkerBattery extends LitElement {
  static properties = {
    level: { type: Number },
    charging: { type: Boolean },
    supported: { type: Boolean },
  };

  static styles = css`
    :host {
      display: inline-block;
    }

    .chip {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 7px 11px;
      border-radius: 20px;
      background: white;
      box-shadow: 0 2px 12px rgba(108, 99, 255, 0.15);
      font-family: 'Fredoka', sans-serif;
      font-size: 13px;
      font-weight: 600;
      color: #4a3f6b;
    }

    .icon {
      font-size: 16px;
    }

    .chip.low {
      color: #d32f2f;
      animation: pulse 1.2s ease-in-out infinite;
    }

    .chip.medium {
      color: #e65100;
    }

    .chip.high {
      color: #2e7d32;
    }

    .chip.na {
      color: #a094c4;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.06); }
    }
  `;

  constructor() {
    super();
    this.level = 100;
    this.charging = false;
    this.supported = false;
    this._init();
  }

  async _init() {
    if (!navigator.getBattery) return;
    try {
      this.battery = await navigator.getBattery();
      this.supported = true;
      this._update();
      this._onLevelChange = () => this._update();
      this._onChargingChange = () => this._update();
      this.battery.addEventListener('levelchange', this._onLevelChange);
      this.battery.addEventListener('chargingchange', this._onChargingChange);
    } catch (err) {
      console.warn('Battery API unavailable:', err);
    }
  }

  _update() {
    if (!this.battery) return;
    this.level = Math.round(this.battery.level * 100);
    this.charging = this.battery.charging;
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    this.battery?.removeEventListener('levelchange', this._onLevelChange);
    this.battery?.removeEventListener('chargingchange', this._onChargingChange);
  }

  render() {
    if (!this.supported) {
      if (window.isSecureContext === false) {
        return html`
          <div class="chip na" role="status" title="Battery requires HTTPS">
            <span class="icon">🔒</span>
            <span>HTTPS</span>
          </div>
        `;
      }
      return html``;
    }

    const levelClass = this.level <= 20 ? 'low' : this.level <= 50 ? 'medium' : 'high';
    const icon = this.charging ? '⚡' : this.level <= 20 ? '🪫' : '🔋';

    return html`
      <div class="chip ${levelClass}" role="status" aria-label="Battery ${this.level}%${this.charging ? ', charging' : ''}">
        <span class="icon">${icon}</span>
        <span>${this.level}%</span>
      </div>
    `;
  }
}

customElements.define('synker-battery', SynkerBattery);
