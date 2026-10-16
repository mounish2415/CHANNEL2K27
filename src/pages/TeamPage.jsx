import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Sparkles, 
  ShieldCheck, 
  Phone, 
  Mail, 
  ArrowRight 
} from 'lucide-react';
import Team from '../components/Team';

export default function TeamPage() {
  return (
    <div className="page-transition" style={{ paddingTop: '5.5rem' }}>
      {/* Page Title Header */}
      <div className="section" style={{ paddingBottom: '0.5rem', paddingTop: '1.5rem' }}>
        <div className="section-header" style={{ marginBottom: '1rem' }}>
          <div className="section-pill">
            <Users size={14} />
            <span>ORGANIZING BODY</span>
          </div>
          <h1 className="section-title">
            ORGANIZING <span className="gradient-text">COMMITTEE</span>
          </h1>
          <p className="section-subtitle">
            Meet the faculty patrons, conveners, student coordinators, and committee leads driving CHANNEL 2K27.
          </p>
        </div>
      </div>

      {/* Main Team Component */}
      <Team />

      {/* Support & Coordination Banner */}
      <section className="section" style={{ paddingTop: '1rem', paddingBottom: '4.5rem' }}>
        <div
          className="glass-card"
          style={{
            padding: '2.5rem',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(23, 105, 224, 0.05) 0%, rgba(0, 153, 184, 0.05) 100%)',
            border: '1.5px solid rgba(23, 105, 224, 0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              Have Questions for the Committee?
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
              Feel free to reach out to our Faculty Convener or Student Secretary for event clarifications.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary">
              <span>Contact Organizers</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/register" className="btn btn-secondary">
              <span>Register Now</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
