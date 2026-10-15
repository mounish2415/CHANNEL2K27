import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  User,
  Building,
  GraduationCap,
  Mail,
  Phone,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  QrCode,
  Download,
  Share2,
  Sparkles,
  ShieldCheck,
  CheckSquare,
  Square,
  RefreshCw,
  Copy,
  Check,
  FileSpreadsheet,
  ExternalLink,
  Loader2,
  Utensils,
  Users,
  AlertCircle,
  Cpu,
  Palette,
} from 'lucide-react';
import { technicalEvents as initialTechEvents, nonTechnicalEvents as initialNonTechEvents, allEvents as initialAllEvents } from '../data/eventsData';

export default function RegistrationFlow({ preselectedEventId, initialCategory }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    collegeName: '',
    department: 'Electronics and Communication Engineering',
    year: '3rd Year',
    email: '',
    mobileNumber: '',
    foodPreference: 'Veg', // 'Veg' or 'Non-Veg'
  });

  // Events loaded from backend or local fallback
  const [availableEvents, setAvailableEvents] = useState(initialAllEvents);
  const [techEventList, setTechEventList] = useState(initialTechEvents);
  const [nonTechEventList, setNonTechEventList] = useState(initialNonTechEvents);

  // Strict Event Selection: 1 Technical + 1 Non-Technical
  const [selectedTechId, setSelectedTechId] = useState('thought-summit');
  const [selectedNonTechId, setSelectedNonTechId] = useState('skribbl');

  // Paper Presentation Team Members State (1 to 5 members)
  const [paperMembersCount, setPaperMembersCount] = useState(1);
  const [paperTeamMembers, setPaperTeamMembers] = useState(['']);

  const [registrationId, setRegistrationId] = useState('');
  const [registeredData, setRegisteredData] = useState(null);
  const [upiRefId, setUpiRefId] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Fetch dynamic active events from backend
  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.events) && data.events.length > 0) {
          const tech = data.events.filter((e) => e.category === 'TECHNICAL');
          const nonTech = data.events.filter((e) => e.category === 'NON-TECHNICAL');
          setAvailableEvents(data.events);
          if (tech.length > 0) setTechEventList(tech);
          if (nonTech.length > 0) setNonTechEventList(nonTech);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch events from backend, using defaults:', err);
      });
  }, []);

  // Sync preselectedEventId from clicks on homepage event cards
  useEffect(() => {
    if (preselectedEventId) {
      const found = availableEvents.find((e) => e.id === preselectedEventId);
      if (found) {
        if (found.category === 'TECHNICAL') {
          setSelectedTechId(found.id);
        } else if (found.category === 'NON-TECHNICAL') {
          setSelectedNonTechId(found.id);
        }
        setCurrentStep(2);
      }
    }
  }, [preselectedEventId, availableEvents]);

  // Keep Member 1 in sync with formData.fullName if not manually edited
  useEffect(() => {
    if (formData.fullName && (!paperTeamMembers[0] || paperTeamMembers[0].trim() === '')) {
      setPaperTeamMembers((prev) => {
        const next = [...prev];
        next[0] = formData.fullName;
        return next;
      });
    }
  }, [formData.fullName]);

  // Handle number of Paper Presentation members change
  const handlePaperCountChange = (count) => {
    const num = Math.max(1, Math.min(5, Number(count) || 1));
    setPaperMembersCount(num);
    setPaperTeamMembers((prev) => {
      const next = [];
      for (let i = 0; i < num; i++) {
        next.push(prev[i] !== undefined && prev[i] !== '' ? prev[i] : (i === 0 ? formData.fullName : ''));
      }
      return next;
    });
  };

  const handlePaperMemberNameChange = (index, value) => {
    setPaperTeamMembers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    // Clear member errors if any
    if (formErrors[`member_${index}`]) {
      setFormErrors((prev) => ({ ...prev, [`member_${index}`]: null }));
    }
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('mounishprasanna2415@oksbi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Check if current selected technical event is Paper Presentation
  const currentTechEvent = availableEvents.find((e) => e.id === selectedTechId);
  const currentNonTechEvent = availableEvents.find((e) => e.id === selectedNonTechId);

  const isPaperPresentationSelected = Boolean(
    currentTechEvent &&
    (currentTechEvent.isPaperPresentation ||
      currentTechEvent.id === 'thought-summit' ||
      currentTechEvent.name.toLowerCase().includes('paper'))
  );

  // Package fee calculation: ₹199 per head (covers 1 Technical + 1 Non-Technical event)
  const calculateFees = () => {
    const participants = isPaperPresentationSelected ? paperMembersCount : 1;
    const feePerHead = 199;
    const totalFee = participants * feePerHead;

    return {
      feePerHead,
      participants,
      techFee: totalFee,
      nonTechFee: 0,
      totalFee,
    };
  };

  const { feePerHead, participants, techFee, nonTechFee, totalFee } = calculateFees();

  // Step 1 Validation
  const validateStep1 = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name.';
    if (!formData.collegeName.trim()) errors.collegeName = 'Please enter your college name.';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Please enter a valid email address.';
    const cleanPhone = formData.mobileNumber.replace(/[\s-]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
    }
    if (!formData.foodPreference) {
      errors.foodPreference = 'Please select your food preference (Veg or Non-Veg).';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Step 2 Validation: Exactly 1 Tech + 1 Non-Tech & Paper Presentation members
  const validateStep2 = () => {
    const errors = {};

    if (!selectedTechId) {
      errors.techEvent = 'Please select one Technical Event.';
    }
    if (!selectedNonTechId) {
      errors.nonTechEvent = 'Please select one Non-Technical Event.';
    }

    if (isPaperPresentationSelected) {
      const seen = new Set();
      for (let i = 0; i < paperMembersCount; i++) {
        const name = (paperTeamMembers[i] || '').trim();
        if (!name) {
          errors[`member_${i}`] = `Member ${i + 1} Name is required.`;
        } else {
          const lower = name.toLowerCase();
          if (seen.has(lower)) {
            errors[`member_${i}`] = `Duplicate name: '${name}' already entered.`;
          }
          seen.add(lower);
        }
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = async () => {
    setSubmissionError('');
    if (currentStep === 1) {
      if (!validateStep1()) return;
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!validateStep2()) return;
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setIsSubmitting(true);

      const payload = {
        fullName: formData.fullName.trim(),
        collegeName: formData.collegeName.trim(),
        department: formData.department,
        yearOfStudy: formData.year,
        email: formData.email.trim(),
        phone: formData.mobileNumber.trim(),
        foodPreference: formData.foodPreference,
        events: [selectedTechId, selectedNonTechId],
        paperMembersCount: isPaperPresentationSelected ? paperMembersCount : 1,
        techTeamMembers: isPaperPresentationSelected ? paperTeamMembers.slice(0, paperMembersCount) : [formData.fullName.trim()],
        paymentMode: 'UPI QR SCANNER (GPay)',
        upiRefId: upiRefId.trim() || 'VERIFIED_ON_SPOT',
      };

      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setRegistrationId(data.registrationId);
          setRegisteredData(data.registration);
          setIsSubmitting(false);
          setCurrentStep(4);

          // Confetti celebration
          try {
            confetti({
              particleCount: 140,
              spread: 90,
              origin: { y: 0.6 },
              colors: ['#00B8D9', '#1769E0', '#6C4DFF', '#E94EFF', '#10B981'],
            });
          } catch (err) {
            // ignore
          }
        } else {
          setIsSubmitting(false);
          setSubmissionError(data.message || 'Registration failed. Please check your details and try again.');
        }
      } catch (err) {
        setIsSubmitting(false);
        setSubmissionError('Unable to connect to server. Please ensure the backend is running.');
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1 && currentStep < 4) {
      setSubmissionError('');
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePrintPass = () => {
    window.print();
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      collegeName: '',
      department: 'Electronics and Communication Engineering',
      year: '3rd Year',
      email: '',
      mobileNumber: '',
      foodPreference: 'Veg',
    });
    setSelectedTechId('thought-summit');
    setSelectedNonTechId('skribbl');
    setPaperMembersCount(1);
    setPaperTeamMembers(['']);
    setRegistrationId('');
    setRegisteredData(null);
    setUpiRefId('');
    setSubmissionError('');
    setCurrentStep(1);
  };

  return (
    <section id="register" className="section" style={{ position: 'relative', zIndex: 2 }}>
      <div className="section-header">
        <div className="section-pill">
          <Sparkles size={14} />
          <span>INSTANT DELEGATE ONBOARDING</span>
        </div>
        <h2 className="section-title">
          SYMPOSIUM <span className="gradient-text">REGISTRATION</span>
        </h2>
        <p className="section-subtitle">
          Participate in <strong>1 Technical + 1 Non-Technical Event</strong> at CHANNEL 2K27. Complete the 4-step registration to receive your official delegate pass.
        </p>
      </div>

      <div
        className="glass-card"
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          padding: '2.5rem 2rem',
          borderRadius: '30px',
          border: '1px solid rgba(23, 105, 224, 0.18)',
          boxShadow: '0 20px 50px rgba(23, 105, 224, 0.09), 0 0 25px rgba(0, 153, 184, 0.05)',
          background: 'rgba(255, 255, 255, 0.94)',
        }}
      >
        {/* Step Indicator Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2.5rem',
            position: 'relative',
          }}
        >
          {/* Connector line behind */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '12%',
              right: '12%',
              height: '3px',
              background: 'rgba(23, 105, 224, 0.12)',
              transform: 'translateY(-50%)',
              zIndex: 0,
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${((currentStep - 1) / 3) * 100}%`,
                background: 'var(--grad-tech)',
                transition: 'width 0.4s ease',
              }}
            />
          </div>

          {[
            { step: 1, label: 'Details' },
            { step: 2, label: 'Events' },
            { step: 3, label: 'Summary' },
            { step: 4, label: 'Pass' },
          ].map((item) => {
            const isCompleted = currentStep > item.step;
            const isCurrent = currentStep === item.step;

            return (
              <div
                key={item.step}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    transition: 'all 0.3s ease',
                    background: isCompleted || isCurrent ? 'var(--grad-tech)' : '#ffffff',
                    color: isCompleted || isCurrent ? '#ffffff' : 'var(--text-muted)',
                    border: isCompleted || isCurrent ? 'none' : '2px solid rgba(23, 105, 224, 0.25)',
                    boxShadow: isCurrent ? '0 0 15px rgba(23, 105, 224, 0.4)' : 'none',
                  }}
                >
                  {isCompleted ? <Check size={18} strokeWidth={3} /> : item.step}
                </div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    color: isCurrent ? 'var(--primary-blue)' : 'var(--text-muted)',
                  }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* ================= STEP 1: PARTICIPANT INFORMATION ================= */}
        {currentStep === 1 && (
          <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
            <div style={{ marginBottom: '1.75rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                Step 1: Participant Information
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Please provide accurate delegate credentials for the official certificates and symposium kit.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.25rem',
                marginBottom: '1.5rem',
              }}
            >
              {/* Full Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                  Full Name *
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', top: '13px', left: '14px', color: 'var(--text-light)' }} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Mounish Kumar"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 2.6rem',
                      borderRadius: '12px',
                      border: formErrors.fullName ? '1.5px solid #ef4444' : '1px solid rgba(23, 105, 224, 0.22)',
                      background: '#ffffff',
                      color: 'var(--text-main)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.92rem',
                      outline: 'none',
                    }}
                  />
                </div>
                {formErrors.fullName && (
                  <span style={{ fontSize: '0.74rem', color: '#ef4444', marginTop: '0.2rem', display: 'block' }}>
                    {formErrors.fullName}
                  </span>
                )}
              </div>

              {/* College Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                  College Name *
                </label>
                <div style={{ position: 'relative' }}>
                  <Building size={18} style={{ position: 'absolute', top: '13px', left: '14px', color: 'var(--text-light)' }} />
                  <input
                    type="text"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleInputChange}
                    placeholder="e.g. Adhiparasakthi Engineering College"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 2.6rem',
                      borderRadius: '12px',
                      border: formErrors.collegeName ? '1.5px solid #ef4444' : '1px solid rgba(23, 105, 224, 0.22)',
                      background: '#ffffff',
                      color: 'var(--text-main)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.92rem',
                      outline: 'none',
                    }}
                  />
                </div>
                {formErrors.collegeName && (
                  <span style={{ fontSize: '0.74rem', color: '#ef4444', marginTop: '0.2rem', display: 'block' }}>
                    {formErrors.collegeName}
                  </span>
                )}
              </div>

              {/* Department */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                  Department
                </label>
                <div style={{ position: 'relative' }}>
                  <GraduationCap size={18} style={{ position: 'absolute', top: '13px', left: '14px', color: 'var(--text-light)' }} />
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 2.6rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(23, 105, 224, 0.22)',
                      background: '#ffffff',
                      color: 'var(--text-main)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.92rem',
                      outline: 'none',
                    }}
                  >
                    <option value="Electronics and Communication Engineering">Electronics and Communication Engineering (ECE)</option>
                    <option value="Electrical and Electronics Engineering">Electrical and Electronics Engineering (EEE)</option>
                    <option value="Computer Science and Engineering">Computer Science and Engineering (CSE)</option>
                    <option value="Information Technology">Information Technology (IT)</option>
                    <option value="Artificial Intelligence and Data Science">AI & Data Science (AI&DS)</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Other Engineering">Other Specialization</option>
                  </select>
                </div>
              </div>

              {/* Year */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                  Year of Study
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(23, 105, 224, 0.22)',
                    background: '#ffffff',
                    color: 'var(--text-main)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.92rem',
                    outline: 'none',
                  }}
                >
                  <option value="1st Year">1st Year (Freshman)</option>
                  <option value="2nd Year">2nd Year (Sophomore)</option>
                  <option value="3rd Year">3rd Year (Junior)</option>
                  <option value="4th Year">4th Year (Senior)</option>
                  <option value="PG / Research Scholar">PG / Research Scholar</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                  Email Address *
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', top: '13px', left: '14px', color: 'var(--text-light)' }} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="student@example.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 2.6rem',
                      borderRadius: '12px',
                      border: formErrors.email ? '1.5px solid #ef4444' : '1px solid rgba(23, 105, 224, 0.22)',
                      background: '#ffffff',
                      color: 'var(--text-main)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.92rem',
                      outline: 'none',
                    }}
                  />
                </div>
                {formErrors.email && (
                  <span style={{ fontSize: '0.74rem', color: '#ef4444', marginTop: '0.2rem', display: 'block' }}>
                    {formErrors.email}
                  </span>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                  Mobile / WhatsApp Number *
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} style={{ position: 'absolute', top: '13px', left: '14px', color: 'var(--text-light)' }} />
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 2.6rem',
                      borderRadius: '12px',
                      border: formErrors.mobileNumber ? '1.5px solid #ef4444' : '1px solid rgba(23, 105, 224, 0.22)',
                      background: '#ffffff',
                      color: 'var(--text-main)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.92rem',
                      outline: 'none',
                    }}
                  />
                </div>
                {formErrors.mobileNumber && (
                  <span style={{ fontSize: '0.74rem', color: '#ef4444', marginTop: '0.2rem', display: 'block' }}>
                    {formErrors.mobileNumber}
                  </span>
                )}
              </div>
            </div>

            {/* Food Preference (NEW REQUIRED FIELD) */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.86rem', fontWeight: 800, marginBottom: '0.6rem', color: 'var(--text-main)' }}>
                <Utensils size={16} color="#1769e0" />
                <span>Food Preference *</span>
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {/* Veg Option */}
                <div
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, foodPreference: 'Veg' }));
                    if (formErrors.foodPreference) setFormErrors((prev) => ({ ...prev, foodPreference: null }));
                  }}
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: '14px',
                    border: formData.foodPreference === 'Veg' ? '2px solid #10b981' : '1px solid rgba(23, 105, 224, 0.18)',
                    background: formData.foodPreference === 'Veg' ? 'rgba(16, 185, 129, 0.08)' : '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid #10b981',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>Vegetarian</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Pure Veg Meals & Snacks</div>
                    </div>
                  </div>
                  {formData.foodPreference === 'Veg' && <Check size={18} color="#10b981" strokeWidth={3} />}
                </div>

                {/* Non-Veg Option */}
                <div
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, foodPreference: 'Non-Veg' }));
                    if (formErrors.foodPreference) setFormErrors((prev) => ({ ...prev, foodPreference: null }));
                  }}
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: '14px',
                    border: formData.foodPreference === 'Non-Veg' ? '2px solid #e11d48' : '1px solid rgba(23, 105, 224, 0.18)',
                    background: formData.foodPreference === 'Non-Veg' ? 'rgba(225, 29, 72, 0.08)' : '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid #e11d48',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e11d48' }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>Non-Vegetarian</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Chicken Feast & Snacks</div>
                    </div>
                  </div>
                  {formData.foodPreference === 'Non-Veg' && <Check size={18} color="#e11d48" strokeWidth={3} />}
                </div>
              </div>
              {formErrors.foodPreference && (
                <span style={{ fontSize: '0.74rem', color: '#ef4444', marginTop: '0.35rem', display: 'block' }}>
                  {formErrors.foodPreference}
                </span>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <button onClick={handleNextStep} className="btn btn-primary">
                <span>CONTINUE TO EVENT SELECTION</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: SELECT EVENTS (STRICT 1 TECH + 1 NON-TECH RULE) ================= */}
        {currentStep === 2 && (
          <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                Step 2: Select Events
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Rule: Every participant must select <strong>exactly 1 Technical Event</strong> and <strong>1 Non-Technical Event</strong>.
              </p>
            </div>

            {/* Rule Indicator Status Bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '0.75rem',
                marginBottom: '1.75rem',
              }}
            >
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  background: selectedTechId ? 'rgba(23, 105, 224, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                  border: `1.5px solid ${selectedTechId ? '#1769e0' : '#ef4444'}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  color: selectedTechId ? 'var(--primary-blue)' : '#ef4444',
                }}
              >
                {selectedTechId ? <CheckCircle size={18} color="#1769e0" /> : <AlertCircle size={18} color="#ef4444" />}
                <span>
                  Technical Event: {selectedTechId ? currentTechEvent?.name : 'Choose 1 Event'}
                </span>
              </div>

              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  background: selectedNonTechId ? 'rgba(108, 77, 255, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                  border: `1.5px solid ${selectedNonTechId ? '#6c4dff' : '#ef4444'}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  color: selectedNonTechId ? 'var(--violet)' : '#ef4444',
                }}
              >
                {selectedNonTechId ? <CheckCircle size={18} color="#6c4dff" /> : <AlertCircle size={18} color="#ef4444" />}
                <span>
                  Non-Technical Event: {selectedNonTechId ? currentNonTechEvent?.name : 'Choose 1 Event'}
                </span>
              </div>
            </div>

            {/* SECTION 1: TECHNICAL EVENTS */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                <Cpu size={18} color="#1769e0" />
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '0.02em' }}>
                  1. TECHNICAL EVENTS (SELECT 1)
                </h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {techEventList.map((evt) => {
                  const isSelected = selectedTechId === evt.id;
                  return (
                    <div
                      key={evt.id}
                      onClick={() => {
                        setSelectedTechId(evt.id);
                        if (formErrors.techEvent) setFormErrors((prev) => ({ ...prev, techEvent: null }));
                      }}
                      style={{
                        padding: '1.1rem 1.3rem',
                        borderRadius: '16px',
                        background: isSelected ? 'rgba(23, 105, 224, 0.08)' : '#ffffff',
                        border: isSelected ? '2px solid #1769e0' : '1px solid rgba(23, 105, 224, 0.16)',
                        boxShadow: isSelected ? '0 4px 18px rgba(23, 105, 224, 0.14)' : '0 2px 6px rgba(0,0,0,0.02)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                        <div style={{ color: isSelected ? '#1769e0' : 'var(--text-light)' }}>
                          {isSelected ? <CheckSquare size={22} color="#1769e0" /> : <Square size={22} />}
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.15rem' }}>
                            <span
                              style={{
                                fontSize: '0.65rem',
                                fontFamily: 'var(--font-mono)',
                                fontWeight: 800,
                                color: '#1769e0',
                                background: 'rgba(23, 105, 224, 0.08)',
                                padding: '0.15rem 0.45rem',
                                borderRadius: '4px',
                              }}
                            >
                              TECHNICAL
                            </span>
                            <h5 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                              {evt.name}
                            </h5>
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            {evt.tagline || evt.description}
                          </div>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.15rem', fontWeight: 900, color: isSelected ? '#1769e0' : 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
                          ₹199
                        </div>
                        <div style={{ fontSize: '0.64rem', color: isSelected ? '#1769e0' : 'var(--text-light)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                          PACKAGE INCLUDED
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {formErrors.techEvent && (
                <span style={{ fontSize: '0.74rem', color: '#ef4444', marginTop: '0.35rem', display: 'block' }}>
                  {formErrors.techEvent}
                </span>
              )}
            </div>

            {/* SPECIAL SECTION: PAPER PRESENTATION TEAM MEMBERS */}
            {isPaperPresentationSelected && (
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(23, 105, 224, 0.04) 0%, rgba(0, 184, 217, 0.06) 100%)',
                  border: '1.5px solid rgba(23, 105, 224, 0.25)',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  marginBottom: '2rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Users size={18} color="#1769e0" />
                    <div>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-main)' }}>
                        Paper Presentation Team Configuration
                      </h4>
                      <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                        Select total number of presenters (1 to 5 members). Registration package: ₹199 per person (covers 1 Tech + 1 Non-Tech).
                      </p>
                    </div>
                  </div>

                  {/* Member Count Buttons: 1, 2, 3, 4, 5 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)' }}>Members:</span>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handlePaperCountChange(num)}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          border: paperMembersCount === num ? '2px solid #1769e0' : '1px solid rgba(23, 105, 224, 0.2)',
                          background: paperMembersCount === num ? '#1769e0' : '#ffffff',
                          color: paperMembersCount === num ? '#ffffff' : 'var(--text-main)',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dynamic Member Inputs */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  {Array.from({ length: paperMembersCount }).map((_, index) => {
                    const isPrimary = index === 0;
                    return (
                      <div key={index}>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-main)' }}>
                          Member {index + 1} Name * {isPrimary ? '(Primary Delegate)' : ''}
                        </label>
                        <div style={{ position: 'relative' }}>
                          <User size={16} style={{ position: 'absolute', top: '12px', left: '12px', color: 'var(--text-light)' }} />
                          <input
                            type="text"
                            value={paperTeamMembers[index] || ''}
                            onChange={(e) => handlePaperMemberNameChange(index, e.target.value)}
                            placeholder={`e.g. ${index === 0 ? (formData.fullName || 'Member 1 Name') : `Team Member ${index + 1}`}`}
                            style={{
                              width: '100%',
                              padding: '0.65rem 0.9rem 0.65rem 2.4rem',
                              borderRadius: '10px',
                              border: formErrors[`member_${index}`] ? '1.5px solid #ef4444' : '1px solid rgba(23, 105, 224, 0.2)',
                              background: '#ffffff',
                              color: 'var(--text-main)',
                              fontSize: '0.88rem',
                              outline: 'none',
                            }}
                          />
                        </div>
                        {formErrors[`member_${index}`] && (
                          <span style={{ fontSize: '0.72rem', color: '#ef4444', marginTop: '0.2rem', display: 'block' }}>
                            {formErrors[`member_${index}`]}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SECTION 2: NON-TECHNICAL EVENTS */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                <Palette size={18} color="#6c4dff" />
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '0.02em' }}>
                  2. NON-TECHNICAL EVENTS (SELECT 1)
                </h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {nonTechEventList.map((evt) => {
                  const isSelected = selectedNonTechId === evt.id;
                  return (
                    <div
                      key={evt.id}
                      onClick={() => {
                        setSelectedNonTechId(evt.id);
                        if (formErrors.nonTechEvent) setFormErrors((prev) => ({ ...prev, nonTechEvent: null }));
                      }}
                      style={{
                        padding: '1.1rem 1.3rem',
                        borderRadius: '16px',
                        background: isSelected ? 'rgba(108, 77, 255, 0.08)' : '#ffffff',
                        border: isSelected ? '2px solid #6c4dff' : '1px solid rgba(108, 77, 255, 0.16)',
                        boxShadow: isSelected ? '0 4px 18px rgba(108, 77, 255, 0.14)' : '0 2px 6px rgba(0,0,0,0.02)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                        <div style={{ color: isSelected ? '#6c4dff' : 'var(--text-light)' }}>
                          {isSelected ? <CheckSquare size={22} color="#6c4dff" /> : <Square size={22} />}
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.15rem' }}>
                            <span
                              style={{
                                fontSize: '0.65rem',
                                fontFamily: 'var(--font-mono)',
                                fontWeight: 800,
                                color: '#6c4dff',
                                background: 'rgba(108, 77, 255, 0.08)',
                                padding: '0.15rem 0.45rem',
                                borderRadius: '4px',
                              }}
                            >
                              NON-TECHNICAL
                            </span>
                            <h5 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                              {evt.name}
                            </h5>
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            {evt.tagline || evt.description}
                          </div>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.15rem', fontWeight: 900, color: isSelected ? '#6c4dff' : 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
                          ₹199
                        </div>
                        <div style={{ fontSize: '0.64rem', color: isSelected ? '#6c4dff' : 'var(--text-light)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                          PACKAGE INCLUDED
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {formErrors.nonTechEvent && (
                <span style={{ fontSize: '0.74rem', color: '#ef4444', marginTop: '0.35rem', display: 'block' }}>
                  {formErrors.nonTechEvent}
                </span>
              )}
            </div>

            {/* Live Fee Calculator Strip */}
            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(23, 105, 224, 0.06) 0%, rgba(0, 184, 217, 0.06) 100%)',
                border: '1.5px solid rgba(23, 105, 224, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: '#ffffff',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '6px',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    color: 'var(--primary-blue)',
                    marginBottom: '0.4rem',
                    border: '1px solid rgba(23, 105, 224, 0.18)',
                  }}
                >
                  <span>₹199 per head – includes 1 Technical + 1 Non-Technical Event</span>
                </div>
                <div style={{ fontSize: '0.86rem', color: 'var(--text-main)', fontWeight: 700 }}>
                  Selected Track: <strong>{currentTechEvent?.name || '1 Tech'} + {currentNonTechEvent?.name || '1 Non-Tech'}</strong>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
                  Calculation: {participants} participant{participants > 1 ? 's' : ''} × ₹199 = ₹{totalFee}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.45rem' }}>
                <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Registration Amount:</span>
                <span style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--primary-blue)', fontFamily: 'var(--font-heading)' }}>
                  ₹{totalFee}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={handlePrevStep} className="btn btn-secondary">
                <ArrowLeft size={18} />
                <span>BACK</span>
              </button>

              <button
                onClick={handleNextStep}
                className="btn btn-primary"
                disabled={!selectedTechId || !selectedNonTechId}
                style={{ opacity: !selectedTechId || !selectedNonTechId ? 0.6 : 1 }}
              >
                <span>REVIEW REGISTRATION SUMMARY</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: REGISTRATION SUMMARY & PAYMENT ================= */}
        {currentStep === 3 && (
          <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
            <div style={{ marginBottom: '1.75rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                Step 3: Registration Summary & Payment
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Please review your complete delegate summary and food preference before confirming payment.
              </p>
            </div>

            {/* Error Banner */}
            {submissionError && (
              <div
                style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1.5px solid #ef4444',
                  color: '#ef4444',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  marginBottom: '1.5rem',
                }}
              >
                <AlertCircle size={20} />
                <span>{submissionError}</span>
              </div>
            )}

            {/* Structured Summary Box */}
            <div
              style={{
                background: 'rgba(248, 252, 255, 0.95)',
                borderRadius: '20px',
                border: '1px solid rgba(23, 105, 224, 0.18)',
                boxShadow: '0 8px 25px rgba(23, 105, 224, 0.06)',
                padding: '1.75rem',
                marginBottom: '1.75rem',
              }}
            >
              {/* Highlight Banner: User Requirement */}
              <div
                style={{
                  padding: '0.85rem 1.25rem',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(23, 105, 224, 0.1) 0%, rgba(0, 184, 217, 0.1) 100%)',
                  border: '1.5px solid rgba(23, 105, 224, 0.28)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  marginBottom: '1.5rem',
                }}
              >
                <Sparkles size={20} color="#1769e0" />
                <span style={{ fontWeight: 800, fontSize: '0.96rem', color: 'var(--primary-blue)' }}>
                  ₹199 per head – includes 1 Technical + 1 Non-Technical Event
                </span>
              </div>

              {/* Exact Package Display Box */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1.5px solid rgba(23, 105, 224, 0.2)',
                  borderRadius: '16px',
                  padding: '1.25rem 1.5rem',
                  marginBottom: '1.5rem',
                  boxShadow: '0 4px 16px rgba(23, 105, 224, 0.06)',
                }}
              >
                <div style={{ fontSize: '0.72rem', color: 'var(--primary-blue)', fontFamily: 'var(--font-mono)', fontWeight: 800, marginBottom: '0.85rem' }}>
                  // PACKAGE PRICING SUMMARY
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>REGISTRATION PACKAGE</div>
                    <div style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-main)' }}>1 Technical + 1 Non-Technical</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>PARTICIPANTS</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--primary-blue)', fontFamily: 'var(--font-heading)' }}>{participants}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>FEE PER HEAD</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>₹199</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>CALCULATION</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>{participants} × ₹199</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>TOTAL AMOUNT</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--primary-blue)', fontFamily: 'var(--font-heading)' }}>₹{totalFee}</div>
                  </div>
                </div>
              </div>

              {/* Participant Details */}
              <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid rgba(23, 105, 224, 0.12)', paddingBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)', fontWeight: 800, marginBottom: '0.75rem' }}>
                  // PARTICIPANT INFORMATION
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>FULL NAME</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>{formData.fullName}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>COLLEGE</div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>{formData.collegeName}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>DEPARTMENT & YEAR</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)' }}>{formData.department} • {formData.year}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>CONTACT</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)' }}>{formData.mobileNumber} • {formData.email}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>FOOD PREFERENCE</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: formData.foodPreference === 'Veg' ? '#10b981' : '#e11d48' }}>
                      {formData.foodPreference}
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Event Details */}
              <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid rgba(23, 105, 224, 0.12)', paddingBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--primary-blue)', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
                    // 1. TECHNICAL EVENT
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--primary-blue)', fontSize: '0.85rem', background: 'rgba(23, 105, 224, 0.08)', padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                    INCLUDED IN ₹199 PACKAGE
                  </span>
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  {currentTechEvent?.name}
                </div>
                {isPaperPresentationSelected ? (
                  <div style={{ background: '#ffffff', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid rgba(23, 105, 224, 0.12)' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                      Team Presenters ({participants}):
                    </div>
                    <ol style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.86rem', color: 'var(--text-main)', fontWeight: 600 }}>
                      {paperTeamMembers.slice(0, participants).map((member, i) => (
                        <li key={i}>{member || `Member ${i + 1}`}</li>
                      ))}
                    </ol>
                  </div>
                ) : (
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Participant: {formData.fullName} (Individual)
                  </div>
                )}
              </div>

              {/* Non-Technical Event Details */}
              <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid rgba(23, 105, 224, 0.12)', paddingBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--violet)', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
                    // 2. NON-TECHNICAL EVENT
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--violet)', fontSize: '0.85rem', background: 'rgba(108, 77, 255, 0.08)', padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                    INCLUDED IN ₹199 PACKAGE
                  </span>
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {currentNonTechEvent?.name}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Participant: {formData.fullName} ({participants} Registered)
                </div>
              </div>

              {/* Total Calculation */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '0.5rem',
                }}
              >
                <div>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    TOTAL AMOUNT:
                  </span>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
                    Calculation: {participants} × ₹199 = ₹{totalFee}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: '2rem',
                    fontWeight: 900,
                    color: 'var(--primary-blue)',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  ₹{totalFee}
                </div>
              </div>
            </div>

            {/* UPI Payment Box */}
            <div
              style={{
                background: '#ffffff',
                border: '1.5px solid rgba(23, 105, 224, 0.22)',
                borderRadius: '24px',
                boxShadow: '0 12px 35px rgba(23, 105, 224, 0.08)',
                padding: '1.75rem',
                marginBottom: '2rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(23, 105, 224, 0.12)',
                  paddingBottom: '0.85rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <QrCode size={20} color="#1769e0" />
                  <span style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-main)' }}>
                    SCAN & PAY VIA UPI (₹{totalFee})
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '6px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: '#10b981',
                  }}
                >
                  ZERO CONVENIENCE FEE
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '1.5rem',
                  alignItems: 'center',
                }}
              >
                {/* QR Code Graphic */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      padding: '0.85rem',
                      background: '#ffffff',
                      borderRadius: '16px',
                      border: '1.5px solid rgba(23, 105, 224, 0.25)',
                      boxShadow: '0 8px 24px rgba(23, 105, 224, 0.1)',
                    }}
                  >
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                        `upi://pay?pa=mounishprasanna2415@oksbi&pn=Mounish%20Kumar%20S&am=${totalFee}&cu=INR&tn=CHANNEL2K27%20Registration`
                      )}`}
                      alt="UPI Payment QR Code"
                      width="180"
                      height="180"
                      style={{ display: 'block', borderRadius: '8px' }}
                    />
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                    GPay • PhonePe • Paytm • BHIM
                  </span>
                </div>

                {/* UPI ID Details */}
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)', marginBottom: '0.3rem' }}>
                    OFFICIAL SYMPOSIUM UPI ID:
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'rgba(23, 105, 224, 0.05)',
                      border: '1px solid rgba(23, 105, 224, 0.2)',
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      marginBottom: '1rem',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      mounishprasanna2415@oksbi
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      style={{
                        padding: '0.4rem 0.75rem',
                        borderRadius: '8px',
                        background: copiedUpi ? '#10b981' : '#ffffff',
                        border: '1px solid rgba(23, 105, 224, 0.25)',
                        color: copiedUpi ? '#ffffff' : 'var(--primary-blue)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      {copiedUpi ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Direct Mobile UPI Link */}
                  <div style={{ marginBottom: '1rem' }}>
                    <a
                      href={`upi://pay?pa=mounishprasanna2415@oksbi&pn=Mounish%20Kumar%20S&am=${totalFee}&cu=INR&tn=CHANNEL2K27%20Registration`}
                      className="btn btn-secondary btn-sm"
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        background: 'rgba(23, 105, 224, 0.08)',
                        color: 'var(--primary-blue)',
                        fontWeight: 700,
                      }}
                    >
                      <ExternalLink size={15} />
                      <span>TAP TO PAY VIA UPI APP (MOBILE)</span>
                    </a>
                  </div>

                  {/* UTR Input */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                      UPI REF / UTR TRANSACTION ID (OPTIONAL / ON-SPOT):
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 4289XXXXXXXX (12-digit Ref ID)"
                      value={upiRefId}
                      onChange={(e) => setUpiRefId(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        border: '1px solid rgba(23, 105, 224, 0.22)',
                        background: '#ffffff',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button onClick={handlePrevStep} className="btn btn-secondary" disabled={isSubmitting}>
                <ArrowLeft size={18} />
                <span>EDIT EVENTS & DETAILS</span>
              </button>

              <button
                id="confirm-registration-btn"
                onClick={handleNextStep}
                className="btn btn-primary"
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.8 : 1 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} style={{ animation: 'spinSlow 1s linear infinite' }} />
                    <span>CONFIRMING REGISTRATION...</span>
                  </>
                ) : (
                  <>
                    <span>CONFIRM & GENERATE PASS</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: PASS / CONFIRMATION ================= */}
        {currentStep === 4 && (
          <div style={{ animation: 'fadeIn 0.3s ease-out', textAlign: 'center' }}>
            {/* Success Header */}
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981 0%, #00b8d9 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)',
              }}
            >
              <CheckCircle size={36} />
            </div>

            <div
              style={{
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                color: '#10b981',
                letterSpacing: '0.12em',
                marginBottom: '0.3rem',
              }}
            >
              REGISTRATION CONFIRMED
            </div>

            <h3
              style={{
                fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                color: 'var(--text-main)',
                marginBottom: '0.5rem',
              }}
            >
              REGISTRATION SUCCESSFUL!
            </h3>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto 2rem auto' }}>
              Welcome to CHANNEL 2K27! Your delegate pass has been created. Please present this digital pass at the registration desk on event day.
            </p>

            {/* Digital Delegate Pass Card */}
            <div
              id="delegate-pass-card"
              style={{
                background: 'linear-gradient(145deg, #ffffff 0%, #f4f9ff 100%)',
                borderRadius: '24px',
                border: '2px solid rgba(23, 105, 224, 0.25)',
                boxShadow: '0 20px 50px rgba(23, 105, 224, 0.1), 0 0 30px rgba(0, 153, 184, 0.05)',
                padding: '2rem',
                textAlign: 'left',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '2rem',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '6px',
                  background: 'var(--grad-tech)',
                }}
              />

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  borderBottom: '1px solid rgba(23, 105, 224, 0.12)',
                  paddingBottom: '1rem',
                  marginBottom: '1.25rem',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--primary-blue)' }}>
                    APEC // S.E.C.E. OFFICIAL PASS
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-main)' }}>
                    CHANNEL 2K27
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Adhiparasakthi Engineering College, Melmaruvathur
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
                    REGISTRATION ID
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      color: 'var(--primary-blue)',
                      background: 'rgba(23, 105, 224, 0.08)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                    }}
                  >
                    {registrationId}
                  </div>
                </div>
              </div>

              {/* Pass Details */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
                    DELEGATE NAME
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {formData.fullName}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
                    INSTITUTION
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {formData.collegeName}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
                    FOOD PREFERENCE
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: formData.foodPreference === 'Veg' ? '#10b981' : '#e11d48' }}>
                    {formData.foodPreference}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
                    PACKAGE & PARTICIPANTS
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {registeredData?.numberOfParticipants || participants} Participant{(registeredData?.numberOfParticipants || participants) > 1 ? 's' : ''} (₹199/head)
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
                    TOTAL AMOUNT
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--primary-blue)', fontFamily: 'var(--font-heading)' }}>
                    ₹{registeredData?.totalAmount || totalFee}
                  </div>
                </div>
              </div>

              {/* Registered Events Tags */}
              <div
                style={{
                  padding: '1rem',
                  background: 'rgba(240, 248, 255, 0.9)',
                  border: '1px solid rgba(23, 105, 224, 0.16)',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary-blue)' }}>
                    TECHNICAL: {registeredData?.technicalEvent?.name || currentTechEvent?.name}
                  </span>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--primary-blue)', background: 'rgba(23, 105, 224, 0.08)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                    INCLUDED IN ₹199 PACKAGE
                  </span>
                </div>
                {isPaperPresentationSelected && (
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    Team Presenters ({registeredData?.numberOfParticipants || participants}): {paperTeamMembers.slice(0, registeredData?.numberOfParticipants || participants).join(', ')}
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--violet)' }}>
                    NON-TECHNICAL: {registeredData?.nonTechnicalEvent?.name || currentNonTechEvent?.name}
                  </span>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--violet)', background: 'rgba(108, 77, 255, 0.08)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                    INCLUDED IN ₹199 PACKAGE
                  </span>
                </div>
              </div>
            </div>

            {/* Pass Actions */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1rem',
              }}
            >
              <button onClick={handlePrintPass} className="btn btn-primary">
                <Download size={18} />
                <span>SAVE / PRINT REGISTRATION DETAILS</span>
              </button>

              <button onClick={handleResetForm} className="btn btn-secondary">
                <RefreshCw size={17} />
                <span>REGISTER ANOTHER DELEGATE</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
