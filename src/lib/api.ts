import { useState, useEffect } from 'react';

export async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`/api/v1/admin/${endpoint}`);
  const json = await response.json();
  if (!json.success) throw new Error(json.error || 'API Error');
  return json.data as T;
}

export function useApi<T>(endpoint: string, initialData: T) {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchApi<T>(endpoint)
      .then(res => {
        if (mounted) {
          setData(res);
          setLoading(false);
        }
      })
      .catch(err => {
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => { mounted = false; };
  }, [endpoint]);

  return { data, loading, error, setData };
}

export async function seedDemoData() {
  const response = await fetch('/api/v1/admin/demo/seed', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      districtCode: 'JH-RNC',
      districtName: 'Ranchi',
      adminEmail: 'admin@jharkhand.gov.in'
    })
  });
  const json = await response.json();
  return json;
}
