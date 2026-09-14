import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  ShieldAlert, 
  Building2, 
  Tag, 
  MessageSquare, 
  RotateCcw, 
  Download, 
  AlertTriangle,
  Zap
} from 'lucide-react';
import { submitTriage } from '../services/api.js';
import { HandAccent } from '../components/HandAccent';
import { ArrowButton } from '../components/ArrowButton';

export default function ConsolePage({ presets = [], onTriageCompleted }) {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [activePresetId, setActivePresetId] = useState(null);
  const [triageResult, setTriageResult] = useState(null);
  const [error, setError] = useState(null);
  const [copiedDraft, setCopiedDraft] = useState(false);

  const handleSelectPreset = (preset) => {
    setActivePresetId(preset.id);
    setInputText(preset.text);
    setError(null);
  };

  const handleRunTriage = async (textToProcess) => {
    const text = textToProcess || inputText;
    if (!text || text.trim().length < 3) {
      setError('Please enter a request of at least 3 characters.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await submitTriage(text);
      setTriageResult(data);
      if (onTriageCompleted) {
        onTriageCompleted(data);
      }
    } catch (err) {
      setError(err.message || 'Failed to process request with AI engine.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyDraft = () => {
    if (!triageResult?.draft_response) return;
    navigator.clipboard.writeText(triageResult.draft_response);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  const handleExportJson = () => {
    if (!triageResult) return;
    const blob = new Blob([JSON.stringify(triageResult, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `triage-${triageResult.id || 'export'}.json`;
    a.click();
    URL.revokeObjectURL(url);
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

  const getPresetTint = (id) => {
    switch (id) {
      case '01': return 'var(--tint-sage)';
      case '02': return 'var(--tint-violet)';
      case '03': return 'var(--tint-butter)';
      case '04': return 'var(--tint-cloud)';
      case '05': return 'var(--tint-peach)';
      case '06': return 'var(--tint-sky)';
      default: return 'var(--tint-cloud)';
    }
  };

  return (
    <div className="animate-page" style={{ padding: '40px 0 64px 0' }}>
      {/* Kalaa-style Hero Heading */}
      <div style={{ marginBottom: '36px', textAlign: 'center' }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          fontWeight: 900,
          color: 'var(--ink)',
          letterSpacing: '-0.03em',
          marginBottom: '10px',
          lineHeight: 1.2
        }}>
          Automated Request Triage, <HandAccent>in real time.</HandAccent>
        </h1>
        <p style={{ color: 'var(--ink-body)', fontSize: '1.05rem', maxWidth: '620px', margin: '0 auto', lineHeight: 1.6 }}>
          Turn incoming unstructured emails, forms, and chats into an <span className="marker-highlight">actionable</span> next step with exact routing and drafted replies.
        </p>
      </div>

      {/* Benchmark Presets Bar (Kalaa Tinted Paper Cards) */}
      <div className="kalaa-card" style={{ padding: '20px 22px', marginBottom: '28px', background: 'var(--surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={16} color="var(--ink)" />
            <span style={{ fontSize: '0.88rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink)' }}>
              Sample Scenarios
            </span>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '10px'
        }}>
          {presets.map((p) => {
            const isSelected = activePresetId === p.id;
            const isSecurity = p.id === '05';
            const tint = getPresetTint(p.id);

            return (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p)}
                style={{
                  textAlign: 'left',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius)',
                  background: isSelected ? '#ffffff' : tint,
                  border: isSelected 
                    ? '2px solid var(--action)' 
                    : isSecurity 
                      ? '1.5px solid #ef4444' 
                      : '1.5px solid #cbd5e1',
                  boxShadow: isSelected ? 'var(--shadow-hover)' : '0 2px 4px rgba(20, 19, 26, 0.05)',
                  cursor: 'pointer',
                  transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = isSecurity ? '#dc2626' : '#94a3b8';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 14px rgba(20, 19, 26, 0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = isSecurity ? '#ef4444' : '#cbd5e1';
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(20, 19, 26, 0.05)';
                  }
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.97)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = isSelected ? 'none' : 'translateY(-2px)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    color: isSecurity ? '#991b1b' : 'var(--ink)'
                  }}>
                    #{p.id}
                  </span>
                  <span style={{
                    fontSize: '0.68rem',
                    padding: '2px 7px',
                    borderRadius: '4px',
                    background: '#ffffff',
                    color: isSecurity ? '#991b1b' : 'var(--ink-body)',
                    fontWeight: 700,
                    border: isSecurity ? '1px solid #fca5a5' : '1px solid #cbd5e1'
                  }}>
                    {p.tag}
                  </span>
                </div>
                <div style={{
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  color: 'var(--ink)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {p.summary}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Layout (Stacked: Input at Top, Full-Width Result Below) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
        
        {/* Card 1: Inbound Message (At Top) */}
        <div className="kalaa-card" style={{ padding: '24px 28px', background: 'var(--surface)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <label style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquare size={16} color="var(--ink-sage)" />
              Inbound Unstructured Message
            </label>
            <span style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', fontWeight: 600 }}>
              {inputText.length} characters
            </span>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              setActivePresetId(null);
            }}
            placeholder="Paste client inquiry, web form submission, support ticket, or chat message here..."
            rows={triageResult ? 3 : 6}
            style={{
              width: '100%',
              minHeight: triageResult ? '90px' : '150px',
              backgroundColor: 'var(--sheet)',
              border: '1.5px solid var(--border-subtle)',
              borderRadius: 'var(--radius)',
              padding: '14px 16px',
              color: 'var(--ink)',
              fontSize: '0.94rem',
              lineHeight: 1.6,
              resize: 'vertical',
              outline: 'none',
              marginBottom: '16px',
              transition: 'all var(--dur-base) var(--ease-brand)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--ink-sage)';
              e.target.style.backgroundColor = '#ffffff';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-subtle)';
              e.target.style.backgroundColor = 'var(--sheet)';
            }}
          />

          {error && (
            <div style={{
              background: '#fee2e2',
              border: '1px solid #fca5a5',
              borderRadius: 'var(--radius)',
              padding: '10px 14px',
              color: '#991b1b',
              fontSize: '0.85rem',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 600
            }}>
              <AlertTriangle size={16} />
              {error}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => {
                setInputText('');
                setActivePresetId(null);
                setTriageResult(null);
                setError(null);
              }}
              className="btn-tactile"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: 'var(--radius)',
                color: '#0f172a',
                fontSize: '0.84rem',
                background: '#ffffff',
                border: '1.5px solid #cbd5e1',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(20, 19, 26, 0.05)'
              }}
            >
              <RotateCcw size={14} strokeWidth={2.5} color="#475569" />
              Clear
            </button>

            {/* Kalaa ArrowButton */}
            <ArrowButton
              onClick={() => handleRunTriage()}
              disabled={!inputText.trim()}
              loading={loading}
              size="base"
            >
              {loading ? 'Processing...' : 'Run AI Triage'}
            </ArrowButton>
          </div>
        </div>

        {/* Card 2: Structured Results & Ticket Card (Below Input, Full Width) */}
        {triageResult && (
          <div className="kalaa-card animate-card" style={{ padding: '28px 32px', background: 'var(--surface)' }}>
            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1.5px solid var(--line)', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-sage)', fontWeight: 800, letterSpacing: '0.04em', background: 'var(--sheet)', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--line)' }}>
                  TICKET #{triageResult.id || 'ACTIVE'}
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--ink)' }}>
                  Triage Assessment
                </h3>
              </div>

              <button
                onClick={handleExportJson}
                className="btn-tactile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius)',
                  background: '#ffffff',
                  border: '1.5px solid #cbd5e1',
                  color: '#0f172a',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(20, 19, 26, 0.05)'
                }}
              >
                <Download size={14} strokeWidth={2.5} />
                Export JSON
              </button>
            </div>

            {/* Overview Row: Summary + Classifications */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px', marginBottom: '22px' }}>
              {/* Summary & Priority Rationale */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{
                  background: 'var(--tint-cloud)',
                  borderLeft: '4px solid var(--ink)',
                  borderRadius: '0 var(--radius) var(--radius) 0',
                  padding: '14px 18px'
                }}>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--ink-muted)', fontWeight: 800, letterSpacing: '0.04em', marginBottom: '4px' }}>
                    Summary
                  </div>
                  <p style={{ fontSize: '0.96rem', color: 'var(--ink)', lineHeight: 1.55, fontWeight: 600 }}>
                    {triageResult.summary}
                  </p>
                </div>

                <div style={{
                  background: 'var(--sheet)',
                  borderRadius: 'var(--radius)',
                  padding: '12px 18px',
                  border: '1px solid var(--line)',
                  fontSize: '0.84rem'
                }}>
                  <strong style={{ color: 'var(--ink)', fontWeight: 800 }}>Priority Rationale: </strong>
                  <span style={{ color: 'var(--ink-body)', lineHeight: 1.5 }}>{triageResult.priority_reason}</span>
                </div>
              </div>

              {/* 3 Key Classification Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', alignContent: 'stretch' }}>
                {/* Category */}
                <div style={{ background: 'var(--sheet)', padding: '16px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', textTransform: 'uppercase', fontWeight: 800, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Tag size={13} />
                    Category
                  </div>
                  <div>
                    <span className={`badge ${getCategoryClass(triageResult.category)}`} style={{ fontSize: '0.86rem', padding: '5px 12px' }}>
                      {triageResult.category}
                    </span>
                  </div>
                </div>

                {/* Priority */}
                <div style={{ background: 'var(--sheet)', padding: '16px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', textTransform: 'uppercase', fontWeight: 800, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <ShieldAlert size={13} />
                    Priority
                  </div>
                  <div>
                    <span className={`badge ${getPriorityClass(triageResult.priority)}`} style={{ fontSize: '0.86rem', padding: '5px 12px' }}>
                      {triageResult.priority}
                    </span>
                  </div>
                </div>

                {/* Route */}
                <div style={{ background: 'var(--sheet)', padding: '16px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', textTransform: 'uppercase', fontWeight: 800, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Building2 size={13} />
                    Route
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--ink)' }}>
                    {triageResult.assigned_to}
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width Expansive Drafted First Response */}
            <div style={{
              background: '#ffffff',
              borderRadius: '14px',
              border: '1.5px solid #cbd5e1',
              padding: '22px 24px',
              boxShadow: '0 2px 10px rgba(20, 19, 26, 0.04)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block' }}>
                    Drafted First Response (Review & Send)
                  </span>
                  <span style={{ fontSize: '0.74rem', color: 'var(--ink-muted)' }}>
                    Complete AI reply draft tailored to context & tone &middot; Directly editable
                  </span>
                </div>
                <button
                  onClick={handleCopyDraft}
                  className="btn-tactile"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 16px',
                    borderRadius: 'var(--radius)',
                    background: copiedDraft ? '#dcfce7' : '#ffffff',
                    border: copiedDraft ? '1.5px solid #16a34a' : '1.5px solid #cbd5e1',
                    color: copiedDraft ? '#15803d' : '#0f172a',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 1px 2px rgba(20, 19, 26, 0.05)'
                  }}
                >
                  {copiedDraft ? <Check size={14} strokeWidth={2.5} color="#15803d" className="animate-pop" /> : <Copy size={14} strokeWidth={2.5} />}
                  {copiedDraft ? 'Copied to Clipboard' : 'Copy Response'}
                </button>
              </div>

              <textarea
                value={triageResult.draft_response}
                onChange={(e) => setTriageResult({ ...triageResult, draft_response: e.target.value })}
                rows={Math.max(14, (triageResult.draft_response || '').split('\n').length + 3)}
                style={{
                  width: '100%',
                  minHeight: '340px',
                  background: '#fcfdfd',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '20px 22px',
                  color: '#1e293b',
                  fontSize: '0.98rem',
                  lineHeight: 1.8,
                  fontFamily: 'var(--font-body)',
                  resize: 'vertical',
                  outline: 'none',
                  boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.02)',
                  whiteSpace: 'pre-wrap',
                  transition: 'border-color var(--dur-base) var(--ease-brand)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--action)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                <span>Engine: {triageResult._engine || 'Live LLM'} ({triageResult._model || 'Groq 120B'})</span>
                {triageResult.latency_ms && <span>Latency: {triageResult.latency_ms}ms</span>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
