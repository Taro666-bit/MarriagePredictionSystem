'use client';

import { motion } from "framer-motion";

export function Features() {
  const features = [
    {
      title: "科学方法",
      description: "基于心理学理论和AI算法，提供准确的匹配分析"
    },
    {
      title: "快速简单",
      description: "仅需输入双方姓名，即可获得详细的契合度报告"
    },
    {
      title: "专业指导",
      description: "资深心理专家提供专业的关系建议和指导"
    },
    {
      title: "隐私保护",
      description: "采用先进的加密技术，确保您的信息安全"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          为什么选择我们？
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="p-6 bg-white rounded-lg shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 