import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Mail, 
  Building2, 
  Clock, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export function TicketModal({ record, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!record) return null;

  const handleCopy = () => {
    if (!record.draft_response) return;
    navigator.clipboard.writeText(record.draft_response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
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
        backgroundColor: 'rgba(15, 23, 42, 0.25)', // Clean, crisp overlay with ZERO blur
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '28px',
        animation: 'backdropFadeIn 0.15s ease-out'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '1080px',
          width: '94%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          background: '#ffffff',
          borderRadius: '1.25rem',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.06)',
          border: '1px solid #cbd5e1',
          overflow: 'hidden',
          animation: 'modalScaleIn 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Header Bar */}
        <div style={{
          padding: '22px 30px 18px 30px',
          borderBottom: '1px solid #e2e8f0',
          background: '#f8fafc',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          <div style={{ flex: 1 }}>
            {/* Metadata Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.74rem',
                fontWeight: 800,
                color: '#475569',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                padding: '2px 8px',
                borderRadius: '6px',
                letterSpacing: '0.04em'
              }}>
                {record.id || 'TICKET'}
              </span>
              <span className={`badge ${getCategoryClass(record.category)}`} style={{ fontSize: '0.72rem', padding: '2px 10px' }}>
                {record.category}
              </span>
              <span className={`badge ${getPriorityClass(record.priority)}`} style={{ fontSize: '0.72rem', padding: '2px 10px' }}>
                {record.priority} Priority
              </span>
              <span style={{
                fontSize: '0.74rem',
                color: '#64748b',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                marginLeft: '4px'
              }}>
                <Clock size={12} />
                {record.timestamp ? new Date(record.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'Recent'}
              </span>
            </div>

            <h2 style={{
              fontSize: '1.35rem',
              fontWeight: 800,
              color: '#0f172a',
              lineHeight: 1.3,
              margin: 0
            }}>
              {record.summary}
            </h2>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#475569',
              cursor: 'pointer',
              flexShrink: 0,
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f1f5f9';
              e.currentTarget.style.borderColor = '#94a3b8';
              e.currentTarget.style.color = '#0f172a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.borderColor = '#cbd5e1';
              e.currentTarget.style.color = '#475569';
            }}
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* 2-Column Wide Layout Body */}
        <div style={{
          padding: '24px 30px',
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 380px) 1fr',
          gap: '24px',
          alignItems: 'stretch'
        }}>

          {/* Left Column: Context & Metadata */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Original Inbound Message: Clean neutral light-gray background, NO colored side borders */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '16px 18px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#64748b',
                marginBottom: '8px'
              }}>
                <Mail size={13} strokeWidth={2.5} />
                Original Inbound Message
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: '#334155',
                lineHeight: 1.6,
                fontStyle: 'italic',
                whiteSpace: 'pre-wrap'
              }}>
                "{record.original_text}"
              </div>
            </div>

            {/* Classification Summary Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px'
            }}>
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '11px 13px'
              }}>
                <div style={{ fontSize: '0.66rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', marginBottom: '3px' }}>
                  Category
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>
                  {record.category}
                </div>
              </div>

              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '11px 13px'
              }}>
                <div style={{ fontSize: '0.66rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', marginBottom: '3px' }}>
                  Priority Level
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>
                  {record.priority}
                </div>
              </div>

              <div style={{
                gridColumn: 'span 2',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '11px 13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '0.66rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b' }}>
                  Assigned Queue
                </span>
                <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <Building2 size={13} color="#475569" />
                  {record.assigned_to}
                </span>
              </div>
            </div>

            {/* Triage Rationale Note: Clean neutral, NO yellow borders */}
            {record.priority_reason && (
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px 14px',
                fontSize: '0.82rem',
                color: '#475569',
                lineHeight: 1.5
              }}>
                <strong style={{ color: '#0f172a', fontWeight: 700 }}>Triage Rationale: </strong>
                <span>{record.priority_reason}</span>
              </div>
            )}
          </div>

          {/* Right Column: Full Draft Response Card (Spacious, Clear & Scrollable) */}
          <div style={{
            background: '#ffffff',
            border: '1.5px solid #cbd5e1',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
            overflow: 'hidden'
          }}>
            {/* Fixed Header with Copy Button */}
            <div style={{
              padding: '12px 20px',
              background: '#f8fafc',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <Sparkles size={15} color="#475569" />
                <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#0f172a' }}>
                  Drafted Response for Review
                </span>
              </div>

              {/* Clean Pill Copy Button */}
              <button
                onClick={handleCopy}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: copied ? '#15803d' : '#0f172a',
                  background: copied ? '#dcfce7' : '#ffffff',
                  border: copied ? '1px solid #86efac' : '1px solid #cbd5e1',
                  padding: '6px 14px',
                  borderRadius: '7px',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  if (!copied) {
                    e.currentTarget.style.backgroundColor = '#f1f5f9';
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
                {copied ? (
                  <>
                    <CheckCircle2 size={14} color="#15803d" />
                    Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy Response
                  </>
                )}
              </button>
            </div>

            {/* Scrollable Response Body with generous height */}
            <div style={{
              padding: '22px 24px',
              fontSize: '0.94rem',
              color: '#1e293b',
              lineHeight: 1.75,
              whiteSpace: 'pre-wrap',
              background: '#ffffff',
              fontFamily: 'var(--font-body, sans-serif)',
              flex: 1,
              maxHeight: '380px',
              minHeight: '260px',
              overflowY: 'auto',
              scrollBehavior: 'smooth'
            }}>
              {record.draft_response || 'No draft response generated for this ticket.'}
            </div>

            {/* Fixed Metadata Footer */}
            <div style={{
              padding: '10px 20px',
              background: '#f8fafc',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.74rem',
              color: '#64748b'
            }}>
              <span>
                {record._model ? `Engine: ${record._model}` : 'Deterministic Engine'}
              </span>
              <span>
                {record.latency_ms ? `${record.latency_ms}ms response latency` : 'Instant'}
              </span>
            </div>
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div style={{
          padding: '14px 30px',
          borderTop: '1px solid #e2e8f0',
          background: '#f8fafc',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '7px 22px',
              borderRadius: '7px',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#334155',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
