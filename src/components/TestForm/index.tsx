'use client';

import { useState } from 'react';
import { motion } from "framer-motion";

interface TestFormProps {
  onSubmit: (name1: string, name2: string) => Promise<void>;
  isLoading: boolean;
}

export function TestForm({ onSubmit, isLoading }: TestFormProps) {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1 || !name2) return;
    await onSubmit(name1, name2);
  };

  return (
    <section id="test-form" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            开始测试
          </motion.h2>
          <motion.p 
            className="text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            输入你们的姓名，探索你们的契合度
          </motion.p>
        </div>

        <motion.form
          className="max-w-md mx-auto space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-gray-700 mb-2">你的姓名</label>
            <input
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              placeholder="请输入你的姓名"
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">TA的姓名</label>
            <input
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              placeholder="请输入TA的姓名"
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-primary"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-8 py-3 bg-primary text-white rounded-lg
                     font-semibold transition-all hover:bg-primary/90 disabled:opacity-50"
          >
            {isLoading ? '分析中...' : '开始分析'}
          </button>
        </motion.form>
      </div>
    </section>
  );
} 