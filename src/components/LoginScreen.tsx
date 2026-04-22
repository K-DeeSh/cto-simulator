import { useState } from 'react';

const LOGIN_KEY = 'player_login';

export function getSavedLogin(): string {
  return localStorage.getItem(LOGIN_KEY) ?? '';
}

function saveLogin(login: string) {
  localStorage.setItem(LOGIN_KEY, login);
}

interface Props {
  onLogin: (login: string) => void;
}

export default function LoginScreen({ onLogin }: Props) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setError('Введи логин');
      return;
    }
    saveLogin(trimmed);
    onLogin(trimmed);
  }

  return (
    <div className="screen start-screen">
      <div className="start-logo">👔</div>
      <h1 className="start-title">CTO Simulator:<br /><span>Ignore Problems</span></h1>

      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 320, margin: '2rem auto 0' }}>
        <p style={{ color: '#8a8eaa', marginBottom: '0.75rem', textAlign: 'center', fontSize: '0.95rem' }}>
          Как тебя зовут, CTO?
        </p>
        <input
          type="text"
          value={value}
          onChange={e => { setValue(e.target.value); setError(''); }}
          placeholder="Логин..."
          maxLength={32}
          autoFocus
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            background: '#1a1a2e',
            border: error ? '2px solid #ff4757' : '2px solid #2a2a4a',
            borderRadius: 8,
            color: '#e0e0e0',
            fontSize: '1rem',
            outline: 'none',
            boxSizing: 'border-box',
            marginBottom: error ? '0.25rem' : '0.75rem',
          }}
        />
        {error && (
          <p style={{ color: '#ff4757', fontSize: '0.8rem', marginBottom: '0.75rem' }}>{error}</p>
        )}
        <button type="submit" className="start-btn" style={{ width: '100%' }}>
          Войти →
        </button>
      </form>
    </div>
  );
}
