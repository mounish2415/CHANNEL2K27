import React from 'react';
import { Cpu, Terminal, Palette, Award, Sparkles, Eye, Zap, Layers, MapPin } from 'lucide-react';
import { technicalEvents, nonTechnicalEvents } from '../data/eventsData';

export default function Events({ onOpenDetails }) {
  return (
    <section id="events" className="section section-wide" style={{ position: 'relative', zIndex: 2 }}>
      {/* ================= TECHNICAL EVENTS ================= */}
      <div style={{ marginBottom: '5rem' }}>
        <div className="section-header">
          <div className="section-pill">
            <Cpu size={14} />
            <span>ENGINEERING & INNOVATION TRACK</span>
          </div>
          <h2 className="section-title">
            TECHNICAL <span className="gradient-text">EVENTS</span>
          </h2>
          <p className="section-subtitle">
            Compete with the sharpest minds across India. Test your analytical acumen, circuit troubleshooting speed, and paper presentation excellence.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.25rem',
          }}
        >
          {technicalEvents.map((evt) => (
            <div
              key={evt.id}
              className="glass-card"
              style={{
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Event Image Banner */}
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={evt.image}
                    alt={evt.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />

                  {/* Gradient Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(23, 35, 60, 0.85) 0%, rgba(23, 35, 60, 0.2) 60%, transparent 100%)',
                    }}
                  />

                  {/* Top Badges */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      right: '14px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        padding: '0.35rem 0.8rem',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.92)',
                        backdropFilter: 'blur(8px)',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800,
                        color: 'var(--primary-blue)',
                        border: '1px solid rgba(23, 105, 224, 0.25)',
                        boxShadow: '0 2px 10px rgba(23, 105, 224, 0.15)',
                      }}
                    >
                      EVENT {evt.num}
                    </span>

                    <span
                      style={{
                        padding: '0.3rem 0.75rem',
                        borderRadius: '8px',
                        background: 'rgba(0, 184, 217, 0.9)',
                        backdropFilter: 'blur(8px)',
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        color: '#ffffff',
                      }}
                    >
                      {evt.feeText}
                    </span>
                  </div>

                  {/* Bottom title over image */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '14px',
                      left: '16px',
                      right: '16px',
                    }}
                  >
                    <h3
                      style={{
                        color: '#ffffff',
                        fontSize: '1.45rem',
                        fontWeight: 900,
                        letterSpacing: '-0.02em',
                        marginBottom: '0.15rem',
                      }}
                    >
                      {evt.name}
                    </h3>
                    <div
                      style={{
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                      }}
                    >
                      {evt.tagline}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.6rem 1.6rem 1rem 1.6rem' }}>
                  <p
                    style={{
                      fontSize: '0.92rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                      marginBottom: '1.25rem',
                    }}
                  >
                    {evt.shortDesc}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <span className="tech-badge">
                      <Zap size={12} /> {evt.teamSize}
                    </span>
                    <span className="tech-badge">
                      <Layers size={12} /> {evt.duration}
                    </span>
                    <span className="tech-badge" style={{ color: 'var(--primary-blue)', borderColor: 'rgba(23, 105, 224, 0.25)' }}>
                      <MapPin size={12} /> {evt.venue || 'APEC Central Library'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div
                style={{
                  padding: '1.2rem 1.6rem',
                  borderTop: '1px solid rgba(23, 105, 224, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(248, 252, 255, 0.6)',
                }}
              >
                <button
                  id={`details-${evt.id}-btn`}
                  onClick={() => onOpenDetails(evt)}
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Eye size={16} />
                  <span>VIEW DETAILS & RULES</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= NON-TECHNICAL EVENTS ================= */}
      <div>
        <div className="section-header">
          <div className="section-pill" style={{ background: 'linear-gradient(135deg, rgba(108, 77, 255, 0.12), rgba(233, 78, 255, 0.12))', borderColor: 'rgba(233, 78, 255, 0.3)' }}>
            <Palette size={14} color="#e94eff" />
            <span style={{ color: '#6c4dff' }}>CREATIVITY & STRATEGY ARENA</span>
          </div>
          <h2 className="section-title">
            NON-TECHNICAL <span className="gradient-text-accent">EVENTS</span>
          </h2>
          <p className="section-subtitle">
            Unwind, express your artistic instincts, or unleash tactical brilliance in our vibrant non-technical showdowns.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.25rem',
          }}
        >
          {nonTechnicalEvents.map((evt) => (
            <div
              key={evt.id}
              className="glass-card"
              style={{
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Event Image Banner */}
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={evt.image}
                    alt={evt.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />

                  {/* Gradient Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(23, 35, 60, 0.85) 0%, rgba(23, 35, 60, 0.2) 60%, transparent 100%)',
                    }}
                  />

                  {/* Top Badges */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      right: '14px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        padding: '0.35rem 0.8rem',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.92)',
                        backdropFilter: 'blur(8px)',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800,
                        color: 'var(--violet)',
                        border: '1px solid rgba(108, 77, 255, 0.25)',
                        boxShadow: '0 2px 10px rgba(108, 77, 255, 0.15)',
                      }}
                    >
                      EVENT {evt.num}
                    </span>

                    <span
                      style={{
                        padding: '0.3rem 0.75rem',
                        borderRadius: '8px',
                        background: 'rgba(233, 78, 255, 0.9)',
                        backdropFilter: 'blur(8px)',
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        color: '#ffffff',
                      }}
                    >
                      {evt.feeText}
                    </span>
                  </div>

                  {/* Bottom title over image */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '14px',
                      left: '16px',
                      right: '16px',
                    }}
                  >
                    <h3
                      style={{
                        color: '#ffffff',
                        fontSize: '1.45rem',
                        fontWeight: 900,
                        letterSpacing: '-0.02em',
                        marginBottom: '0.15rem',
                      }}
                    >
                      {evt.name}
                    </h3>
                    <div
                      style={{
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                      }}
                    >
                      {evt.tagline}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.6rem 1.6rem 1rem 1.6rem' }}>
                  <p
                    style={{
                      fontSize: '0.92rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                      marginBottom: '1.25rem',
                    }}
                  >
                    {evt.shortDesc}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <span className="tech-badge" style={{ color: 'var(--violet)', borderColor: 'rgba(108, 77, 255, 0.2)' }}>
                      <Zap size={12} /> {evt.teamSize}
                    </span>
                    <span className="tech-badge" style={{ color: 'var(--pink)', borderColor: 'rgba(233, 78, 255, 0.2)' }}>
                      <Layers size={12} /> {evt.duration}
                    </span>
                    <span className="tech-badge" style={{ color: 'var(--cyan)', borderColor: 'rgba(0, 153, 184, 0.25)' }}>
                      <MapPin size={12} /> {evt.venue || 'APEC Central Library'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div
                style={{
                  padding: '1.2rem 1.6rem',
                  borderTop: '1px solid rgba(23, 105, 224, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(248, 252, 255, 0.6)',
                }}
              >
                <button
                  id={`details-${evt.id}-btn`}
                  onClick={() => onOpenDetails(evt)}
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #6c4dff 0%, #e94eff 100%)' }}
                >
                  <Eye size={16} />
                  <span>VIEW DETAILS & RULES</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
