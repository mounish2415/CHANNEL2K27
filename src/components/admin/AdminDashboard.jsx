import React, { useState, useEffect } from 'react';
import {
  Users,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  Download,
  Search,
  Filter,
  Eye,
  Edit2,
  Trash2,
  Plus,
  RefreshCw,
  LogOut,
  ExternalLink,
  Shield,
  Layers,
  Settings,
  Check,
  X,
  AlertTriangle,
  FileSpreadsheet,
  Printer,
  ChevronDown,
} from 'lucide-react';

export default function AdminDashboard({ token, adminUser, onLogout, onReturnToSite }) {
  const [activeTab, setActiveTab] = useState('registrations'); // 'registrations' | 'events' | 'settings'

  // Statistics
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    todayRegistrations: 0,
    totalParticipants: 0,
    totalRevenue: 0,
    paidRegistrations: 0,
    pendingRegistrations: 0,
  });

  // Registrations state
  const [registrations, setRegistrations] = useState([]);
  const [isLoadingRegs, setIsLoadingRegs] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFood, setFilterFood] = useState('');
  const [filterTech, setFilterTech] = useState('');
  const [filterNonTech, setFilterNonTech] = useState('');
  const [filterPayment, setFilterPayment] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Modals
  const [viewRegModal, setViewRegModal] = useState(null);
  const [editRegModal, setEditRegModal] = useState(null);
  const [deleteConfirmReg, setDeleteConfirmReg] = useState(null);

  // Events state
  const [events, setEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [editEventModal, setEditEventModal] = useState(null);
  const [addEventModal, setAddEventModal] = useState(false);

  // Password change state
  const [pwdData, setPwdData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [pwdMsg, setPwdMsg] = useState({ type: '', text: '' });

  // Fetch Dashboard Stats
  const fetchStats = async () => {
    try {
      const res = await fetch('/api/registrations/admin/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  // Fetch Registrations
  const fetchRegistrations = async () => {
    setIsLoadingRegs(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.append('search', searchQuery.trim());
      if (filterFood) params.append('food', filterFood);
      if (filterTech) params.append('techEvent', filterTech);
      if (filterNonTech) params.append('nonTechEvent', filterNonTech);
      if (filterPayment) params.append('paymentStatus', filterPayment);
      if (sortBy) params.append('sort', sortBy);

      const res = await fetch(`/api/registrations/admin/all?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setRegistrations(data.registrations);
      }
    } catch (err) {
      console.error('Error fetching registrations:', err);
    } finally {
      setIsLoadingRegs(false);
    }
  };

  // Fetch Events
  const fetchEvents = async () => {
    setIsLoadingEvents(true);
    try {
      const res = await fetch('/api/events/admin', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setEvents(data.events);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setIsLoadingEvents(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchRegistrations();
    fetchEvents();
  }, [token]);

  useEffect(() => {
    if (activeTab === 'registrations') {
      fetchRegistrations();
    }
  }, [searchQuery, filterFood, filterTech, filterNonTech, filterPayment, sortBy]);

  // Export Excel
  const handleDownloadExcel = () => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append('search', searchQuery.trim());
    if (filterFood) params.append('food', filterFood);
    if (filterTech) params.append('techEvent', filterTech);
    if (filterNonTech) params.append('nonTechEvent', filterNonTech);
    if (filterPayment) params.append('paymentStatus', filterPayment);
    if (sortBy) params.append('sort', sortBy);

    const downloadUrl = `/api/registrations/admin/export?${params.toString()}`;
    fetch(downloadUrl, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Symposium_Registrations.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch((err) => console.error('Excel download failed:', err));
  };

  // Edit Registration Payment Status
  const handleSaveRegistrationEdit = async (e) => {
    e.preventDefault();
    if (!editRegModal) return;

    try {
      const res = await fetch(`/api/registrations/admin/${editRegModal._id || editRegModal.registrationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          paymentStatus: editRegModal.paymentStatus,
          upiRefId: editRegModal.upiRefId,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setEditRegModal(null);
        fetchRegistrations();
        fetchStats();
      }
    } catch (err) {
      alert('Failed to update registration status');
    }
  };

  // Soft Delete Registration
  const handleDeleteRegistration = async () => {
    if (!deleteConfirmReg) return;

    try {
      const res = await fetch(`/api/registrations/admin/${deleteConfirmReg._id || deleteConfirmReg.registrationId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.success) {
        setDeleteConfirmReg(null);
        fetchRegistrations();
        fetchStats();
      }
    } catch (err) {
      alert('Failed to delete registration');
    }
  };

  // Save Event Edit / Update
  const handleSaveEventEdit = async (e) => {
    e.preventDefault();
    if (!editEventModal) return;

    try {
      const res = await fetch(`/api/events/${editEventModal.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editEventModal.name,
          category: editEventModal.category,
          fee: Number(editEventModal.fee),
          pricingType: editEventModal.pricingType,
          maxTeamSize: Number(editEventModal.maxTeamSize),
          status: editEventModal.status,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setEditEventModal(null);
        fetchEvents();
      }
    } catch (err) {
      alert('Failed to update event');
    }
  };

  // Add New Event
  const [newEventData, setNewEventData] = useState({
    name: '',
    category: 'TECHNICAL',
    fee: 100,
    pricingType: 'per_person',
    maxTeamSize: 1,
    status: 'ACTIVE',
    tagline: '',
  });

  const handleCreateNewEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEventData),
      });

      const data = await res.json();
      if (data.success) {
        setAddEventModal(false);
        setNewEventData({
          name: '',
          category: 'TECHNICAL',
          fee: 100,
          pricingType: 'per_person',
          maxTeamSize: 1,
          status: 'ACTIVE',
          tagline: '',
        });
        fetchEvents();
      }
    } catch (err) {
      alert('Failed to create event');
    }
  };

  // Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwdMsg({ type: '', text: '' });

    if (pwdData.newPassword !== pwdData.confirmPassword) {
      setPwdMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: pwdData.currentPassword,
          newPassword: pwdData.newPassword,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setPwdMsg({ type: 'success', text: 'Password successfully changed.' });
        setPwdData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setPwdMsg({ type: 'error', text: data.message || 'Failed to update password.' });
      }
    } catch (err) {
      setPwdMsg({ type: 'error', text: 'Failed to update password.' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5faff', color: 'var(--text-main)', paddingBottom: '4rem' }}>
      {/* Top Navbar */}
      <header
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderBottom: '1px solid rgba(23, 105, 224, 0.16)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          padding: '0.85rem 1.5rem',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          {/* Logo & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'var(--grad-tech)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
              }}
            >
              <Shield size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--text-main)', lineHeight: 1.1 }}>
                CHANNEL 2K27 <span className="gradient-text">ADMIN</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Symposium Central Management Console
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(23, 105, 224, 0.06)', padding: '0.25rem', borderRadius: '10px' }}>
            <button
              onClick={() => setActiveTab('registrations')}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'registrations' ? '#ffffff' : 'transparent',
                color: activeTab === 'registrations' ? 'var(--primary-blue)' : 'var(--text-muted)',
                fontWeight: 800,
                fontSize: '0.82rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'registrations' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              Registrations
            </button>
            <button
              onClick={() => setActiveTab('events')}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'events' ? '#ffffff' : 'transparent',
                color: activeTab === 'events' ? 'var(--primary-blue)' : 'var(--text-muted)',
                fontWeight: 800,
                fontSize: '0.82rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'events' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              Event Management
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'settings' ? '#ffffff' : 'transparent',
                color: activeTab === 'settings' ? 'var(--primary-blue)' : 'var(--text-muted)',
                fontWeight: 800,
                fontSize: '0.82rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'settings' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              Admin Settings
            </button>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={onReturnToSite}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.78rem' }}
            >
              <ExternalLink size={14} />
              <span>Symposium Website</span>
            </button>

            <button
              onClick={onLogout}
              className="btn btn-sm"
              style={{
                background: 'rgba(239, 68, 68, 0.08)',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                fontSize: '0.78rem',
              }}
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1280px', margin: '2rem auto 0 auto', padding: '0 1.5rem' }}>
        {/* STATS METRIC CARDS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2rem',
          }}
        >
          {/* Total Registrations */}
          <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '18px', border: '1px solid rgba(23, 105, 224, 0.18)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-muted)' }}>
                TOTAL REGISTRATIONS
              </span>
              <Users size={18} color="#1769e0" />
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 900, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
              {stats.totalRegistrations}
            </div>
          </div>

          {/* Today's Registrations */}
          <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '18px', border: '1px solid rgba(23, 105, 224, 0.18)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-muted)' }}>
                TODAY'S REGISTRATIONS
              </span>
              <Calendar size={18} color="#00b8d9" />
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 900, color: 'var(--primary-blue)', fontFamily: 'var(--font-heading)' }}>
              {stats.todayRegistrations}
            </div>
          </div>

          {/* Total Participants */}
          <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '18px', border: '1px solid rgba(23, 105, 224, 0.18)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-muted)' }}>
                TOTAL PARTICIPANTS
              </span>
              <Layers size={18} color="#6c4dff" />
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 900, color: 'var(--violet)', fontFamily: 'var(--font-heading)' }}>
              {stats.totalParticipants}
            </div>
          </div>

          {/* Total Revenue */}
          <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '18px', border: '1px solid rgba(23, 105, 224, 0.18)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-muted)' }}>
                TOTAL REVENUE
              </span>
              <DollarSign size={18} color="#10b981" />
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#10b981', fontFamily: 'var(--font-heading)' }}>
              ₹{(stats.totalParticipants * 199).toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
              {stats.totalParticipants} Participants × ₹199
            </div>
          </div>

          {/* Paid Registrations */}
          <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '18px', border: '1px solid rgba(23, 105, 224, 0.18)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-muted)' }}>
                PAID REGISTRATIONS
              </span>
              <CheckCircle size={18} color="#10b981" />
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#10b981', fontFamily: 'var(--font-heading)' }}>
              {stats.paidRegistrations}
            </div>
          </div>

          {/* Pending Registrations */}
          <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '18px', border: '1px solid rgba(23, 105, 224, 0.18)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-muted)' }}>
                PENDING PAYMENTS
              </span>
              <Clock size={18} color="#f59e0b" />
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#f59e0b', fontFamily: 'var(--font-heading)' }}>
              {stats.pendingRegistrations}
            </div>
          </div>
        </div>

        {/* ================= TAB 1: REGISTRATIONS MANAGEMENT ================= */}
        {activeTab === 'registrations' && (
          <div>
            {/* Action Bar & Filters */}
            <div
              className="glass-card"
              style={{
                padding: '1.5rem',
                borderRadius: '20px',
                marginBottom: '1.5rem',
                border: '1px solid rgba(23, 105, 224, 0.18)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1.25rem',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    Registration Management
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Showing {registrations.length} delegate record(s).
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button onClick={fetchRegistrations} className="btn btn-secondary btn-sm">
                    <RefreshCw size={15} />
                    <span>Refresh</span>
                  </button>

                  <button onClick={handleDownloadExcel} className="btn btn-primary btn-sm">
                    <FileSpreadsheet size={16} />
                    <span>Download Excel</span>
                  </button>
                </div>
              </div>

              {/* Search and Filters Strip */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '0.75rem',
                }}
              >
                {/* Search */}
                <div style={{ position: 'relative' }}>
                  <Search size={16} style={{ position: 'absolute', top: '11px', left: '12px', color: 'var(--text-light)' }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, college, email, ID..."
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.8rem 0.6rem 2.2rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(23, 105, 224, 0.2)',
                      background: '#ffffff',
                      fontSize: '0.84rem',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Technical Event Filter */}
                <select
                  value={filterTech}
                  onChange={(e) => setFilterTech(e.target.value)}
                  style={{
                    padding: '0.6rem 0.8rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(23, 105, 224, 0.2)',
                    background: '#ffffff',
                    fontSize: '0.84rem',
                    outline: 'none',
                  }}
                >
                  <option value="">All Technical Events</option>
                  {events
                    .filter((e) => e.category === 'TECHNICAL')
                    .map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                </select>

                {/* Non-Technical Event Filter */}
                <select
                  value={filterNonTech}
                  onChange={(e) => setFilterNonTech(e.target.value)}
                  style={{
                    padding: '0.6rem 0.8rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(23, 105, 224, 0.2)',
                    background: '#ffffff',
                    fontSize: '0.84rem',
                    outline: 'none',
                  }}
                >
                  <option value="">All Non-Technical Events</option>
                  {events
                    .filter((e) => e.category === 'NON-TECHNICAL')
                    .map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                </select>

                {/* Food Preference Filter */}
                <select
                  value={filterFood}
                  onChange={(e) => setFilterFood(e.target.value)}
                  style={{
                    padding: '0.6rem 0.8rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(23, 105, 224, 0.2)',
                    background: '#ffffff',
                    fontSize: '0.84rem',
                    outline: 'none',
                  }}
                >
                  <option value="">All Food (Veg & Non-Veg)</option>
                  <option value="Veg">Vegetarian Only</option>
                  <option value="Non-Veg">Non-Vegetarian Only</option>
                </select>

                {/* Payment Status Filter */}
                <select
                  value={filterPayment}
                  onChange={(e) => setFilterPayment(e.target.value)}
                  style={{
                    padding: '0.6rem 0.8rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(23, 105, 224, 0.2)',
                    background: '#ffffff',
                    fontSize: '0.84rem',
                    outline: 'none',
                  }}
                >
                  <option value="">All Payment Statuses</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                  <option value="Refunded">Refunded</option>
                </select>

                {/* Sorting */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '0.6rem 0.8rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(23, 105, 224, 0.2)',
                    background: '#ffffff',
                    fontSize: '0.84rem',
                    outline: 'none',
                  }}
                >
                  <option value="newest">Sort: Newest First</option>
                  <option value="oldest">Sort: Oldest First</option>
                  <option value="name">Sort: Participant Name</option>
                  <option value="amount">Sort: Amount (High to Low)</option>
                </select>
              </div>
            </div>

            {/* Registrations Table */}
            <div
              className="glass-card"
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(23, 105, 224, 0.18)',
              }}
            >
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(23, 105, 224, 0.06)', borderBottom: '1px solid rgba(23, 105, 224, 0.14)' }}>
                      <th style={{ padding: '0.9rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)' }}>REGISTRATION ID</th>
                      <th style={{ padding: '0.9rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)' }}>PRIMARY PARTICIPANT</th>
                      <th style={{ padding: '0.9rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)' }}>TECHNICAL EVENT</th>
                      <th style={{ padding: '0.9rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)' }}>NON-TECHNICAL EVENT</th>
                      <th style={{ padding: '0.9rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)' }}>PARTICIPANTS</th>
                      <th style={{ padding: '0.9rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)' }}>FEE / HEAD</th>
                      <th style={{ padding: '0.9rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)' }}>TOTAL AMOUNT</th>
                      <th style={{ padding: '0.9rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)' }}>FOOD</th>
                      <th style={{ padding: '0.9rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)' }}>PAYMENT STATUS</th>
                      <th style={{ padding: '0.9rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)', textAlign: 'right' }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.length === 0 ? (
                      <tr>
                        <td colSpan="10" style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                          No registrations found matching the specified filters.
                        </td>
                      </tr>
                    ) : (
                      registrations.map((r) => {
                        const participantsCount = r.numberOfParticipants || r.technicalEvent?.teamSize || 1;
                        const total = r.totalAmount || (participantsCount * 199);
                        return (
                          <tr
                            key={r.registrationId}
                            style={{
                              borderBottom: '1px solid rgba(23, 105, 224, 0.08)',
                              transition: 'background 0.2s',
                            }}
                          >
                            <td style={{ padding: '0.9rem 1rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--primary-blue)' }}>
                              {r.registrationId}
                            </td>
                            <td style={{ padding: '0.9rem 1rem' }}>
                              <div style={{ fontWeight: 800, color: 'var(--text-main)' }}>{r.fullName}</div>
                              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{r.collegeName} • {r.phone}</div>
                            </td>
                            <td style={{ padding: '0.9rem 1rem' }}>
                              <span style={{ fontWeight: 700, color: '#1769e0' }}>{r.technicalEvent?.name || 'N/A'}</span>
                            </td>
                            <td style={{ padding: '0.9rem 1rem' }}>
                              <span style={{ fontWeight: 700, color: '#6c4dff' }}>{r.nonTechnicalEvent?.name || 'N/A'}</span>
                            </td>
                            <td style={{ padding: '0.9rem 1rem', fontFamily: 'var(--font-mono)', fontWeight: 800, textAlign: 'center' }}>
                              {participantsCount}
                            </td>
                            <td style={{ padding: '0.9rem 1rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-muted)' }}>
                              ₹199
                            </td>
                            <td style={{ padding: '0.9rem 1rem', fontFamily: 'var(--font-mono)', fontWeight: 900, color: 'var(--primary-blue)' }}>
                              ₹{total}
                            </td>
                            <td style={{ padding: '0.9rem 1rem' }}>
                              <span
                                style={{
                                  fontSize: '0.72rem',
                                  fontWeight: 800,
                                  padding: '0.2rem 0.55rem',
                                  borderRadius: '6px',
                                  background: r.foodPreference === 'Veg' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(225, 29, 72, 0.1)',
                                  color: r.foodPreference === 'Veg' ? '#10b981' : '#e11d48',
                                }}
                              >
                                {r.foodPreference || 'Veg'}
                              </span>
                            </td>
                            <td style={{ padding: '0.9rem 1rem' }}>
                              <span
                                style={{
                                  fontSize: '0.72rem',
                                  fontWeight: 800,
                                  padding: '0.2rem 0.55rem',
                                  borderRadius: '6px',
                                  background: r.paymentStatus === 'Paid' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                                  color: r.paymentStatus === 'Paid' ? '#10b981' : '#f59e0b',
                                }}
                              >
                                {r.paymentStatus || 'Paid'}
                              </span>
                            </td>
                          <td style={{ padding: '0.9rem 1rem', textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                              <button
                                onClick={() => setViewRegModal(r)}
                                title="View Details"
                                style={{
                                  padding: '0.35rem 0.5rem',
                                  borderRadius: '6px',
                                  border: '1px solid rgba(23, 105, 224, 0.25)',
                                  background: '#ffffff',
                                  color: 'var(--primary-blue)',
                                  cursor: 'pointer',
                                }}
                              >
                                <Eye size={15} />
                              </button>
                              <button
                                onClick={() => setEditRegModal({ ...r })}
                                title="Edit Status"
                                style={{
                                  padding: '0.35rem 0.5rem',
                                  borderRadius: '6px',
                                  border: '1px solid rgba(23, 105, 224, 0.25)',
                                  background: '#ffffff',
                                  color: '#00b8d9',
                                  cursor: 'pointer',
                                }}
                              >
                                <Edit2 size={15} />
                              </button>
                              <button
                                onClick={() => setDeleteConfirmReg(r)}
                                title="Delete"
                                style={{
                                  padding: '0.35rem 0.5rem',
                                  borderRadius: '6px',
                                  border: '1px solid rgba(239, 68, 68, 0.25)',
                                  background: '#ffffff',
                                  color: '#ef4444',
                                  cursor: 'pointer',
                                }}
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: EVENT MANAGEMENT ================= */}
        {activeTab === 'events' && (
          <div>
            <div
              className="glass-card"
              style={{
                padding: '1.5rem',
                borderRadius: '20px',
                marginBottom: '1.5rem',
                border: '1px solid rgba(23, 105, 224, 0.18)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Event & Pricing Management
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Configure registration fees, pricing rules (Per Person / Per Team), and maximum team sizes.
                </p>
              </div>

              <button onClick={() => setAddEventModal(true)} className="btn btn-primary btn-sm">
                <Plus size={16} />
                <span>Add New Event</span>
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="glass-card"
                  style={{
                    padding: '1.5rem',
                    borderRadius: '20px',
                    border: '1.5px solid rgba(23, 105, 224, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 800,
                          padding: '0.2rem 0.55rem',
                          borderRadius: '6px',
                          background: evt.category === 'TECHNICAL' ? 'rgba(23, 105, 224, 0.1)' : 'rgba(108, 77, 255, 0.1)',
                          color: evt.category === 'TECHNICAL' ? '#1769e0' : '#6c4dff',
                        }}
                      >
                        {evt.category}
                      </span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          padding: '0.2rem 0.55rem',
                          borderRadius: '6px',
                          background: evt.status === 'ACTIVE' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                          color: evt.status === 'ACTIVE' ? '#10b981' : '#ef4444',
                        }}
                      >
                        {evt.status}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                      {evt.name}
                    </h4>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--primary-blue)', fontFamily: 'var(--font-heading)' }}>
                        ₹{evt.fee}
                      </span>
                      <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                        / {evt.pricingType === 'per_team' ? 'TEAM' : 'PERSON'}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                      • Max Team Size: <strong>{evt.maxTeamSize} member(s)</strong>
                      <br />
                      • Pricing Rule: <strong>{evt.pricingType === 'per_team' ? 'Flat Per Team' : 'Per Person Rate'}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => setEditEventModal({ ...evt })}
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      <Edit2 size={14} />
                      <span>Edit Event</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: ADMIN SETTINGS ================= */}
        {activeTab === 'settings' && (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div
              className="glass-card"
              style={{
                padding: '2rem',
                borderRadius: '24px',
                border: '1px solid rgba(23, 105, 224, 0.2)',
              }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                Admin Account & Security
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
                Change your dashboard password or view system administrative details.
              </p>

              {pwdMsg.text && (
                <div
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    marginBottom: '1.25rem',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    background: pwdMsg.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: pwdMsg.type === 'success' ? '#10b981' : '#ef4444',
                    border: `1px solid ${pwdMsg.type === 'success' ? '#10b981' : '#ef4444'}`,
                  }}
                >
                  {pwdMsg.text}
                </div>
              )}

              <form onSubmit={handleChangePassword}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-main)' }}>
                    Current Password
                  </label>
                  <input
                    type="password"
                    required
                    value={pwdData.currentPassword}
                    onChange={(e) => setPwdData((p) => ({ ...p, currentPassword: e.target.value }))}
                    placeholder="Enter current password"
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.9rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(23, 105, 224, 0.2)',
                      background: '#ffffff',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-main)' }}>
                    New Password (Min 6 chars)
                  </label>
                  <input
                    type="password"
                    required
                    value={pwdData.newPassword}
                    onChange={(e) => setPwdData((p) => ({ ...p, newPassword: e.target.value }))}
                    placeholder="Enter new strong password"
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.9rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(23, 105, 224, 0.2)',
                      background: '#ffffff',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.75rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-main)' }}>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={pwdData.confirmPassword}
                    onChange={(e) => setPwdData((p) => ({ ...p, confirmPassword: e.target.value }))}
                    placeholder="Confirm new password"
                    style={{
                      width: '100%',
                      padding: '0.7rem 0.9rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(23, 105, 224, 0.2)',
                      background: '#ffffff',
                      outline: 'none',
                    }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <span>Update Password</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* ================= VIEW REGISTRATION MODAL ================= */}
      {viewRegModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(23, 35, 60, 0.65)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setViewRegModal(null)}
        >
          <div
            className="glass-card"
            style={{
              width: '100%',
              maxWidth: '640px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2rem',
              borderRadius: '24px',
              background: '#ffffff',
              border: '2px solid rgba(23, 105, 224, 0.25)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--primary-blue)' }}>
                  REGISTRATION RECORD
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-main)' }}>
                  {viewRegModal.registrationId}
                </h3>
              </div>
              <button
                onClick={() => setViewRegModal(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={22} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>PARTICIPANT NAME</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>{viewRegModal.fullName}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>COLLEGE</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>{viewRegModal.collegeName}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>DEPARTMENT & YEAR</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  {viewRegModal.department} ({viewRegModal.yearOfStudy})
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>CONTACT</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  {viewRegModal.phone} • {viewRegModal.email}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>FOOD PREFERENCE</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: viewRegModal.foodPreference === 'Veg' ? '#10b981' : '#e11d48' }}>
                  {viewRegModal.foodPreference}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>PAYMENT STATUS</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: viewRegModal.paymentStatus === 'Paid' ? '#10b981' : '#f59e0b' }}>
                  {viewRegModal.paymentStatus}
                </div>
              </div>
            </div>

            {/* Events & Package Breakdown */}
            <div style={{ background: 'rgba(240, 248, 255, 0.8)', padding: '1.25rem', borderRadius: '14px', border: '1px solid rgba(23, 105, 224, 0.16)', marginBottom: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1rem', background: '#ffffff', padding: '0.85rem', borderRadius: '10px', border: '1px solid rgba(23, 105, 224, 0.12)' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>NUMBER OF PARTICIPANTS</div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {viewRegModal.numberOfParticipants || viewRegModal.technicalEvent?.teamSize || 1}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>FEE PER HEAD</div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>₹199</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>CALCULATION</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                    {(viewRegModal.numberOfParticipants || viewRegModal.technicalEvent?.teamSize || 1)} × ₹199
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>UPI REF ID</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {viewRegModal.upiRefId || 'VERIFIED_ON_SPOT'}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1769e0' }}>
                    1. TECHNICAL EVENT: {viewRegModal.technicalEvent?.name}
                  </span>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#1769e0', background: 'rgba(23, 105, 224, 0.08)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                    INCLUDED IN ₹199 PACKAGE
                  </span>
                </div>
                {Array.isArray(viewRegModal.technicalEvent?.teamMembers) && viewRegModal.technicalEvent.teamMembers.length > 0 && (
                  <div style={{ marginTop: '0.35rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <strong>Team Presenters ({viewRegModal.technicalEvent.teamMembers.length}):</strong> {viewRegModal.technicalEvent.teamMembers.join(', ')}
                  </div>
                )}
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#6c4dff' }}>
                    2. NON-TECHNICAL EVENT: {viewRegModal.nonTechnicalEvent?.name}
                  </span>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#6c4dff', background: 'rgba(108, 77, 255, 0.08)', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                    INCLUDED IN ₹199 PACKAGE
                  </span>
                </div>
              </div>

              <div style={{ borderTop: '1px dashed rgba(23, 105, 224, 0.25)', marginTop: '1rem', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800 }}>Total Registration Amount:</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--primary-blue)', fontFamily: 'var(--font-heading)' }}>
                  ₹{viewRegModal.totalAmount || ((viewRegModal.numberOfParticipants || viewRegModal.technicalEvent?.teamSize || 1) * 199)}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button onClick={() => window.print()} className="btn btn-secondary btn-sm">
                <Printer size={15} />
                <span>Print Details</span>
              </button>
              <button onClick={() => setViewRegModal(null)} className="btn btn-primary btn-sm">
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT REGISTRATION MODAL ================= */}
      {editRegModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(23, 35, 60, 0.65)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setEditRegModal(null)}
        >
          <div
            className="glass-card"
            style={{
              width: '100%',
              maxWidth: '480px',
              padding: '2rem',
              borderRadius: '24px',
              background: '#ffffff',
              border: '2px solid rgba(23, 105, 224, 0.25)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              Update Payment Status
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Registration: <strong>{editRegModal.registrationId}</strong> ({editRegModal.fullName})
            </p>

            <form onSubmit={handleSaveRegistrationEdit}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Payment Status
                </label>
                <select
                  value={editRegModal.paymentStatus}
                  onChange={(e) => setEditRegModal((prev) => ({ ...prev, paymentStatus: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.9rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(23, 105, 224, 0.2)',
                    background: '#ffffff',
                  }}
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  UPI Ref / UTR Transaction ID
                </label>
                <input
                  type="text"
                  value={editRegModal.upiRefId || ''}
                  onChange={(e) => setEditRegModal((prev) => ({ ...prev, upiRefId: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.9rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(23, 105, 224, 0.2)',
                    background: '#ffffff',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setEditRegModal(null)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      {deleteConfirmReg && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(23, 35, 60, 0.65)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setDeleteConfirmReg(null)}
        >
          <div
            className="glass-card"
            style={{
              width: '100%',
              maxWidth: '440px',
              padding: '2rem',
              borderRadius: '24px',
              background: '#ffffff',
              border: '2px solid rgba(239, 68, 68, 0.3)',
              textAlign: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
              }}
            >
              <AlertTriangle size={28} />
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              Confirm Deletion
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Are you sure you want to delete registration <strong>{deleteConfirmReg.registrationId}</strong> for{' '}
              <strong>{deleteConfirmReg.fullName}</strong>?
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
              <button onClick={() => setDeleteConfirmReg(null)} className="btn btn-secondary btn-sm">
                Cancel
              </button>
              <button
                onClick={handleDeleteRegistration}
                className="btn btn-sm"
                style={{ background: '#ef4444', color: '#ffffff', border: 'none', fontWeight: 700 }}
              >
                Delete Registration
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT EVENT MODAL ================= */}
      {editEventModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(23, 35, 60, 0.65)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setEditEventModal(null)}
        >
          <div
            className="glass-card"
            style={{
              width: '100%',
              maxWidth: '520px',
              padding: '2rem',
              borderRadius: '24px',
              background: '#ffffff',
              border: '2px solid rgba(23, 105, 224, 0.25)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              Edit Event: {editEventModal.name}
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Changes will update live across the website and registration fee calculations.
            </p>

            <form onSubmit={handleSaveEventEdit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Event Name
                </label>
                <input
                  type="text"
                  required
                  value={editEventModal.name}
                  onChange={(e) => setEditEventModal((prev) => ({ ...prev, name: e.target.value }))}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid rgba(23, 105, 224, 0.2)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Category
                  </label>
                  <select
                    value={editEventModal.category}
                    onChange={(e) => setEditEventModal((prev) => ({ ...prev, category: e.target.value }))}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid rgba(23, 105, 224, 0.2)' }}
                  >
                    <option value="TECHNICAL">TECHNICAL</option>
                    <option value="NON-TECHNICAL">NON-TECHNICAL</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Registration Fee (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={editEventModal.fee}
                    onChange={(e) => setEditEventModal((prev) => ({ ...prev, fee: e.target.value }))}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid rgba(23, 105, 224, 0.2)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Pricing Type
                  </label>
                  <select
                    value={editEventModal.pricingType}
                    onChange={(e) => setEditEventModal((prev) => ({ ...prev, pricingType: e.target.value }))}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid rgba(23, 105, 224, 0.2)' }}
                  >
                    <option value="per_person">Per Person</option>
                    <option value="per_team">Per Team</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Max Team Size
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    required
                    value={editEventModal.maxTeamSize}
                    onChange={(e) => setEditEventModal((prev) => ({ ...prev, maxTeamSize: e.target.value }))}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid rgba(23, 105, 224, 0.2)' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Status
                </label>
                <select
                  value={editEventModal.status}
                  onChange={(e) => setEditEventModal((prev) => ({ ...prev, status: e.target.value }))}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid rgba(23, 105, 224, 0.2)' }}
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setEditEventModal(null)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= ADD EVENT MODAL ================= */}
      {addEventModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(23, 35, 60, 0.65)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setAddEventModal(false)}
        >
          <div
            className="glass-card"
            style={{
              width: '100%',
              maxWidth: '520px',
              padding: '2rem',
              borderRadius: '24px',
              background: '#ffffff',
              border: '2px solid rgba(23, 105, 224, 0.25)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              Add New Symposium Event
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Create a new Technical or Non-Technical event with custom fee rules.
            </p>

            <form onSubmit={handleCreateNewEvent}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Event Name *
                </label>
                <input
                  type="text"
                  required
                  value={newEventData.name}
                  onChange={(e) => setNewEventData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Project Presentation"
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid rgba(23, 105, 224, 0.2)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Category *
                  </label>
                  <select
                    value={newEventData.category}
                    onChange={(e) => setNewEventData((prev) => ({ ...prev, category: e.target.value }))}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid rgba(23, 105, 224, 0.2)' }}
                  >
                    <option value="TECHNICAL">TECHNICAL</option>
                    <option value="NON-TECHNICAL">NON-TECHNICAL</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Registration Fee (₹) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={newEventData.fee}
                    onChange={(e) => setNewEventData((prev) => ({ ...prev, fee: e.target.value }))}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid rgba(23, 105, 224, 0.2)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Pricing Type
                  </label>
                  <select
                    value={newEventData.pricingType}
                    onChange={(e) => setNewEventData((prev) => ({ ...prev, pricingType: e.target.value }))}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid rgba(23, 105, 224, 0.2)' }}
                  >
                    <option value="per_person">Per Person</option>
                    <option value="per_team">Per Team</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Max Team Size
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    required
                    value={newEventData.maxTeamSize}
                    onChange={(e) => setNewEventData((prev) => ({ ...prev, maxTeamSize: e.target.value }))}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid rgba(23, 105, 224, 0.2)' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Short Tagline
                </label>
                <input
                  type="text"
                  value={newEventData.tagline}
                  onChange={(e) => setNewEventData((prev) => ({ ...prev, tagline: e.target.value }))}
                  placeholder="e.g. Hardware Prototype Showdown"
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid rgba(23, 105, 224, 0.2)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setAddEventModal(false)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
