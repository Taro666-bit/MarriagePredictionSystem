'use client';

import { useState, useEffect } from 'react';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { TestForm } from '@/components/TestForm';
import { ResultSection } from '@/components/ResultSection';
import type { PredictionResult } from '@/types';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  // 监听结果变化，当有新结果时滚动到结果区域
  useEffect(() => {
    if (result) {
      // 给一个小延时确保 DOM 已经渲染
      setTimeout(() => {
        const resultElement = document.getElementById('result-section');
        if (resultElement) {
          resultElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [result]);

  const handleSubmit = async (data: { name1: string; name2: string }) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name1: data.name1,
          name2: data.name2
        }),
      });
      
      if (!response.ok) {
        throw new Error('分析失败');
      }

      const result = await response.json();
      // 确保在结果中包含用户输入的名字
      setResult({
        ...result,
        name1: data.name1,
        name2: data.name2
      });
    } catch (error) {
      console.error('Error:', error);
      // 这里可以添加错误提示
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setResult(null);
    // 滚动到表单区域
    const formElement = document.querySelector('form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      <Hero />
      <Features />
      <TestForm onSubmit={handleSubmit} isLoading={isLoading} />
      {result && <ResultSection result={result} onRetry={handleRetry} />}
    </main>
  );
}
