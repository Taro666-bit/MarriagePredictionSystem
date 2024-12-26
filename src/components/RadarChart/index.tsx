'use client';

import { useEffect, useRef } from 'react';
import { ChartPieIcon } from "@heroicons/react/24/outline";
import type { PredictionResult } from "@/types";

interface RadarChartProps {
  result: PredictionResult;
}

export function RadarChart({ result }: RadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 定义数据
  const data = [
    { label: '性格特征', score: result.basic.personality.total },
    { label: '生活习惯', score: result.basic.lifestyle.total },
    { label: '价值观念', score: result.values.lifeValues.total },
    { label: '沟通能力', score: result.emotional.communication.total },
    { label: '情感共鸣', score: result.emotional.empathy.total }
  ];

  const getScoreColor = (score: number): string => {
    if (score >= 80) return '#22C55E'; // green-500
    if (score >= 70) return '#3B82F6'; // blue-500
    if (score >= 60) return '#EAB308'; // yellow-500
    return '#EF4444'; // red-500
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置canvas尺寸
    const size = 300;
    canvas.width = size;
    canvas.height = size;
    const center = size / 2;
    const radius = size * 0.35;

    // 清空画布
    ctx.clearRect(0, 0, size, size);

    // 绘制背景网格
    const drawGrid = () => {
      const levels = [0.2, 0.4, 0.6, 0.8, 1];
      levels.forEach(level => {
        ctx.beginPath();
        data.forEach((_, i) => {
          const angle = (i * 2 * Math.PI / data.length) - Math.PI / 2;
          const x = center + radius * level * Math.cos(angle);
          const y = center + radius * level * Math.sin(angle);
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        ctx.closePath();
        ctx.strokeStyle = '#E5E7EB';
        ctx.stroke();
      });
    };

    // 绘制数据区域
    const drawData = () => {
      // 填充区域
      ctx.beginPath();
      data.forEach((item, i) => {
        const angle = (i * 2 * Math.PI / data.length) - Math.PI / 2;
        const distance = (radius * item.score) / 100;
        const x = center + distance * Math.cos(angle);
        const y = center + distance * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.closePath();
      ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.fill();
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 绘制数据点
      data.forEach((item, i) => {
        const angle = (i * 2 * Math.PI / data.length) - Math.PI / 2;
        const distance = (radius * item.score) / 100;
        const x = center + distance * Math.cos(angle);
        const y = center + distance * Math.sin(angle);

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = '#3B82F6';
        ctx.fill();
      });
    };

    // 绘制标签
    const drawLabels = () => {
      ctx.font = '12px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      data.forEach((item, i) => {
        const angle = (i * 2 * Math.PI / data.length) - Math.PI / 2;
        const labelRadius = radius * 1.2;
        const x = center + labelRadius * Math.cos(angle);
        const y = center + labelRadius * Math.sin(angle);

        // 绘制标签
        ctx.fillStyle = '#374151';
        ctx.fillText(item.label, x, y - 10);

        // 绘制分数
        ctx.fillStyle = getScoreColor(item.score);
        ctx.fillText(`${item.score}分`, x, y + 10);
      });
    };

    // 执行绘制
    drawGrid();
    drawData();
    drawLabels();
  }, [data]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
          <ChartPieIcon className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">匹配度雷达图</h3>
      </div>

      <div className="relative flex justify-center items-center">
        <canvas
          ref={canvasRef}
          style={{ width: '220px', height: '220px' }}
          className="max-w-full"
        />
      </div>
    </div>
  );
} 