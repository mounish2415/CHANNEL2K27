import React, { useState } from 'react';
import {
  UserCheck,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Phone,
  Mail,
  X,
  CreditCard,
  ShieldCheck,
  Send,
  ArrowRight,
} from 'lucide-react';

import { REGISTRATION_URL } from '../data/registrationConfig';

export const REGISTRATION_PORTAL_URL = REGISTRATION_URL;

export default function RegisterSection() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section id="register" className="section section-wide" style={{ position: 'relative', zIndex: 2, paddingTop: '2rem', paddingBottom: '5rem', scrollMarginTop: '80px' }}>
      <div className="section-header">
        <div className="section-pill" style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
          <Sparkles size={14} color="#10b981" />
          <span style={{ color: '#059669' }}>OFFICIAL REGISTRATION GATEWAY</span>
        </div>
        <h2 className="section-title">
          SECURE YOUR <span className="gradient-text">SYMPOSIUM PASS</span>
        </h2>
        <p className="section-subtitle">
          Registration officially closes on <strong>Sunday, November 1, 2026</strong>. One pass unlocks full access to technical tracks, creative challenges, food, and accredited certification.
        </p>
      </div>

      {/* Main Glass Pass Container */}
      <div
        className="glass-card"
        style={{
          maxWidth: '1060px',
          margin: '0 auto',
          borderRadius: '28px',
          padding: '2.5rem',
          border: '1.5px solid rgba(23, 105, 224, 0.22)',
          boxShadow: '0 24px 60px rgba(23, 105, 224, 0.1), 0 0 40px rgba(16, 185, 129, 0.05)',
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(246, 251, 255, 0.94) 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top Accent Strip */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '5px',
            background: 'linear-gradient(90deg, #10b981, #00b8d9, #1769e0, #6c4dff)',
          }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Pass Benefits */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.85rem',
                borderRadius: '8px',
                background: 'rgba(23, 105, 224, 0.08)',
                color: 'var(--primary-blue)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 800,
                marginBottom: '1rem',
              }}
            >
              <span>DELEGATE ACCESS PASS // ₹150</span>
            </div>

            <h3
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
                fontWeight: 900,
                color: 'var(--text-main)',
                letterSpacing: '-0.02em',
                marginBottom: '0.6rem',
                lineHeight: 1.2,
              }}
            >
              All-Inclusive Symposium Registration
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.6rem' }}>
              Your ₹150 delegate pass entitles you to compete in both engineering tracks, relish fine dining refreshments, and receive verifiable Anna University affiliated certificates.
            </p>

            {/* Checklist of perks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                'Participation in 1 Technical Event (Thought Summit or DesignDash)',
                'Participation in 1 Non-Technical Event (Meme Competition or Treasure Hunt)',
                'Full Dining (Morning Refreshments, Buffet Lunch & High Tea)',
                'Official Symposium Kit, Delegate ID Badge & Folder',
                'Merit Certificates & Cash Prizes for Winners (1st & 2nd Place)',
                'Authorized Participation Certificate for every registered delegate',
              ].map((perk, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem' }}>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'rgba(16, 185, 129, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#10b981',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <CheckCircle2 size={14} />
                  </div>
                  <span style={{ fontSize: '0.86rem', color: 'var(--text-main)', fontWeight: 600, lineHeight: 1.45 }}>
                    {perk}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Deadline Alert & CTA Action Card */}
          <div>
            <div
              style={{
                background: '#ffffff',
                border: '1.5px solid rgba(234, 88, 12, 0.25)',
                borderRadius: '22px',
                padding: '2rem 1.8rem',
                boxShadow: '0 12px 35px rgba(234, 88, 12, 0.08)',
                position: 'relative',
              }}
            >
              {/* Deadline Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.5rem 0.9rem',
                  borderRadius: '12px',
                  background: 'rgba(234, 88, 12, 0.08)',
                  border: '1px solid rgba(234, 88, 12, 0.2)',
                  color: '#c2410c',
                  marginBottom: '1.25rem',
                }}
              >
                <Clock size={18} color="#ea580c" />
                <div>
                  <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 800, letterSpacing: '0.06em' }}>
                    DEADLINE NOTICE
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 800 }}>
                    Registration Ends: 01 November 2026
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  Registrations strictly conclude on <strong>November 1, 2026 at 11:59 PM IST</strong> to finalize delegate logistics, dining counts, and kits. Secure your spot before slots are filled!
                </div>
              </div>

              {/* Big Primary Register Button */}
              <a
                id="footer-register-btn"
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '1.1rem 1.5rem',
                  fontSize: '1.05rem',
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  cursor: 'pointer',
                  marginBottom: '1.25rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                }}
              >
                <UserCheck size={22} />
                <span>OPEN REGISTRATION FORM</span>
                <ExternalLink size={20} />
              </a>

              {/* Support Hotline Info */}
              <div
                style={{
                  paddingTop: '1.1rem',
                  borderTop: '1px dashed rgba(23, 105, 224, 0.15)',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.45rem',
                }}
              >
                <div style={{ fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldCheck size={14} color="#10b981" />
                  <span>Assistance & Registration Queries:</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem' }}>
                  <span>Student Sec. (Mounishkumar S):</span>
                  <a href="tel:919342620698" style={{ color: 'var(--primary-blue)', fontWeight: 700, textDecoration: 'none' }}>
                    +91 9342620698
                  </a>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem' }}>
                  <span>Faculty Convener (Mr. Vedasundaravinayagam):</span>
                  <a href="tel:919944802235" style={{ color: 'var(--primary-blue)', fontWeight: 700, textDecoration: 'none' }}>
                    +91 9944802235
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Registration Guide Modal */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="glass-card"
            style={{
              maxWidth: '560px',
              width: '100%',
              borderRadius: '24px',
              padding: '2rem',
              background: '#ffffff',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)',
              border: '1.5px solid rgba(23, 105, 224, 0.25)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'rgba(23, 105, 224, 0.08)',
                border: 'none',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-main)',
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10b981',
                }}
              >
                <UserCheck size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  CHANNEL 2K27 Registration
                </h3>
                <div style={{ fontSize: '0.78rem', color: '#c2410c', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  CLOSES: 01 NOVEMBER 2026
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Registration for <strong>CHANNEL 2K27</strong> is ₹150 per participant. To submit your entry or for instant verification:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <a
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{
                  justifyContent: 'center',
                  textDecoration: 'none',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderColor: '#10b981',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
                }}
              >
                <UserCheck size={18} />
                <span>Open Google Registration Form</span>
                <ExternalLink size={16} />
              </a>

              <a
                href="https://chat.whatsapp.com/HwMAd6Nx5rc4rnop4RMbtw"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{
                  justifyContent: 'center',
                  textDecoration: 'none',
                  color: '#16a34a',
                }}
              >
                <span>Join Official WhatsApp Community</span>
                <ExternalLink size={16} />
              </a>

              <a
                href="tel:919342620698"
                className="btn btn-secondary"
                style={{ justifyContent: 'center', textDecoration: 'none' }}
              >
                <Phone size={16} />
                <span>Call Student Secretary (+91 9342620698)</span>
              </a>

              <a
                href="mailto:channel2k27@apec.edu.in"
                className="btn btn-secondary"
                style={{ justifyContent: 'center', textDecoration: 'none' }}
              >
                <Mail size={16} />
                <span>Email: channel2k27@apec.edu.in</span>
              </a>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>Close</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
