'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackEvent } from '@/utils/analytics';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 页面访问跟踪
    trackEvent('page_view', {
      path: pathname,
      query: Object.fromEntries(searchParams.entries()),
    });
  }, [pathname, searchParams]);

  useEffect(() => {
    // 用户交互跟踪
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const trackingId = target.getAttribute('data-tracking-id');
      
      if (trackingId) {
        trackEvent('element_click', {
          id: trackingId,
          text: target.textContent,
          path: pathname,
        });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);

  return <>{children}</>;
} 