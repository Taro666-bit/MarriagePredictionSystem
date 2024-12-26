'use client';

import dynamic from 'next/dynamic';
import type { PredictionResult } from '@/types';

const PDFGenerator = dynamic(() => import('../PDFGenerator'), {
  ssr: false,
  loading: () => (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <div className="w-6 h-6 animate-pulse bg-primary/20 rounded" />
        </div>
        <div className="h-6 w-20 animate-pulse bg-gray-200 rounded" />
      </div>
      <div className="h-12 w-full animate-pulse bg-gray-200 rounded-xl" />
    </div>
  ),
});

export function ReportGenerator({ result }: { result: PredictionResult }) {
  return <PDFGenerator result={result} />;
} 