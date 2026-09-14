import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Kalaa ArrowButton: Signature black button with rounded-badge arrow
 */
export function ArrowButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  size = 'base',
  tone = 'dark',
  className = '',
  style = {}
}) {
  const isSm = size === 'sm';

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isSm ? '8px' : '12px',
        padding: isSm ? '5px 5px 5px 14px' : '7px 7px 7px 20px',
        borderRadius: 'var(--radius)',
        backgroundColor: disabled ? '#94a3b8' : 'var(--action)',
        color: 'var(--on-action)',
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        fontSize: isSm ? '0.82rem' : '0.92rem',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        boxShadow: 'var(--shadow-soft)',
        transition: 'all var(--dur-base) var(--ease-brand)',
        opacity: disabled ? 0.7 : 1,
        ...style
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.backgroundColor = 'var(--action-hover)';
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 6px 16px -2px rgba(20, 19, 26, 0.18)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.backgroundColor = 'var(--action)';
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
        }
      }}
      onMouseDown={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.transform = 'scale(0.97)';
        }
      }}
      onMouseUp={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.transform = 'translateY(-1px)';
        }
      }}
    >
      <span style={{ whiteSpace: 'nowrap' }}>{children}</span>
      <span
        style={{
          width: isSm ? '26px' : '34px',
          height: isSm ? '26px' : '34px',
          borderRadius: 'calc(var(--radius) * 0.8)',
          backgroundColor: '#ffffff',
          color: 'var(--ink)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        {loading ? (
          <div
            className="spinner"
            style={{
              width: '14px',
              height: '14px',
              border: '2px solid #14131a',
              borderTopColor: 'transparent',
              borderRadius: '50%'
            }}
          />
        ) : (
          <ArrowRight size={isSm ? 13 : 16} strokeWidth={2.5} />
        )}
      </span>
    </button>
  );
}
