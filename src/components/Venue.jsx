import React from 'react';
import { MapPin, Navigation, Train, Bus, Plane, CheckCircle2, ExternalLink } from 'lucide-react';

export default function Venue() {
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=12.436921,79.821985';

  return (
    <section id="venue" className="section" style={{ position: 'relative', zIndex: 2 }}>
      <div className="section-header">
        <div className="section-pill">
          <MapPin size={14} />
          <span>LOCATION & CONNECTIVITY</span>
        </div>
        <h2 className="section-title">
          EVENT <span className="gradient-text">VENUE</span>
        </h2>
        <p className="section-subtitle">
          Adhiparasakthi Engineering College is located in Melmaruvathur, Tamil Nadu, India.
        </p>
      </div>

      <div
        className="glass-card"
        style={{
          borderRadius: '30px',
          overflow: 'hidden',
          padding: 0,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          }}
        >
          {/* Left Column: Campus Info & Address Details */}
          <div style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--primary-blue)',
                  letterSpacing: '0.12em',
                  marginBottom: '0.65rem',
                  textTransform: 'uppercase',
                }}
              >
                // CAMPUS LOCATION
              </div>

              <h3
                style={{
                  fontSize: '1.45rem',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-main)',
                  lineHeight: 1.35,
                  marginBottom: '1.5rem',
                }}
              >
                Adhiparasakthi Engineering College is located in Melmaruvathur, Tamil Nadu, India.
              </h3>

              {/* Address & Coordinates Info Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {/* Official Address Card */}
                <div
                  style={{
                    padding: '1.25rem 1.35rem',
                    background: '#ffffff',
                    borderRadius: '18px',
                    border: '1px solid rgba(23, 105, 224, 0.18)',
                    boxShadow: '0 4px 16px rgba(23, 105, 224, 0.05)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'rgba(23, 105, 224, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--primary-blue)',
                      }}
                    >
                      <MapPin size={18} />
                    </div>
                    <span
                      style={{
                        fontSize: '0.78rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800,
                        color: 'var(--primary-blue)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Address:
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: '0.94rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      lineHeight: 1.6,
                      paddingLeft: '0.2rem',
                    }}
                  >
                    SH 115, Melmaruvathur,<br />
                    Kancheepuram District,<br />
                    Tamil Nadu 603319, India
                  </div>
                </div>

                {/* GPS Coordinates Card */}
                <div
                  style={{
                    padding: '1.25rem 1.35rem',
                    background: '#ffffff',
                    borderRadius: '18px',
                    border: '1px solid rgba(0, 153, 184, 0.22)',
                    boxShadow: '0 4px 16px rgba(0, 153, 184, 0.05)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.65rem' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'rgba(0, 153, 184, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--cyan)',
                      }}
                    >
                      <Navigation size={18} />
                    </div>
                    <span
                      style={{
                        fontSize: '0.78rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800,
                        color: 'var(--cyan)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Coordinates:
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                      gap: '0.75rem',
                      paddingLeft: '0.2rem',
                    }}
                  >
                    <div
                      style={{
                        background: 'rgba(23, 105, 224, 0.05)',
                        padding: '0.6rem 0.85rem',
                        borderRadius: '10px',
                        border: '1px solid rgba(23, 105, 224, 0.12)',
                      }}
                    >
                      <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-light)', fontWeight: 600 }}>
                        LATITUDE
                      </div>
                      <div style={{ fontSize: '0.98rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--text-main)' }}>
                        12.436921
                      </div>
                    </div>

                    <div
                      style={{
                        background: 'rgba(0, 153, 184, 0.05)',
                        padding: '0.6rem 0.85rem',
                        borderRadius: '10px',
                        border: '1px solid rgba(0, 153, 184, 0.12)',
                      }}
                    >
                      <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-light)', fontWeight: 600 }}>
                        LONGITUDE
                      </div>
                      <div style={{ fontSize: '0.98rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--text-main)' }}>
                        79.821985
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ width: '100%', textDecoration: 'none' }}
              >
                <Navigation size={18} />
                <span>OPEN IN GOOGLE MAPS</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Right Column: High-tech Map Frame */}
          <div
            style={{
              position: 'relative',
              minHeight: '360px',
              background: '#ffffff',
              borderLeft: '1px solid rgba(23, 105, 224, 0.15)',
            }}
          >
            <iframe
              title="Adhiparasakthi Engineering College Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3893.3082536836696!2d79.82902347594954!3d12.428795726588264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5323bb699a7cd1%3A0x6b403f5723b72c9a!2sAdhiparasakthi%20Engineering%20College!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{
                border: 0,
                minHeight: '400px',
                display: 'block',
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Floating Map Overlay Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                background: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(12px)',
                borderRadius: '14px',
                padding: '0.75rem 1rem',
                border: '1px solid rgba(23, 105, 224, 0.2)',
                boxShadow: '0 8px 24px rgba(23, 105, 224, 0.12)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
              }}
            >
              <span className="pulsing-node" style={{ width: '8px', height: '8px' }} />
              <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--primary-blue)', fontWeight: 700 }}>
                GPS: 12.436921° N, 79.821985° E // APEC MELMARUVATHUR
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
