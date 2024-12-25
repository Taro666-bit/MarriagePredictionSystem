'use client';

import { motion } from "framer-motion";
import type { PredictionResult } from "@/types";

interface ResultSectionProps {
  result: PredictionResult;
}

export function ResultSection({ result }: ResultSectionProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4">分析结果</h2>
          <div className="text-6xl font-bold text-primary mb-8">
            {result.score}%
          </div>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            {result.description}
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {result.details.map((detail, index) => (
              <motion.div
                key={detail.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-3">{detail.title}</h3>
                <p className="text-gray-600">{detail.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 