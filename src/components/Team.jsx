import React, { useState } from 'react';
import { Phone, MessageCircle, Users, Shield, Cpu, BookOpen, Coffee, Sparkles, Mic, ClipboardCheck, Radio, GraduationCap, Award } from 'lucide-react';

const coreTeam = [
  {
    role: 'Head of the Department',
    name: 'Mr. S. Prakash',
    designation: 'Assistant Professor & HOD – Department of ECE',
    category: 'DEPARTMENT LEADERSHIP',
    badgeColor: '#6c4dff',
    avatarText: 'SP',
    email: 'hod.ece@apec.edu.in',
  },
  {
    role: 'Convener – SECE',
    name: 'Mr. P. Vedasundaravinayagam',
    designation: 'Assistant Professor – Department of ECE',
    phone: '+91 9944802235',
    cleanPhone: '919944802235',
    email: 'vedasundaram@apec.edu.in',
    category: 'FACULTY COORDINATOR',
    badgeColor: '#1769e0',
    avatarText: 'PV',
  },
  {
    role: 'Student Secretary',
    name: 'MOUNISHKUMAR S',
    designation: 'Final Year – Department of ECE',
    phone: '+91 9342620698',
    cleanPhone: '919342620698',
    email: 'mounishkumar.ece@apec.edu.in',
    category: 'STUDENT LEADERSHIP',
    badgeColor: '#00b8d9',
    avatarText: 'MS',
  },
];

const facultyCommittees = [
  {
    name: 'TECHNICAL & NON TECHNICAL',
    tagline: 'Events Architecture, Judging & Challenge Tracks',
    category: 'EVENTS',
    accent: '#6c4dff',
    icon: Cpu,
    facultyMembers: [
      {
        name: 'Mrs. A. Aishwarya',
        designation: 'Assistant Professor – Department of ECE',
        role: 'Faculty In-Charge',
      },
    ],
    studentMembers: [
      {
        name: 'E. Dheenadhayalan',
        year: 'IV Year – Department of ECE',
        role: 'Student In-Charge',
      },
      {
        name: 'J. Shourathbee',
        year: 'IV Year – Department of ECE',
        role: 'Student In-Charge',
      },
    ],
  },
  {
    name: 'EDITORIAL & CORRESPONDENCE',
    tagline: 'Publications, Documentation & Communications',
    category: 'EDITORIAL',
    accent: '#00b8d9',
    icon: BookOpen,
    facultyMembers: [
      {
        name: 'Mr. B. Elango',
        designation: 'Assistant Professor – Department of ECE',
        role: 'Faculty In-Charge',
      },
    ],
    studentMembers: [
      {
        name: 'Mounishkumar S',
        year: 'Final Year – Department of ECE',
        role: 'Student In-Charge',
      },
      {
        name: 'Prabakaran. M',
        year: 'Final Year – Department of ECE',
        role: 'Student In-Charge',
      },
    ],
  },
  {
    name: 'EXECUTIVE COMMITTEE',
    tagline: 'Overall Operations & Strategic Guidance',
    category: 'EXECUTIVE',
    accent: '#1769e0',
    icon: Shield,
    facultyMembers: [
      {
        name: 'Dr. M. Malathi',
        designation: 'Professor – Department of ECE',
        role: 'Faculty In-Charge',
      },
      {
        name: 'Mr. S. Prakash',
        designation: 'Assistant Professor & HOD – Department of ECE',
        role: 'Faculty In-Charge',
      },
      {
        name: 'Mrs. V. Vidhyalakshmi',
        designation: 'LAB Assistant – Department of ECE',
        role: 'Staff In-Charge',
      },
    ],
    studentMembers: [
      {
        name: 'S. Kowsalayadevi',
        year: 'Final Year – Department of ECE',
        role: 'Student In-Charge',
      },
    ],
  },
  {
    name: 'FOOD',
    tagline: 'Delegate Dining & Refreshment Coordination',
    category: 'HOSPITALITY',
    accent: '#10b981',
    icon: Coffee,
    facultyMembers: [
      {
        name: 'Mr. K. Mathivanan',
        designation: 'Assistant Professor – Department of ECE',
        role: 'Faculty In-Charge',
      },
      {
        name: 'Mr. P. Vedasundaravinayagam',
        designation: 'Assistant Professor – Department of ECE',
        role: 'Faculty In-Charge',
      },
      {
        name: 'Mr. M. Subramanian',
        designation: 'LAB Assistant – Department of ECE',
        role: 'Staff In-Charge',
      },
    ],
    studentMembers: [
      {
        name: 'Balaji. S',
        year: 'Final Year – Department of ECE',
        role: 'Student In-Charge',
      },
    ],
  },
  {
    name: 'DECORATION & RECEPTION',
    tagline: 'Campus Ambience, Dignitary Welcome & Aesthetics',
    category: 'RECEPTION',
    accent: '#e94eff',
    icon: Sparkles,
    facultyMembers: [
      {
        name: 'Mrs. R. Ramya Devi',
        designation: 'Assistant Professor – Department of ECE',
        role: 'Faculty In-Charge',
      },
    ],
    studentMembers: [
      {
        name: 'A. Hanisha',
        year: 'Final Year – Department of ECE',
        role: 'Student In-Charge',
      },
    ],
  },
  {
    name: 'PUBLIC ADDRESSING',
    tagline: 'Audio-Visual Infrastructure, Acoustics & Stage Systems',
    category: 'SYSTEMS',
    accent: '#f59e0b',
    icon: Mic,
    facultyMembers: [
      {
        name: 'Mr. H. Arivazhagan',
        designation: 'Assistant Professor – Department of ECE',
        role: 'Faculty In-Charge',
      },
    ],
    studentMembers: [
      {
        name: 'Arunkumar .M',
        year: 'Final Year – Department of ECE',
        role: 'Student In-Charge',
      },
    ],
  },
  {
    name: 'REGISTRATION',
    tagline: 'Participant Verification, Welcome Desk & Kits',
    category: 'REGISTRATION',
    accent: '#0284c7',
    icon: ClipboardCheck,
    facultyMembers: [
      {
        name: 'Mrs. J. Suganya',
        designation: 'Assistant Professor – Department of ECE',
        role: 'Faculty In-Charge',
      },
      {
        name: 'Mrs. Roobini',
        designation: 'LAB Assistant – Department of ECE',
        role: 'Staff In-Charge',
      },
    ],
    studentMembers: [
      {
        name: 'K. Gayathri',
        year: 'Final Year – Department of ECE',
        role: 'Student In-Charge',
      },
    ],
  },
  {
    name: 'COMPERING',
    tagline: 'Stage Anchoring, Protocols & Ceremony Moderation',
    category: 'CEREMONIAL',
    accent: '#8b5cf6',
    icon: Radio,
    facultyMembers: [
      {
        name: 'Dr. P. Thirumaraiselvan',
        designation: 'Professor – Department of ECE',
        role: 'Faculty In-Charge',
      },
      {
        name: 'Dr. G. Vasanthi',
        designation: 'Professor – Department of ECE',
        role: 'Faculty In-Charge',
      },
    ],
    studentMembers: [
      {
        name: 'S. Poovitha',
        year: 'Final Year – Department of ECE',
        role: 'Student In-Charge',
      },
    ],
  },
];

