'use client';

import { useState } from 'react';
import { motion } from "framer-motion";
import { UserIcon, HeartIcon } from "@heroicons/react/24/outline";
import { LoadingSpinner } from "../LoadingSpinner";

interface TestFormProps {
  onSubmit: (data: { name1: string; name2: string }) => Promise<void>;
  isLoading: boolean;
}

export function TestForm({ onSubmit, isLoading }: TestFormProps) {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1 || !name2) return;

    // 直接提交，不等待滚动
    await onSubmit({ name1, name2 });
  };

  return (
    <section className="py-20">
      <div className="container max-w-4xl">
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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

          <motion.button
            type="submit"
            disabled={isLoading || !name1 || !name2}
            className={`w-full md:w-auto px-8 py-3 rounded-xl
              font-semibold transition-all flex items-center justify-center gap-2 mx-auto
              ${name1 && name2 ? 'bg-primary text-white hover:bg-primary/90' : 'bg-gray-200 text-gray-500'}
              disabled:opacity-50`}
            whileHover={name1 && name2 ? { scale: 1.02 } : {}}
            whileTap={name1 && name2 ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                <span>分析中...</span>
              </>
            ) : (
              <>
                <HeartIcon className="w-5 h-5" />
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