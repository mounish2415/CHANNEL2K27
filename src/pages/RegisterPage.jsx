import React, { useState } from 'react';
import { 
  UserCheck, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Phone, 
  Mail, 
  Send, 
  Printer, 
  RotateCcw,
  ShieldCheck,
  Building,
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  Check
} from 'lucide-react';
import { REGISTRATION_URL, REGISTRATION_DEADLINE_TEXT, REGISTRATION_FEE_AMOUNT } from '../data/registrationConfig';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    department: '',
    year: 'III Year',
    techEvent: 'Thought Summit (Paper Presentation)',
    nonTechEvent: 'Chess Tournament',
    needAccommodation: 'No',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedPass, setSubmittedPass] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (!formData.college.trim()) {
      newErrors.college = 'College/Institution name is required.';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department/Branch is required.';
    }

    if (!formData.year) {
      newErrors.year = 'Please select your current year of study.';
    }

    if (formData.techEvent === 'None' && formData.nonTechEvent === 'None') {
      newErrors.events = 'Please select at least one Technical or Non-Technical event.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate server / backend processing & persist to localStorage
    setTimeout(() => {
      const regId = `CH27-SEC-${Math.floor(10000 + Math.random() * 90000)}`;
      const timestamp = new Date().toISOString();
      const record = {
        id: regId,
        ...formData,
        timestamp,
        feeAmount: REGISTRATION_FEE_AMOUNT,
        status: 'CONFIRMED',
      };

      try {
        const existing = JSON.parse(localStorage.getItem('channel2k27_registrations') || '[]');
        existing.push(record);
        localStorage.setItem('channel2k27_registrations', JSON.stringify(existing));
      } catch (err) {
        console.error('Storage error:', err);
      }

      setSubmittedPass(record);
      setIsSubmitting(false);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      college: '',
      department: '',
      year: 'III Year',
      techEvent: 'Thought Summit (Paper Presentation)',
      nonTechEvent: 'Chess Tournament',
      needAccommodation: 'No',
      notes: '',
    });
    setErrors({});
    setSubmittedPass(null);
  };

  return (
    <div className="page-transition" style={{ paddingTop: '5.5rem' }}>
      {/* Page Header */}
      <div className="section" style={{ paddingBottom: '1rem', paddingTop: '1.5rem' }}>
        <div className="section-header" style={{ marginBottom: '1.5rem' }}>
          <div className="section-pill" style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
            <Sparkles size={14} color="#10b981" />
            <span style={{ color: '#059669' }}>OFFICIAL REGISTRATION PORTAL</span>
          </div>
          <h1 className="section-title">
            SYMPOSIUM <span className="gradient-text">REGISTRATION</span>
          </h1>
          <p className="section-subtitle">
            Secure your delegate pass for CHANNEL 2K27. Registration deadline: <strong>{REGISTRATION_DEADLINE_TEXT}</strong>.
          </p>
        </div>
      </div>

      <div className="section" style={{ paddingTop: 0, paddingBottom: '5rem' }}>
        {/* If Pass Confirmed: Show High-Tech Digital Pass Ticket */}
        {submittedPass ? (
          <div
            className="glass-card"
            style={{
              maxWidth: '820px',
              margin: '0 auto',
              borderRadius: '28px',
              padding: '2.5rem',
              border: '2px solid rgba(16, 185, 129, 0.35)',
              background: 'linear-gradient(145deg, #ffffff 0%, #f0fdf4 100%)',
              boxShadow: '0 20px 50px rgba(16, 185, 129, 0.15)',
            }}
          >
            {/* Top Success Banner */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.25rem 1.5rem',
                borderRadius: '16px',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                marginBottom: '2rem',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: '#10b981',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Check size={24} strokeWidth={3} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#065f46', marginBottom: '0.2rem' }}>
                  REGISTRATION CONFIRMED!
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#047857' }}>
                  Your registration has been successfully verified. Please save or screenshot your delegate pass below.
                </p>
              </div>
            </div>

            {/* Pass Card Container */}
            <div
              id="printable-delegate-pass"
              style={{
                border: '2px dashed rgba(23, 105, 224, 0.25)',
                borderRadius: '22px',
                padding: '2rem',
                background: '#ffffff',
                marginBottom: '2rem',
                position: 'relative',
              }}
            >
              {/* Pass Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  borderBottom: '1px solid rgba(23, 105, 224, 0.12)',
                  paddingBottom: '1.25rem',
                  marginBottom: '1.5rem',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--cyan)', fontWeight: 800, letterSpacing: '0.1em' }}>
                    S.E.C.E. • APEC MELMARUVATHUR
                  </div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                    CHANNEL 2K27 DELEGATE PASS
                  </h2>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    National Level Technical Symposium • 04 November 2026
                  </div>
                </div>

                <div
                  style={{
                    padding: '0.6rem 1.1rem',
                    borderRadius: '12px',
                    background: 'rgba(23, 105, 224, 0.08)',
                    border: '1.5px solid rgba(23, 105, 224, 0.25)',
                    textAlign: 'right',
                  }}
                >
                  <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-light)', fontWeight: 700 }}>
                    PASS ID / TOKEN
                  </div>
                  <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-mono)', fontWeight: 900, color: 'var(--primary-blue)' }}>
                    {submittedPass.id}
                  </div>
                </div>
              </div>

              {/* Pass Details Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1.25rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Participant Name
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {submittedPass.fullName}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase' }}>
                    College / Institution
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {submittedPass.college}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Department & Year
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {submittedPass.department} ({submittedPass.year})
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Contact Phone & Email
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    {submittedPass.phone} • {submittedPass.email}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Technical Track
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--primary-blue)' }}>
                    {submittedPass.techEvent}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Non-Technical Track
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--violet)' }}>
                    {submittedPass.nonTechEvent}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Venue
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    APEC Central Library
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Delegate Fee Status
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#059669' }}>
                    ₹{submittedPass.feeAmount} (Payable at Desk / Confirmed)
                  </div>
                </div>
              </div>

              {/* Barcode Mock Visual */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid rgba(23, 105, 224, 0.1)',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={18} color="#059669" />
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Bring a valid College ID Card & present this Pass ID at the Reception Foyer on 04-Nov-2026.
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '1.2rem',
                    letterSpacing: '0.2em',
                    color: '#94a3b8',
                    userSelect: 'none',
                  }}
                >
                  ||||| | |||| |||| ||| |||||
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => window.print()}
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Printer size={18} />
                <span>Print / Save Pass (PDF)</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="btn btn-secondary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <RotateCcw size={18} />
                <span>Register Another Participant</span>
              </button>

              <a
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
              >
                <span>Backup Google Form</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        ) : (
          /* Main Interactive Registration Form */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
              maxWidth: '1160px',
              margin: '0 auto',
            }}
          >
            {/* Left Column: Pass Benefits & Google Form Direct Fallback */}
            <div>
              <div
                className="glass-card"
                style={{
                  padding: '2.25rem',
                  borderRadius: '24px',
                  border: '1.5px solid rgba(23, 105, 224, 0.18)',
                  marginBottom: '1.75rem',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '8px',
                    background: 'rgba(23, 105, 224, 0.08)',
                    color: 'var(--primary-blue)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    marginBottom: '1rem',
                  }}
                >
                  <Award size={14} />
                  <span>ALL-INCLUSIVE PASS // ₹150</span>
                </div>

                <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.65rem' }}>
                  What Your ₹150 Pass Unlocks
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Single entry pass covers competition entry, meals, symposium kit, and Anna University affiliated certifications.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                  {[
                    '1 Technical Event (Thought Summit / DesignDash)',
                    '1 Non-Technical Event (Skribbl.io / Chess)',
                    'Buffet Lunch, Morning & Evening High Tea Refreshments',
                    'Official Delegate Kit, ID Badge & Event Folder',
                    'Accredited Anna University Participation Certificate',
                    'Cash Prizes & Trophies for Winners (1st & 2nd Place)',
                  ].map((perk, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                      <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span style={{ fontSize: '0.86rem', color: 'var(--text-main)', fontWeight: 600 }}>{perk}</span>
                    </div>
                  ))}
                </div>

                {/* Deadline Alert Box */}
                <div
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: '14px',
                    background: 'rgba(234, 88, 12, 0.08)',
                    border: '1px solid rgba(234, 88, 12, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <Clock size={20} color="#ea580c" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#ea580c' }}>
                      CLOSING DEADLINE
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#c2410c' }}>
                      {REGISTRATION_DEADLINE_TEXT} at 11:59 PM IST
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Google Form Alternative Box */}
              <div
                className="glass-card"
                style={{
                  padding: '1.75rem',
                  borderRadius: '20px',
                  border: '1.5px solid rgba(16, 185, 129, 0.25)',
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.04) 0%, rgba(255, 255, 255, 0.95) 100%)',
                }}
              >
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  Prefer Google Forms?
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  You can also fill out the official Google Registration Form directly:
                </p>
                <a
                  href={REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.85rem',
                  }}
                >
                  <span>Open Official Google Form</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>

            {/* Right Column: Functional Registration Form */}
            <div
              className="glass-card"
              style={{
                padding: '2.5rem',
                borderRadius: '28px',
                border: '1.5px solid rgba(23, 105, 224, 0.22)',
                background: '#ffffff',
                boxShadow: '0 16px 40px rgba(23, 105, 224, 0.08)',
              }}
            >
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                  Delegate Registration Form
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  Please fill in your authentic student details. Fields marked with * are required.
                </p>
              </div>

              {errors.events && (
                <div
                  style={{
                    padding: '0.85rem 1.1rem',
                    borderRadius: '12px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#b91c1c',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <AlertCircle size={18} />
                  <span>{errors.events}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {/* Full Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Alex Johnson"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      border: errors.fullName ? '1.5px solid #ef4444' : '1px solid rgba(23, 105, 224, 0.25)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      background: 'rgba(245, 250, 255, 0.6)',
                      transition: 'border-color 0.2s',
                    }}
                  />
                  {errors.fullName && (
                    <div style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>{errors.fullName}</div>
                  )}
                </div>

                {/* Email & Phone Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@example.com"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        border: errors.email ? '1.5px solid #ef4444' : '1px solid rgba(23, 105, 224, 0.25)',
                        fontSize: '0.92rem',
                        outline: 'none',
                        background: 'rgba(245, 250, 255, 0.6)',
                      }}
                    />
                    {errors.email && (
                      <div style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>{errors.email}</div>
                    )}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                      Mobile Number (10 digits) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      maxLength={10}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        border: errors.phone ? '1.5px solid #ef4444' : '1px solid rgba(23, 105, 224, 0.25)',
                        fontSize: '0.92rem',
                        outline: 'none',
                        background: 'rgba(245, 250, 255, 0.6)',
                      }}
                    />
                    {errors.phone && (
                      <div style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>{errors.phone}</div>
                    )}
                  </div>
                </div>

                {/* College Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                    College / University Name *
                  </label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    placeholder="e.g. Adhiparasakthi Engineering College"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      border: errors.college ? '1.5px solid #ef4444' : '1px solid rgba(23, 105, 224, 0.25)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      background: 'rgba(245, 250, 255, 0.6)',
                    }}
                  />
                  {errors.college && (
                    <div style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>{errors.college}</div>
                  )}
                </div>

                {/* Department & Year Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                      Department / Branch *
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      placeholder="e.g. ECE / EEE / CSE"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        border: errors.department ? '1.5px solid #ef4444' : '1px solid rgba(23, 105, 224, 0.25)',
                        fontSize: '0.92rem',
                        outline: 'none',
                        background: 'rgba(245, 250, 255, 0.6)',
                      }}
                    />
                    {errors.department && (
                      <div style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>{errors.department}</div>
                    )}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                      Year of Study *
                    </label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        border: '1px solid rgba(23, 105, 224, 0.25)',
                        fontSize: '0.92rem',
                        outline: 'none',
                        background: 'rgba(245, 250, 255, 0.6)',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="I Year">I Year (First Year)</option>
                      <option value="II Year">II Year (Second Year)</option>
                      <option value="III Year">III Year (Third Year)</option>
                      <option value="IV Year">IV Year (Final Year)</option>
                    </select>
                  </div>
                </div>

                {/* Event Selections */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                      Technical Event Track
                    </label>
                    <select
                      name="techEvent"
                      value={formData.techEvent}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        border: '1px solid rgba(23, 105, 224, 0.25)',
                        fontSize: '0.88rem',
                        outline: 'none',
                        background: 'rgba(245, 250, 255, 0.6)',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="Thought Summit (Paper Presentation)">Thought Summit (Paper Presentation)</option>
                      <option value="DesignDash (Circuit Debugging & UI)">DesignDash (Circuit Debugging & UI)</option>
                      <option value="None">None (Skip Technical)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                      Non-Technical Event Track
                    </label>
                    <select
                      name="nonTechEvent"
                      value={formData.nonTechEvent}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        border: '1px solid rgba(23, 105, 224, 0.25)',
                        fontSize: '0.88rem',
                        outline: 'none',
                        background: 'rgba(245, 250, 255, 0.6)',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="Skribbl.io (Online Doodling)">Skribbl.io (Online Doodling)</option>
                      <option value="Chess Tournament (Rapid Chess)">Chess Tournament (Rapid Chess)</option>
                      <option value="None">None (Skip Non-Technical)</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-lg"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    marginTop: '0.75rem',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                >
                  {isSubmitting ? (
                    <span>PROCESSING REGISTRATION...</span>
                  ) : (
                    <>
                      <UserCheck size={20} />
                      <span>SUBMIT & SECURE PASS (₹{REGISTRATION_FEE_AMOUNT})</span>
                    </>
                  )}
                </button>

                <div style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  🔒 Secure submission • Delegate Pass generated instantly on confirmation.
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
