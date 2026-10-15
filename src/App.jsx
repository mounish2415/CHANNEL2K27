import React, { useState } from 'react';
import CanvasBackground from './components/CanvasBackground';
import CircuitTracer from './components/CircuitTracer';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import About from './components/About';
import Associations from './components/Associations';
import Events from './components/Events';
import Schedule from './components/Schedule';
import Team from './components/Team';
import Venue from './components/Venue';
import Footer from './components/Footer';
import EventModal from './components/EventModal';
import ChipLoader from './components/ChipLoader';

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

      {/* Sticky Glass Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Live Event Countdown */}
        <Countdown />

        {/* About Section */}
        <About />

        {/* Collaborating Associations & Logos */}
        <Associations />

        {/* Technical & Non-Technical Events */}
        <Events onOpenDetails={handleOpenEventModal} />

        {/* Event Schedule Timeline */}
        <Schedule />

        {/* Organizing Team */}
        <Team />

        {/* Venue Location & Travel Guide */}
        <Venue />
      </main>

      {/* Footer */}
      <Footer />

      {/* Event Details Interactive Modal */}
      {activeModalEvent && (
        <EventModal
          event={activeModalEvent}
          onClose={handleCloseEventModal}
        />
      )}
    </div>
  );
}
