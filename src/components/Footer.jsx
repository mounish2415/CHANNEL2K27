import React from 'react';
import {
  Cpu,
  Mail,
  Phone,
  MapPin,
  Globe,
  ArrowUp,
  Heart,
  Sparkles,
} from 'lucide-react';

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'Instagram',
      handle: '@apec1984',
      url: 'https://instagram.com/apec1984',
      icon: InstagramIcon,
      color: '#e1306c',
    },
    {
      name: 'Facebook',
      handle: '/apec1984',
      url: 'https://facebook.com/apec1984',
      icon: FacebookIcon,
      color: '#1877f2',
    },
    {
      name: 'YouTube',
      handle: '@apec1984',
      url: 'https://youtube.com/@apec1984',
      icon: YoutubeIcon,
      color: '#ff0000',
    },
    {
      name: 'X (Twitter)',
      handle: '@Apec1984',
      url: 'https://x.com/Apec1984',
      icon: TwitterIcon,
      color: '#1da1f2',
    },
    {
      name: 'Official Website',
      handle: 'apec.edu.in',
      url: 'https://apec.edu.in',
      icon: Globe,
      color: '#00b8d9',
    },
  ];

  const quickLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Events', href: '#events' },
    { label: 'Agenda', href: '#agenda' },
    { label: 'Team', href: '#team' },
    { label: 'Venue', href: '#venue' },
  ];

  return (
    <footer
      id="contact"
      style={{
        background: 'linear-gradient(180deg, #f5faff 0%, #edf4fc 45%, #e1edf8 100%)',
        color: 'var(--text-main)',
        paddingTop: '6rem',
        paddingBottom: '2.5rem',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
        borderTop: '1px solid rgba(23, 105, 224, 0.15)',
      }}
    >
      {/* Decorative Top Circuit Wave */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #1769e0, #00b8d9, #6c4dff, #e94eff)',
        }}
      />

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            paddingBottom: '3.5rem',
            borderBottom: '1px solid rgba(23, 105, 224, 0.12)',
          }}
        >
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'var(--grad-tech)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: '0 4px 14px rgba(23, 105, 224, 0.3)',
                }}
              >
                <Cpu size={24} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.35rem',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-main)',
                  }}
                >
                  CHANNEL <span style={{ color: 'var(--primary-blue)' }}>2K27</span>
                </div>
                <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-light)' }}>
                  S.E.C.E. • APEC
                </div>
              </div>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.05rem',
                fontWeight: 700,
                color: 'var(--primary-blue)',
                marginBottom: '1rem',
              }}
            >
              “Connect. Collaborate. Create.”
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              National Level Technical Symposium organized by the Society of Electronics and Communication Engineering (S.E.C.E.).
            </p>

            <div style={{ fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
              <strong>Adhiparasakthi Engineering College</strong>
              <br />
              SH 115, Melmaruvathur, Kancheepuram District,
              <br />
              Tamil Nadu 603319, India
              <br />
              <span style={{ fontSize: '0.74rem', color: 'var(--text-light)' }}>
                (Autonomous • NAAC 'A' • AICTE Approved • Anna Univ)
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: 'var(--primary-blue)',
                letterSpacing: '0.1em',
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
              }}
            >
              // Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary-blue)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    → {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Column */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: 'var(--primary-blue)',
                letterSpacing: '0.1em',
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
              }}
            >
              // Connect With Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {socialLinks.map((s) => {
                const IconComp = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      textDecoration: 'none',
                      color: 'var(--text-main)',
                      fontSize: '0.88rem',
                      padding: '0.4rem 0.6rem',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.75)',
                      border: '1px solid rgba(23, 105, 224, 0.1)',
                      transition: 'transform 0.2s, background 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(4px)';
                      e.currentTarget.style.background = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.75)';
                    }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'rgba(23, 105, 224, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: s.color,
                      }}
                    >
                      <IconComp size={18} />
                    </div>
                    <div>
                      <span style={{ fontWeight: 600 }}>{s.name}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'block' }}>{s.handle}</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Contact Helpline Column */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: 'var(--primary-blue)',
                letterSpacing: '0.1em',
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
              }}
            >
              // Event Inquiries
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.88rem' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
                  HEAD OF THE DEPARTMENT
                </div>
                <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>Mr. S. Prakash</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  HOD – Department of ECE
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
                  CONVENER HELPLINE
                </div>
                <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>Mr. P. Vedasundaravinayagam</div>
                <a href="tel:919944802235" style={{ color: 'var(--primary-blue)', textDecoration: 'none', fontWeight: 600 }}>
                  +91 9944802235
                </a>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
                  STUDENT SECRETARY
                </div>
                <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>MOUNISHKUMAR S</div>
                <a href="tel:919342620698" style={{ color: 'var(--primary-blue)', textDecoration: 'none', fontWeight: 600 }}>
                  +91 9342620698
                </a>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
                  SYMPOSIUM EMAIL
                </div>
                <a href="mailto:channel2k27@apec.edu.in" style={{ color: 'var(--primary-blue)', textDecoration: 'none', fontWeight: 600 }}>
                  channel2k27@apec.edu.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright & Scroll to Top */}
        <div
          style={{
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            © 2026 <strong>CHANNEL 2K27</strong> | Society of Electronics and Communication Engineering (S.E.C.E.), APEC. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#ffffff',
              border: '1px solid rgba(23, 105, 224, 0.2)',
              borderRadius: '9999px',
              padding: '0.45rem 1rem',
              color: 'var(--text-main)',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(23, 105, 224, 0.08)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--primary-blue)';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.color = 'var(--text-main)';
            }}
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
