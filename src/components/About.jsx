import React from 'react';
import { Lightbulb, Users, Wrench, ShieldCheck, Award, CheckCircle2, ChevronRight, Sparkles, Building2 } from 'lucide-react';

const pillars = [
  {
    num: '01',
    title: 'INNOVATE',
    subtitle: 'Explore new ideas and technologies.',
    desc: 'Dive into cutting-edge domains including AI/ML, Embedded Systems, IoT, Robotics, VLSI design, and telecommunications.',
    icon: Lightbulb,
    color: '#1769e0',
    bg: 'rgba(23, 105, 224, 0.08)',
  },
  {
    num: '02',
    title: 'COLLABORATE',
    subtitle: 'Connect with students and innovators.',
    desc: 'Network with fellow engineers, researchers, and tech pioneers across top engineering institutions to exchange insights and build teams.',
    icon: Users,
    color: '#00b8d9',
    bg: 'rgba(0, 184, 217, 0.08)',
  },
  {
    num: '03',
    title: 'CREATE',
    subtitle: 'Turn creativity into meaningful solutions.',
    desc: 'Transform paper ideas and circuit schematics into working prototypes, strategic wins, and high-impact technical demonstrations.',
    icon: Wrench,
    color: '#6c4dff',
    bg: 'rgba(108, 77, 255, 0.08)',
  },
];

export default function About() {
  return (
    <section id="about" className="section" style={{ position: 'relative', zIndex: 2 }}>
      {/* Section Header */}
      <div className="section-header">
        <div className="section-pill">
          <Sparkles size={14} />
          <span>CONNECT • COLLABORATE • CREATE</span>
        </div>
        <h2 className="section-title">
          ABOUT <span className="gradient-text">CHANNEL 2K27</span>
        </h2>
        <p className="section-subtitle">
          A national platform engineered for the next generation of electronics and communication pioneers.
        </p>
      </div>

      {/* Main Narrative Card with College Credentials */}
      <div
        className="glass-card"
        style={{
          padding: '2.5rem',
          marginBottom: '3rem',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
          }}
        >
          {/* Left: About Text */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'var(--cyan)',
                fontWeight: 700,
                letterSpacing: '0.1em',
                marginBottom: '0.75rem',
              }}
            >
              // SYMPOSIUM OVERVIEW
            </div>
            <p
              style={{
                fontSize: '1.15rem',
                lineHeight: 1.8,
                color: 'var(--text-main)',
                fontWeight: 500,
                marginBottom: '1.5rem',
              }}
            >
              “CHANNEL 2K27 is a National Level Technical Symposium organized by the{' '}
              <strong style={{ color: 'var(--primary-blue)', fontWeight: 700 }}>
                Society of Electronics and Communication Engineering (SECE)
              </strong>
              , Adhiparasakthi Engineering College. The symposium brings together students, innovators, creators and technology enthusiasts to connect, collaborate and create through technical and non-technical events.”
            </p>
          </div>

          {/* Right: Institutional Accreditation Credentials */}
          <div
            style={{
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.96) 0%, rgba(240, 248, 255, 0.92) 100%)',
              border: '1px solid rgba(23, 105, 224, 0.22)',
              borderRadius: '24px',
              padding: '1.85rem',
              boxShadow: '0 12px 36px rgba(23, 105, 224, 0.08), inset 0 0 20px rgba(0, 153, 184, 0.03)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Corner IC marker */}
            <div style={{ position: 'absolute', top: 0, right: '24px', width: '20px', height: '4px', background: '#1769e0', borderRadius: '0 0 4px 4px' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'rgba(23, 105, 224, 0.08)',
                  border: '1px solid rgba(23, 105, 224, 0.22)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-blue)',
                  boxShadow: '0 2px 10px rgba(23, 105, 224, 0.1)',
                }}
              >
                <Building2 size={22} />
              </div>
              <div>
                <div style={{ fontSize: '1.02rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.01em' }}>
                  Adhiparasakthi Engineering College
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--primary-blue)', fontFamily: 'var(--font-mono)' }}>
                  MELMARUVATHUR – 603319 // TAMIL NADU
                </div>
              </div>
            </div>

            <div
              style={{
                fontSize: '0.86rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <CheckCircle2 size={16} color="#1769e0" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span><strong style={{ color: 'var(--text-main)' }}>An Autonomous Institution</strong> under Anna University</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <CheckCircle2 size={16} color="#0099b8" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span>Approved by <strong style={{ color: 'var(--text-main)' }}>AICTE, New Delhi</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <CheckCircle2 size={16} color="#6c4dff" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span>Affiliated to <strong style={{ color: 'var(--text-main)' }}>Anna University, Chennai</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <CheckCircle2 size={16} color="#059669" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span>Accredited by <strong style={{ color: 'var(--text-main)' }}>NAAC with “A” Grade</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <CheckCircle2 size={16} color="#a855f7" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span>An <strong style={{ color: 'var(--text-main)' }}>ISO 9001:2015</strong> Certified Institution</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Interactive Feature Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.75rem',
        }}
      >
        {pillars.map((item) => {
          const IconComp = item.icon;
          return (
            <div
              key={item.num}
              className="glass-card"
              style={{
                padding: '2.2rem 1.8rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.4rem',
                      fontWeight: 800,
                      color: item.color,
                      opacity: 0.9,
                    }}
                  >
                    {item.num}
                  </div>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '14px',
                      background: item.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: item.color,
                      border: `1px solid ${item.color}30`,
                    }}
                  >
                    <IconComp size={22} />
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    letterSpacing: '-0.01em',
                    color: 'var(--text-main)',
                    marginBottom: '0.45rem',
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.96rem',
                    fontWeight: 600,
                    color: item.color,
                    marginBottom: '0.85rem',
                  }}
                >
                  {item.subtitle}
                </p>

                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                  }}
                >
                  {item.desc}
                </p>
              </div>

              <div
                style={{
                  marginTop: '1.5rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(23, 105, 224, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  color: item.color,
                }}
              >
                <span>PILLAR FOCUS</span>
                <ChevronRight size={14} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
