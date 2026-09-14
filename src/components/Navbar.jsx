import React from 'react';
import { 
  Terminal, 
  Layers, 
  History, 
  CheckCircle2
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, systemHealth }) {
  const tabs = [
    { id: 'console', label: 'Triage Console', icon: Terminal },
    { id: 'queues', label: 'Department Queues', icon: Layers },
    { id: 'history', label: 'Audit Records', icon: History },
    { id: 'benchmark', label: 'Benchmark Lab', icon: CheckCircle2 }
  ];

  const isOnline = systemHealth?.status === 'healthy';

  return (
    <header style={{
      borderBottom: '1px solid var(--line)',
      background: 'var(--sheet)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand & New Minimalist Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(15, 23, 42, 0.15)'
          }}>
            {/* Custom Modern Node Network Logo */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="3.5" fill="#4f46e5" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="4" cy="7" r="2.5" fill="#ffffff" />
              <circle cx="20" cy="7" r="2.5" fill="#ffffff" />
              <circle cx="12" cy="20" r="2.5" fill="#ffffff" />
              <line x1="6" y1="8" x2="10" y2="10.5" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="18" y1="8" x2="14" y2="10.5" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="12" y1="15.5" x2="12" y2="17.5" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.18rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#0f172a',
              display: 'block',
              lineHeight: 1.15
            }}>
              NODE SOLUTIONS
            </span>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              AI Request Triage Assistant
            </span>
          </div>
        </div>

        {/* Minimalist Segmented Navigation Tabs */}
        <nav style={{
          display: 'flex',
          gap: '4px',
          background: '#e8edf2',
          padding: '4px',
          borderRadius: '10px',
          border: '1.5px solid #cbd5e1'
        }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '7px 15px',
                  borderRadius: '7px',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? '#0f172a' : '#475569',
                  background: isActive ? '#ffffff' : 'transparent',
                  border: isActive ? '1px solid #cbd5e1' : '1px solid transparent',
                  boxShadow: isActive ? '0 2px 5px rgba(20, 19, 26, 0.08)' : 'none',
                  cursor: 'pointer',
                  transition: 'all var(--dur-base) var(--ease-brand)'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                    e.currentTarget.style.color = '#0f172a';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#475569';
                  }
                }}
              >
                <Icon size={15} color={isActive ? '#0f172a' : '#64748b'} strokeWidth={isActive ? 2.5 : 2} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right Status Indicator */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* AI Model Status Pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: '16px',
            background: isOnline ? '#ecfdf5' : '#fef2f2',
            border: `1px solid ${isOnline ? '#a7f3d0' : '#fecaca'}`,
            fontSize: '0.76rem',
            boxShadow: '0 1px 2px rgba(20, 19, 26, 0.04)'
          }}>
            <span 
              className={isOnline ? 'pulse-dot' : ''}
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: isOnline ? '#10b981' : '#ef4444'
              }} 
            />
            <span style={{ color: isOnline ? '#065f46' : '#b91c1c', fontWeight: 600 }}>
              {isOnline ? 'AI Online:' : 'AI Offline'}
            </span>
            {isOnline && (
              <span style={{
                background: '#ffffff',
                border: '1px solid #86efac',
                color: '#15803d',
                padding: '1px 7px',
                borderRadius: '4px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 800
              }}>
                {systemHealth?.ai_service?.model_name || 
                 (systemHealth?.ai_service?.model ? systemHealth.ai_service.model.replace(/^openai\//, '') : 'Groq 120B')}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
