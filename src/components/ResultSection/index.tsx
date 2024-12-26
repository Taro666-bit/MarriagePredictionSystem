'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChartBarIcon,
  ShareIcon,
  ArrowPathIcon,
  HeartIcon,
  UserIcon,
  HomeIcon,
  ChatBubbleBottomCenterTextIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import { ShareModal } from '@/components/ShareModal';
import type { PredictionResult } from "@/types";
import { AnalysisDetail } from '../AnalysisDetail';
import { ProgressIndicator } from '../ProgressIndicator';
import { ScoreLevel } from '../ScoreLevel';
import { AnalysisReport } from '../AnalysisReport';
import { ScoreChart } from '../ScoreChart';
import { SuggestionCards } from '../SuggestionCards';
import { ScoreAnalysis } from '../ScoreAnalysis';
import { SummaryAdvice } from '../SummaryAdvice';
import { TrendChart } from '../TrendChart';
import { RadarChart } from '../RadarChart';
import { NameAnalysis } from '../NameAnalysis';
import { HistoryRecord } from '../HistoryRecord';
import { DetailedAnalysis } from '../DetailedAnalysis';
import { ReportGenerator } from '../ReportGenerator';
import { ScoreRing } from '../ScoreRing';

interface ResultSectionProps {
  result: PredictionResult;
  onRetry: () => void;
}

// 添加动画变体
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// 添加标签页切换动画变体
const tabVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0
  })
};

// 添加渐变色背景组件
const GradientBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-50" />
);

// 添加装饰性图形组件
const DecorativeShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
    <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
  </div>
);

export function ResultSection({ result, onRetry }: ResultSectionProps) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [tabDirection, setTabDirection] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // 处理标签页切换
  const handleTabChange = (tab: string) => {
    const tabs = ['basic', 'values', 'emotional'];
    const currentIndex = tabs.indexOf(activeTab);
    const newIndex = tabs.indexOf(tab);
    setTabDirection(newIndex > currentIndex ? 1 : -1);
    setActiveTab(tab);
  };

  // 组件挂载时自动滚动
  useEffect(() => {
    // 给一点延时等待动画和渲染完成
    const timer = setTimeout(() => {
      if (sectionRef.current) {
        const yOffset = -50; // 顶部偏移量
        const y = sectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const shareData = {
    title: '婚姻契合度测试结果',
    text: `${result.name1}与${result.name2}的婚姻契合度为${result.score}分！${
      result.score >= 80 ? '这是非常理想的匹配！' :
      result.score >= 70 ? '这是很好的匹配' :
      result.score >= 60 ? '这是不错的搭配。' :
      '这需要更多努力。'
    }`,
    url: window.location.href,
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  // 获取图标颜色
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 70) return 'text-blue-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <section 
      ref={sectionRef}
      id="result-section" 
      className="relative min-h-screen py-20 overflow-hidden"
    >
      <GradientBackground />
      <DecorativeShapes />
      
      <div className="container relative">
        <div className="pdf-content">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto"
          >
            {/* 总分展示卡片 */}
            <motion.div
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-12"
            >
              {/* 名字和描述 */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-4 text-2xl font-medium">
                  <span className="text-primary">{result.name1}</span>
                  <HeartIcon className="w-6 h-6 text-pink-500 animate-pulse" />
                  <span className="text-primary">{result.name2}</span>
                </div>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                  {result.description}
                </p>
              </div>

              {/* 分数展示 */}
              <div className="flex flex-col items-center">
                <div className="relative w-48 h-48 mb-4">
                  <ScoreRing score={result.score} />
                </div>
                <ScoreLevel score={result.score} />
              </div>

              {/* 主要维度得分 */}
              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-lg font-medium mb-2">基础契合</div>
                  <div className={`text-2xl font-bold ${getScoreColor(result.basic.total)}`}>
                    {result.basic.total}分
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-medium mb-2">价值观</div>
                  <div className={`text-2xl font-bold ${getScoreColor(result.values.total)}`}>
                    {result.values.total}分
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-medium mb-2">情感沟通</div>
                  <div className={`text-2xl font-bold ${getScoreColor(result.emotional.total)}`}>
                    {result.emotional.total}分
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 姓名匹配分析 */}
            <div id="name-analysis">
              <NameAnalysis result={result} />
            </div>

            {/* 详细分析维度 */}
            <motion.div
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-8"
            >
              <div className="flex justify-center gap-4 mb-8">
                {[
                  { id: 'basic', label: '基础契合', icon: UserIcon },
                  { id: 'values', label: '价值观', icon: AcademicCapIcon },
                  { id: 'emotional', label: '情感沟通', icon: HeartIcon }
                ].map(({ id, label, icon: Icon }) => (
                  <motion.button
                    key={id}
                    onClick={() => handleTabChange(id)}
                    className={`px-6 py-3 rounded-xl transition-all flex items-center gap-2 ${
                      activeTab === id
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </motion.button>
                ))}
              </div>

              <div className="relative min-h-[400px]">
                <AnimatePresence mode="wait" custom={tabDirection}>
                  <motion.div
                    key={activeTab}
                    custom={tabDirection}
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <AnalysisDetail result={result} activeTab={activeTab} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* 可视化分析 */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <motion.div 
                variants={itemVariants}
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl"
              >
                <div className="p-4">
                  <ScoreChart result={result} />
                </div>
              </motion.div>
              <motion.div 
                variants={itemVariants}
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl"
              >
                <div className="p-4">
                  <RadarChart result={result} />
                </div>
              </motion.div>
            </div>

            {/* 深度分析和建议 */}
            <motion.div>
              <ScoreAnalysis result={result} />
            </motion.div>

            <motion.div>
              <SuggestionCards result={result} />
            </motion.div>

            {/* 发展趋势和总结建议区域 */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* 左侧 - 发展趋势 */}
              <div className="flex flex-col h-full">
                <motion.div variants={itemVariants} className="flex-1">
                  <TrendChart result={result} />
                </motion.div>
              </div>

              {/* 右侧 - 总结建议和历史记录 */}
              <div className="flex flex-col h-full">
                <motion.div variants={itemVariants} className="flex-1">
                  <SummaryAdvice result={result} />
                </motion.div>
                <motion.div variants={itemVariants} className="mt-4">
                  <HistoryRecord result={result} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 报告生成器和操作按钮放在 PDF 内容区域外 */}
        <motion.div variants={itemVariants} className="mb-12">
          <ReportGenerator result={result} />
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center gap-6">
          <motion.button
            onClick={onRetry}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-xl bg-gray-100 text-gray-700 
                     hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <ArrowPathIcon className="w-5 h-5" />
            重新测试
          </motion.button>
          <motion.button
            onClick={handleShare}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-xl bg-primary text-white 
                     hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <ShareIcon className="w-5 h-5" />
            分享结果
          </motion.button>
        </motion.div>
      </div>

      <ShareModal 
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        shareData={shareData}
        result={result}
      />
    </section>
  );
} 