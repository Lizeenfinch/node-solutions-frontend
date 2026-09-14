import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Mail, 
  AlertCircle, 
  Building2, 
  Clock, 
  Sparkles,
  CheckCircle2,
  Share2
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
        backgroundColor: 'rgba(20, 19, 26, 0.25)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
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
          maxWidth: '980px',
          width: '95%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          background: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 25px 60px -15px rgba(20, 19, 26, 0.18), 0 0 0 1px rgba(20, 19, 26, 0.08)',
          border: '1px solid var(--border-subtle, #cbd5e1)',
          overflow: 'hidden',
          animation: 'modalIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Top Header Bar */}
        <div style={{
          padding: '20px 28px 16px 28px',
          borderBottom: '1px solid var(--line, #e6e4ee)',
          background: 'var(--sheet, #f4f7f5)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.74rem',
                fontWeight: 800,
                color: 'var(--ink-sage, #4e6f62)',
                background: '#ffffff',
                border: '1px solid var(--border-subtle, #cbd5e1)',
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
                color: 'var(--ink-muted, #56545f)',
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
              fontSize: '1.25rem',
              fontWeight: 800,
              color: 'var(--ink, #14131a)',
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
              border: '1px solid var(--border-subtle, #cbd5e1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ink, #14131a)',
              cursor: 'pointer',
              flexShrink: 0,
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fee2e2';
              e.currentTarget.style.borderColor = '#fca5a5';
              e.currentTarget.style.color = '#991b1b';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.borderColor = 'var(--border-subtle, #cbd5e1)';
              e.currentTarget.style.color = 'var(--ink, #14131a)';
            }}
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* 2-Column Wide Layout Body */}
        <div style={{
          padding: '24px 28px',
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 390px) 1fr',
          gap: '22px',
          alignItems: 'stretch'
        }}>

          {/* Left Column: Context & Metadata */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Inbound Customer Message */}
            <div style={{
              background: 'var(--tint-cloud, #f1f0f4)',
              borderLeft: '4px solid var(--accent, #ffd84d)',
              borderRadius: '0 10px 10px 0',
              padding: '14px 16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--ink-muted, #56545f)',
                marginBottom: '6px'
              }}>
                <Mail size={13} strokeWidth={2.5} />
                Original Inbound Message
              </div>
              <div style={{
                fontSize: '0.88rem',
                color: 'var(--ink-body, #33313d)',
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
                background: 'var(--sheet, #f4f7f5)',
                border: '1px solid var(--border-subtle, #cbd5e1)',
                borderRadius: '8px',
                padding: '10px 12px'
              }}>
                <div style={{ fontSize: '0.66rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted, #64748b)', marginBottom: '3px' }}>
                  Category
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--ink, #14131a)' }}>
                  {record.category}
                </div>
              </div>

              <div style={{
                background: 'var(--sheet, #f4f7f5)',
                border: '1px solid var(--border-subtle, #cbd5e1)',
                borderRadius: '8px',
                padding: '10px 12px'
              }}>
                <div style={{ fontSize: '0.66rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted, #64748b)', marginBottom: '3px' }}>
                  Priority Level
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--ink, #14131a)' }}>
                  {record.priority}
                </div>
              </div>

              <div style={{
                gridColumn: 'span 2',
                background: 'var(--sheet, #f4f7f5)',
                border: '1px solid var(--border-subtle, #cbd5e1)',
                borderRadius: '8px',
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '0.66rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted, #64748b)' }}>
                  Assigned Team
                </span>
                <span style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--ink, #14131a)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <Building2 size={13} color="var(--ink-sage, #4e6f62)" />
                  {record.assigned_to}
                </span>
              </div>
            </div>

            {/* Priority Rationale Note */}
            {record.priority_reason && (
              <div style={{
                background: 'var(--tint-butter, #fff2c2)',
                border: '1px solid #f5d475',
                borderRadius: '8px',
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                fontSize: '0.8rem'
              }}>
                <AlertCircle size={14} color="#b45309" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#92400e', fontWeight: 800 }}>Triage Rationale: </strong>
                  <span style={{ color: '#78350f', lineHeight: 1.45 }}>{record.priority_reason}</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Full Draft Response Card (Spacious, Fully Visible) */}
          <div style={{
            background: '#ffffff',
            border: '1.5px solid var(--border-subtle, #cbd5e1)',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 2px 10px rgba(20, 19, 26, 0.04)',
            overflow: 'hidden'
          }}>
            {/* Header with Copy Action */}
            <div style={{
              padding: '12px 18px',
              background: 'var(--sheet, #f4f7f5)',
              borderBottom: '1px solid var(--line, #e6e4ee)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <Sparkles size={15} color="var(--ink-sage, #4e6f62)" />
                <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink, #14131a)' }}>
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
                  color: copied ? '#15803d' : 'var(--ink, #14131a)',
                  background: copied ? '#dcfce7' : '#ffffff',
                  border: copied ? '1px solid #86efac' : '1px solid var(--border-subtle, #cbd5e1)',
                  padding: '6px 14px',
                  borderRadius: '7px',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  if (!copied) {
                    e.currentTarget.style.backgroundColor = 'var(--tint-sage, #dcebe5)';
                    e.currentTarget.style.borderColor = '#a3c0bd';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!copied) {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.borderColor = 'var(--border-subtle, #cbd5e1)';
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

            {/* Response Body with Line Breaks & Clear Text */}
            <div style={{
              padding: '20px 22px',
              fontSize: '0.94rem',
              color: 'var(--ink-body, #33313d)',
              lineHeight: 1.75,
              whiteSpace: 'pre-wrap',
              background: '#ffffff',
              fontFamily: 'var(--font-body, sans-serif)',
              flex: 1,
              minHeight: '220px'
            }}>
              {record.draft_response || 'No draft response generated for this ticket.'}
            </div>

            {/* Metadata Footer */}
            <div style={{
              padding: '10px 18px',
              background: 'var(--sheet, #f4f7f5)',
              borderTop: '1px solid var(--line, #e6e4ee)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.72rem',
              color: 'var(--ink-muted, #56545f)'
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

        {/* Clean Light Footer Bar */}
        <div style={{
          padding: '12px 28px',
          borderTop: '1px solid var(--line, #e6e4ee)',
          background: 'var(--sheet, #f4f7f5)',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '7px 22px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: 'var(--ink, #14131a)',
              background: '#ffffff',
              border: '1px solid var(--border-subtle, #cbd5e1)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e8edf2'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
