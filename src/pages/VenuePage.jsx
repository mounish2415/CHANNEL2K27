import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Building2, 
  CheckCircle2, 
  Compass,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import Venue from '../components/Venue';

export default function VenuePage() {
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=12.436921,79.821985';

  return (
    <div className="page-transition" style={{ paddingTop: '4rem' }}>
      {/* Main Venue Component */}
      <Venue />

      {/* Campus Facility & Arrival Checklist */}
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
            <Building2 size={22} color="var(--primary-blue)" />
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Campus Facilities & Delegate Logistics
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
                background: 'rgba(255, 255, 255, 0.85)',
                border: '1px solid rgba(23, 105, 224, 0.12)',
              }}
            >
              <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--primary-blue)' }}>
                🚗 Free Campus Parking
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                Designated safe two-wheeler and four-wheeler parking bays are available right beside the Main Administrative Block and Central Library entrance.
              </p>
            </div>

            <div
              style={{
                padding: '1.25rem',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.85)',
                border: '1px solid rgba(0, 153, 184, 0.15)',
              }}
            >
              <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.4rem', color: 'var(--cyan)' }}>
                📶 High-Speed Campus Wi-Fi
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                High-speed wireless internet access will be available inside the APEC Central Library auditorium and computer labs for competition participants.
              </p>
            </div>

            <div
              style={{
                padding: '1.25rem',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.85)',
                border: '1px solid rgba(16, 185, 129, 0.15)',
              }}
            >
              <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.4rem', color: '#059669' }}>
                🧳 Help Desk & Luggage Cloakroom
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                Outstation delegates traveling by train/bus can safely deposit travel bags and luggage at our volunteer-managed Reception Cloakroom.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <Navigation size={18} />
              <span>OPEN GOOGLE MAPS NAVIGATION</span>
              <ExternalLink size={16} />
            </a>
            <Link to="/register" className="btn btn-secondary">
              <span>REGISTER FOR PASS</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
