import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const navRoutes = [
  { path: '/', label: 'HOME', code: '01' },
  { path: '/about', label: 'ABOUT', code: '02' },
  { path: '/events', label: 'EVENTS', code: '03' },
  { path: '/agenda', label: 'AGENDA', code: '04' },
  { path: '/team', label: 'TEAM', code: '05' },
  { path: '/venue', label: 'VENUE', code: '06' },
  { path: '/register', label: 'REGISTER', code: '07' },
  { path: '/contact', label: 'CONTACT', code: '08' },
];

export default function CircuitTracer() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollPercent(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const activeIndex = navRoutes.findIndex((r) => r.path === location.pathname);

  return (
    <aside
      className="circuit-tracer-hud"
      aria-label="Circuit Network Navigation"
      style={{
        position: 'fixed',
        right: '1.25rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 90,
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(23, 105, 224, 0.2)',
          borderRadius: '24px',
          padding: '1.1rem 0.75rem',
          boxShadow: '0 8px 30px rgba(23, 105, 224, 0.12), 0 0 16px rgba(0, 153, 184, 0.06)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.85rem',
        }}
      >
        <div
          style={{
            fontSize: '0.62rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: 'var(--primary-blue)',
            letterSpacing: '0.1em',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            marginBottom: '0.2rem',
            opacity: 0.8,
          }}
        >
          CIRCUIT LINK
        </div>

        {/* Vertical circuit line with filled progress */}
        <div
          style={{
            width: '2px',
            height: '220px',
            background: 'rgba(23, 105, 224, 0.15)',
            position: 'relative',
            borderRadius: '2px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: activeIndex >= 0 ? `${(activeIndex / (navRoutes.length - 1)) * 100}%` : `${scrollPercent}%`,
              background: 'linear-gradient(to bottom, #00b8d9, #1769e0, #6c4dff)',
              boxShadow: '0 0 8px #00b8d9',
              borderRadius: '2px',
              transition: 'height 0.25s ease-out',
            }}
          />

          {/* Node points along the circuit track */}
          {navRoutes.map((route, idx) => {
            const isActive = location.pathname === route.path;
            const topPercent = (idx / (navRoutes.length - 1)) * 100;

            return (
              <button
                key={route.path}
                onClick={() => navigate(route.path)}
                title={`${route.code} - ${route.label}`}
                aria-label={`Navigate to ${route.label}`}
                style={{
                  position: 'absolute',
                  top: `${topPercent}%`,
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: isActive ? '14px' : '9px',
                  height: isActive ? '14px' : '9px',
                  borderRadius: '50%',
                  background: isActive ? '#00b8d9' : '#ffffff',
                  border: isActive
                    ? '2.5px solid #1769e0'
                    : '2px solid rgba(23, 105, 224, 0.35)',
                  boxShadow: isActive
                    ? '0 0 12px #00b8d9, 0 0 4px #1769e0'
                    : 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.2s ease',
                  zIndex: 2,
                }}
              />
            );
          })}
        </div>

        <div
          style={{
            fontSize: '0.62rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            color: 'var(--text-muted)',
            marginTop: '0.2rem',
          }}
        >
          {String(Math.round(scrollPercent)).padStart(2, '0')}%
        </div>
      </div>
    </aside>
  );
}
