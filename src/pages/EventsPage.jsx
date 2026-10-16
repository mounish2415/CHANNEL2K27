import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, 
  Sparkles, 
  Award, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  MapPin,
  Calendar
} from 'lucide-react';
import Events from '../components/Events';

export default function EventsPage({ onOpenDetails }) {
  return (
    <div className="page-transition" style={{ paddingTop: '5.5rem' }}>
      {/* Page Title Header */}
      <div className="section" style={{ paddingBottom: '0.5rem', paddingTop: '1.5rem' }}>
        <div className="section-header" style={{ marginBottom: '1rem' }}>
          <div className="section-pill">
            <Cpu size={14} />
            <span>NATIONAL SYMPOSIUM TRACKS</span>
          </div>
          <h1 className="section-title">
            SYMPOSIUM <span className="gradient-text">EVENTS</span>
          </h1>
          <p className="section-subtitle">
            Compete across technical and non-technical challenges. All events take place at the <strong>APEC Central Library</strong> on November 4, 2026.
          </p>
        </div>

        {/* Global Event Notice Bar */}
        <div
          className="glass-card"
          style={{
            maxWidth: '920px',
            margin: '0 auto 2.5rem auto',
            padding: '1rem 1.5rem',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(23, 105, 224, 0.08) 0%, rgba(0, 153, 184, 0.08) 100%)',
            border: '1px solid rgba(23, 105, 224, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <MapPin size={20} color="var(--primary-blue)" />
            <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', fontWeight: 600 }}>
              <span>Official Event Venue: </span>
              <strong style={{ color: 'var(--primary-blue)' }}>APEC Central Library</strong>
              <span style={{ color: 'var(--text-muted)' }}> (All tracks & competitions)</span>
            </div>
          </div>
          <Link
            to="/register"
            className="btn btn-primary btn-sm"
            style={{ textDecoration: 'none' }}
          >
            <span>Register for Events (₹150)</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Events Listing Component (Technical & Non-Technical) */}
      <Events onOpenDetails={onOpenDetails} />

      {/* Rules & Guidelines Summary */}
      <section className="section" style={{ paddingTop: '1rem', paddingBottom: '4.5rem' }}>
        <div
          className="glass-card"
          style={{
            padding: '2.5rem',
            borderRadius: '24px',
            border: '1.5px solid rgba(23, 105, 224, 0.15)',
            background: 'linear-gradient(145deg, #ffffff 0%, #f6fbff 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
            <Award size={22} color="var(--primary-blue)" />
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
              General Rules & Recognition
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2rem',
            }}
          >
            {[
              { title: 'Pass Eligibility', text: 'A single ₹150 delegate pass permits entry to 1 Technical Event and 1 Non-Technical Event.' },
              { title: 'College ID Mandatory', text: 'All registered participants must carry a valid college identification card.' },
              { title: 'Cash Prizes & Trophies', text: 'Winners and runners-up in each event will receive cash prizes, merit certificates, and trophies.' },
              { title: 'Participation Certificate', text: 'Every verified participant will receive an authorized certificate accredited by Anna University.' },
            ].map((rule, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.2rem',
                  borderRadius: '14px',
                  background: 'rgba(255, 255, 255, 0.85)',
                  border: '1px solid rgba(23, 105, 224, 0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <CheckCircle2 size={16} color="#059669" />
                  <span style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-main)' }}>{rule.title}</span>
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{rule.text}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary btn-lg">
              <span>PROCEED TO REGISTRATION</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/agenda" className="btn btn-secondary btn-lg">
              <span>VIEW EVENT SCHEDULE</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
