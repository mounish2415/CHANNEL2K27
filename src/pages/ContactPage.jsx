import React from 'react';
import { 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  MessageCircle,
  Building,
  UserCheck,
  ShieldCheck,
  Award,
  Navigation
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { REGISTRATION_URL } from '../data/registrationConfig';

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

export default function ContactPage() {
  const keyContacts = [
    {
      role: 'Head of the Department',
      name: 'Mr. S. Prakash',
      dept: 'Assistant Professor & HOD – Department of ECE',
      phone: null,
      accent: '#6c4dff',
      badge: 'DEPARTMENT LEAD',
    },
    {
      role: 'Faculty Convener – SECE',
      name: 'Mr. P. Vedasundaravinayagam',
      dept: 'Assistant Professor – Department of ECE',
      phone: '+91 9944802235',
      cleanPhone: '919944802235',
      accent: '#1769e0',
      badge: 'FACULTY HELPLINE',
    },
    {
      role: 'Student Secretary',
      name: 'MOUNISHKUMAR S',
      dept: 'Final Year – Department of ECE',
      phone: '+91 9342620698',
      cleanPhone: '919342620698',
      accent: '#00b8d9',
      badge: 'STUDENT HELPLINE',
    },
  ];

  const socialLinks = [
    {
      name: 'Official WhatsApp Group',
      handle: 'Join Delegate Community',
      url: 'https://chat.whatsapp.com/HwMAd6Nx5rc4rnop4RMbtw',
      icon: WhatsAppIcon,
      color: '#25D366',
    },
    {
      name: 'Instagram',
      handle: '@apec1984',
      url: 'https://instagram.com/apec1984',
      icon: InstagramIcon,
      color: '#e1306c',
    },
    {
      name: 'Facebook',
      handle: '/apec1984',
      url: 'https://facebook.com/apec1984',
      icon: FacebookIcon,
      color: '#1877f2',
    },
    {
      name: 'YouTube Channel',
      handle: '@apec1984',
      url: 'https://youtube.com/@apec1984',
      icon: YoutubeIcon,
      color: '#ff0000',
    },
    {
      name: 'X (Twitter)',
      handle: '@Apec1984',
      url: 'https://x.com/Apec1984',
      icon: TwitterIcon,
      color: '#1da1f2',
    },
    {
      name: 'APEC Official Portal',
      handle: 'apec.edu.in',
      url: 'https://apec.edu.in',
      icon: Globe,
      color: '#00b8d9',
    },
  ];

  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=12.436921,79.821985';

  return (
    <div className="page-transition" style={{ paddingTop: '5.5rem' }}>
      {/* Page Title Header */}
      <div className="section" style={{ paddingBottom: '1.5rem', paddingTop: '1.5rem' }}>
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <div className="section-pill">
            <Phone size={14} />
            <span>COMMUNICATIONS & CONTACT DESK</span>
          </div>
          <h1 className="section-title">
            CONTACT <span className="gradient-text">US</span>
          </h1>
          <p className="section-subtitle">
            Get in touch with the CHANNEL 2K27 organizing committee, coordinators, and college administration.
          </p>
        </div>

        {/* Key Coordinators Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.75rem',
            marginBottom: '3rem',
          }}
        >
          {keyContacts.map((contact, idx) => (
            <div
              key={idx}
              className="glass-card hover-glow"
              style={{
                padding: '2rem',
                borderRadius: '24px',
                border: '1.5px solid rgba(23, 105, 224, 0.16)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      color: contact.accent,
                      background: `${contact.accent}15`,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '8px',
                    }}
                  >
                    {contact.badge}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
                    {contact.role}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  {contact.name}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  {contact.dept}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {contact.phone && (
                  <a
                    href={`tel:${contact.cleanPhone}`}
                    className="btn btn-secondary btn-sm"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      textDecoration: 'none',
                    }}
                  >
                    <Phone size={15} />
                    <span>Call: {contact.phone}</span>
                  </a>
                )}

                {contact.phone && (
                  <a
                    href={`https://wa.me/${contact.cleanPhone}?text=Hello%20${encodeURIComponent(contact.name)},%20I%20have%20an%20inquiry%20regarding%20CHANNEL%202K27%20symposium.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      textDecoration: 'none',
                      color: '#059669',
                      borderColor: 'rgba(16, 185, 129, 0.3)',
                    }}
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp Inquiry</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 2-Column: Social Channels & Campus Location Details */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}
        >
          {/* Social Media Links Card */}
          <div
            className="glass-card"
            style={{
              padding: '2.25rem',
              borderRadius: '24px',
              border: '1.5px solid rgba(23, 105, 224, 0.16)',
            }}
          >
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              Social Channels & Community
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Connect with our delegate community and stay updated with live announcements:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
              {socialLinks.map((s) => {
                const IconComp = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      textDecoration: 'none',
                      color: 'var(--text-main)',
                      padding: '0.75rem 0.95rem',
                      borderRadius: '14px',
                      background: 'rgba(255, 255, 255, 0.85)',
                      border: '1px solid rgba(23, 105, 224, 0.12)',
                      transition: 'transform 0.2s ease, border-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.borderColor = s.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'rgba(23, 105, 224, 0.12)';
                    }}
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: `${s.color}18`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: s.color,
                        flexShrink: 0,
                      }}
                    >
                      <IconComp />
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontSize: '0.86rem', fontWeight: 700, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                        {s.name}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-light)', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                        {s.handle}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* College Campus Address Card */}
          <div
            className="glass-card"
            style={{
              padding: '2.25rem',
              borderRadius: '24px',
              border: '1.5px solid rgba(23, 105, 224, 0.16)',
              background: 'linear-gradient(145deg, #ffffff 0%, #f6fbff 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', color: 'var(--primary-blue)' }}>
                <Building size={22} />
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  College Address & Venue
                </h4>
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                <strong style={{ color: 'var(--text-main)' }}>Adhiparasakthi Engineering College</strong>
                <br />
                Department of Electronics and Communication Engineering (S.E.C.E.)
                <br />
                SH 115, Melmaruvathur, Kancheepuram District,
                <br />
                Tamil Nadu – 603319, India.
                <br />
                <span style={{ fontSize: '0.84rem', color: 'var(--primary-blue)', fontWeight: 700, display: 'inline-block', marginTop: '0.4rem' }}>
                  📍 Venue for all events: APEC Central Library
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
                style={{ textDecoration: 'none' }}
              >
                <Navigation size={15} />
                <span>Get Directions</span>
                <ExternalLink size={12} />
              </a>

              <a
                href="https://apec.edu.in"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ textDecoration: 'none' }}
              >
                <Globe size={15} />
                <span>apec.edu.in</span>
                <ExternalLink size={12} />
              </a>

              <a
                href="mailto:events.ece.apec@gmail.com"
                className="btn btn-secondary btn-sm"
                style={{ textDecoration: 'none' }}
              >
                <Mail size={15} />
                <span>events.ece.apec@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quick Link to Google Form Registration */}
        <div
          className="glass-card"
          style={{
            padding: '2rem 2.5rem',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(23, 105, 224, 0.08) 100%)',
            border: '1.5px solid rgba(16, 185, 129, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: '#059669', fontWeight: 800, marginBottom: '0.35rem' }}>
              LOOKING TO REGISTER?
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
              Register for CHANNEL 2K27 Online
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Pass fee is ₹150. Access all technical & non-technical tracks, certificates, and dining.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary">
              <UserCheck size={16} />
              <span>Go to Registration Page</span>
            </Link>
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ textDecoration: 'none' }}
            >
              <span>Open Registration</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
