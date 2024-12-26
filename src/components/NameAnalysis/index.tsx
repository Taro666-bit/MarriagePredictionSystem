'use client';

import { motion } from "framer-motion";
import { 
  SparklesIcon,
  HeartIcon,
  StarIcon
} from "@heroicons/react/24/outline";
import type { PredictionResult } from "@/types";

interface NameAnalysisProps {
  result: PredictionResult;
}

export function NameAnalysis({ result }: NameAnalysisProps) {
  // 简单的姓名匹配算法
  const getNameScore = (name1: string, name2: string) => {
    const total = Array.from(name1 + name2).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return Math.floor((total % 31 + 70)); // 生成70-100的分数
  };

  const nameScore = getNameScore(result.name1, result.name2);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-blue-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getNameAnalysis = () => {
    if (nameScore >= 90) {
      return "你们的名字搭配非常和谐，象征着美好的缘分。";
    }
    if (nameScore >= 80) {
      return "你们的名字有着不错的契合度，预示着良好的关系发展。";
    }
    if (nameScore >= 70) {
      return "你们的名字搭配较为合适，通过努力可以建立稳定的关系。";
    }
    return "你们的名字搭配独特，需要更多的理解和包容。";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <StarIcon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">姓名匹配分析</h3>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center"
          >
            <div className="text-xl font-medium text-primary mb-1">
              {result.name1}
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <HeartIcon className="w-6 h-6 text-pink-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center"
          >
            <div className="text-xl font-medium text-primary mb-1">
              {result.name2}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <div className={`text-4xl font-bold mb-2 ${getScoreColor(nameScore)}`}>
            {nameScore}分
          </div>
          <div className="text-sm text-gray-600">
            姓名匹配度
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-50 rounded-lg p-4 text-center"
        >
          <p className="text-gray-600">
            {getNameAnalysis()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 text-sm text-gray-500"
        >
          <SparklesIcon className="w-4 h-4" />
          <span>姓名匹配分析仅供参考娱乐</span>
        </motion.div>
      </div>
    </motion.div>
  );
} 