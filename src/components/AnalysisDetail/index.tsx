'use client';

import { motion } from "framer-motion";
import { 
  UserIcon,
  HomeIcon,
  ChatBubbleBottomCenterTextIcon,
  HeartIcon,
  AcademicCapIcon,
  BanknotesIcon,
  SparklesIcon,
  ExclamationTriangleIcon,
  LightBulbIcon
} from "@heroicons/react/24/outline";
import type { PredictionResult } from "@/types";

interface AnalysisDetailProps {
  result: PredictionResult;
  activeTab: string;
}

export function AnalysisDetail({ result, activeTab }: AnalysisDetailProps) {
  // 获取分数颜色
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 70) return 'text-blue-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  // 渲染分数条
  const ScoreBar = ({ score }: { score: number }) => (
    <div className="w-full bg-gray-100 rounded-full h-2">
      <div 
        className={`h-full rounded-full transition-all duration-500 ${getScoreColor(score)}`}
        style={{ width: `${score}%` }}
      />
    </div>
  );

  // 添加评分卡片组件
  const ScoreCard = ({ 
    title, 
    score, 
    icon: Icon,
    description,
    delay = 0 
  }: { 
    title: string; 
    score: number;
    icon: any;
    description: string;
    delay?: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">{title}</h4>
            <span className={`font-semibold ${getScoreColor(score)}`}>
              {score}分
            </span>
          </div>
          <p className="text-sm text-gray-600">{description}</p>
          <div className="mt-3">
            <ScoreBar score={score} />
          </div>
        </div>
      </div>
    </motion.div>
  );

  // 添加建议卡片组件
  const SuggestionCard = ({ 
    type, 
    title, 
    content 
  }: { 
    type: 'suggestion' | 'warning'; 
    title: string; 
    content: string;
  }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-lg border ${
        type === 'suggestion' 
          ? 'bg-green-50/50 border-green-100' 
          : 'bg-yellow-50/50 border-yellow-100'
      }`}
    >
      <div className="flex items-start gap-3">
        {type === 'suggestion' ? (
          <SparklesIcon className="w-5 h-5 text-green-500 mt-0.5" />
        ) : (
          <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500 mt-0.5" />
        )}
        <div>
          <h4 className={`font-medium mb-1 ${
            type === 'suggestion' ? 'text-green-700' : 'text-yellow-700'
          }`}>
            {title}
          </h4>
          <p className={`text-sm ${
            type === 'suggestion' ? 'text-green-600' : 'text-yellow-600'
          }`}>
            {content}
          </p>
        </div>
      </div>
    </motion.div>
  );

  // 添加总体评价组件
  const OverallSummary = ({ score }: { score: number }) => {
    const getSummaryText = (score: number) => {
      if (score >= 90) return "你们的匹配度非常高，具有很大的发展潜力！";
      if (score >= 80) return "你们是很好的一对，彼此都值得珍惜。";
      if (score >= 70) return "你们有不错的基础，需要共同努力。";
      if (score >= 60) return "需要更多的理解和包容，慢慢培养感情。";
      return "建议多多沟通，了解彼此的差异。";
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 p-4 bg-primary/5 rounded-lg"
      >
        <h3 className="text-lg font-semibold mb-2">总体评价</h3>
        <p className="text-gray-600">{getSummaryText(score)}</p>
      </motion.div>
    );
  };

  // 渲染基础分析
  const renderBasicAnalysis = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span>性格特征</span>
        <span className={getScoreColor(result.basic.personality.total)}>
          {result.basic.personality.total}分
        </span>
      </div>
      <ScoreBar score={result.basic.personality.total} />

      <div className="flex items-center justify-between">
        <span>生活习惯</span>
        <span className={getScoreColor(result.basic.lifestyle.total)}>
          {result.basic.lifestyle.total}分
        </span>
      </div>
      <ScoreBar score={result.basic.lifestyle.total} />
    </div>
  );

  // 渲染价值观分析
  const renderValuesAnalysis = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span>人生价值观</span>
        <span className={getScoreColor(result.values.lifeValues.total)}>
          {result.values.lifeValues.total}分
        </span>
      </div>
      <ScoreBar score={result.values.lifeValues.total} />

      <div className="flex items-center justify-between">
        <span>经济观念</span>
        <span className={getScoreColor(result.values.financialValues.total)}>
          {result.values.financialValues.total}分
        </span>
      </div>
      <ScoreBar score={result.values.financialValues.total} />
    </div>
  );

  // 渲染情感沟通分析
  const renderEmotionalAnalysis = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span>沟通表达</span>
        <span className={getScoreColor(result.emotional.communication.total)}>
          {result.emotional.communication.total}分
        </span>
      </div>
      <ScoreBar score={result.emotional.communication.total} />

      <div className="flex items-center justify-between">
        <span>情感共鸣</span>
        <span className={getScoreColor(result.emotional.empathy.total)}>
          {result.emotional.empathy.total}分
        </span>
      </div>
      <ScoreBar score={result.emotional.empathy.total} />
    </div>
  );

  return (
    <div className="space-y-8">
      {activeTab === 'basic' && <OverallSummary score={result.score} />}
      
      <div className="grid gap-6 md:grid-cols-2">
        {activeTab === 'basic' && (
          <>
            <ScoreCard
              title="性格特征匹配"
              score={result.basic.personality.total}
              icon={UserIcon}
              description="分析你们的性格特点是否互补，包括内向/外向程度、决策方式等方面。"
              delay={0.1}
            />
            <ScoreCard
              title="生活方式兼容"
              score={result.basic.lifestyle.total}
              icon={HomeIcon}
              description="评估日常生活习惯的契合度，包括作息时间、兴趣爱好等。"
              delay={0.2}
            />
          </>
        )}

        {activeTab === 'values' && (
          <>
            <ScoreCard
              title="人生价值观"
              score={result.values.lifeValues.total}
              icon={AcademicCapIcon}
              description="评估在事业、家庭、个人发展等方面的价值观契合度。"
            />
            <ScoreCard
              title="经济观念"
              score={result.values.financialValues.total}
              icon={BanknotesIcon}
              description="分析在消费、理财、��济规划等方面的观念一致性。"
            />
          </>
        )}

        {activeTab === 'emotional' && (
          <>
            <ScoreCard
              title="沟通表达"
              score={result.emotional.communication.total}
              icon={ChatBubbleBottomCenterTextIcon}
              description="评估双方在日常交流、情感表达等方面的能力。"
            />
            <ScoreCard
              title="情感共鸣"
              score={result.emotional.empathy.total}
              icon={HeartIcon}
              description="分析双方在理解、包容、情感支持等方面的能力。"
            />
          </>
        )}
      </div>

      {activeTab === 'basic' && (
        <>
          <div className="grid gap-4 md:grid-cols-2 mt-8">
            <SuggestionCard
              type="suggestion"
              title="发展建议"
              content="保持开放和诚实的沟通，定期分享彼此的想法和感受。共同制定未来计划，相互支持对方的成长。"
            />
            <SuggestionCard
              type="warning"
              title="需要注意"
              content="关注对方的情感需求，学会换位思考。在发生分歧时，持冷静和理性，寻找共同解决方案。"
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="bg-green-50/50 backdrop-blur-sm rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <LightBulbIcon className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-2xl !font-semibold text-green-700">发展建议</h3>
              </div>
              <p className="!text-lg !leading-relaxed text-green-700">
                保持开放和包容的态度，定期分享彼此的想法和感受，共同制定未来规划，相互支持对方的成长。
              </p>
            </div>

            <div className="bg-amber-50/50 backdrop-blur-sm rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <ExclamationTriangleIcon className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="text-2xl !font-semibold text-amber-700">需要注意</h3>
              </div>
              <p className="!text-lg !leading-relaxed text-amber-700">
                关注双方的个性差异，学会换位思考，在发生分歧时，要冷静沟通和理解。
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 