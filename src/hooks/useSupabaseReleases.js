import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const S_URL = import.meta.env.VITE_SUPABASE_URL || 'https://bwqcnuucqbbyszxciadj.supabase.co';
const S_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3cWNudXVjcWJieXN6eGNpYWRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMDA2NzAsImV4cCI6MjA5NDg3NjY3MH0.coNt_sJDy1jvCertSu1bwycnnkmwP_RSCwJZqIy7b78';

const supabaseClient = createClient(S_URL, S_KEY);

/**
 * Custom hook: carga releases de Supabase y suscribe actualizaciones en tiempo real.
 * @returns {{ releases: Array, loading: boolean, error: string|null }}
 */
export function useSupabaseReleases() {
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchReleases() {
    setLoading(true);
    const { data, error } = await supabaseClient
      .from('Releases')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching releases:', error);
      setError(error.message);
    } else {
      setReleases(data || []);
      setError(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchReleases();

    // Suscripción en tiempo real
    const channel = supabaseClient
      .channel('releases-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Releases' },
        (payload) => {
          console.log('Realtime change detected:', payload);
          fetchReleases();
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, []);

  return { releases, loading, error };
}
