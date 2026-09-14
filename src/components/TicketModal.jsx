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
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '24px',
        animation: 'backdropFadeIn 0.2s ease-out'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '768px', // max-w-3xl
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          background: '#ffffff',
          borderRadius: '1rem', // rounded-2xl
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', // shadow-2xl
          border: '1px solid #e5e7eb', // border-gray-200
          overflow: 'hidden',
          animation: 'modalScaleIn 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Header Bar */}
        <div style={{
          padding: '20px 24px 16px 24px',
          borderBottom: '1px solid #e5e7eb',
          background: '#f9fafb',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div style={{ flex: 1 }}>
            {/* Metadata Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.74rem',
                fontWeight: 800,
                color: '#4b5563',
                background: '#ffffff',
                border: '1px solid #e5e7eb',
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
                fontSize: '0.72rem',
                color: '#6b7280',
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
              fontSize: '1.22rem',
              fontWeight: 800,
              color: '#111827',
              lineHeight: 1.35,
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
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4b5563',
              cursor: 'pointer',
              flexShrink: 0,
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
              e.currentTarget.style.borderColor = '#d1d5db';
              e.currentTarget.style.color = '#111827';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.color = '#4b5563';
            }}
          >
            <X size={15} strokeWidth={2.5} />
          </button>
        </div>

        {/* Modal Body Container */}
        <div style={{
          padding: '22px 24px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>

          {/* Original Inbound Message: Soft neutral light-gray background, NO colored side borders */}
          <div style={{
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
            padding: '14px 18px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#6b7280',
              marginBottom: '6px'
            }}>
              <Mail size={13} strokeWidth={2.5} />
              Original Inbound Message
            </div>
            <div style={{
              fontSize: '0.88rem',
              color: '#374151',
              lineHeight: 1.6,
              fontStyle: 'italic',
              whiteSpace: 'pre-wrap'
            }}>
              "{record.original_text}"
            </div>
          </div>

          {/* 3-Part Classification Strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px'
          }}>
            <div style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '10px 14px'
            }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', color: '#6b7280', marginBottom: '4px' }}>
                Category
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#111827' }}>
                {record.category}
              </div>
            </div>

            <div style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '10px 14px'
            }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', color: '#6b7280', marginBottom: '4px' }}>
                Priority Level
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#111827' }}>
                {record.priority}
              </div>
            </div>

            <div style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '10px 14px'
            }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', color: '#6b7280', marginBottom: '4px' }}>
                Assigned Queue
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Building2 size={13} color="#4b5563" />
                {record.assigned_to}
              </div>
            </div>
          </div>

          {/* Triage Rationale Callout: Soft neutral light-gray background, NO colored/yellow side border */}
          {record.priority_reason && (
            <div style={{
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '10px 16px',
              fontSize: '0.82rem',
              color: '#4b5563',
              lineHeight: 1.5
            }}>
              <strong style={{ color: '#111827', fontWeight: 700 }}>Triage Rationale: </strong>
              <span>{record.priority_reason}</span>
            </div>
          )}

          {/* Drafted Response for Review — Scrollable Box with Fixed Header & Footer */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
          }}>
            {/* FIXED Header outside scroll */}
            <div style={{
              padding: '10px 16px',
              background: '#f9fafb',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} color="#6b7280" />
                <span style={{ fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#374151' }}>
                  Drafted Response for Review
                </span>
              </div>

              {/* Fixed Copy Response Button */}
              <button
                onClick={handleCopy}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  color: copied ? '#15803d' : '#374151',
                  background: copied ? '#dcfce7' : '#ffffff',
                  border: copied ? '1px solid #86efac' : '1px solid #d1d5db',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  if (!copied) {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                    e.currentTarget.style.borderColor = '#9ca3af';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!copied) {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.borderColor = '#d1d5db';
                  }
                }}
              >
                {copied ? (
                  <>
                    <CheckCircle2 size={13} color="#15803d" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    Copy Response
                  </>
                )}
              </button>
            </div>

            {/* SCROLLABLE Response Body with fixed max-height */}
            <div style={{
              maxHeight: '260px',
              overflowY: 'auto',
              scrollBehavior: 'smooth',
              padding: '16px 18px',
              fontSize: '0.9rem',
              color: '#1f2937',
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap',
              background: '#ffffff',
              fontFamily: 'var(--font-body, sans-serif)'
            }}>
              {record.draft_response || 'No draft response generated for this ticket.'}
            </div>

            {/* FIXED Metadata Footer outside scroll */}
            <div style={{
              padding: '8px 16px',
              background: '#f9fafb',
              borderTop: '1px solid #f3f4f6',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.72rem',
              color: '#6b7280'
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

        {/* Modal Footer */}
        <div style={{
          padding: '12px 24px',
          borderTop: '1px solid #e5e7eb',
          background: '#f9fafb',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '6px 20px',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#374151',
              background: '#ffffff',
              border: '1px solid #d1d5db',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
