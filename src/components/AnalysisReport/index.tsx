'use client';

import { motion } from "framer-motion";
import { 
  ChartBarIcon,
  HeartIcon,
  ChatBubbleBottomCenterTextIcon,
  LightBulbIcon
} from "@heroicons/react/24/outline";
import type { PredictionResult } from "@/types";

interface AnalysisReportProps {
  result: PredictionResult;
}

export function AnalysisReport({ result }: AnalysisReportProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 70) return 'text-blue-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const sections = [
    {
      icon: ChartBarIcon,
      title: '基础契合度',
      score: result.basic.total,
      details: [
        { label: '性格特征', score: result.basic.personality.total },
        { label: '生活习惯', score: result.basic.lifestyle.total }
      ]
    },
    {
      icon: HeartIcon,
      title: '价值观契合',
      score: result.values.total,
      details: [
        { label: '人生观', score: result.values.lifeValues.total },
        { label: '经济观', score: result.values.financialValues.total }
      ]
    },
    {
      icon: ChatBubbleBottomCenterTextIcon,
      title: '情感沟通',
      score: result.emotional.total,
      details: [
        { label: '表达能力', score: result.emotional.communication.total },
        { label: '共情能力', score: result.emotional.empathy.total }
      ]
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
          <LightBulbIcon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">详细分析报告</h3>
      </div>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-xl bg-gray-50"
          >
            <div className="flex items-center gap-3 mb-4">
              <section.icon className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{section.title}</h4>
                  <span className={`font-semibold ${getScoreColor(section.score)}`}>
                    {section.score}分
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {section.details.map((detail) => (
                <div key={detail.label} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{detail.label}</span>
                  <span className={getScoreColor(detail.score)}>
                    {detail.score}分
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 