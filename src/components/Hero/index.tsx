'use client';

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
              探索你们的
              <span className="text-blue-500 block mt-2">婚姻契合度</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              通过科学的算法分析和专业的心理学理论，帮助你更好地了解彼此的婚姻契合程度。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <p className="text-gray-600">基于AI深度学习的匹配分析</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <p className="text-gray-600">心理学专家团队提供理论支持</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 