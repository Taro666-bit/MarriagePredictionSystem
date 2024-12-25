'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/utils/analytics';

export function PerformanceMonitor() {
  useEffect(() => {
    // 监控页面加载性能
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        trackEvent('performance_metric', {
          name: entry.name,
          value: entry.startTime,
          duration: entry.duration,
        });
      });
    });

    // 监控关键性能指标
    observer.observe({ 
      entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift'] 
    });

    return () => observer.disconnect();
  }, []);

  return null;
} 