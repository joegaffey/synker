import { LitElement, html, css } from 'lit';

class SynkerLogin extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 32px;
      position: relative;
      z-index: 1;
    }

    .logo {
      font-size: 72px;
      margin-bottom: 16px;
      animation: bounce 2s ease-in-out infinite;
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    h1 {
      font-family: 'Fredoka', sans-serif;
      font-size: 48px;
      font-weight: 700;
      color: #4a3f6b;
      margin-bottom: 8px;
      text-shadow: 2px 2px 0 rgba(108, 99, 255, 0.2);
    }

    p {
      font-family: 'Fredoka', sans-serif;
      font-size: 18px;
      color: #7c6fa0;
      margin-bottom: 48px;
      text-align: center;
    }

    .login-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 18px 36px;
      background: linear-gradient(135deg, #6c63ff 0%, #5a4fcf 100%);
      color: white;
      border: none;
      border-radius: 50px;
      font-family: 'Fredoka', sans-serif;
      font-size: 20px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 8px 32px rgba(108, 99, 255, 0.4);
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      text-decoration: none;
    }

    .login-btn:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 12px 40px rgba(108, 99, 255, 0.5);
    }

    .login-btn:active {
      transform: translateY(0) scale(0.98);
    }

    .login-btn svg {
      width: 24px;
      height: 24px;
    }

    .features {
      margin-top: 48px;
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .feature {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .feature-icon {
      font-size: 32px;
    }

    .feature-label {
      font-family: 'Fredoka', sans-serif;
      font-size: 14px;
      color: #7c6fa0;
      font-weight: 500;
    }
  `;

  render() {
    return html`
      <div class="logo">📅</div>
      <h1>Synker</h1>
      <p>Your family's calendar & tasks<br>all in one cheerful place! ✨</p>
      <a class="login-btn" href="/api/auth/login">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff"/>
        </svg>
        Connect Google
      </a>
      <div class="features">
        <div class="feature">
          <span class="feature-icon">📆</span>
          <span class="feature-label">Calendar</span>
        </div>
        <div class="feature">
          <span class="feature-icon">✅</span>
          <span class="feature-label">Tasks</span>
        </div>
        <div class="feature">
          <span class="feature-icon">👨‍👩‍👧‍👦</span>
          <span class="feature-label">Family</span>
        </div>
        <div class="feature">
          <span class="feature-icon">🔄</span>
          <span class="feature-label">Auto-Sync</span>
        </div>
      </div>
    `;
  }
}

customElements.define('synker-login', SynkerLogin);
