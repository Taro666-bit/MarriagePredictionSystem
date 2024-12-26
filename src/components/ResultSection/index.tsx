'use client';

import { useState } from 'react';
import { motion } from "framer-motion";
import { 
  ChartBarIcon,
  ShareIcon,
  ArrowPathIcon,
  HeartIcon 
} from "@heroicons/react/24/outline";
import { ShareModal } from '@/components/ShareModal';
import type { PredictionResult } from "@/types";

interface ResultSectionProps {
  result: PredictionResult;
  onRetry: () => void;
}

export function ResultSection({ result, onRetry }: ResultSectionProps) {
  const [showShareModal, setShowShareModal] = useState(false);

  const shareData = {
    title: '婚姻契合度测试结果',
    text: `我和TA的婚姻契合度为${result.score}%！${result.description}`,
    url: window.location.href,
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  return (
    <>
      <section id="result-section" className="py-20 bg-gradient-to-b from-blue-50/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="relative w-48 h-48 mx-auto mb-12"
            >
              <div className="absolute inset-0 rounded-full border-[12px] border-gray-100" />
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeDasharray={`${result.score * 5.52} 552`}
                  className="text-primary transition-all duration-1000 ease-out"
                />
              </svg>
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div>
                  <div className="text-6xl font-bold text-primary">
                    {result.score}
                  </div>
                  <div className="text-base font-medium text-gray-500">契合度</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto whitespace-pre-line leading-relaxed"
            >
              <span className="text-2xl font-medium text-primary">
                {result.name1}
              </span>
              与
              <span className="text-2xl font-medium text-primary">
                {result.name2}
              </span>
              的婚姻契合度达到了
              <span className="text-3xl font-bold text-primary mx-2 inline-block">
                {result.score}
                <span className="text-lg font-normal">分</span>
              </span>
              ！这是一个非常理想的匹配！
            </motion.p>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
              {result.details.map((detail, index) => (
                <motion.div
                  key={detail.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 
                            hover:shadow-md transition-shadow text-left"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <ChartBarIcon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{detail.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{detail.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-4">
              <motion.button
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 
                         text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowPathIcon className="w-5 h-5" />
                <span>重新测试</span>
              </motion.button>

              <motion.button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 
                         text-primary rounded-lg hover:bg-primary/20 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShareIcon className="w-5 h-5" />
                <span>分享结果</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <ShareModal 
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        shareData={shareData}
      />
    </>
  );
} 