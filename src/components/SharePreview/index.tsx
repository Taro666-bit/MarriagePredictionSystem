'use client';

import { motion } from "framer-motion";
import { HeartIcon } from "@heroicons/react/24/outline";
import type { PredictionResult } from "@/types";

interface SharePreviewProps {
  result: PredictionResult;
}

export function SharePreview({ result }: SharePreviewProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 70) return 'text-blue-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold mb-2">分享预览</h3>
        <p className="text-sm text-gray-500">长按图片可保存</p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 rounded-lg">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-3 text-xl font-medium">
            <span className="text-primary">{result.name1}</span>
            <HeartIcon className="w-5 h-5 text-pink-500" />
            <span className="text-primary">{result.name2}</span>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="60"
                fill="none"
                stroke="#f0f0f0"
                strokeWidth="8"
              />
              <circle
                cx="64"
                cy="64"
                r="60"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={`${result.score * 3.77} 377`}
                className={`${getScoreColor(result.score)}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className={`text-4xl font-bold ${getScoreColor(result.score)}`}>
                {result.score}
              </div>
              <div className="text-sm text-gray-500">契合度</div>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p className="mb-2">主要评分</p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="font-medium">基础契合</div>
              <div className={getScoreColor(result.basic.total)}>
                {result.basic.total}分
              </div>
            </div>
            <div>
              <div className="font-medium">价值观</div>
              <div className={getScoreColor(result.values.total)}>
                {result.values.total}分
              </div>
            </div>
            <div>
              <div className="font-medium">情感沟通</div>
              <div className={getScoreColor(result.emotional.total)}>
                {result.emotional.total}分
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 