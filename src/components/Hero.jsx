import React from 'react';
import { Calendar, MapPin, Compass, ShieldCheck, Award, UserCheck, Clock } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '6.5rem',
        paddingBottom: '4rem',
        overflow: 'hidden',
      }}
    >
      <div className="section section-wide" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Top Badge: S.E.C.E. & Symposium */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.45rem 1.1rem',
              background: 'rgba(255, 255, 255, 0.88)',
              border: '1px solid rgba(23, 105, 224, 0.22)',
              borderRadius: '9999px',
              boxShadow: '0 4px 16px rgba(23, 105, 224, 0.08)',
              marginBottom: '1.4rem',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span className="pulsing-node" style={{ width: '8px', height: '8px' }} />
            <span
              style={{
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: 'var(--primary-blue)',
                textTransform: 'uppercase',
              }}
            >
              NATIONAL LEVEL TECHNICAL SYMPOSIUM
            </span>
          </div>

          {/* Main Futuristic Title */}
          <h1
            style={{
              fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)',
              fontWeight: 900,
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
              marginBottom: '0.9rem',
              textAlign: 'center',
            }}
          >
            <span className="gradient-text">CHANNEL</span>{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #1769e0 0%, #6c4dff 50%, #e94eff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              2K27
            </span>
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: 'clamp(1.2rem, 2.4vw, 1.7rem)',
              fontWeight: 700,
              color: 'var(--primary-blue)',
              letterSpacing: '0.04em',
              marginBottom: '1.3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap',
            }}
          >
            <span>Connect.</span>
            <span style={{ color: 'var(--cyan)' }}>Collaborate.</span>
            <span style={{ color: 'var(--violet)' }}>Create.</span>
          </p>

          {/* Organizer & College Info */}
          <div
            style={{
              fontSize: '1rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              marginBottom: '2rem',
              maxWidth: '660px',
              textAlign: 'center',
            }}
          >
            Presented by the{' '}
            <strong style={{ color: 'var(--text-main)', fontWeight: 700 }}>
              Society of Electronics and Communication Engineering (S.E.C.E.)
            </strong>
            , Department of ECE, Adhiparasakthi Engineering College.
          </div>

          {/* Event Quick Info Badges (Date & Venue) */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
              marginBottom: '2.2rem',
            }}
          >
            {/* Date Card */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1.2rem',
                background: 'rgba(255, 255, 255, 0.92)',
                border: '1px solid rgba(23, 105, 224, 0.18)',
                borderRadius: '16px',
                boxShadow: '0 8px 24px rgba(23, 105, 224, 0.08)',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(0, 153, 184, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--cyan)',
                }}
              >
                <Calendar size={20} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase' }}>
                  Event Date
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
                  03 NOVEMBER 2026
                </div>
              </div>
            </div>

            {/* Registration Deadline Card */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1.2rem',
                background: 'rgba(255, 255, 255, 0.92)',
                border: '1px solid rgba(234, 88, 12, 0.22)',
                borderRadius: '16px',
                boxShadow: '0 8px 24px rgba(234, 88, 12, 0.08)',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(234, 88, 12, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ea580c',
                }}
              >
                <Clock size={20} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase' }}>
                  Registration Closes
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#c2410c', fontFamily: 'var(--font-heading)' }}>
                  01 NOVEMBER 2026
                </div>
              </div>
            </div>

            {/* Venue Card */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1.2rem',
                background: 'rgba(255, 255, 255, 0.92)',
                border: '1px solid rgba(108, 77, 255, 0.2)',
                borderRadius: '16px',
                boxShadow: '0 8px 24px rgba(108, 77, 255, 0.08)',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(108, 77, 255, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--violet)',
                }}
              >
                <MapPin size={20} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase' }}>
                  Venue
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
                  APEC Central Library, Melmaruvathur
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '2.5rem',
            }}
          >
            <a
              id="hero-register-btn"
              href="#register"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById('register');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn btn-primary btn-lg"
              style={{
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                boxShadow: '0 6px 20px rgba(16, 185, 129, 0.35)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
              }}
            >
              <UserCheck size={20} />
              <span>REGISTER NOW</span>
            </a>

            <a
              id="hero-explore-btn"
              href="#events"
              className="btn btn-secondary btn-lg"
              style={{ textDecoration: 'none' }}
            >
              <Compass size={20} />
              <span>EXPLORE EVENTS</span>
            </a>

            <a
              href="#agenda"
              className="btn btn-secondary btn-lg"
              style={{ textDecoration: 'none' }}
            >
              <Calendar size={19} />
              <span>VIEW AGENDA</span>
            </a>
          </div>

          {/* Institutional Accreditation Pill Banner */}
          <div
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem 1.2rem',
              padding: '0.75rem 1.2rem',
              background: 'rgba(255, 255, 255, 0.88)',
              borderRadius: '14px',
              border: '1px solid rgba(23, 105, 224, 0.16)',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 16px rgba(23, 105, 224, 0.06)',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: 'var(--primary-blue)' }}>
              <ShieldCheck size={15} color="#1769e0" /> Autonomous Institution
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: 'var(--cyan)' }}>
              <Award size={15} color="#0099b8" /> NAAC "A" Grade
            </span>
            <span>•</span>
            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>AICTE Approved</span>
            <span>•</span>
            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Anna Univ Affiliated</span>
            <span>•</span>
            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>ISO 9001:2015</span>
          </div>
        </div>
      </div>
    </section>
  );
}
