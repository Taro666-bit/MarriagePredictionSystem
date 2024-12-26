'use client';

import { motion } from "framer-motion";
import { 
  MagnifyingGlassIcon,
  HeartIcon,
  UserGroupIcon,
  ScaleIcon,
  ChatBubbleBottomCenterTextIcon
} from "@heroicons/react/24/outline";
import type { PredictionResult } from "@/types";

interface DetailedAnalysisProps {
  result: PredictionResult;
}

export function DetailedAnalysis({ result }: DetailedAnalysisProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 70) return 'text-blue-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const analysisPoints = [
    {
      title: '性格匹配分析',
      icon: UserGroupIcon,
      score: result.basic.personality.total,
      strengths: [
        '性格特征互补，能够相互理解',
        '决策方式有共同点，易于达成一致',
        '生活态度积极，能够共同面对挑战'
      ],
      suggestions: [
        '继续保持开放和包容的态度',
        '在重要决定时多听取对方意见',
        '共同培养积极向上的生活氛围'
      ]
    },
    {
      title: '价值观分析',
      icon: ScaleIcon,
      score: result.values.total,
      strengths: [
        '人生目标方向一致',
        '对家庭的理解和期望相近',
        '经济观念基本契合'
      ],
      suggestions: [
        '定期沟通未来规划',
        '共同制定家庭发展目标',
        '建立合理的财务管理制度'
      ]
    },
    {
      title: '沟通能力分析',
      icon: ChatBubbleBottomCenterTextIcon,
      score: result.emotional.communication.total,
      strengths: [
        '善于表达自己的想法和感受',
        '能够理解对方的情感需求',
        '有效的沟通方式和技巧'
      ],
      suggestions: [
        '保持良好的倾听习惯',
        '适时表达关心和理解',
        '在争执时保持冷静和理性'
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
          <MagnifyingGlassIcon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">详细分析</h3>
      </div>

      <div className="space-y-8">
        {analysisPoints.map((point, index) => (
          <motion.div
            key={point.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <point.icon className="w-6 h-6 text-primary" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{point.title}</h4>
                  <span className={`font-bold ${getScoreColor(point.score)}`}>
                    {point.score}分
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-medium text-primary mb-2">优势特点</h5>
                <ul className="space-y-2">
                  {point.strengths.map((strength, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <HeartIcon className="w-4 h-4 text-pink-500" />
                      <span>{strength}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-sm font-medium text-primary mb-2">改进建议</h5>
                <ul className="space-y-2">
                  {point.suggestions.map((suggestion, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      <span>{suggestion}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 