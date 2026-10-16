import React, { useState, useEffect } from 'react';
import { CalendarPlus, Clock, Bell, Sparkles, Check } from 'lucide-react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [copiedReminder, setCopiedReminder] = useState(false);

  useEffect(() => {
    // Registration Deadline: 1 November 2026 11:59:59 PM IST
    const targetDate = new Date('2026-11-01T23:59:59+05:30').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  const handleDownloadICS = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//CHANNEL 2K27//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'DTSTART:20261103T033000Z',
      'DTEND:20261103T113000Z',
      'SUMMARY:CHANNEL 2K27 - National Level Technical Symposium',
      'DESCRIPTION:CHANNEL 2K27 organized by Society of Electronics and Communication Engineering (SECE), Adhiparasakthi Engineering College. Connect. Collaborate. Create. Venue: APEC Central Library.',
      'LOCATION:APEC Central Library, Adhiparasakthi Engineering College, Melmaruvathur - 603319, Tamil Nadu',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'CHANNEL_2K27_Symposium.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCopiedReminder(true);
    setTimeout(() => setCopiedReminder(false), 3000);
  };

  const timeUnits = [
    { label: 'DAYS', value: formatNumber(timeLeft.days), color: '#1769e0' },
    { label: 'HOURS', value: formatNumber(timeLeft.hours), color: '#00b8d9' },
    { label: 'MINUTES', value: formatNumber(timeLeft.minutes), color: '#6c4dff' },
    { label: 'SECONDS', value: formatNumber(timeLeft.seconds), color: '#e94eff' },
  ];

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '1100px',
        margin: '-2.5rem auto 3rem auto',
        padding: '0 1.5rem',
      }}
    >
      <div
        className="glass-card"
        style={{
          padding: '2.5rem 2rem',
          borderRadius: '28px',
          border: '1px solid rgba(23, 105, 224, 0.18)',
          boxShadow: '0 20px 50px rgba(23, 105, 224, 0.08), 0 0 30px rgba(0, 153, 184, 0.04)',
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.96) 0%, rgba(245, 250, 255, 0.92) 100%)',
          position: 'relative',
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '2rem',
            paddingBottom: '1.25rem',
            borderBottom: '1px solid rgba(23, 105, 224, 0.12)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'rgba(23, 105, 224, 0.08)',
                border: '1px solid rgba(23, 105, 224, 0.22)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-blue)',
                boxShadow: '0 2px 10px rgba(23, 105, 224, 0.1)',
              }}
            >
              <Clock size={20} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.14em',
                  color: 'var(--primary-blue)',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                }}
              >
                // REGISTRATION_GATEWAY • COUNTDOWN
              </div>
              <h2
                style={{
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.8rem)',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  letterSpacing: '-0.02em',
                }}
              >
                REGISTRATION CLOSES IN…
              </h2>
            </div>
          </div>

          {/* Calendar Action Button */}
          <button
            onClick={handleDownloadICS}
            className="btn btn-secondary btn-sm"
            style={{
              borderRadius: '10px',
              padding: '0.55rem 1rem',
              display: 'inline-flex',
              gap: '0.5rem',
              fontSize: '0.82rem',
            }}
          >
            {copiedReminder ? <Check size={16} color="#10b981" /> : <CalendarPlus size={16} />}
            <span>{copiedReminder ? 'Added to Calendar (.ics)' : 'Add to Calendar'}</span>
          </button>
        </div>

        {/* Counter Semiconductor IC Blocks Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {timeUnits.map((unit, index) => (
            <div
              key={unit.label}
              style={{
                background: '#ffffff',
                border: `1.5px solid ${unit.color}35`,
                borderRadius: '20px',
                padding: '1.6rem 1rem',
                textAlign: 'center',
                boxShadow: `0 8px 24px rgba(23, 105, 224, 0.06), inset 0 0 15px ${unit.color}08`,
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = unit.color;
                e.currentTarget.style.boxShadow = `0 12px 30px rgba(23, 105, 224, 0.12), 0 0 20px ${unit.color}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = `${unit.color}35`;
                e.currentTarget.style.boxShadow = `0 8px 24px rgba(23, 105, 224, 0.06), inset 0 0 15px ${unit.color}08`;
              }}
            >
              {/* Chip Notch at top */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '16px',
                  height: '4px',
                  background: unit.color,
                  borderRadius: '0 0 4px 4px',
                  boxShadow: `0 0 8px ${unit.color}`,
                }}
              />

              {/* Silicon IC Sub-label */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: unit.color,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  marginBottom: '0.35rem',
                }}
              >
                IC-CLK0{index + 1}
              </div>

              <div
                className="mono"
                style={{
                  fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)',
                  fontWeight: 900,
                  lineHeight: 1,
                  color: unit.color,
                  textShadow: `0 0 15px ${unit.color}60`,
                  marginBottom: '0.4rem',
                  letterSpacing: '-0.02em',
                }}
              >
                {unit.value}
              </div>

              <div
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: 'var(--text-muted)',
                }}
              >
                {unit.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Status strip */}
        <div
          style={{
            marginTop: '1.75rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid rgba(23, 105, 224, 0.08)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="pulsing-node" style={{ width: '6px', height: '6px' }} />
            <span>Registration Deadline: Sunday, November 1, 2026 • 11:59 PM IST</span>
          </div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--primary-blue)', fontWeight: 600 }}>
            EVENT DATE // NOV 03, 2026
          </div>
        </div>
      </div>
    </div>
  );
}
