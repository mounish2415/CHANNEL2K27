import React, { useState } from 'react';
import { QrCode, Scan, Copy, Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function QRSection({ onJumpToRegister }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="qr-section" className="section" style={{ position: 'relative', zIndex: 2 }}>
      <div
        className="glass-card"
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '3rem 2rem',
          borderRadius: '32px',
          border: '1px solid rgba(23, 105, 224, 0.18)',
          boxShadow: '0 20px 50px rgba(23, 105, 224, 0.1), 0 0 25px rgba(0, 153, 184, 0.06)',
          background: 'rgba(255, 255, 255, 0.94)',
          color: 'var(--text-main)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column: QR Code Visual with High-tech laser sweep */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'relative',
                padding: '1.25rem',
                background: '#ffffff',
                borderRadius: '24px',
                border: '1.5px solid rgba(0, 184, 217, 0.35)',
                boxShadow: '0 12px 30px rgba(23, 105, 224, 0.12), 0 0 20px rgba(0, 184, 217, 0.18)',
              }}
            >
              {/* Corner tech target brackets */}
              <div style={{ position: 'absolute', top: '8px', left: '8px', width: '16px', height: '16px', borderTop: '3px solid #00b8d9', borderLeft: '3px solid #00b8d9', borderRadius: '4px 0 0 0' }} />
              <div style={{ position: 'absolute', top: '8px', right: '8px', width: '16px', height: '16px', borderTop: '3px solid #00b8d9', borderRight: '3px solid #00b8d9', borderRadius: '0 4px 0 0' }} />
              <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '16px', height: '16px', borderBottom: '3px solid #00b8d9', borderLeft: '3px solid #00b8d9', borderRadius: '0 0 0 4px' }} />
              <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '16px', height: '16px', borderBottom: '3px solid #00b8d9', borderRight: '3px solid #00b8d9', borderRadius: '0 0 4px 0' }} />

              {/* High Fidelity SVG QR Code */}
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                {/* Background */}
                <rect width="200" height="200" rx="8" fill="#ffffff" />
                
                {/* Top Left Finder */}
                <rect x="15" y="15" width="46" height="46" rx="6" fill="#17233C" />
                <rect x="23" y="23" width="30" height="30" rx="3" fill="#ffffff" />
                <rect x="29" y="29" width="18" height="18" rx="2" fill="#1769E0" />

                {/* Top Right Finder */}
                <rect x="139" y="15" width="46" height="46" rx="6" fill="#17233C" />
                <rect x="147" y="23" width="30" height="30" rx="3" fill="#ffffff" />
                <rect x="153" y="29" width="18" height="18" rx="2" fill="#1769E0" />

                {/* Bottom Left Finder */}
                <rect x="15" y="139" width="46" height="46" rx="6" fill="#17233C" />
                <rect x="23" y="147" width="30" height="30" rx="3" fill="#ffffff" />
                <rect x="29" y="153" width="18" height="18" rx="2" fill="#1769E0" />

                {/* Simulated Data Pattern Matrix */}
                <g fill="#17233C">
                  {/* Top center dots */}
                  <rect x="70" y="18" width="8" height="8" rx="1.5" />
                  <rect x="84" y="26" width="8" height="8" rx="1.5" fill="#00B8D9" />
                  <rect x="98" y="18" width="8" height="8" rx="1.5" />
                  <rect x="112" y="26" width="8" height="8" rx="1.5" />
                  <rect x="122" y="18" width="8" height="8" rx="1.5" />
                  
                  <rect x="70" y="38" width="8" height="8" rx="1.5" />
                  <rect x="84" y="48" width="8" height="8" rx="1.5" />
                  <rect x="112" y="48" width="8" height="8" rx="1.5" fill="#6C4DFF" />
                  
                  {/* Middle Left & Right */}
                  <rect x="18" y="70" width="8" height="8" rx="1.5" />
                  <rect x="36" y="84" width="8" height="8" rx="1.5" />
                  <rect x="18" y="98" width="8" height="8" rx="1.5" />
                  <rect x="46" y="98" width="8" height="8" rx="1.5" />
                  <rect x="32" y="112" width="8" height="8" rx="1.5" />
                  
                  <rect x="148" y="70" width="8" height="8" rx="1.5" />
                  <rect x="168" y="84" width="8" height="8" rx="1.5" />
                  <rect x="156" y="98" width="8" height="8" rx="1.5" fill="#00B8D9" />
                  <rect x="176" y="98" width="8" height="8" rx="1.5" />
                  <rect x="148" y="116" width="8" height="8" rx="1.5" />
                  <rect x="168" y="122" width="8" height="8" rx="1.5" />

                  {/* Center Center Clusters */}
                  <rect x="70" y="72" width="8" height="8" rx="1.5" />
                  <rect x="84" y="72" width="8" height="8" rx="1.5" />
                  <rect x="112" y="72" width="8" height="8" rx="1.5" />
                  <rect x="70" y="88" width="8" height="8" rx="1.5" fill="#1769E0" />
                  <rect x="122" y="88" width="8" height="8" rx="1.5" />
                  <rect x="70" y="104" width="8" height="8" rx="1.5" />
                  <rect x="84" y="116" width="8" height="8" rx="1.5" />
                  <rect x="104" y="116" width="8" height="8" rx="1.5" fill="#6C4DFF" />
                  <rect x="122" y="108" width="8" height="8" rx="1.5" />

                  {/* Bottom Center & Right */}
                  <rect x="70" y="142" width="8" height="8" rx="1.5" />
                  <rect x="84" y="156" width="8" height="8" rx="1.5" />
                  <rect x="100" y="142" width="8" height="8" rx="1.5" />
                  <rect x="114" y="156" width="8" height="8" rx="1.5" fill="#E94EFF" />
                  <rect x="124" y="142" width="8" height="8" rx="1.5" />
                  <rect x="70" y="172" width="8" height="8" rx="1.5" />
                  <rect x="88" y="172" width="8" height="8" rx="1.5" />
                  <rect x="104" y="168" width="8" height="8" rx="1.5" />
                  <rect x="122" y="172" width="8" height="8" rx="1.5" />

                  <rect x="144" y="144" width="8" height="8" rx="1.5" fill="#00B8D9" />
                  <rect x="160" y="144" width="8" height="8" rx="1.5" />
                  <rect x="176" y="154" width="8" height="8" rx="1.5" />
                  <rect x="152" y="168" width="8" height="8" rx="1.5" />
                  <rect x="168" y="172" width="8" height="8" rx="1.5" fill="#1769E0" />
                </g>

                {/* Center Tech Badge / Logo */}
                <rect x="86" y="86" width="28" height="28" rx="8" fill="#1769E0" />
                <circle cx="100" cy="100" r="8" fill="#00B8D9" />
                <path d="M96 100H104M100 96V104" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              </svg>

              {/* Animated Laser Scanning Line */}
              <div
                style={{
                  position: 'absolute',
                  left: '12px',
                  right: '12px',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #00b8d9, #6c4dff, transparent)',
                  boxShadow: '0 0 10px #00b8d9',
                  animation: 'laserScan 2.6s infinite ease-in-out',
                }}
              />
            </div>

            <div
              style={{
                marginTop: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: 'var(--primary-blue)',
              }}
            >
              <Scan size={14} />
              <span>SCAN CODE VIA MOBILE CAMERA</span>
            </div>
          </div>

          {/* Right Column: Text & Instructions */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 800,
                color: 'var(--cyan)',
                letterSpacing: '0.12em',
                marginBottom: '0.5rem',
              }}
            >
              // RAPID MOBILE CHECK-IN
            </div>

            <p
              style={{
                fontSize: '0.94rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: '1.5rem',
              }}
            >
              Use any QR code scanner, Google Lens, or mobile camera to open the official registration portal instantly on your handheld device.
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                marginBottom: '2rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.86rem', color: 'var(--text-main)' }}>
                <ShieldCheck size={18} color="#1769e0" />
                <span>Direct secure link to symposium registration desk</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.86rem', color: 'var(--text-main)' }}>
                <ShieldCheck size={18} color="#1769e0" />
                <span>Instant confirmation & digital delegate pass generation</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.86rem', color: 'var(--text-main)' }}>
                <ShieldCheck size={18} color="#1769e0" />
                <span>Fast-track check-in on event day (November 3, 2026)</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <button
                onClick={() => {
                  const el = document.getElementById('register');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  if (onJumpToRegister) onJumpToRegister();
                }}
                className="btn btn-primary"
              >
                <span>OPEN REGISTRATION FORM</span>
                <ArrowRight size={18} />
              </button>

              <button onClick={handleCopyLink} className="btn btn-secondary">
                {copied ? <Check size={17} color="#10b981" /> : <Copy size={17} />}
                <span>{copied ? 'Link Copied!' : 'Copy Portal Link'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
