'use client';

import { useEffect, useRef } from 'react';

interface ScoreRingProps {
  score: number;
}

export function ScoreRing({ score }: ScoreRingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getScoreLevel = (score: number): string => {
    if (score >= 80) return '优秀';
    if (score >= 70) return '良好';
    if (score >= 60) return '一般';
    return '需努力';
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return '#22C55E';
    if (score >= 70) return '#3B82F6';
    if (score >= 60) return '#EAB308';
    return '#EF4444';
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 200;
    canvas.width = size;
    canvas.height = size;
    const center = size / 2;
    const radius = size * 0.4;
    const lineWidth = 12;

    // 清空画布
    ctx.clearRect(0, 0, size, size);

    // 绘制背景圆环
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#F3F4F6';
    ctx.lineWidth = lineWidth;
    ctx.stroke();

    // 绘制得分圆环
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (Math.PI * 2 * score) / 100;
    
    ctx.beginPath();
    ctx.arc(center, center, radius, startAngle, endAngle);
    ctx.strokeStyle = getScoreColor(score);
    ctx.lineWidth = lineWidth;
    ctx.stroke();

    // 绘制分数
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // 分数
    ctx.font = 'bold 48px system-ui';
    ctx.fillStyle = getScoreColor(score);
    ctx.fillText(score.toString(), center, center - 10);

    // 契合度
    ctx.font = '16px system-ui';
    ctx.fillStyle = '#374151';
    ctx.fillText('契合度', center, center + 20);

    // 等级
    ctx.font = '14px system-ui';
    ctx.fillStyle = '#6B7280';
    ctx.fillText(getScoreLevel(score), center, center + 40);

  }, [score]);

  return (
    <div className="flex justify-center">
      <canvas
        ref={canvasRef}
        style={{ width: '160px', height: '160px' }}
        className="max-w-full"
      />
    </div>
  );
} 