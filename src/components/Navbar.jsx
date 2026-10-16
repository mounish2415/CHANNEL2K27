import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'HOME', href: '#hero' },
  { label: 'ABOUT', href: '#about' },
  { label: 'EVENTS', href: '#events' },
  { label: 'AGENDA', href: '#agenda' },
  { label: 'TEAM', href: '#team' },
  { label: 'VENUE', href: '#venue' },
  { label: 'REGISTER', href: '#register' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sectionIds = ['hero', 'about', 'events', 'agenda', 'schedule', 'team', 'venue', 'register', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        transition: 'all 0.3s ease',
        background: scrolled
          ? 'rgba(255, 255, 255, 0.94)'
          : 'rgba(245, 250, 255, 0.86)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled
          ? '1px solid rgba(23, 105, 224, 0.16)'
          : '1px solid rgba(23, 105, 224, 0.08)',
        boxShadow: scrolled
          ? '0 8px 30px rgba(23, 105, 224, 0.08)'
          : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0.85rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Animated Cyber Logo / Brand */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            textDecoration: 'none',
          }}
        >
          {/* Animated Quantum Circuit Core */}
          <div className="logo-animated-wrapper">
            <div className="logo-aura" />
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              {/* Outer Counter-Clockwise Segmented Orbit Ring */}
              <circle
                cx="22"
                cy="22"
                r="19"
                stroke="rgba(23, 105, 224, 0.45)"
                strokeWidth="1.8"
                strokeDasharray="14 8 20 6"
                strokeLinecap="round"
                className="logo-ring-outer"
              />
              
              {/* Inner Clockwise Dotted Ring */}
              <circle
                cx="22"
                cy="22"
                r="14"
                stroke="rgba(108, 77, 255, 0.55)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                className="logo-ring-inner"
              />

              {/* Central Glowing Cyber Crystal Core */}
              <g className="logo-core">
                {/* Outer Diamond Shield */}
                <polygon
                  points="22,11 31,22 22,33 13,22"
                  fill="url(#coreGradient)"
                  stroke="#1769e0"
                  strokeWidth="1.2"
                />
                
                {/* Inner Quantum Circuit Nodes */}
                <circle cx="22" cy="22" r="3.2" fill="#ffffff" />
                <line x1="22" y1="16" x2="22" y2="19" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="22" y1="25" x2="22" y2="28" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="16" y1="22" x2="19" y2="22" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="25" y1="22" x2="28" y2="22" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
              </g>

              {/* Gradient Definitions */}
              <defs>
                <linearGradient id="coreGradient" x1="13" y1="11" x2="31" y2="33" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00b8d9" />
                  <stop offset="0.5" stopColor="#1769e0" />
                  <stop offset="1" stopColor="#6c4dff" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.28rem',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              <span className="brand-shimmer-text">CHANNEL 2K27</span>
            </div>
            <div
              style={{
                fontSize: '0.68rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                marginTop: '0.15rem',
              }}
            >
              <span className="pulsing-node" style={{ width: '5px', height: '5px' }} />
              <span style={{ color: 'var(--cyan)' }}>S.E.C.E.</span>
              <span>•</span>
              <span>APEC</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1.4rem',
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => {
            const isActive =
              (item.href === '#hero' && activeSection === 'hero') ||
              (item.href === '#about' && activeSection === 'about') ||
              (item.href === '#events' && activeSection === 'events') ||
              ((item.href === '#agenda' || item.href === '#schedule') && (activeSection === 'agenda' || activeSection === 'schedule')) ||
              (item.href === '#team' && activeSection === 'team') ||
              (item.href === '#venue' && activeSection === 'venue') ||
              (item.href === '#contact' && activeSection === 'contact');

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                style={{
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  color: isActive ? 'var(--primary-blue)' : 'var(--text-main)',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  padding: '0.4rem 0.2rem',
                }}
              >
                {item.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '18px',
                      height: '2.5px',
                      borderRadius: '2px',
                      background: 'var(--grad-tech)',
                    }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          id="mobile-nav-toggle"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(23, 105, 224, 0.08)',
            border: '1px solid rgba(23, 105, 224, 0.2)',
            borderRadius: '10px',
            padding: '0.55rem',
            color: 'var(--primary-blue)',
            cursor: 'pointer',
          }}
          className="mobile-toggle-btn"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(255, 255, 255, 0.97)',
            backdropFilter: 'blur(24px)',
            borderBottom: '1px solid rgba(23, 105, 224, 0.2)',
            boxShadow: '0 20px 45px rgba(23, 105, 224, 0.12), 0 0 20px rgba(0, 153, 184, 0.08)',
            padding: '1.25rem 1.5rem 1.75rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.9rem',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                textDecoration: 'none',
                padding: '0.6rem 0.8rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>{item.label}</span>
              <span className="pulsing-node" style={{ width: '6px', height: '6px' }} />
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
