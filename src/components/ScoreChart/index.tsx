'use client';

import { motion } from "framer-motion";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import type { PredictionResult } from "@/types";

interface ScoreChartProps {
  result: PredictionResult;
}

export function ScoreChart({ result }: ScoreChartProps) {
  const scores = [
    { label: '性格特征', score: result.basic.personality.total },
    { label: '生活习惯', score: result.basic.lifestyle.total },
    { label: '价值观念', score: result.values.lifeValues.total },
    { label: '沟通能力', score: result.emotional.communication.total },
    { label: '情感共鸣', score: result.emotional.empathy.total }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 70) return 'bg-blue-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
          <ChartBarIcon className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">分数分布</h3>
      </div>

      <div className="space-y-2">
        {scores.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-sm text-gray-600">{item.label}</span>
              <span className={`text-sm font-medium ${getScoreColor(item.score).replace('bg-', 'text-')}`}>
                {item.score}分
              </span>
            </div>
            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${getScoreColor(item.score)}`}
                initial={{ width: 0 }}
                animate={{ width: `${item.score}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 