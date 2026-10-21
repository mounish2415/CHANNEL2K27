import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, UserCheck } from 'lucide-react';

const navItems = [
  { label: 'HOME', path: '/' },
  { label: 'ABOUT', path: '/about' },
  { label: 'EVENTS', path: '/events' },
  { label: 'AGENDA', path: '/agenda' },
  { label: 'TEAM', path: '/team' },
  { label: 'VENUE', path: '/venue' },
  { label: 'REGISTER', path: '/register' },
  { label: 'CONTACT', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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
          ? 'rgba(255, 255, 255, 0.95)'
          : 'rgba(245, 250, 255, 0.88)',
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
        <Link
          to="/"
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
                <polygon
                  points="22,11 31,22 22,33 13,22"
                  fill="url(#coreGradient)"
                  stroke="#1769e0"
                  strokeWidth="1.2"
                />
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
              className="brand-title-mobile"
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
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1.35rem',
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              style={({ isActive }) => ({
                fontSize: '0.86rem',
                fontWeight: 700,
                textDecoration: 'none',
                color: isActive ? 'var(--primary-blue)' : 'var(--text-main)',
                transition: 'all 0.2s ease',
                position: 'relative',
                padding: '0.4rem 0.2rem',
                fontFamily: 'var(--font-heading)',
                letterSpacing: '0.04em',
              })}
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '20px',
                        height: '2.5px',
                        borderRadius: '2px',
                        background: 'var(--grad-tech)',
                        boxShadow: '0 2px 8px rgba(23, 105, 224, 0.4)',
                      }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* Quick Register Button */}
          <Link
            to="/register"
            className="btn btn-primary btn-sm"
            style={{
              textDecoration: 'none',
              marginLeft: '0.5rem',
              padding: '0.5rem 1.15rem',
              fontSize: '0.8rem',
            }}
          >
            <UserCheck size={15} />
            <span>REGISTER NOW</span>
          </Link>
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
          className="nav-drawer-box"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(24px)',
            borderBottom: '1px solid rgba(23, 105, 224, 0.2)',
            boxShadow: '0 20px 45px rgba(23, 105, 224, 0.12), 0 0 20px rgba(0, 153, 184, 0.08)',
            padding: '1.25rem 1.5rem 1.75rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === '/'}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `nav-drawer-link ${isActive ? 'active' : ''}`}
              style={({ isActive }) => ({
                fontSize: '1rem',
                fontWeight: 700,
                color: isActive ? 'var(--primary-blue)' : 'var(--text-main)',
                textDecoration: 'none',
                padding: '0.65rem 0.85rem',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: isActive ? 'rgba(23, 105, 224, 0.08)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--primary-blue)' : '3px solid transparent',
                transition: 'all 0.2s ease',
              })}
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  {isActive ? (
                    <span className="pulsing-node" style={{ width: '7px', height: '7px' }} />
                  ) : null}
                </>
              )}
            </NavLink>
          ))}

          <Link
            to="/register"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-primary nav-drawer-btn"
            style={{
              textDecoration: 'none',
              marginTop: '0.6rem',
              justifyContent: 'center',
            }}
          >
            <UserCheck size={18} />
            <span>REGISTER NOW</span>
          </Link>
        </div>
      )}
    </header>
  );
}
