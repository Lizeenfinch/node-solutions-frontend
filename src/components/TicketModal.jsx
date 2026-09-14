import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';

export function TicketModal({ record, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!record) return null;

  const handleCopy = () => {
    if (!record.draft_response) return;
    navigator.clipboard.writeText(record.draft_response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryClass = (category) => {
    switch (category?.toLowerCase()) {
      case 'sales': return 'badge-sales';
      case 'support': return 'badge-support';
      case 'billing': return 'badge-billing';
      case 'technical': return 'badge-technical';
      default: return 'badge-other';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'urgent': return 'badge-urgent';
      case 'high': return 'badge-high';
      case 'medium': return 'badge-medium';
      default: return 'badge-low';
    }
  };

  return (
    <div 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '24px'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '1120px',
          width: '95%',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: '#ffffff',
          borderRadius: '16px',
          padding: '32px 38px',
          boxShadow: '0 25px 50px -12px rgba(20, 19, 26, 0.25)',
          border: '1.5px solid var(--border-subtle)',
          animation: 'modalIn 0.18s ease-out'
        }}
      >
        {/* Header with Ticket ID & Close */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '0.76rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-sage)', fontWeight: 800, letterSpacing: '0.04em' }}>
              TICKET #{record.id}
            </span>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--ink)', marginTop: '4px', lineHeight: 1.3 }}>
              {record.summary}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: '1.5px solid #cbd5e1',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0f172a',
              cursor: 'pointer',
              transition: 'all var(--dur-base) var(--ease-brand)',
              flexShrink: 0,
              marginLeft: '16px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e2e8f0';
              e.currentTarget.style.borderColor = '#94a3b8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f1f5f9';
              e.currentTarget.style.borderColor = '#cbd5e1';
            }}
          >
            <X size={17} strokeWidth={2.5} />
          </button>
        </div>

        {/* Original Inbound Text */}
        <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '16px 18px', marginBottom: '18px', border: '1.5px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 800, letterSpacing: '0.04em', marginBottom: '6px' }}>
            Inbound Message
          </div>
          <div style={{ fontSize: '0.92rem', color: '#1e293b', lineHeight: 1.6, whiteSpace: 'pre-wrap', fontStyle: 'italic' }}>
            "{record.original_text}"
          </div>
        </div>

        {/* Metrics Classification */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '18px' }}>
          <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1.5px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: '6px' }}>
              Category
            </span>
            <div>
              <span className={`badge ${getCategoryClass(record.category)}`}>
                {record.category}
              </span>
            </div>
          </div>
          <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1.5px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: '6px' }}>
              Priority
            </span>
            <div>
              <span className={`badge ${getPriorityClass(record.priority)}`}>
                {record.priority}
              </span>
            </div>
          </div>
          <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1.5px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: '6px' }}>
              Route
            </span>
            <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.94rem' }}>
              {record.assigned_to}
            </div>
          </div>
        </div>

        {/* Priority Reason */}
        <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '12px 18px', marginBottom: '20px', fontSize: '0.86rem', border: '1.5px solid #e2e8f0' }}>
          <strong style={{ color: 'var(--ink)', fontWeight: 800 }}>Priority Rationale: </strong>
          <span style={{ color: '#334155', lineHeight: 1.5 }}>{record.priority_reason}</span>
        </div>

        {/* Draft Response (Well-Formatted Communication Card) */}
        <div style={{ background: '#ffffff', borderRadius: '10px', padding: '18px 20px', border: '1.5px solid #cbd5e1', boxShadow: '0 2px 6px rgba(20, 19, 26, 0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
            <div>
              <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Drafted First Response (Review & Send)
              </span>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Generated with business tone & context awareness
              </div>
            </div>
            <button
              onClick={handleCopy}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: copied ? '#15803d' : '#0f172a',
                background: copied ? '#dcfce7' : '#ffffff',
                border: copied ? '1.5px solid #16a34a' : '1.5px solid #cbd5e1',
                padding: '6px 14px',
                borderRadius: 'var(--radius)',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(20, 19, 26, 0.05)',
                transition: 'all var(--dur-base) var(--ease-brand)'
              }}
              onMouseEnter={(e) => {
                if (!copied) {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.borderColor = '#94a3b8';
                }
              }}
              onMouseLeave={(e) => {
                if (!copied) {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#cbd5e1';
                }
              }}
            >
              {copied ? <Check size={13} strokeWidth={2.5} color="#15803d" /> : <Copy size={13} strokeWidth={2.5} />}
              {copied ? 'Copied to Clipboard' : 'Copy Response'}
            </button>
          </div>

          {/* Formatted Text Box with Preserved Line Breaks */}
          <div style={{
            fontSize: '0.94rem',
            color: '#1e293b',
            lineHeight: 1.7,
            whiteSpace: 'pre-wrap',
            background: '#fcfdfd',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '16px 18px',
            fontFamily: 'var(--font-body)'
          }}>
            {record.draft_response}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            <span>Recorded: {new Date(record.timestamp).toLocaleString()}</span>
            {record._engine && (
              <span>Engine: {record._engine} ({record._model || 'Groq 120B'})</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
