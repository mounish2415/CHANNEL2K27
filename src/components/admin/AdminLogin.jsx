import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, ArrowRight, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess, onReturnToSite }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onLoginSuccess(data.token, data.admin);
      } else {
        setError(data.message || 'Invalid email or password.');
      }
    } catch (err) {
      setError('Unable to connect to authentication server. Please check backend.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        background: 'radial-gradient(circle at top left, #eef5ff 0%, #f5faff 100%)',
      }}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '2.5rem 2rem',
          borderRadius: '28px',
          border: '1.5px solid rgba(23, 105, 224, 0.22)',
          boxShadow: '0 25px 60px rgba(23, 105, 224, 0.12), 0 0 30px rgba(0, 184, 217, 0.08)',
          background: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        {/* Header Badge */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'var(--grad-tech)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              margin: '0 auto 1rem auto',
              boxShadow: '0 8px 24px rgba(23, 105, 224, 0.3)',
            }}
          >
            <ShieldCheck size={30} />
          </div>

          <div
            style={{
              fontSize: '0.74rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              color: 'var(--primary-blue)',
              letterSpacing: '0.12em',
              marginBottom: '0.3rem',
            }}
          >
            CHANNEL 2K27 // S.E.C.E.
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            Admin Portal <span className="gradient-text">Login</span>
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
            Secure management console for symposium registrations and event settings.
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: '0.85rem 1rem',
              borderRadius: '12px',
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1.5px solid #ef4444',
              color: '#ef4444',
              fontSize: '0.84rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              marginBottom: '1.5rem',
            }}
          >
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                marginBottom: '0.4rem',
              }}
            >
              Admin Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={18}
                style={{ position: 'absolute', top: '13px', left: '14px', color: 'var(--text-light)' }}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email address"
                autoComplete="username"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.6rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(23, 105, 224, 0.22)',
                  background: '#ffffff',
                  fontSize: '0.92rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '1.75rem' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                marginBottom: '0.4rem',
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                style={{ position: 'absolute', top: '13px', left: '14px', color: 'var(--text-light)' }}
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                autoComplete="current-password"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.6rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(23, 105, 224, 0.22)',
                  background: '#ffffff',
                  fontSize: '0.92rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
            style={{ width: '100%', justifyContent: 'center', marginBottom: '1.25rem' }}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} style={{ animation: 'spinSlow 1s linear infinite' }} />
                <span>AUTHENTICATING...</span>
              </>
            ) : (
              <>
                <span>SIGN IN TO DASHBOARD</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(23, 105, 224, 0.12)' }}>
          <button
            type="button"
            onClick={onReturnToSite}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.84rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary-blue)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <ArrowLeft size={16} />
            <span>Return to Symposium Website</span>
          </button>
        </div>
      </div>
    </div>
  );
}
