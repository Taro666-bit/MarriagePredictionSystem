'use client';

import { motion } from "framer-motion";
import { ClockIcon } from "@heroicons/react/24/outline";
import type { PredictionResult } from "@/types";

interface HistoryRecordProps {
  result: PredictionResult;
}

export function HistoryRecord({ result }: HistoryRecordProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 70) return 'text-blue-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const historyData = [
    {
      date: '2024-03-01',
      label: '当前测试',
      score: result.score,
      change: 0
    },
    {
      date: '2024-02-15',
      label: '初次测试',
      score: Math.max(0, result.score - 5),
      change: -5
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <ClockIcon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">历史记录</h3>
      </div>

      <div className="space-y-2">
        {historyData.map((record, index) => (
          <motion.div
            key={record.date}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 rounded-lg p-2.5 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="text-sm">
                <div className="text-gray-600 leading-snug">{record.date}</div>
                <div className="text-xs text-gray-500">{record.label}</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`font-bold ${getScoreColor(record.score)}`}>
                {record.score}分
              </span>
              {record.change !== 0 && (
                <span className="text-xs text-red-500">
                  {record.change > 0 ? '+' : ''}{record.change}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-2 text-center text-xs text-gray-500 leading-snug">
        历史记录可以帮助你了解关系的发展趋势
      </div>
    </motion.div>
  );
} 