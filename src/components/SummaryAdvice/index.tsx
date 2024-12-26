'use client';

import { motion } from "framer-motion";
import { 
  LightBulbIcon,
  HeartIcon,
  ChatBubbleBottomCenterTextIcon,
  ScaleIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import type { PredictionResult } from "@/types";

interface SummaryAdviceProps {
  result: PredictionResult;
}

export function SummaryAdvice({ result }: SummaryAdviceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <LightBulbIcon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">总结建议</h3>
      </div>

      <div className="space-y-2">
        <div className="bg-yellow-50/50 border border-yellow-100 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <SparklesIcon className="w-4 h-4 text-yellow-500 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-yellow-700 mb-0.5">基础契合需要加强</h4>
              <p className="text-xs text-yellow-600 leading-snug">建议双方多了解彼此的性格特点和生活习惯，寻找平衡点。</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50/50 border border-red-100 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <ExclamationTriangleIcon className="w-4 h-4 text-red-500 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-red-700 mb-0.5">需要共同努力</h4>
              <p className="text-xs text-red-600 leading-snug">目前存在一些挑战，但通过双方的努力和包容，关系会逐步改善。</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 