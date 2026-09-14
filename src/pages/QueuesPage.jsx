import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  CreditCard, 
  Code2, 
  AlertCircle, 
  AlertTriangle,
  CheckCircle2, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { TicketModal } from '../components/TicketModal';

export default function QueuesPage({ records = [] }) {
  const [activeRecordModal, setActiveRecordModal] = useState(null);
  const safeRecords = Array.isArray(records) ? records : [];

  const departments = [
    {
      name: 'Engineering',
      icon: Code2,
      color: '#4f46e5',
      accentBg: '#eef2ff',
      description: 'System outages, security incidents, access control, & bugs'
    },
    {
      name: 'Sales Team',
      icon: TrendingUp,
      color: '#059669',
      accentBg: '#ecfdf5',
      description: 'Automation discovery, enterprise proposals, pricing & roadmap'
    },
    {
      name: 'Finance',
      icon: CreditCard,
      color: '#d97706',
      accentBg: '#fffbeb',
      description: 'Invoices, duplicate charges, & payment reconciliation'
    },
    {
      name: 'Client Success',
      icon: Users,
      color: '#0891b2',
      accentBg: '#ecfeff',
      description: 'Account management, general support, & client onboarding'
    }
  ];

  const getPriorityBadgeClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'urgent': return 'badge-urgent';
      case 'high': return 'badge-high';
      case 'medium': return 'badge-medium';
      default: return 'badge-low';
    }
  };

  return (
    <div className="animate-page" style={{ padding: '24px 0 36px 0' }}>
      {/* Title Bar */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '4px' }}>
          Department Routing Queues
        </h1>
        <p style={{ color: 'var(--ink-muted)', fontSize: '0.9rem' }}>
          Real-time workload distribution across organization teams based on AI triage.
        </p>
      </div>

      {/* 4-Department Column Board */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gap: '20px',
        alignItems: 'start'
      }}>
        {departments.map((dept, colIdx) => {
          const Icon = dept.icon;
          const deptRecords = safeRecords.filter(r => r.assigned_to === dept.name);
          const urgentCount = deptRecords.filter(r => r.priority === 'Urgent').length;

          return (
            <div
              key={dept.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '550px',
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: '16px',
                boxShadow: '0 8px 30px -4px rgba(20, 19, 26, 0.07), 0 2px 6px -1px rgba(20, 19, 26, 0.04)',
                overflow: 'hidden',
                animation: 'cardEntrance 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
                animationDelay: `${colIdx * 90}ms`,
                transition: 'box-shadow 0.3s ease'
              }}
            >
              {/* Department Header */}
              <div style={{ 
                padding: '16px 18px', 
                borderBottom: '1px solid #f1f5f9',
                background: '#ffffff',
                flexShrink: 0 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: dept.accentBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={16} color={dept.color} strokeWidth={2.5} />
                    </div>
                    <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em' }}>
                      {dept.name}
                    </h3>
                  </div>

                  <span style={{
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    padding: '2px 9px',
                    borderRadius: '12px',
                    background: '#f1f5f9',
                    color: '#334155',
                    border: '1px solid #e2e8f0'
                  }}>
                    {deptRecords.length}
                  </span>
                </div>

                <p style={{ fontSize: '0.76rem', color: 'var(--ink-muted)', lineHeight: 1.4 }}>
                  {dept.description}
                </p>

                {urgentCount > 0 && (
                  <div className="urgent-pulse" style={{
                    marginTop: '10px',
                    padding: '6px 10px',
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '8px',
                    color: '#991b1b',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <AlertTriangle size={13} strokeWidth={2.5} />
                    <span>{urgentCount} URGENT pending triage</span>
                  </div>
                )}
              </div>

              {/* Independently Scrollable Tickets List */}
              <div style={{ 
                padding: '14px', 
                flex: 1, 
                overflowY: 'auto', 
                minHeight: 0,
                display: 'flex', 
                flexDirection: 'column', 
                gap: '10px',
                background: '#fbfcfc'
              }}>
                {deptRecords.length === 0 ? (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    color: 'var(--ink-muted)',
                    textAlign: 'center',
                    padding: '20px'
                  }}>
                    <CheckCircle2 size={30} color="#cbd5e1" style={{ marginBottom: '8px' }} />
                    <p style={{ fontSize: '0.84rem', fontWeight: 700, color: '#64748b' }}>Queue is clear</p>
                    <span style={{ fontSize: '0.74rem' }}>Triage a request to assign</span>
                  </div>
                ) : (
                  deptRecords.map((item, itemIdx) => (
                    <div
                      key={item.id}
                      onClick={() => setActiveRecordModal(item)}
                      className="interactive-card"
                      style={{
                        background: '#ffffff',
                        border: '1px solid rgba(226, 232, 240, 0.85)',
                        borderRadius: '12px',
                        padding: '14px 16px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px -2px rgba(20, 19, 26, 0.05), 0 1px 2px rgba(20, 19, 26, 0.03)',
                        animation: 'cardEntrance 0.44s cubic-bezier(0.22, 1, 0.36, 1) both',
                        animationDelay: `${colIdx * 70 + itemIdx * 50}ms`
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span className={`badge ${getPriorityBadgeClass(item.priority)}`} style={{ fontSize: '0.7rem', padding: '2px 7px' }}>
                          {item.priority}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', fontWeight: 700 }}>
                          {item.category}
                        </span>
                      </div>

                      <div style={{ 
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.86rem', 
                        fontWeight: 600, 
                        color: '#1e293b', 
                        marginBottom: '6px', 
                        lineHeight: 1.45,
                        letterSpacing: '-0.005em'
                      }}>
                        {item.summary}
                      </div>

                      <p style={{ 
                        fontSize: '0.76rem', 
                        color: 'var(--ink-muted)', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        display: '-webkit-box', 
                        WebkitLineClamp: 2, 
                        WebkitBoxOrient: 'vertical', 
                        marginBottom: '8px',
                        lineHeight: 1.45
                      }}>
                        {item.original_text}
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--ink-muted)', borderTop: '1px solid #f8fafc', paddingTop: '6px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={11} />
                          {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span style={{ color: dept.color, fontWeight: 800, display: 'flex', alignItems: 'center', gap: '3px' }}>
                          Inspect <ArrowRight size={11} />
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Direct Ticket Inspection Modal */}
      {activeRecordModal && (
        <TicketModal
          record={activeRecordModal}
          onClose={() => setActiveRecordModal(null)}
        />
      )}
    </div>
  );
}
