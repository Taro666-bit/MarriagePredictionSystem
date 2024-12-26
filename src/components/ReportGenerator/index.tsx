'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { PredictionResult } from '@/types';
import { AnalysisDetail } from '../AnalysisDetail';
import { ScoreLevel } from '../ScoreLevel';
import { ScoreChart } from '../ScoreChart';

interface ReportGeneratorProps {
  result: PredictionResult;
}

export function ReportGenerator({ result }: ReportGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      // 找到分析结果的容器元素
      const resultElement = document.querySelector('.pdf-content');
      if (!resultElement) {
        throw new Error('找不到分析结果内容');
      }

      // 生成截图
      const canvas = await html2canvas(resultElement as HTMLElement, {
        // @ts-ignore scale 属性确实存在，但类型定义可能过时
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
      });

      // 创建 PDF
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'pt',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = pdfWidth / imgWidth;
      const totalPages = Math.ceil((imgHeight * ratio) / pdfHeight);

      // 分页添加图片
      for (let i = 0; i < totalPages; i++) {
        if (i > 0) pdf.addPage();
        pdf.addImage(
          canvas.toDataURL('image/jpeg', 1.0),
          'JPEG',
          0,
          -(i * pdfHeight),
          pdfWidth,
          imgHeight * ratio
        );
      }

      pdf.save(`${result.name1}与${result.name2}的婚姻契合度分析报告.pdf`);
    } catch (error) {
      console.error('生成PDF时出错:', error);
      alert('生成报告失败，请稍后重试');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <DocumentTextIcon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">分析报告</h3>
      </div>

      <motion.button
        onClick={generatePDF}
        disabled={isGenerating}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-3 rounded-xl bg-primary text-white 
                   hover:bg-primary/90 transition-colors flex items-center justify-center gap-2
                   ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <DocumentTextIcon className="w-5 h-5" />
        {isGenerating ? '正在生成报告...' : '下载完整分析报告'}
      </motion.button>
    </div>
  );
} 