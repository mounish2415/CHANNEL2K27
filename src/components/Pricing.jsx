import React from 'react';
import { Check, Sparkles, ArrowRight, Zap, Trophy, ShieldCheck, Users } from 'lucide-react';

export default function Pricing({ onSelectCategory }) {
  const handleScrollToRegister = () => {
    const el = document.getElementById('register');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    if (onSelectCategory) onSelectCategory('all');
  };

  return (
    <section id="pricing" className="section" style={{ position: 'relative', zIndex: 2 }}>
      <div className="section-header">
        <div className="section-pill">
          <Zap size={14} />
          <span>UNIFIED ALL-INCLUSIVE PACKAGE</span>
        </div>
        <h2 className="section-title">
          REGISTRATION <span className="gradient-text">FEES</span>
        </h2>
        <p className="section-subtitle">
          Transparent, student-friendly package: <strong>₹199 per head covers BOTH 1 Technical + 1 Non-Technical Event</strong>, lunch, kits, and official certificates.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          maxWidth: '960px',
          margin: '0 auto',
        }}
      >
        {/* Individual Delegate Pass (Highlighted) */}
        <div
          className="glass-card"
          style={{
            padding: '2.8rem 2.2rem',
            borderRadius: '28px',
            border: '2px solid rgba(0, 184, 217, 0.45)',
            boxShadow: '0 20px 50px rgba(23, 105, 224, 0.16), 0 0 25px rgba(0, 184, 217, 0.2)',
            position: 'relative',
            background: 'linear-gradient(165deg, rgba(255, 255, 255, 0.96) 0%, rgba(240, 248, 255, 0.9) 100%)',
          }}
        >
          {/* Highlight Badge */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              right: '20px',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              background: 'var(--grad-tech)',
              color: '#ffffff',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              letterSpacing: '0.08em',
              boxShadow: '0 4px 12px rgba(23, 105, 224, 0.3)',
            }}
          >
            ★ ALL-INCLUSIVE PACKAGE
          </div>

          <div
            style={{
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              color: 'var(--primary-blue)',
              letterSpacing: '0.1em',
              marginBottom: '0.5rem',
            }}
          >
            INDIVIDUAL DELEGATE PASS
          </div>

          <h3
            style={{
              fontSize: '1.75rem',
              fontWeight: 900,
              color: 'var(--text-main)',
              marginBottom: '1rem',
            }}
          >
            1 Person Delegate Pass
          </h3>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '1.25rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '3.4rem',
                fontWeight: 900,
                color: 'var(--primary-blue)',
                lineHeight: 1,
              }}
            >
              ₹199
            </span>
            <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 600 }}>/ HEAD</span>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.75rem', lineHeight: 1.5 }}>
            ₹199 covers <strong>1 Technical Event + 1 Non-Technical Event</strong> with complete hospitality and certification.
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              marginBottom: '2.2rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(23, 105, 224, 0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }}>
              <Check size={18} color="#00b8d9" />
              <span><strong>1 Technical Event</strong> (Thought Summit / DesignDash)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }}>
              <Check size={18} color="#00b8d9" />
              <span><strong>1 Non-Technical Event</strong> (Skribbl.io / Chess)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }}>
              <Check size={18} color="#00b8d9" />
              <span>Official Hardcopy Certificate of Participation</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }}>
              <Check size={18} color="#00b8d9" />
              <span>Symposium Delegate Kit & Identity Pass</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }}>
              <Check size={18} color="#00b8d9" />
              <span>Complimentary Lunch (Veg / Non-Veg) & Snacks</span>
            </div>
          </div>

          <button
            id="pricing-individual-btn"
            onClick={handleScrollToRegister}
            className="btn btn-primary"
            style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
          >
            <span>REGISTER NOW (₹199)</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Team / Paper Presentation Package Card */}
        <div
          className="glass-card"
          style={{
            padding: '2.8rem 2.2rem',
            borderRadius: '28px',
            border: '1.5px solid rgba(108, 77, 255, 0.35)',
            boxShadow: 'var(--shadow-md)',
            position: 'relative',
            background: 'linear-gradient(165deg, rgba(255, 255, 255, 0.96) 0%, rgba(248, 246, 255, 0.9) 100%)',
          }}
        >
          <div
            style={{
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              color: 'var(--violet)',
              letterSpacing: '0.1em',
              marginBottom: '0.5rem',
            }}
          >
            TEAM & PAPER PRESENTATION
          </div>

          <h3
            style={{
              fontSize: '1.75rem',
              fontWeight: 900,
              color: 'var(--text-main)',
              marginBottom: '1rem',
            }}
          >
            Team Delegate Pass
          </h3>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '1.25rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '3.4rem',
                fontWeight: 900,
                color: 'var(--violet)',
                lineHeight: 1,
              }}
            >
              ₹199
            </span>
            <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 600 }}>/ MEMBER</span>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.75rem', lineHeight: 1.5 }}>
            For Paper Presentation and team events. Total fee = <strong>Members × ₹199</strong>.
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              marginBottom: '2.2rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(108, 77, 255, 0.15)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }}>
              <Check size={18} color="#6c4dff" />
              <span><strong>1 Member Team</strong> = ₹199</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }}>
              <Check size={18} color="#6c4dff" />
              <span><strong>2 Members Team</strong> = ₹398 (2 × ₹199)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }}>
              <Check size={18} color="#6c4dff" />
              <span><strong>3 Members Team</strong> = ₹597 (3 × ₹199)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }}>
              <Check size={18} color="#6c4dff" />
              <span><strong>4 Members Team</strong> = ₹796 (4 × ₹199)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }}>
              <Check size={18} color="#6c4dff" />
              <span><strong>5 Members Team</strong> = ₹995 (5 × ₹199)</span>
            </div>
          </div>

          <button
            id="pricing-team-btn"
            onClick={handleScrollToRegister}
            className="btn btn-secondary"
            style={{ width: '100%', padding: '1rem', fontSize: '1rem', borderColor: 'rgba(108, 77, 255, 0.35)', color: 'var(--violet)' }}
          >
            <span>REGISTER TEAM PASS</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
