import React from 'react';

/**
 * Kalaa PageFrame: The signature sage green frame with inner concentric line
 * printed around the whole sheet canvas.
 */
export function PageFrame({ children }) {
  return (
    <div
      style={{
        backgroundColor: 'var(--page)',
        padding: 'clamp(6px, 1.2vw, 14px)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--frame-inner)',
          padding: 'clamp(3px, 0.6vw, 6px)',
          borderRadius: 'var(--frame-radius)',
          display: 'flex',
          flexDirection: 'column',
          flex: 1
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--sheet)',
            borderRadius: 'var(--radius)',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            overflow: 'hidden'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
