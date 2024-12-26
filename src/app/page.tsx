'use client';

import { useState } from 'react';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { TestForm } from '@/components/TestForm';
import { ResultSection } from '@/components/ResultSection';
import type { PredictionResult } from '@/types';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleSubmit = async (data: { name1: string; name2: string }) => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('分析失败');
      }

      const result = await response.json();
      setResult(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setResult(null);
    // 滚动到表单区域
    const formElement = document.querySelector('form');
    if (formElement) {
      const y = formElement.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Hero />
      <Features />
      <TestForm onSubmit={handleSubmit} isLoading={isLoading} />
      {result && <ResultSection result={result} onRetry={handleRetry} />}
    </main>
  );
}
