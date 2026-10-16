import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  Calendar, 
  Users, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Zap,
  Award
} from 'lucide-react';
import Hero from '../components/Hero';
import Countdown from '../components/Countdown';
import Associations from '../components/Associations';

export default function HomePage() {
  const quickHighlights = [
    {
      title: 'Technical & Non-Tech Events',
      tag: 'COMPETITIONS',
      desc: 'Thought Summit (Paper Presentation), DesignDash (Circuit Debugging), Skribbl.io, and Chess Tournament with ₹ Cash Prizes.',
      link: '/events',
      linkText: 'Explore Events',
      icon: Cpu,
      color: '#1769e0',
      bg: 'rgba(23, 105, 224, 0.08)',
    },
    {
      title: 'Full Day Event Agenda',
      tag: 'SCHEDULE',
      desc: 'Complete itinerary starting at 08:40 AM check-in, inauguration, concurrent morning tracks, buffet dining, and grand valediction.',
      link: '/agenda',
      linkText: 'View Schedule',
      icon: Calendar,
      color: '#0099b8',
      bg: 'rgba(0, 153, 184, 0.08)',
    },
    {
      title: 'Organizing Committee',
      tag: 'LEADERSHIP',
      desc: 'Mentored by HOD Mr. S. Prakash, Convener Mr. P. Vedasundaravinayagam, Student Secretary Mounishkumar S, and student coordinators.',
      link: '/team',
      linkText: 'Meet The Team',
      icon: Users,
      color: '#6c4dff',
      bg: 'rgba(108, 77, 255, 0.08)',
    },
    {
      title: 'APEC Central Library Venue',
      tag: 'LOCATION',
      desc: 'State-of-the-art air-conditioned digital learning infrastructure at Adhiparasakthi Engineering College, Melmaruvathur.',
      link: '/venue',
      linkText: 'Venue & Directions',
      icon: MapPin,
      color: '#059669',
      bg: 'rgba(5, 150, 105, 0.08)',
    },
  ];

  return (
    <div className="page-transition">
      {/* CHANNEL 2K27 Hero Section */}
      <Hero />

      {/* Live Event Countdown */}
      <Countdown />

      {/* Symposium Highlights Grid */}
      <section className="section" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
        <div className="section-header">
          <div className="section-pill">
            <Sparkles size={14} />
            <span>SYMPOSIUM AT A GLANCE</span>
          </div>
          <h2 className="section-title">
            ENGINEER YOUR <span className="gradient-text">FUTURE</span>
          </h2>
          <p className="section-subtitle">
            CHANNEL 2K27 unites bright engineering minds across colleges under the banner of S.E.C.E. Explore everything our national symposium offers.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
            marginBottom: '3.5rem',
          }}
        >
          {quickHighlights.map((item, index) => {
            const IconComp = item.icon;
            return (
              <div
                key={index}
                className="glass-card hover-glow"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '22px',
                  border: '1.5px solid rgba(23, 105, 224, 0.12)',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '14px',
                        background: item.bg,
                        color: item.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <IconComp size={24} />
                    </div>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800,
                        color: item.color,
                        letterSpacing: '0.08em',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '6px',
                        background: item.bg,
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      marginBottom: '0.65rem',
                      color: 'var(--text-main)',
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                      marginBottom: '1.5rem',
                    }}
                  >
                    {item.desc}
                  </p>
                </div>

                <Link
                  to={item.link}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: item.color,
                    textDecoration: 'none',
                    transition: 'gap 0.2s ease',
                  }}
                  className="quick-link-hover"
                >
                  <span>{item.linkText}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Delegate Pass Teaser Banner */}
        <div
          className="glass-card"
          style={{
            background: 'linear-gradient(135deg, rgba(23, 105, 224, 0.05) 0%, rgba(0, 153, 184, 0.08) 100%)',
            border: '1.5px solid rgba(23, 105, 224, 0.2)',
            borderRadius: '24px',
            padding: '2.5rem 2rem',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: '#059669',
                fontWeight: 800,
                marginBottom: '0.5rem',
              }}
            >
              <Award size={15} />
              <span>OFFICIAL REGISTRATION OPEN // ₹150 DELEGATE PASS</span>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              Ready to Showcase Your Technical Skills?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '640px' }}>
              One pass gives you access to 1 technical event, 1 non-technical event, buffet lunch, symposium kit, and verifiable certificates.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary">
              <span>Register Now</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/events" className="btn btn-secondary">
              <span>View Events</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Collaborating Professional Bodies */}
      <Associations />
    </div>
  );
}
