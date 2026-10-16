import React, { useState } from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  Award, 
  MapPin,
  RefreshCw
} from 'lucide-react';
import { REGISTRATION_URL, REGISTRATION_DEADLINE_TEXT, REGISTRATION_FEE_AMOUNT } from '../data/registrationConfig';

export default function RegisterPage() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const embeddedGoogleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdzfsX9piEjzStLXYPApE0Ah_ENW8Fodf111CYCQuf_XEUpxQ/viewform?embedded=true';

  return (
    <div className="page-transition" style={{ paddingTop: '5.5rem' }}>
      {/* Top Header & Overview */}
      <section className="section" style={{ paddingBottom: '1.5rem', paddingTop: '1.5rem' }}>
        <div className="section-header" style={{ marginBottom: '2rem' }}>
          <div className="section-pill" style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
            <Sparkles size={14} color="#10b981" />
            <span style={{ color: '#059669' }}>OFFICIAL REGISTRATION PORTAL</span>
          </div>
          <h1 className="section-title">
            SYMPOSIUM <span className="gradient-text">REGISTRATION</span>
          </h1>
          <p className="section-subtitle">
            Register via the official Google Form below to reserve your delegate seat for CHANNEL 2K27.
          </p>
        </div>

        {/* Pass Details & Direct Google Form Action Card */}
        <div
          className="glass-card"
          style={{
            maxWidth: '1060px',
            margin: '0 auto 2.5rem auto',
            borderRadius: '26px',
            padding: '2rem 2.25rem',
            border: '1.5px solid rgba(23, 105, 224, 0.22)',
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(246, 251, 255, 0.94) 100%)',
            boxShadow: '0 20px 50px rgba(23, 105, 224, 0.08)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              alignItems: 'center',
            }}
          >
            {/* Left Column: Pass Perks */}
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
                  marginBottom: '0.75rem',
                }}
              >
                <Award size={14} />
                <span>DELEGATE PASS // ₹{REGISTRATION_FEE_AMOUNT} PER PARTICIPANT</span>
              </div>

              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.45rem' }}>
                All-Inclusive Symposium Delegate Access
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                One ₹{REGISTRATION_FEE_AMOUNT} delegate pass entitles you to compete in both tracks, enjoy buffet dining, and receive Anna University accredited certification.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.65rem' }}>
                {[
                  '1 Technical Event (Thought Summit / DesignDash)',
                  '1 Non-Technical Event (Skribbl.io / Chess)',
                  'Full Dining (Lunch Buffet, Morning & Evening High Tea)',
                  'Symposium Kit, Delegate ID Badge & Folder',
                  'Accredited Anna University Participation Certificate',
                  'Cash Prizes & Trophies for Event Winners',
                ].map((perk, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem' }}>
                    <CheckCircle2 size={15} color="#10b981" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ fontSize: '0.84rem', color: 'var(--text-main)', fontWeight: 600 }}>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Deadline Alert & Primary CTA */}
            <div
              style={{
                background: '#ffffff',
                border: '1.5px solid rgba(234, 88, 12, 0.25)',
                borderRadius: '20px',
                padding: '1.75rem',
                boxShadow: '0 10px 30px rgba(234, 88, 12, 0.08)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '12px',
                  background: 'rgba(234, 88, 12, 0.08)',
                  color: '#c2410c',
                  marginBottom: '1rem',
                }}
              >
                <Clock size={20} color="#ea580c" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
                    REGISTRATION DEADLINE
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 800 }}>
                    {REGISTRATION_DEADLINE_TEXT} at 11:59 PM IST
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                <MapPin size={16} color="var(--primary-blue)" style={{ flexShrink: 0 }} />
                <span>
                  <strong>Venue for All Events:</strong> APEC Central Library
                </span>
              </div>

              {/* Big Direct Button to Google Form */}
              <a
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '0.95rem 1.25rem',
                  fontSize: '0.96rem',
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  boxShadow: '0 6px 20px rgba(16, 185, 129, 0.35)',
                  borderColor: 'rgba(16, 185, 129, 0.4)',
                }}
              >
                <span>OPEN FORM IN NEW TAB</span>
                <ExternalLink size={18} />
              </a>

              {/* Support Hotline */}
              <div
                style={{
                  marginTop: '1rem',
                  paddingTop: '0.85rem',
                  borderTop: '1px dashed rgba(23, 105, 224, 0.15)',
                  fontSize: '0.76rem',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.4rem',
                }}
              >
                <span>Student Sec. (Mounishkumar):</span>
                <a href="tel:919342620698" style={{ color: 'var(--primary-blue)', fontWeight: 700, textDecoration: 'none' }}>
                  +91 9342620698
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Google Form Section */}
        <div
          className="glass-card"
          style={{
            maxWidth: '1060px',
            margin: '0 auto',
            borderRadius: '26px',
            overflow: 'hidden',
            border: '2px solid rgba(23, 105, 224, 0.22)',
            background: '#ffffff',
            boxShadow: '0 16px 45px rgba(23, 105, 224, 0.08)',
          }}
        >
          {/* Form Header Bar */}
          <div
            style={{
              padding: '1rem 1.5rem',
              background: 'linear-gradient(90deg, #1769e0 0%, #0099b8 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <ShieldCheck size={20} />
              <span style={{ fontWeight: 800, fontSize: '0.92rem', letterSpacing: '0.02em' }}>
                OFFICIAL GOOGLE REGISTRATION FORM
              </span>
            </div>

            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: '#ffffff',
                fontSize: '0.8rem',
                fontWeight: 700,
                textDecoration: 'none',
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '0.35rem 0.75rem',
                borderRadius: '8px',
                backdropFilter: 'blur(6px)',
              }}
            >
              <span>Full Screen</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Embedded Google Form iframe */}
          <div style={{ position: 'relative', width: '100%', minHeight: '850px', background: '#fafbfc' }}>
            <iframe
              src={embeddedGoogleFormUrl}
              width="100%"
              height="950"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              onLoad={() => setIframeLoaded(true)}
              style={{
                width: '100%',
                height: '950px',
                border: 'none',
                display: 'block',
              }}
              title="CHANNEL 2K27 Official Registration Form"
            >
              Loading Official Registration Form…
            </iframe>
          </div>

          {/* Bottom Footer notice */}
          <div
            style={{
              padding: '1rem 1.5rem',
              background: '#f8fafc',
              borderTop: '1px solid rgba(23, 105, 224, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
            }}
          >
            <span>Having trouble loading the embedded form?</span>
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--primary-blue)', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <span>Open directly in Google Forms</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
