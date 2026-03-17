import { useState, useEffect } from 'react';

export interface LocalOrg {
  name: string;
  type: string;
  location?: string;
  description?: string;
  phone?: string;
  website?: string;
}

export function useLocalOrganizations(sportName: string, location: string = 'Santa Barbara, CA') {
  const [organizations, setOrganizations] = useState<LocalOrg[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sportName) return;

    const fetchOrganizations = async () => {
      setLoading(true);
      setError(null);
      try {
        // Call our Netlify function that will do the web search
        const response = await fetch('/.netlify/functions/search-local-orgs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sport: sportName, location })
        });
        
        if (!response.ok) {
          console.warn('Search function failed, using empty results');
          setOrganizations([]);
          return;
        }
        
        const data = await response.json();
        setOrganizations(data.organizations || []);
      } catch (err) {
        console.warn('Error fetching organizations:', err);
        // Silently fail - will show the Google Search fallback instead
        setOrganizations([]);
      } finally {
        setLoading(false);
      }
    };

    // Small delay to avoid too many requests
    const timer = setTimeout(fetchOrganizations, 300);
    return () => clearTimeout(timer);
  }, [sportName, location]);

  return { organizations, loading, error };
}
