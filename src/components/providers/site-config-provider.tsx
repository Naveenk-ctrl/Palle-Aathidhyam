'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { defaultSiteConfig, type SiteConfig } from '@/constants/site-config';
import { backendUrl } from '@/lib/backend';

type SiteConfigContextValue = {
  siteConfig: SiteConfig;
  refreshSiteConfig: () => Promise<void>;
};

const SiteConfigContext = createContext<SiteConfigContextValue | null>(null);

export function SiteConfigProvider({ children }: { children: React.ReactNode }) {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(defaultSiteConfig);

  const refreshSiteConfig = async () => {
    try {
      const response = await fetch(backendUrl('/api/site-config'), { cache: 'no-store' });
      if (!response.ok) return;
      const result = await response.json();
      if (result?.ok && result?.data) {
        const freshData = result.data as SiteConfig;
        setSiteConfig(freshData);
        if (typeof window !== 'undefined') {
          localStorage.setItem('palle_site_config', JSON.stringify(freshData));
        }
      }
    } catch {
      // Keep defaults/cached state when the backend is unavailable.
    }
  };

  useEffect(() => {
    // 1. Immediately load from localStorage cache if available to prevent flashing
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('palle_site_config');
      if (cached) {
        try {
          setSiteConfig(JSON.parse(cached) as SiteConfig);
        } catch {
          // Fallback to default state
        }
      }
    }

    // 2. Refresh from backend to get the latest settings
    const timer = window.setTimeout(() => {
      void refreshSiteConfig();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <SiteConfigContext.Provider value={{ siteConfig, refreshSiteConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);

  if (!context) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }

  return context;
}
