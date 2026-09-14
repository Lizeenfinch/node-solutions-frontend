import React, { useState } from 'react';
import { 
  Search, 
  Trash2, 
  Eye, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { TicketModal } from '../components/TicketModal';
import { clearAllHistory } from '../services/api.js';

export default function HistoryPage({ records = [], onRefreshHistory }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [ownerFilter, setOwnerFilter] = useState('');
  const [activeRecordModal, setActiveRecordModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const safeRecords = Array.isArray(records) ? records : [];

  const filteredRecords = safeRecords.filter((r) => {
    if (categoryFilter && r.category !== categoryFilter) return false;
    if (priorityFilter && r.priority !== priorityFilter) return false;
    if (ownerFilter && r.assigned_to !== ownerFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        r.summary?.toLowerCase().includes(q) ||
        r.original_text?.toLowerCase().includes(q) ||
        r.priority_reason?.toLowerCase().includes(q) ||
        r.id?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalPages = Math.ceil(filteredRecords.length / pageSize) || 1;
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + pageSize);

  const handleClear = async () => {
    if (window.confirm('Are you sure you want to clear all history records?')) {
      await clearAllHistory();
      if (onRefreshHistory) onRefreshHistory();
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

  const getCategoryClass = (category) => {
    switch (category?.toLowerCase()) {
      case 'sales': return 'badge-sales';
      case 'support': return 'badge-support';
      case 'billing': return 'badge-billing';
      case 'technical': return 'badge-technical';
      default: return 'badge-other';
    }
  };

  return (
    <div className="animate-page" style={{ padding: '36px 0 64px 0' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
            Triage Audit Log
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Comprehensive records of all inbound communications triaged by the assistant.
          </p>
        </div>

        <button
          onClick={handleClear}
          disabled={records.length === 0}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 16px',
            borderRadius: 'var(--radius)',
            background: '#ffffff',
            border: '1.5px solid #fca5a5',
            color: '#b91c1c',
            fontSize: '0.82rem',
            fontWeight: 700,
            boxShadow: '0 1px 2px rgba(20, 19, 26, 0.05)',
            cursor: records.length === 0 ? 'not-allowed' : 'pointer',
            opacity: records.length === 0 ? 0.5 : 1
          }}
        >
          <Trash2 size={14} strokeWidth={2.5} />
          Clear Log
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-card" style={{ padding: '14px 18px', marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#f8fafc',
          border: '1px solid var(--border-subtle)',
          borderRadius: '8px',
          padding: '7px 12px',
          flex: '1 1 240px'
        }}>
          <Search size={15} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search tickets, summaries, keywords..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#0f172a',
              fontSize: '0.85rem',
              width: '100%',
              outline: 'none'
            }}
          />
        </div>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            background: '#ffffff',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '7px 12px',
            color: '#334155',
            fontSize: '0.82rem',
            fontWeight: 500,
            outline: 'none'
          }}
        >
          <option value="">All Categories</option>
          <option value="Sales">Sales</option>
          <option value="Support">Support</option>
          <option value="Billing">Billing</option>
          <option value="Technical">Technical</option>
          <option value="Other">Other</option>
        </select>

        {/* Priority Filter */}
        <select
          value={priorityFilter}
          onChange={(e) => {
            setPriorityFilter(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            background: '#ffffff',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '7px 12px',
            color: '#334155',
            fontSize: '0.82rem',
            fontWeight: 500,
            outline: 'none'
          }}
        >
          <option value="">All Priorities</option>
          <option value="Urgent">Urgent</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        {/* Owner Filter */}
        <select
          value={ownerFilter}
          onChange={(e) => {
            setOwnerFilter(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            background: '#ffffff',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '7px 12px',
            color: '#334155',
            fontSize: '0.82rem',
            fontWeight: 500,
            outline: 'none'
          }}
        >
          <option value="">All Owners</option>
          <option value="Sales Team">Sales Team</option>
          <option value="Client Success">Client Success</option>
          <option value="Finance">Finance</option>
          <option value="Engineering">Engineering</option>
        </select>

        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
          {filteredRecords.length} of {records.length} records
        </span>
      </div>

      {/* Table */}
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        {filteredRecords.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '0.9rem', marginBottom: '4px', fontWeight: 600 }}>No triage records found</p>
            <span style={{ fontSize: '0.8rem' }}>Run a request from the Triage Console to populate audit entries.</span>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                  <th style={{ padding: '12px 18px' }}>Ticket ID</th>
                  <th style={{ padding: '12px 18px' }}>Summary</th>
                  <th style={{ padding: '12px 18px' }}>Category</th>
                  <th style={{ padding: '12px 18px' }}>Priority</th>
                  <th style={{ padding: '12px 18px' }}>Route</th>
                  <th style={{ padding: '12px 18px' }}>Time</th>
                  <th style={{ padding: '12px 18px', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody key={`${safeCurrentPage}-${pageSize}-${categoryFilter}-${priorityFilter}-${ownerFilter}`}>
                {paginatedRecords.map((item, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <tr
                      key={item.id}
                      className="table-stagger-row"
                      style={{ 
                        background: isEven ? '#ffffff' : '#fafbfa',
                        borderBottom: '1px solid #eef2f6', 
                        transition: 'background 0.2s ease, transform 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f1f5f9';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = isEven ? '#ffffff' : '#fafbfa';
                      }}
                    >
                      <td style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: '#4338ca', fontWeight: 700 }}>
                        {item.id}
                      </td>
                      <td style={{ padding: '14px 18px', maxWidth: '340px' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.88rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '2px' }}>
                          {item.summary}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.original_text}
                        </div>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <span className={`badge ${getCategoryClass(item.category)}`}>
                          {item.category}
                        </span>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <span className={`badge ${getPriorityClass(item.priority)}`}>
                          {item.priority}
                        </span>
                      </td>
                      <td style={{ padding: '14px 18px', fontWeight: 600, color: '#334155', fontSize: '0.84rem' }}>
                        {item.assigned_to}
                      </td>
                      <td style={{ padding: '14px 18px', color: '#64748b', fontSize: '0.76rem', whiteSpace: 'nowrap' }}>
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        <button
                          onClick={() => setActiveRecordModal(item)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '5px 13px',
                            borderRadius: '7px',
                            background: '#ffffff',
                            border: '1px solid var(--border-subtle, #cbd5e1)',
                            color: 'var(--ink, #14131a)',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 1px 2px rgba(20, 19, 26, 0.04)',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--action, #14131a)';
                            e.currentTarget.style.color = '#ffffff';
                            e.currentTarget.style.borderColor = 'var(--action, #14131a)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#ffffff';
                            e.currentTarget.style.color = 'var(--ink, #14131a)';
                            e.currentTarget.style.borderColor = 'var(--border-subtle, #cbd5e1)';
                          }}
                        >
                          <Eye size={13} strokeWidth={2.5} />
                          View Ticket
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        {filteredRecords.length > 0 && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 20px',
            background: '#ffffff',
            borderTop: '1px solid var(--border-subtle)',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            {/* Left: Range and Page Size */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <span>
                Showing <strong>{startIndex + 1}</strong> to <strong>{Math.min(startIndex + pageSize, filteredRecords.length)}</strong> of <strong>{filteredRecords.length}</strong> records
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Rows:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="btn-tactile"
                  style={{
                    background: '#f8fafc',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '6px',
                    padding: '4px 9px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#334155',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--action)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-subtle)'}
                >
                  <option value={5}>5</option>
                  <option value={8}>8</option>
                  <option value={12}>12</option>
                  <option value={25}>25</option>
                </select>
              </div>
            </div>

            {/* Right: Page Navigation Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {/* Previous */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safeCurrentPage === 1}
                className="pagination-nav-btn"
                aria-label="Previous page"
              >
                <ChevronLeft size={14} className="nav-icon-prev" />
                Prev
              </button>

              {/* Page Number Buttons */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => {
                const isActive = num === safeCurrentPage;
                return (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`pagination-btn ${isActive ? 'active' : ''}`}
                    aria-label={`Page ${num}`}
                  >
                    {num}
                  </button>
                );
              })}

              {/* Next */}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safeCurrentPage === totalPages}
                className="pagination-nav-btn"
                aria-label="Next page"
              >
                Next
                <ChevronRight size={14} className="nav-icon-next" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Record Inspection Modal */}
      {activeRecordModal && (
        <TicketModal
          record={activeRecordModal}
          onClose={() => setActiveRecordModal(null)}
        />
      )}
    </div>
  );
}
