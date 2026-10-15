import React, { useState, useEffect } from 'react';
import { Cpu, Zap, Activity, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ChipLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const telemetrySteps = [
    { code: '01', text: 'POWERING HIGH-SPEED SEMICONDUCTOR BUS (1.8V)...' },
    { code: '02', text: 'INITIALIZING S.E.C.E. VLSI LOGIC GATES...' },
    { code: '03', text: 'CALIBRATING 2.7 GHz HIGH-PRECISION OSCILLATOR...' },
    { code: '04', text: 'SYNCHRONIZING SYMPOSIUM EVENT PLATFORMS...' },
    { code: '05', text: 'CHANNEL 2K27 QUANTUM PORTAL READY • ACCESS GRANTED' },
  ];

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2000; // 2 seconds total load

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(pct);

      const step = Math.min(
        Math.floor((pct / 100) * telemetrySteps.length),
        telemetrySteps.length - 1
      );
      setCurrentStepIndex(step);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 450);
        }, 280);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Radius & circumference for SVG circular progress gauge
  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#f5faff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        opacity: isFadingOut ? 0 : 1,
        transform: isFadingOut ? 'scale(1.03)' : 'scale(1)',
        transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isFadingOut ? 'none' : 'auto',
        overflow: 'hidden',
      }}
    >
      {/* Background Blueprint Grid Texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(23, 105, 224, 0.08) 0%, transparent 65%),
            linear-gradient(rgba(23, 105, 224, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(23, 105, 224, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 36px 36px, 36px 36px',
          pointerEvents: 'none',
        }}
      />

      {/* Futuristic Circular Quantum Orbital Assembly */}
      <div
        style={{
          position: 'relative',
          width: '210px',
          height: '210px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '2.2rem',
        }}
      >
        {/* Soft Ambient Radial Halo */}
        <div
          style={{
            position: 'absolute',
            inset: '-18px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(23, 105, 224, 0.16) 0%, rgba(0, 153, 184, 0.08) 45%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />

        {/* Multi-layered SVG Gyro Assembly & Dynamic Progress Arc */}
        <svg
          width="210"
          height="210"
          viewBox="0 0 210 210"
          fill="none"
          style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}
        >
          {/* Subtle Background Track Ring */}
          <circle
            cx="105"
            cy="105"
            r={radius}
            stroke="rgba(23, 105, 224, 0.1)"
            strokeWidth="5"
          />

          {/* Dynamic Laser Progress Arc */}
          <circle
            cx="105"
            cy="105"
            r={radius}
            stroke="url(#progressGradient)"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: 'stroke-dashoffset 0.06s linear',
              filter: 'drop-shadow(0 0 6px rgba(23, 105, 224, 0.4))',
            }}
          />

          {/* Concentric Precision Dials */}
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1769e0" />
              <stop offset="50%" stopColor="#0099b8" />
              <stop offset="100%" stopColor="#6c4dff" />
            </linearGradient>
          </defs>
        </svg>

        {/* Counter-Clockwise Dotted Gyro Orbit */}
        <svg
          width="180"
          height="180"
          viewBox="0 0 180 180"
          fill="none"
          style={{
            position: 'absolute',
            animation: 'spinReverse 9s linear infinite',
            transformOrigin: 'center',
          }}
        >
          <circle
            cx="90"
            cy="90"
            r="82"
            stroke="rgba(108, 77, 255, 0.35)"
            strokeWidth="1.6"
            strokeDasharray="6 10 14 8"
            strokeLinecap="round"
          />
        </svg>

        {/* Clockwise Segmented Dial Ring */}
        <svg
          width="150"
          height="150"
          viewBox="0 0 150 150"
          fill="none"
          style={{
            position: 'absolute',
            animation: 'spinSlow 14s linear infinite',
            transformOrigin: 'center',
          }}
        >
          <circle
            cx="75"
            cy="75"
            r="68"
            stroke="rgba(0, 153, 184, 0.45)"
            strokeWidth="1.8"
            strokeDasharray="18 10 32 14"
            strokeLinecap="round"
          />
        </svg>

        {/* Central Frosted Glass Shield & Percentage Readout */}
        <div
          style={{
            width: '105px',
            height: '105px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 248, 255, 0.9) 100%)',
            border: '2px solid rgba(23, 105, 224, 0.3)',
            boxShadow: '0 8px 24px rgba(23, 105, 224, 0.15), inset 0 0 12px rgba(23, 105, 224, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            position: 'relative',
          }}
        >
          <Cpu size={24} color="#1769e0" style={{ marginBottom: '2px' }} />
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1.45rem',
              fontWeight: 900,
              color: 'var(--text-main)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            {progress}<span style={{ fontSize: '0.85rem', color: 'var(--primary-blue)' }}>%</span>
          </div>
          <div
            style={{
              fontSize: '0.55rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-light)',
              fontWeight: 700,
              letterSpacing: '0.12em',
              marginTop: '2px',
            }}
          >
            SYSTEM BUS
          </div>
        </div>
      </div>

      {/* Brand Header */}
      <div style={{ textAlign: 'center', marginBottom: '1.4rem', position: 'relative', zIndex: 1 }}>
        <h1
          className="brand-shimmer-text"
          style={{
            fontSize: 'clamp(1.6rem, 3.8vw, 2.3rem)',
            fontWeight: 900,
            fontFamily: 'var(--font-heading)',
            letterSpacing: '0.06em',
            marginBottom: '0.25rem',
          }}
        >
          CHANNEL 2K27
        </h1>

        <div
          style={{
            fontSize: '0.78rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: 'var(--text-muted)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: '0.2rem',
          }}
        >
          NATIONAL LEVEL TECHNICAL SYMPOSIUM • S.E.C.E.
        </div>

        <div
          style={{
            fontSize: '0.72rem',
            color: 'var(--text-light)',
            fontWeight: 600,
            letterSpacing: '0.06em',
          }}
        >
          Adhiparasakthi Engineering College • Melmaruvathur
        </div>
      </div>

      {/* Audio-Frequency Simulation Visualizer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          height: '24px',
          marginBottom: '1.25rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {[0.4, 0.7, 1.0, 0.6, 0.9, 0.5, 0.8, 1.0, 0.7, 0.5, 0.9, 0.6].map((scale, i) => {
          const height = Math.max(6, Math.min(22, Math.round(scale * 16 * (0.6 + (progress % 40) / 100))));
          return (
            <div
              key={i}
              style={{
                width: '3.5px',
                height: `${height}px`,
                background: i % 2 === 0 ? 'var(--primary-blue)' : 'var(--cyan)',
                borderRadius: '2px',
                transition: 'height 0.15s ease',
                opacity: 0.85,
              }}
            />
          );
        })}
      </div>

      {/* Terminal Diagnostic Box */}
      <div
        style={{
          maxWidth: '460px',
          width: '100%',
          padding: '0.65rem 1.1rem',
          borderRadius: '12px',
          background: '#ffffff',
          border: '1px solid rgba(23, 105, 224, 0.22)',
          boxShadow: '0 4px 18px rgba(23, 105, 224, 0.08)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.76rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          marginBottom: '1.25rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', overflow: 'hidden' }}>
          <span className="pulsing-node" style={{ width: '7px', height: '7px' }} />
          <span style={{ color: 'var(--primary-blue)', fontWeight: 700, whiteSpace: 'nowrap' }}>
            [{telemetrySteps[currentStepIndex].code}/05]
          </span>
          <span
            style={{
              color: 'var(--text-main)',
              fontWeight: 600,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {telemetrySteps[currentStepIndex].text}
          </span>
        </div>

        <Zap size={14} color="#1769e0" style={{ flexShrink: 0 }} />
      </div>

      {/* Telemetry Chips */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.65rem',
          justifyContent: 'center',
          marginBottom: '1.5rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontSize: '0.66rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            padding: '0.3rem 0.65rem',
            background: 'rgba(23, 105, 224, 0.06)',
            border: '1px solid rgba(23, 105, 224, 0.16)',
            borderRadius: '8px',
            color: 'var(--primary-blue)',
          }}
        >
          CLK: 2.7 GHz
        </span>

        <span
          style={{
            fontSize: '0.66rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            padding: '0.3rem 0.65rem',
            background: 'rgba(0, 153, 184, 0.06)',
            border: '1px solid rgba(0, 153, 184, 0.18)',
            borderRadius: '8px',
            color: 'var(--cyan)',
          }}
        >
          GPS: 12.4369° N, 79.8219° E
        </span>

        <span
          style={{
            fontSize: '0.66rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            padding: '0.3rem 0.65rem',
            background: 'rgba(108, 77, 255, 0.06)',
            border: '1px solid rgba(108, 77, 255, 0.18)',
            borderRadius: '8px',
            color: 'var(--violet)',
          }}
        >
          HOST: S.E.C.E.
        </span>
      </div>

      {/* Skip Button */}
      <button
        onClick={() => {
          setIsFadingOut(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 350);
        }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'transparent',
          border: '1px solid rgba(23, 105, 224, 0.25)',
          padding: '0.45rem 1rem',
          borderRadius: '9999px',
          color: 'var(--text-muted)',
          fontSize: '0.72rem',
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          cursor: 'pointer',
          letterSpacing: '0.08em',
          transition: 'all 0.2s ease',
          zIndex: 1,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(23, 105, 224, 0.08)';
          e.currentTarget.style.color = 'var(--primary-blue)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'var(--text-muted)';
        }}
      >
        <span>SKIP INTRO</span>
        <ArrowRight size={13} />
      </button>
    </div>
  );
}
