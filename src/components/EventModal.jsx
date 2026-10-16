import React, { useEffect } from 'react';
import { X, Award, Users, Clock, CheckCircle, Tag, ShieldAlert, UserCheck, MapPin } from 'lucide-react';

export default function EventModal({ event, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!event) return null;

  const handleRegisterClick = (e) => {
    e.preventDefault();
    onClose();
    setTimeout(() => {
      const target = document.getElementById('register');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Modal Header with Image */}
        <div style={{ position: 'relative', height: '220px', width: '100%' }}>
          <img
            src={event.image}
            alt={event.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.35) 60%, transparent 100%)',
            }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close details"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.92)',
              border: '1px solid rgba(23, 105, 224, 0.25)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#17233c',
              boxShadow: '0 4px 12px rgba(23, 105, 224, 0.15)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <X size={20} />
          </button>

          {/* Badge & Title over Image */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '20px',
              right: '20px',
              color: '#ffffff',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.25rem 0.75rem',
                borderRadius: '6px',
                background: event.category === 'TECHNICAL' ? 'rgba(0, 184, 217, 0.35)' : 'rgba(233, 78, 255, 0.35)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                marginBottom: '0.4rem',
                backdropFilter: 'blur(8px)',
              }}
            >
              EVENT {event.num} • {event.category} • APEC CENTRAL LIBRARY
            </div>
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: '#ffffff',
              }}
            >
              {event.name}
            </h2>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500 }}>
              {event.tagline}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.75rem', overflowY: 'auto' }}>
          {/* Quick Metrics Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                padding: '0.85rem 0.5rem',
                background: '#f8fafc',
                borderRadius: '14px',
                border: '1px solid rgba(23, 105, 224, 0.16)',
                boxShadow: '0 4px 14px rgba(23, 105, 224, 0.05)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '0.2rem' }}>
                FEE
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-blue)' }}>
                {event.feeText}
              </div>
            </div>

            <div
              style={{
                padding: '0.85rem 0.5rem',
                background: '#f8fafc',
                borderRadius: '14px',
                border: '1px solid rgba(0, 153, 184, 0.2)',
                boxShadow: '0 4px 14px rgba(23, 105, 224, 0.05)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '0.2rem' }}>
                TEAM SIZE
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0099b8' }}>
                {event.teamSize}
              </div>
            </div>

            <div
              style={{
                padding: '0.85rem 0.5rem',
                background: '#f8fafc',
                borderRadius: '14px',
                border: '1px solid rgba(108, 77, 255, 0.18)',
                boxShadow: '0 4px 14px rgba(23, 105, 224, 0.05)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '0.2rem' }}>
                DURATION
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--violet)' }}>
                {event.duration}
              </div>
            </div>
          </div>

          {/* Venue Notice Banner */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.75rem 1rem',
              background: 'rgba(23, 105, 224, 0.08)',
              border: '1px solid rgba(23, 105, 224, 0.22)',
              borderRadius: '12px',
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '8px',
                background: 'rgba(23, 105, 224, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-blue)',
                flexShrink: 0,
              }}
            >
              <MapPin size={16} />
            </div>
            <div>
              <div style={{ fontSize: '0.66rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase' }}>
                EVENT VENUE
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {event.venue || 'APEC Central Library'}
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              About The Event
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {event.shortDesc}
            </p>
          </div>

          {/* Key Topics / Scope */}
          {event.topics && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
                Key Focus Areas
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {event.topics.map((t, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '0.8rem',
                      padding: '0.4rem 0.85rem',
                      background: 'rgba(23, 105, 224, 0.08)',
                      border: '1px solid rgba(23, 105, 224, 0.2)',
                      borderRadius: '8px',
                      color: 'var(--primary-blue)',
                      fontWeight: 600,
                    }}
                  >
                    • {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Rules & Regulations */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
              Rules & Guidelines
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {event.rules.map((rule, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.85rem' }}>
                  <CheckCircle size={16} color="#0099b8" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prizes Banner */}
          <div
            style={{
              padding: '1rem',
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.05) 100%)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#d97706',
                flexShrink: 0,
              }}
            >
              <Award size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#b45309', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
                REWARDS & ACCOLADES
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#92400e' }}>
                {event.prizes}
              </div>
            </div>
          </div>

          {/* Coordinator contact */}
          {event.coordinator && (
            <div
              style={{
                fontSize: '0.78rem',
                color: 'var(--text-light)',
                fontFamily: 'var(--font-mono)',
                marginBottom: '1.5rem',
              }}
            >
              {event.coordinator}
            </div>
          )}

          {/* Action CTA */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button onClick={onClose} className="btn btn-secondary" style={{ minWidth: '100px', justifyContent: 'center' }}>
              <span>CLOSE</span>
            </button>

            <button
              onClick={handleRegisterClick}
              className="btn btn-primary"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderColor: '#10b981',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
              }}
            >
              <UserCheck size={18} />
              <span>REGISTER (₹150 PASS)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
