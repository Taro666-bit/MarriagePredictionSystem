'use client';

import { motion } from "framer-motion";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import type { PredictionResult } from "@/types";

interface TrendChartProps {
  result: PredictionResult;
}

export function TrendChart({ result }: TrendChartProps) {
  const trendData = [
    {
      stage: '当前',
      score: result.score,
      description: '目前的契合度水平'
    },
    {
      stage: '近期',
      score: Math.min(100, result.score + 5),
      description: '通过初步沟通和了解，关系会有所改善'
    },
    {
      stage: '中期',
      score: Math.min(100, result.score + 10),
      description: '随着深入了解和磨合，关系将更加稳定'
    },
    {
      stage: '远期',
      score: Math.min(100, result.score + 15),
      description: '经过共同努力，关系会达到更好的状态'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#22C55E'; // green-500
    if (score >= 70) return '#3B82F6'; // blue-500
    if (score >= 60) return '#EAB308'; // yellow-500
    return '#EF4444'; // red-500
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 h-full flex flex-col"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <ArrowTrendingUpIcon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">发展趋势</h3>
      </div>

      {/* 趋势图表 */}
      <div className="flex-1 flex flex-col">
        <div className="relative flex-1 mb-8">
          {/* 背景箭头 */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#93C5FD" />
              </linearGradient>
            </defs>
            <path
              d="M 0,120 C 100,100 200,80 400,0"
              stroke="url(#gradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* 数据点 */}
          <div className="relative flex justify-between items-end h-full px-4">
            {trendData.map((point, index) => (
              <motion.div
                key={point.stage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
                style={{
                  height: `${point.score}%`
                }}
              >
                <div 
                  className={`w-4 h-4 rounded-full bg-current mb-2`}
                  style={{ color: getScoreColor(point.score) }}
                />
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-600">
                    {point.stage}
                  </div>
                  <div 
                    className="font-bold"
                    style={{ color: getScoreColor(point.score) }}
                  >
                    {point.score}分
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 趋势说明 */}
        <div className="space-y-3 bg-gray-50 rounded-xl p-4">
          {trendData.map((point, index) => (
            <motion.div
              key={point.stage}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div 
                className="w-2 h-2 rounded-full mt-1.5"
                style={{ backgroundColor: getScoreColor(point.score) }}
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">{point.stage}</span>
                  <span 
                    className="font-bold"
                    style={{ color: getScoreColor(point.score) }}
                  >
                    {point.score}分
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{point.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 