function getInitials(name) {
  const clean = name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s*/i, '').trim();
  const parts = clean.split(/[\s.]+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase();
}

export default function Team() {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredCommittees = activeFilter === 'ALL'
    ? facultyCommittees
    : facultyCommittees.filter((c) => c.category === activeFilter);

  return (
    <section id="team" className="section" style={{ position: 'relative', zIndex: 2 }}>
      <div className="section-header">
        <div className="section-pill">
          <Users size={14} />
          <span>ORGANIZING COMMITTEE</span>
        </div>
        <h2 className="section-title">
          SYMPOSIUM <span className="gradient-text">COMMITTEE</span>
        </h2>
        <p className="section-subtitle">
          Department leadership, dedicated faculty coordinators, staff members, and student in-charges of the Society of Electronics and Communication Engineering (S.E.C.E.).
        </p>
      </div>

      {/* Primary Leadership Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          maxWidth: '1100px',
          margin: '0 auto 3.5rem auto',
        }}
      >
        {coreTeam.map((member) => (
          <div
            key={member.name}
            className="glass-card"
            style={{
              padding: '2.2rem 1.8rem',
              borderRadius: '26px',
              border: `1.5px solid ${member.badgeColor}35`,
              boxShadow: `0 16px 36px ${member.badgeColor}15`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              {/* Top Role Badge */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.4rem',
                }}
              >
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: member.badgeColor,
                    background: `${member.badgeColor}12`,
                    padding: '0.3rem 0.75rem',
                    borderRadius: '6px',
                    border: `1px solid ${member.badgeColor}30`,
                  }}
                >
                  {member.category}
                </span>

                <span className="pulsing-node" style={{ background: member.badgeColor }} />
              </div>

              {/* Avatar Initial Circle */}
              <div
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '20px',
                  background: `linear-gradient(135deg, ${member.badgeColor}20, ${member.badgeColor}40)`,
                  border: `2px solid ${member.badgeColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  color: member.badgeColor,
                  marginBottom: '1.2rem',
                  boxShadow: `0 8px 20px ${member.badgeColor}25`,
                }}
              >
                {member.avatarText}
              </div>

              <div
                style={{
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  color: member.badgeColor,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '0.3rem',
                }}
              >
                {member.role}
              </div>

              <h3
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-main)',
                  marginBottom: '0.35rem',
                }}
              >
                {member.name}
              </h3>

              <p
                style={{
                  fontSize: '0.88rem',
                  color: 'var(--text-muted)',
                  fontWeight: 500,
                  marginBottom: member.phone ? '1.5rem' : '0.5rem',
                }}
              >
                {member.designation}
              </p>
            </div>

            {/* Direct Contact Actions (if phone is provided) */}
            {member.phone && (
              <div
                style={{
                  paddingTop: '1.25rem',
                  borderTop: '1px solid rgba(23, 105, 224, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <a
                    href={`tel:${member.cleanPhone}`}
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1, textDecoration: 'none' }}
                  >
                    <Phone size={15} color={member.badgeColor} />
                    <span>Call</span>
                  </a>

                  <a
                    href={`https://wa.me/${member.cleanPhone}?text=Hello%20${encodeURIComponent(member.name)}%2C%20regarding%20CHANNEL%202K27%20Symposium.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1, textDecoration: 'none', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)' }}
                  >
                    <MessageCircle size={15} color="#10b981" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <div
                  style={{
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-main)',
                    textAlign: 'center',
                    fontWeight: 700,
                  }}
                >
                  {member.phone}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ================= COMMITTEES (FACULTY & STUDENT IN-CHARGES) ================= */}
      <div>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.74rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              color: 'var(--primary-blue)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              background: 'rgba(23, 105, 224, 0.08)',
              padding: '0.4rem 1rem',
              borderRadius: '9999px',
              border: '1px solid rgba(23, 105, 224, 0.18)',
              marginBottom: '0.75rem',
            }}
          >
            <Shield size={14} />
            <span>FACULTY & STUDENT IN-CHARGES</span>
          </div>

          <h3
            style={{
              fontSize: '1.85rem',
              fontWeight: 900,
              color: 'var(--text-main)',
              letterSpacing: '-0.02em',
              marginBottom: '0.5rem',
            }}
          >
            SYMPOSIUM <span className="gradient-text">COMMITTEES</span>
          </h3>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto' }}>
            Collaborative committees pairing our faculty coordinators with student leadership to ensure seamless symposium execution.
          </p>

          {/* Filter Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '1.4rem',
            }}
          >
            {['ALL', 'EXECUTIVE', 'EVENTS', 'EDITORIAL', 'HOSPITALITY', 'RECEPTION', 'SYSTEMS', 'REGISTRATION', 'CEREMONIAL'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  padding: '0.35rem 0.95rem',
                  borderRadius: '9999px',
                  border: activeFilter === cat ? '1px solid var(--primary-blue)' : '1px solid rgba(23, 105, 224, 0.18)',
                  background: activeFilter === cat ? 'var(--grad-tech)' : '#ffffff',
                  color: activeFilter === cat ? '#ffffff' : 'var(--text-main)',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: activeFilter === cat ? '0 4px 14px rgba(23, 105, 224, 0.25)' : 'none',
                }}
              >
                {cat === 'ALL' ? 'ALL COMMITTEES' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Committees Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.75rem',
            maxWidth: '1240px',
            margin: '0 auto',
          }}
        >
          {filteredCommittees.map((c) => {
            const IconComponent = c.icon;
            return (
              <div
                key={c.name}
                className="glass-card"
                style={{
                  padding: '1.8rem 1.6rem',
                  borderRadius: '22px',
                  borderTop: `4px solid ${c.accent}`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 10px 30px rgba(23, 105, 224, 0.06)',
                }}
              >
                <div>
                  {/* Committee Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: `${c.accent}15`,
                        color: c.accent,
                        border: `1.5px solid ${c.accent}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <IconComponent size={20} />
                    </div>

                    <div>
                      <h4
                        style={{
                          fontSize: '1.05rem',
                          fontWeight: 800,
                          color: 'var(--text-main)',
                          letterSpacing: '-0.01em',
                          lineHeight: 1.25,
                        }}
                      >
                        {c.name}
                      </h4>
                      <div
                        style={{
                          fontSize: '0.72rem',
                          color: 'var(--text-light)',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 600,
                        }}
                      >
                        {c.tagline}
                      </div>
                    </div>
                  </div>

                  {/* Section 1: Faculty / Staff In-Charge */}
                  <div style={{ marginBottom: '1.2rem' }}>
                    <div
                      style={{
                        fontSize: '0.68rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        color: 'var(--primary-blue)',
                        textTransform: 'uppercase',
                        marginBottom: '0.6rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      <Award size={13} color="var(--primary-blue)" />
                      <span>FACULTY / STAFF IN-CHARGE</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {c.facultyMembers.map((m, idx) => {
                        const initials = getInitials(m.name);
                        return (
                          <div
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.75rem',
                              padding: '0.65rem 0.8rem',
                              background: 'rgba(248, 252, 255, 0.85)',
                              borderRadius: '12px',
                              border: '1px solid rgba(23, 105, 224, 0.12)',
                            }}
                          >
                            <div
                              style={{
                                width: '34px',
                                height: '34px',
                                borderRadius: '9px',
                                background: `linear-gradient(135deg, ${c.accent}18, ${c.accent}30)`,
                                border: `1px solid ${c.accent}40`,
                                color: c.accent,
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 800,
                                fontSize: '0.8rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              {initials}
                            </div>

                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div
                                style={{
                                  fontSize: '0.92rem',
                                  fontWeight: 800,
                                  color: 'var(--text-main)',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                {m.name}
                              </div>
                              <div
                                style={{
                                  fontSize: '0.72rem',
                                  color: 'var(--text-muted)',
                                  fontWeight: 600,
                                }}
                              >
                                {m.designation}
                              </div>
                            </div>

                            <span
                              style={{
                                fontSize: '0.62rem',
                                fontFamily: 'var(--font-mono)',
                                fontWeight: 700,
                                padding: '0.2rem 0.45rem',
                                borderRadius: '5px',
                                background: m.role.includes('Staff') ? 'rgba(16, 185, 129, 0.12)' : `${c.accent}12`,
                                color: m.role.includes('Staff') ? '#10b981' : c.accent,
                                border: `1px solid ${m.role.includes('Staff') ? '#10b98130' : `${c.accent}25`}`,
                                flexShrink: 0,
                              }}
                            >
                              {m.role}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section 2: Student In-Charge */}
                  {c.studentMembers && c.studentMembers.length > 0 && (
                    <div
                      style={{
                        paddingTop: '0.9rem',
                        borderTop: '1px dashed rgba(23, 105, 224, 0.15)',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.68rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 800,
                          letterSpacing: '0.08em',
                          color: '#00b8d9',
                          textTransform: 'uppercase',
                          marginBottom: '0.6rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                        }}
                      >
                        <GraduationCap size={14} color="#00b8d9" />
                        <span>STUDENT IN-CHARGE</span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                        {c.studentMembers.map((sm, sIdx) => {
                          const sInitials = getInitials(sm.name);
                          return (
                            <div
                              key={sIdx}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.65rem 0.8rem',
                                background: 'rgba(240, 253, 250, 0.75)',
                                borderRadius: '12px',
                                border: '1px solid rgba(0, 184, 217, 0.18)',
                              }}
                            >
                              <div
                                style={{
                                  width: '34px',
                                  height: '34px',
                                  borderRadius: '9px',
                                  background: 'rgba(0, 184, 217, 0.15)',
                                  border: '1px solid rgba(0, 184, 217, 0.35)',
                                  color: '#0099b8',
                                  fontFamily: 'var(--font-heading)',
                                  fontWeight: 800,
                                  fontSize: '0.8rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                }}
                              >
                                {sInitials}
                              </div>

                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div
                                  style={{
                                    fontSize: '0.92rem',
                                    fontWeight: 800,
                                    color: 'var(--text-main)',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                  }}
                                >
                                  {sm.name}
                                </div>
                                <div
                                  style={{
                                    fontSize: '0.72rem',
                                    color: 'var(--text-muted)',
                                    fontWeight: 600,
                                  }}
                                >
                                  {sm.year}
                                </div>
                              </div>

                              <span
                                style={{
                                  fontSize: '0.62rem',
                                  fontFamily: 'var(--font-mono)',
                                  fontWeight: 700,
                                  padding: '0.2rem 0.45rem',
                                  borderRadius: '5px',
                                  background: 'rgba(0, 184, 217, 0.12)',
                                  color: '#0099b8',
                                  border: '1px solid rgba(0, 184, 217, 0.25)',
                                  flexShrink: 0,
                                }}
                              >
                                {sm.role}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
