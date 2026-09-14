const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export async function fetchHealth() {
  try {
    const res = await fetch(`${BASE_URL}/api/health`);
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch (error) {
    return { status: 'offline', error: error.message };
  }
}

export async function fetchPresets() {
  try {
    const res = await fetch(`${BASE_URL}/api/presets`);
    if (!res.ok) throw new Error('Failed to load presets');
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch presets:', error);
    return { presets: [] };
  }
}

export async function submitTriage(text) {
  const res = await fetch(`${BASE_URL}/api/triage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || data.error || 'Triage processing failed');
  }
  return data.data;
}

export async function fetchHistory(filters = {}) {
  const params = new URLSearchParams();
  if (filters.category) params.append('category', filters.category);
  if (filters.priority) params.append('priority', filters.priority);
  if (filters.assigned_to) params.append('assigned_to', filters.assigned_to);
  if (filters.search) params.append('search', filters.search);

  const query = params.toString() ? `?${params.toString()}` : '';
  const res = await fetch(`${BASE_URL}/api/history${query}`);
  if (!res.ok) throw new Error('Failed to load history');
  return await res.json();
}

export async function clearAllHistory() {
  const res = await fetch(`${BASE_URL}/api/history`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to clear history');
  return await res.json();
}
