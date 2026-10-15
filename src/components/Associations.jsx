import React from 'react';
import { Cpu, Radio, Network, Lightbulb, Shield, Award } from 'lucide-react';

const partners = [
  {
    name: 'IEEE',
    tagline: 'Advancing Technology for Humanity',
    badge: 'GLOBAL AFFILIATION',
    iconColor: '#00629B',
    accent: '#00B8D9',
    svgType: 'ieee',
  },
  {
    name: 'IEEE ComSoc',
    tagline: 'IEEE Communications Society',
    badge: 'TECHNICAL SOCIETY',
    iconColor: '#1769E0',
    accent: '#6C4DFF',
    svgType: 'comsoc',
  },
  {
    name: 'IEEE APEC SB',
    tagline: 'Adhiparasakthi Student Branch',
    badge: 'STUDENT CHAPTER',
    iconColor: '#00B8D9',
    accent: '#1769E0',
    svgType: 'sb',
  },
  {
    name: 'IIC – MoE',
    tagline: "Institution's Innovation Council",
    badge: 'INNOVATION CELL',
    iconColor: '#FF6B00',
    accent: '#E94EFF',
    svgType: 'iic',
  },
  {
    name: 'S.E.C.E.',
    tagline: 'Society of ECE, APEC',
    badge: 'ORGANIZING HOST',
    iconColor: '#6C4DFF',
    accent: '#00B8D9',
    svgType: 'sece',
  },
];

export default function Associations() {
  return (
    <section
      id="associations"
      style={{
        padding: '3rem 1.5rem',
        maxWidth: '1240px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div
        style={{
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-light)',
            letterSpacing: '0.14em',
            fontWeight: 700,
            textTransform: 'uppercase',
          }}
        >
          // IN COLLABORATION WITH LEADING TECHNICAL ASSOCIATIONS
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="glass-card"
            style={{
              padding: '1.5rem 1.25rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              borderRadius: '20px',
              border: '1px solid rgba(23, 105, 224, 0.12)',
            }}
          >
            {/* Logo Emblem Icon */}
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: `linear-gradient(135deg, ${partner.iconColor}15, ${partner.accent}20)`,
                border: `1.5px solid ${partner.iconColor}35`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                boxShadow: `0 4px 14px ${partner.iconColor}18`,
              }}
            >
              {partner.svgType === 'ieee' && (
                <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
                  <path d="M20 4L34 20L20 36L6 20L20 4Z" stroke={partner.iconColor} strokeWidth="2.5" />
                  <path d="M20 10V30M13 20H27" stroke={partner.iconColor} strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="20" cy="20" r="3" fill={partner.accent} />
                </svg>
              )}
              {partner.svgType === 'comsoc' && <Radio size={26} color={partner.iconColor} />}
              {partner.svgType === 'sb' && <Network size={26} color={partner.iconColor} />}
              {partner.svgType === 'iic' && <Lightbulb size={26} color={partner.iconColor} />}
              {partner.svgType === 'sece' && <Cpu size={26} color={partner.iconColor} />}
            </div>

            <div
              style={{
                fontSize: '0.62rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: partner.accent,
                letterSpacing: '0.08em',
                marginBottom: '0.25rem',
              }}
            >
              {partner.badge}
            </div>

            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.05rem',
                fontWeight: 800,
                color: 'var(--text-main)',
                marginBottom: '0.2rem',
              }}
            >
              {partner.name}
            </div>

            <div
              style={{
                fontSize: '0.74rem',
                color: 'var(--text-muted)',
                lineHeight: 1.35,
              }}
            >
              {partner.tagline}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
