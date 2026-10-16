import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Coffee,
  Award,
  AlertTriangle
} from 'lucide-react';
import Schedule from '../components/Schedule';

export default function AgendaPage() {
  return (
    <div className="page-transition" style={{ paddingTop: '5.5rem' }}>
      {/* Page Title Header */}
      <div className="section" style={{ paddingBottom: '0.5rem', paddingTop: '1.5rem' }}>
        <div className="section-header" style={{ marginBottom: '1rem' }}>
          <div className="section-pill">
            <Calendar size={14} />
            <span>SYMPOSIUM DAY ITINERARY</span>
          </div>
          <h1 className="section-title">
            EVENT <span className="gradient-text">AGENDA</span>
          </h1>
          <p className="section-subtitle">
            A comprehensive schedule of events, inaugurations, technical rounds, dining breaks, and valediction.
          </p>
        </div>
      </div>

      {/* Main Schedule Timeline */}
      <Schedule />

      {/* Delegate Schedule Guide */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
            <Clock size={22} color="var(--primary-blue)" />
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Important Schedule Notes for Delegates
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            <div
              style={{
                padding: '1.25rem',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(23, 105, 224, 0.12)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', color: 'var(--primary-blue)', fontWeight: 800 }}>
                <Clock size={16} />
                <span>08:40 AM Sharp Reporting</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                Participants are requested to report at APEC Central Library Reception desk by 08:40 AM for QR check-in, event confirmation, and kit collection.
              </p>
            </div>

            <div
              style={{
                padding: '1.25rem',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(16, 185, 129, 0.15)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', color: '#059669', fontWeight: 800 }}>
                <Coffee size={16} />
                <span>Buffet Dining & Refreshments</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                Morning tea and snacks, sumptuous vegetarian/non-vegetarian lunch buffet, and high tea are arranged for all registered badge holders.
              </p>
            </div>

            <div
              style={{
                padding: '1.25rem',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(108, 77, 255, 0.15)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', color: '#6c4dff', fontWeight: 800 }}>
                <Award size={16} />
                <span>Valedictory & Awards (03:35 PM)</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                Prizes, cash awards, certificates, and trophies will be handed over by College Management and Department Heads during the closing ceremony.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary">
              <span>REGISTER FOR CHANNEL 2K27</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/venue" className="btn btn-secondary">
              <span>GET DIRECTIONS TO VENUE</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
