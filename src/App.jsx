import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ConsolePage from './pages/ConsolePage';
import QueuesPage from './pages/QueuesPage';
import HistoryPage from './pages/HistoryPage';
import BenchmarkPage from './pages/BenchmarkPage';
import { PageFrame } from './components/PageFrame';
import { fetchHealth, fetchPresets, fetchHistory } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('console');
  const [presets, setPresets] = useState([]);
  const [records, setRecords] = useState([]);
  const [systemHealth, setSystemHealth] = useState({ status: 'connecting' });

  // Initialize data on mount
  useEffect(() => {
    async function init() {
      // 1. Health check
      const health = await fetchHealth();
      setSystemHealth(health);

      // 2. Fetch presets
      const presetsData = await fetchPresets();
      if (presetsData?.presets) {
        setPresets(presetsData.presets);
      }

      // 3. Fetch initial history
      const historyData = await fetchHistory();
      if (historyData?.records) {
        setRecords(historyData.records);
      }
    }

    init();

    // Periodic health check every 15 seconds
    const interval = setInterval(async () => {
      const health = await fetchHealth();
      setSystemHealth(health);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const refreshHistory = async () => {
    const data = await fetchHistory();
    if (data?.records) {
      setRecords(data.records);
    }
  };

  const handleTriageCompleted = (newRecord) => {
    setRecords((prev) => [newRecord, ...prev.filter(r => r.id !== newRecord.id)]);
  };

  return (
    <PageFrame>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        systemHealth={systemHealth}
      />

      <main style={{ 
        flex: 1, 
        maxWidth: activeTab === 'queues' ? '1720px' : '1440px', 
        width: '100%', 
        margin: '0 auto', 
        padding: activeTab === 'queues' ? '0 28px' : '0 24px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {activeTab === 'console' && (
          <ConsolePage
            presets={presets}
            onTriageCompleted={handleTriageCompleted}
          />
        )}

        {activeTab === 'queues' && (
          <QueuesPage
            records={records}
          />
        )}

        {activeTab === 'history' && (
          <HistoryPage
            records={records}
            onRefreshHistory={refreshHistory}
          />
        )}

        {activeTab === 'benchmark' && (
          <BenchmarkPage
            presets={presets}
          />
        )}
      </main>

      {activeTab !== 'queues' && (
        <footer style={{
          borderTop: '1px solid var(--line)',
          padding: '24px 0',
          fontSize: '0.82rem',
          color: 'var(--ink-muted)',
          background: 'var(--sheet)'
        }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>
              <strong style={{ color: 'var(--ink)' }}>Node Solutions</strong> &middot; AI Request Triage Assistant
            </div>
          </div>
        </footer>
      )}
    </PageFrame>
  );
}
