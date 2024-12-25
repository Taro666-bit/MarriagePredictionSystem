import { type NextWebVitalsMetric } from 'next/app';

// 性能指标上报
export function reportWebVitals(metric: NextWebVitalsMetric) {
  const { id, name, label, value } = metric;
  
  // 这里可以替换为实际的数据上报服务
  console.log(`Web Vitals ${name}:`, {
    id,
    name,
    label,
    value,
  });
}

// 错误跟踪
export function trackError(error: Error, errorInfo: any = {}) {
  // 这里可以替换为实际的错误跟踪服务
  console.error('Error tracked:', {
    error,
    errorInfo,
    url: window.location.href,
    timestamp: new Date().toISOString(),
  });
}

// 用户行为跟踪
export function trackEvent(eventName: string, eventData: any = {}) {
  // 这里可以替换为实际的分析服务
  console.log('Event tracked:', {
    event: eventName,
    data: eventData,
    url: window.location.href,
    timestamp: new Date().toISOString(),
  });
} 