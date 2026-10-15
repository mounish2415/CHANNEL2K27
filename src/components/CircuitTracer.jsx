import React, { useState, useEffect } from 'react';

const sections = [
  { id: 'hero', label: 'HOME', code: '01' },
  { id: 'about', label: 'ABOUT', code: '02' },
  { id: 'events', label: 'EVENTS', code: '03' },
  { id: 'agenda', label: 'AGENDA', code: '04' },
  { id: 'team', label: 'TEAM', code: '05' },
  { id: 'venue', label: 'VENUE', code: '06' },
  { id: 'contact', label: 'CONTACT', code: '07' },
];

export default function CircuitTracer() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollPercent(progress);

      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        display: 'none', // Handled by media query in CSS or inline check
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
              height: `${scrollPercent}%`,
              background: 'linear-gradient(to bottom, #00b8d9, #1769e0, #6c4dff)',
              boxShadow: '0 0 8px #00b8d9',
              borderRadius: '2px',
              transition: 'height 0.15s ease-out',
            }}
          />

          {/* Node points along the circuit track */}
          {sections.map((sec, idx) => {
            const isActive = activeSection === sec.id;
            const topPercent = (idx / (sections.length - 1)) * 100;

            return (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                title={`${sec.code} - ${sec.label}`}
                aria-label={`Jump to ${sec.label}`}
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
                  transition: 'all 0.25s ease',
                  zIndex: 2,
                }}
              />
            );
          })}
        </div>

        <div
          style={{
            fontSize: '0.68rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: 'var(--violet)',
            marginTop: '0.2rem',
          }}
        >
          {Math.round(scrollPercent)}%
        </div>
      </div>
    </aside>
  );
}
