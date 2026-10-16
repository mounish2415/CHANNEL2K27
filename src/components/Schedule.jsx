import React, { useState } from 'react';
import { Clock, Calendar } from 'lucide-react';

const agendaData = [
  {
    time: '08:40 AM',
    timeSlot: '08:40 AM – 09:30 AM',
    title: 'REGISTRATION AND WELCOME',
    subtitle: 'Participant Check-in, ID Verification and Welcome Kits',
    category: 'GENERAL',
    venue: 'Main Foyer & Reception Lobby',
    desc: 'Registration and welcome participant check-in, ID verification and welcome kits.',
    accent: '#1769e0',
  },
  {
    time: '09:30 AM',
    timeSlot: '09:30 AM – 10:30 AM',
    title: 'INAUGURATION CEREMONY',
    subtitle: 'Grand Opening & Keynote Session',
    category: 'CEREMONY',
    venue: 'Dr. V. Arunagiri Memorial Auditorium',
    desc: 'Inauguration ceremony with dignitaries, lamp lighting, and presidential address.',
    accent: '#00b8d9',
  },
  {
    time: '10:30 AM',
    timeSlot: '10:30 AM – 10:45 AM',
    title: 'TEA BREAK',
    subtitle: 'Morning Refreshments & Informal Networking',
    category: 'BREAK',
    venue: 'Auditorium Concourse',
    desc: 'Tea break, refreshments and networking.',
    accent: '#f59e0b',
  },
  {
    time: '10:45 AM',
    timeSlot: '10:45 AM – 12:20 PM',
    title: 'TECHNICAL EVENTS',
    subtitle: 'Thought Summit and DesignDash',
    category: 'TECHNICAL',
    venue: 'Hall A (Thought Summit) & Computing / Design Lab (DesignDash)',
    desc: 'Technical events track featuring Thought Summit (Paper & Innovation Presentation) and DesignDash (UI/UX Challenge).',
    accent: '#6c4dff',
  },
  {
    time: '12:20 PM',
    timeSlot: '12:20 PM – 01:20 PM',
    title: 'LUNCH BREAK',
    subtitle: 'Lunch and Networking',
    category: 'BREAK',
    venue: 'APEC Dining Complex & Innovation Arena',
    desc: 'Lunch break, buffet dining, peer networking, and student project interactions.',
    accent: '#10b981',
  },
  {
    time: '01:20 PM',
    timeSlot: '01:20 PM – 03:20 PM',
    title: 'NON-TECHNICAL EVENTS',
    subtitle: 'Meme Competition and Treasure Hunt',
    category: 'NON-TECHNICAL',
    venue: 'Seminar Hall 2 & Campus Grounds',
    desc: 'Non-technical events track featuring Meme Competition (Engineering Satire & Pop-Culture) and Treasure Hunt (Campus Mystery Decryption).',
    accent: '#e94eff',
  },
  {
    time: '03:20 PM',
    timeSlot: '03:20 PM – 03:35 PM',
    title: 'TEA BREAK',
    subtitle: 'Evening Refreshments',
    category: 'BREAK',
    venue: 'Auditorium Concourse',
    desc: 'Tea break and afternoon refreshments.',
    accent: '#f59e0b',
  },
  {
    time: '03:35 PM',
    timeSlot: '03:35 PM – 04:00 PM',
    title: 'VALEDICTORY CEREMONY',
    subtitle: 'Grand Prize Distribution & Valediction',
    category: 'CEREMONY',
    venue: 'Dr. V. Arunagiri Memorial Auditorium',
    desc: 'Valedictory ceremony, prize distribution for winners, shields, medals, and participation certificates.',
    accent: '#1769e0',
  },
  {
    time: '04:00 PM',
    timeSlot: '04:00 PM onwards',
    title: 'EVENT CONCLUSION',
    subtitle: 'Group Photographs and Departure',
    category: 'CEREMONY',
    venue: 'Auditorium & College Front Lawn',
    desc: 'Event conclusion, group photographs, official symposium closure, and departure.',
    accent: '#8b5cf6',
  },
];

