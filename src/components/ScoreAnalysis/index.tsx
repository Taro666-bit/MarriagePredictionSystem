'use client';

import { motion } from "framer-motion";
import { 
  ChartBarIcon,
  HeartIcon,
  ChatBubbleBottomCenterTextIcon,
  LightBulbIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import type { PredictionResult } from "@/types";

interface ScoreAnalysisProps {
  result: PredictionResult;
}

export function ScoreAnalysis({ result }: ScoreAnalysisProps) {
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
    return '需改进';
  };

  const analysisPoints = [
    {
      title: '基础契合度',
      score: result.basic.total,
      details: [
        {
          label: '性格特征',
          value: result.basic.personality.total,
          comment: result.basic.personality.total >= 70 
            ? '性格特征互补，有利于关系发展'
            : '性格差异较大，需要互相理解'
        },
        {
          label: '生活习惯',
          value: result.basic.lifestyle.total,
          comment: result.basic.lifestyle.total >= 70
            ? '生活方式契合，易于共同生活'
            : '生活习惯有差异，需要相互适应'
        }
      ]
    },
    {
      title: '价值观契合',
      score: result.values.total,
      details: [
        {
          label: '人生观',
          value: result.values.lifeValues.total,
          comment: result.values.lifeValues.total >= 70
            ? '人生价值观一致，目标相近'
            : '人生追求有差异，需要沟通理解'
        },
        {
          label: '经济观',
          value: result.values.financialValues.total,
          comment: result.values.financialValues.total >= 70
            ? '经济观念相似，有利于家庭和谐'
            : '经济观念存在差异，建议及早沟通'
        }
      ]
    },
    {
      title: '情感沟通',
      score: result.emotional.total,
      details: [
        {
          label: '沟通表达',
          value: result.emotional.communication.total,
          comment: result.emotional.communication.total >= 70
            ? '沟通方式默契，表达清晰'
            : '沟通方式需要改进，建议多交流'
        },
        {
          label: '情感共鸣',
          value: result.emotional.empathy.total,
          comment: result.emotional.empathy.total >= 70
            ? '情感理解深刻，共情能力强'
            : '情感共鸣需要提升，多站在对方角度思考'
        }
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
        <h3 className="text-xl font-semibold">深度分析</h3>
      </div>

      <div className="space-y-8">
        {analysisPoints.map((point, index) => (
          <motion.div
            key={point.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{point.title}</h4>
                <span className={`text-sm ${getScoreColor(point.score)}`}>
                  ({getScoreText(point.score)})
                </span>
              </div>
              <span className={`font-semibold ${getScoreColor(point.score)}`}>
                {point.score}分
              </span>
            </div>

            <div className="space-y-3">
              {point.details.map((detail) => (
                <div 
                  key={detail.label} 
                  className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">{detail.label}</span>
                    <span className={getScoreColor(detail.value)}>
                      {detail.value}分
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{detail.comment}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 