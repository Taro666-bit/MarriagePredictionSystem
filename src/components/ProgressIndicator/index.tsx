'use client';

import { motion } from "framer-motion";

interface ProgressIndicatorProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export function ProgressIndicator({ 
  score, 
  size = 192, 
  strokeWidth = 12 
}: ProgressIndicatorProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (score / 100) * circumference;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 70) return 'text-blue-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return '优秀';
    if (score >= 70) return '良好';
    if (score >= 60) return '一般';
    return '需努力';
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f0f0f0"
          strokeWidth={strokeWidth}
          className="transition-all duration-1000"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={`${progress} ${circumference}`}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`${getScoreColor(score)} transition-all duration-1000`}
        />
      </svg>
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <div className={`text-6xl font-bold ${getScoreColor(score)}`}>
          {score}
        </div>
        <div className="text-base font-medium text-gray-500">契合度</div>
        <div className={`text-sm ${getScoreColor(score)}`}>
          {getScoreText(score)}
        </div>
      </motion.div>
    </div>
  );
} 