export default function Schedule() {
  const [filterCategory, setFilterCategory] = useState('ALL');

  const filteredItems = filterCategory === 'ALL'
    ? agendaData
    : agendaData.filter((item) => item.category === filterCategory);

  return (
    <section id="agenda" className="section" style={{ position: 'relative', zIndex: 2 }}>
      {/* Anchor alias so #schedule links still scroll smoothly here */}
      <div id="schedule" style={{ position: 'absolute', top: '-100px' }} />

      <div className="section-header">
        <div className="section-pill">
          <Calendar size={14} />
          <span>OFFICIAL EVENT TIMELINE</span>
        </div>
        <h2 className="section-title">
          EVENT <span className="gradient-text">AGENDA</span>
        </h2>
        <p className="section-subtitle">
          Official timeline for CHANNEL 2K27 • Tuesday, November 3, 2026. Synchronized across all technical and non-technical venues.
        </p>

        {/* Filter Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.6rem',
            marginTop: '1.75rem',
          }}
        >
          {['ALL', 'CEREMONY', 'TECHNICAL', 'NON-TECHNICAL', 'BREAK'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              style={{
                padding: '0.45rem 1.15rem',
                borderRadius: '9999px',
                border: filterCategory === cat ? '1px solid var(--primary-blue)' : '1px solid rgba(23, 105, 224, 0.2)',
                background: filterCategory === cat ? 'var(--grad-tech)' : '#ffffff',
                color: filterCategory === cat ? '#ffffff' : 'var(--text-main)',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: filterCategory === cat ? '0 4px 16px rgba(23, 105, 224, 0.3)' : '0 2px 6px rgba(23, 105, 224, 0.05)',
                transition: 'all 0.25s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Circuit Timeline */}
      <div
        style={{
          maxWidth: '880px',
          margin: '0 auto',
          position: 'relative',
          padding: '1.5rem 0',
        }}
      >
        {/* Central Circuit Track (desktop) */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            bottom: '20px',
            left: '28px',
            width: '2px',
            background: 'linear-gradient(to bottom, #1769e0, #00b8d9, #6c4dff, #e94eff, #1769e0)',
            opacity: 0.7,
            boxShadow: '0 0 10px rgba(23, 105, 224, 0.4)',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              id={`agenda-${item.time.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.75rem',
              }}
            >
              {/* Circuit Node Indicator */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: '#ffffff',
                  border: `2px solid ${item.accent}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: `0 4px 16px ${item.accent}25`,
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: item.accent,
                    boxShadow: `0 0 10px ${item.accent}`,
                  }}
                />
              </div>

              {/* Event Schedule Card */}
              <div
                className="glass-card"
                style={{
                  flex: 1,
                  padding: '1.6rem 1.8rem',
                  borderRadius: '20px',
                  borderLeft: `4px solid ${item.accent}`,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.6rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.92rem',
                      fontWeight: 800,
                      color: item.accent,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      background: `${item.accent}12`,
                      padding: '0.3rem 0.7rem',
                      borderRadius: '8px',
                      border: `1px solid ${item.accent}25`,
                    }}
                  >
                    <Clock size={16} />
                    <span>{item.time}</span>
                    <span style={{ fontSize: '0.72rem', opacity: 0.8, fontWeight: 600 }}>({item.timeSlot})</span>
                  </div>

                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      padding: '0.2rem 0.65rem',
                      borderRadius: '6px',
                      background: `${item.accent}15`,
                      color: item.accent,
                      border: `1px solid ${item.accent}30`,
                    }}
                  >
                    {item.category}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '1.28rem',
                    fontWeight: 800,
                    color: 'var(--text-main)',
                    marginBottom: '0.25rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.title}
                </h3>

                {item.subtitle && (
                  <div
                    style={{
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      color: item.accent,
                      marginBottom: '0.45rem',
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    {item.subtitle}
                  </div>
                )}

                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.55,
                    marginBottom: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
