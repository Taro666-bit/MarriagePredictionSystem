'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { UserIcon, HeartIcon, SparklesIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { LoadingSpinner } from "../LoadingSpinner";

interface TestFormProps {
  onSubmit: (data: { name1: string; name2: string }) => Promise<void>;
  isLoading: boolean;
}

export function TestForm({ onSubmit, isLoading }: TestFormProps) {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [error, setError] = useState<string | null>(null);

  const isValid = name1.length >= 2 && name2.length >= 2;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      setError('请输入有效的姓名（至少2个字符）');
      return;
    }
    setError(null);
    
    try {
      await onSubmit({ name1, name2 });
      const resultElement = document.getElementById('result-section');
      if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (err) {
      setError('提交失败，请稍后重试');
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">开始测试</h2>
          <p className="text-gray-600 mb-2">输入你们的姓名，探索你们的契合度</p>
          <p className="text-sm text-gray-500">示例：张三、李四</p>
        </motion.div>

        <motion.form
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                你的姓名 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 
                           focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="请输入你的姓名"
                  required
                  tabIndex={1}
                />
              </div>
            </div>

            <div className="flex-shrink-0 pt-6" aria-hidden="true">
              <HeartIcon className="w-6 h-6 text-primary" />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                TA的姓名 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 
                           focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="请输入TA的姓名"
                  required
                  tabIndex={2}
                />
              </div>
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 text-red-500 mb-4 justify-center"
              >
                <ExclamationCircleIcon className="w-5 h-5" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={isLoading || !isValid}
            className={`w-full md:w-auto px-8 py-3 rounded-lg
              font-semibold transition-all flex items-center justify-center gap-2 mx-auto
              ${isValid ? 'bg-primary text-white hover:bg-primary/90' : 'bg-gray-200 text-gray-500'}
              disabled:opacity-50`}
            whileHover={isValid ? { scale: 1.02 } : {}}
            whileTap={isValid ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                <span>分析中...</span>
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5" />
                <span>开始分析</span>
              </>
            )}
          </motion.button>

          <p className="text-center text-sm text-gray-500 mt-4">
            点击"开始分析"即表示您同意我们的
            <a href="#" className="text-primary hover:underline">服务条款</a>
          </p>
        </motion.form>
      </div>
    </section>
  );
} 