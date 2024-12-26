'use client';

import { motion } from "framer-motion";
import { 
  SparklesIcon, 
  HeartIcon, 
  HandThumbUpIcon, 
  ExclamationTriangleIcon 
} from "@heroicons/react/24/outline";

interface ScoreLevelProps {
  score: number;
}

export function ScoreLevel({ score }: ScoreLevelProps) {
  const getLevelInfo = (score: number) => {
    if (score >= 90) return {
      icon: SparklesIcon,
      label: '极佳',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-100'
    };
    if (score >= 80) return {
      icon: HeartIcon,
      label: '优秀',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100'
    };
    if (score >= 70) return {
      icon: HandThumbUpIcon,
      label: '良好',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-100'
    };
    return {
      icon: ExclamationTriangleIcon,
      label: '需努力',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-100'
    };
  };

  const levelInfo = getLevelInfo(score);
  const Icon = levelInfo.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${levelInfo.bgColor} ${levelInfo.borderColor}`}
    >
      <Icon className={`w-4 h-4 ${levelInfo.color}`} />
      <span className={`text-sm font-medium ${levelInfo.color}`}>
        {levelInfo.label}
      </span>
    </motion.div>
  );
} 