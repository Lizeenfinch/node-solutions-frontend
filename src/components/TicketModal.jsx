import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Mail, 
  Tag, 
  AlertCircle, 
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
        backgroundColor: 'rgba(15, 23, 42, 0.55)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '720px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--surface, #ffffff)',
          borderRadius: '16px',
          boxShadow: '0 24px 60px -12px rgba(20, 19, 26, 0.35)',
          border: '1.5px solid var(--border-subtle, #cbd5e1)',
          overflow: 'hidden',
          animation: 'modalIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Header Bar */}
        <div style={{
          padding: '22px 26px 18px 26px',
          borderBottom: '1px solid var(--line, #e6e4ee)',
          background: 'var(--sheet, #f4f7f5)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.74rem',
                fontWeight: 800,
                color: 'var(--ink-muted, #56545f)',
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
            </div>

            <h2 style={{
              fontSize: '1.22rem',
              fontWeight: 800,
              color: 'var(--ink, #14131a)',
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

        {/* Scrollable Body Content */}
        <div style={{
          padding: '22px 26px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>

          {/* Inbound Customer Message */}
          <div style={{
            background: 'var(--tint-cloud, #f1f0f4)',
            borderLeft: '4px solid var(--accent, #ffd84d)',
            borderRadius: '0 10px 10px 0',
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

          {/* 3-Part Classification Strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px'
          }}>
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--border-subtle, #cbd5e1)',
              borderRadius: '10px',
              padding: '12px 14px'
            }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted, #64748b)', marginBottom: '5px' }}>
                Category
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--ink, #14131a)' }}>
                {record.category}
              </div>
            </div>

            <div style={{
              background: '#ffffff',
              border: '1px solid var(--border-subtle, #cbd5e1)',
              borderRadius: '10px',
              padding: '12px 14px'
            }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted, #64748b)', marginBottom: '5px' }}>
                Priority Level
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--ink, #14131a)' }}>
                {record.priority}
              </div>
            </div>

            <div style={{
              background: '#ffffff',
              border: '1px solid var(--border-subtle, #cbd5e1)',
              borderRadius: '10px',
              padding: '12px 14px'
            }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted, #64748b)', marginBottom: '5px' }}>
                Assigned Queue
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--ink, #14131a)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Building2 size={13} color="var(--ink-sage, #4e6f62)" />
                {record.assigned_to}
              </div>
            </div>
          </div>

          {/* Priority Rationale Alert */}
          {record.priority_reason && (
            <div style={{
              background: 'var(--tint-butter, #fff2c2)',
              border: '1px solid #f5d475',
              borderRadius: '10px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              fontSize: '0.82rem'
            }}>
              <AlertCircle size={15} color="#b45309" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: '#92400e', fontWeight: 800 }}>Triage Rationale: </strong>
                <span style={{ color: '#78350f', lineHeight: 1.5 }}>{record.priority_reason}</span>
              </div>
            </div>
          )}

          {/* Drafted Response Card */}
          <div style={{
            background: '#ffffff',
            border: '1.5px solid var(--border-subtle, #cbd5e1)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(20, 19, 26, 0.04)'
          }}>
            <div style={{
              padding: '12px 16px',
              background: 'var(--sheet, #f4f7f5)',
              borderBottom: '1px solid var(--line, #e6e4ee)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <Sparkles size={14} color="var(--ink-sage, #4e6f62)" />
                <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink, #14131a)' }}>
                  Drafted Response for Review
                </span>
              </div>

              <button
                onClick={handleCopy}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  color: copied ? '#15803d' : '#0f172a',
                  background: copied ? '#dcfce7' : '#ffffff',
                  border: copied ? '1px solid #86efac' : '1px solid var(--border-subtle, #cbd5e1)',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                  transition: 'all 0.15s ease'
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
                    Copy Draft
                  </>
                )}
              </button>
            </div>

            <div style={{
              padding: '16px 18px',
              fontSize: '0.9rem',
              color: 'var(--ink-body, #33313d)',
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap',
              background: '#ffffff',
              fontFamily: 'var(--font-body, sans-serif)'
            }}>
              {record.draft_response || 'No draft response generated for this ticket.'}
            </div>

            {/* Response Card Metadata Footer */}
            <div style={{
              padding: '8px 16px',
              background: '#fcfcfd',
              borderTop: '1px solid #f1f5f9',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.72rem',
              color: 'var(--ink-muted, #56545f)'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Clock size={12} />
                {record.timestamp ? new Date(record.timestamp).toLocaleString() : 'Just now'}
              </span>
              <span>
                {record.latency_ms ? `${record.latency_ms}ms · ` : ''}
                {record._model ? `${record._model}` : 'Deterministic Engine'}
              </span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '14px 26px',
          borderTop: '1px solid var(--line, #e6e4ee)',
          background: 'var(--sheet, #f4f7f5)',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '10px'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '7px 18px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: 'var(--ink-body, #33313d)',
              background: '#ffffff',
              border: '1px solid var(--border-subtle, #cbd5e1)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
          >
            Close
          </button>

          <button
            onClick={handleCopy}
            style={{
              padding: '7px 20px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: copied ? '#ffffff' : 'var(--on-action, #ffffff)',
              background: copied ? '#15803d' : 'var(--action, #14131a)',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 4px rgba(20, 19, 26, 0.15)',
              transition: 'all 0.15s ease'
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied to Clipboard' : 'Copy Response'}
          </button>
        </div>

      </div>
    </div>
  );
}
