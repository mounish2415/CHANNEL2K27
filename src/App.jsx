import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CanvasBackground from './components/CanvasBackground';
import CircuitTracer from './components/CircuitTracer';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EventModal from './components/EventModal';
import ChipLoader from './components/ChipLoader';
import ScrollToTop from './components/ScrollToTop';

// Page Components
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import AgendaPage from './pages/AgendaPage';
import TeamPage from './pages/TeamPage';
import VenuePage from './pages/VenuePage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [bootLoading, setBootLoading] = useState(true);
  const [activeModalEvent, setActiveModalEvent] = useState(null);

  const handleOpenEventModal = (event) => {
    setActiveModalEvent(event);
  };

  const handleCloseEventModal = () => {
    setActiveModalEvent(null);
  };

  return (
    <div className="app-container">
      {/* Semiconductor IC Bootloader Animation */}
      {bootLoading && <ChipLoader onComplete={() => setBootLoading(false)} />}

      {/* Background Interactive Particle Canvas */}
      <CanvasBackground />

      {/* Background Circuit Grid Texture Overlay */}
      <div className="circuit-bg-overlay" />

      {/* Floating Circuit Navigation HUD */}
      <CircuitTracer />

      {/* Automatic Scroll To Top on Route Navigation */}
      <ScrollToTop />

      {/* Consistent Glass Navbar across all pages */}
      <Navbar />

      {/* Main Routed Page Content */}
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/events"
            element={<EventsPage onOpenDetails={handleOpenEventModal} />}
          />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/venue" element={<VenuePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Fallback route to prevent any 404s on unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Persistent Global Footer */}
      <Footer />

      {/* Global Interactive Event Details Modal */}
      {activeModalEvent && (
        <EventModal
          event={activeModalEvent}
          onClose={handleCloseEventModal}
        />
      )}
    </div>
  );
}
