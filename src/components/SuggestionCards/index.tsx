'use client';

import { motion } from "framer-motion";
import { 
  SparklesIcon, 
  ExclamationTriangleIcon,
  HeartIcon,
  ChatBubbleBottomCenterTextIcon,
  ScaleIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";
import type { PredictionResult } from "@/types";

interface SuggestionCardsProps {
  result: PredictionResult;
}

export function SuggestionCards({ result }: SuggestionCardsProps) {
  const suggestions = [
    {
      icon: HeartIcon,
      title: '感情培养',
      content: '保持开放和诚实的沟通，定期分享彼此的想法和感受。共同制定未来计划，相互支持对方的成长。',
      color: 'text-pink-500',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-100'
    },
    {
      icon: ChatBubbleBottomCenterTextIcon,
      title: '沟通技巧',
      content: '学会倾听对方的想法，表达时注意语气和方式。在发生分歧时，保持冷静和理性，寻找共同解决方案。',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100'
    },
    {
      icon: ScaleIcon,
      title: '平衡发展',
      content: '在事业和家庭之间找到平衡点，互相理解和支持对方的追求。共同规划未来，制定可行的目标。',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-100'
    },
    {
      icon: UserGroupIcon,
      title: '关系维护',
      content: '经营好与双方家庭的关系，建立健康的社交圈。在生活中保持新鲜感，共同培养兴趣爱好。',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-100'
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
          <SparklesIcon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">发展建议</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {suggestions.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl border ${item.bgColor} ${item.borderColor}`}
          >
            <div className="flex items-start gap-3">
              <item.icon className={`w-5 h-5 ${item.color} mt-0.5`} />
              <div>
                <h4 className={`font-medium mb-2 ${item.color}`}>
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {item.content}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 