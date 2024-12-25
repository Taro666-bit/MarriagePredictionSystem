'use client';

import { useState } from 'react';
import './styles.css';

export default function Home() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1 || !name2) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name1, name2 }),
      });

      if (!response.ok) throw new Error('分析请求失败');
      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert('分析过程中出现错误，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <section className="hero">
        <div className="container">
          <h1>
            探索你们的
            <span>婚姻契合度</span>
          </h1>
          <p>通过科学的算法分析和专业的心理学理论，帮助你更好地了解彼此的婚姻契合程度。</p>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>为什么选择我们？</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>科学方法</h3>
              <p>基于心理学理论和AI算法，提供准确的匹配分析</p>
            </div>
            <div className="feature-card">
              <h3>快速简单</h3>
              <p>仅需输入双方姓名，即可获得详细的契合度报告</p>
            </div>
            <div className="feature-card">
              <h3>专业指导</h3>
              <p>资深心理专家提供专业的关系建议和指导</p>
            </div>
            <div className="feature-card">
              <h3>隐私保护</h3>
              <p>采用先进的加密技术，确保您的信息安全</p>
            </div>
          </div>
        </div>
      </section>

      <section className="test-form">
        <div className="container">
          <h2>开始测试</h2>
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>你的姓名</label>
              <input
                type="text"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                placeholder="请输入你的姓名"
                required
              />
            </div>
            <div className="input-group">
              <label>TA的姓名</label>
              <input
                type="text"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                placeholder="请输入TA的姓名"
                required
              />
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? '分析中...' : '开始分析'}
            </button>
          </form>
        </div>
      </section>

      {result && (
        <section className="result">
          <div className="container">
            <h2>分析结果</h2>
            <div className="result-score">{result.score}%</div>
            <p className="result-description">{result.description}</p>
            <div className="result-details">
              {result.details.map((detail: any, index: number) => (
                <div key={index} className="detail-card">
                  <h3>{detail.title}</h3>
                  <p>{detail.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
