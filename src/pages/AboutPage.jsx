import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  ArrowRight,
  GraduationCap,
  BookOpen
} from 'lucide-react';
import About from '../components/About';
import Associations from '../components/Associations';

export default function AboutPage() {
  return (
    <div className="page-transition" style={{ paddingTop: '4rem' }}>
      {/* Main About Component */}
      <About />

      {/* Institutional Highlights Grid */}
      <section className="section" style={{ paddingTop: '1rem', paddingBottom: '4rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.75rem',
            marginBottom: '3rem',
          }}
        >
          <div
            className="glass-card"
            style={{
              padding: '2rem',
              borderRadius: '22px',
              border: '1.5px solid rgba(23, 105, 224, 0.15)',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(23, 105, 224, 0.1)',
                color: 'var(--primary-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <GraduationCap size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.6rem' }}>
              About S.E.C.E.
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              The Society of Electronics and Communication Engineering (S.E.C.E.) is the premier student and faculty body at APEC, committed to cultivating cutting-edge technical expertise, research aptitude, and industry-aligned skillsets through national symposiums, hackathons, and technical workshops.
            </p>
          </div>

          <div
            className="glass-card"
            style={{
              padding: '2rem',
              borderRadius: '22px',
              border: '1.5px solid rgba(0, 153, 184, 0.15)',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(0, 153, 184, 0.1)',
                color: 'var(--cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <Building2 size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.6rem' }}>
              Adhiparasakthi Engineering College
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Established in 1984 under the benevolent guidance of Arulthiru Bangaru Adigalar, APEC is an Autonomous Institution accredited by NAAC with 'A' Grade, approved by AICTE, and permanently affiliated to Anna University, Chennai.
            </p>
          </div>

          <div
            className="glass-card"
            style={{
              padding: '2rem',
              borderRadius: '22px',
              border: '1.5px solid rgba(108, 77, 255, 0.15)',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(108, 77, 255, 0.1)',
                color: 'var(--violet)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <Award size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.6rem' }}>
              Purpose of the Symposium
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              CHANNEL 2K27 bridges theoretical concepts with real-world application. It offers aspiring engineers a high-visibility competitive stage to present original research, troubleshoot complex circuits, foster inter-collegiate fellowship, and win recognized accolades.
            </p>
          </div>
        </div>

        {/* Action Callout */}
        <div
          className="glass-card"
          style={{
            padding: '2.5rem',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(23, 105, 224, 0.05) 0%, rgba(108, 77, 255, 0.05) 100%)',
            border: '1px solid rgba(23, 105, 224, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              Explore the Competitive Events
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
              Check out the technical presentation tracks, debugging challenges, and strategic games.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
            <Link to="/events" className="btn btn-primary">
              <span>View Events</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/register" className="btn btn-secondary">
              <span>Register Now</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Collaborating Professional Bodies */}
      <Associations />
    </div>
  );
}
