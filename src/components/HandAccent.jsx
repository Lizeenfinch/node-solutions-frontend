import React from 'react';

/**
 * Kalaa HandAccent: One handwritten phrase in Kalam font, tilted/accented in sage
 */
export function HandAccent({ children, tone = 'sage', wrap = false }) {
  const color = tone === 'sage' ? 'var(--ink-sage)' : 'var(--on-accent)';

  return (
    <span
      style={{
        fontFamily: 'var(--font-hand)',
        fontSize: '1.2em',
        fontWeight: 700,
        lineHeight: 0.9,
        color: color,
        display: 'inline-block',
        transform: 'rotate(-1.5deg)',
        whiteSpace: wrap ? 'normal' : 'nowrap',
        marginLeft: '4px',
        marginRight: '2px'
      }}
    >
      {children}
    </span>
  );
}
