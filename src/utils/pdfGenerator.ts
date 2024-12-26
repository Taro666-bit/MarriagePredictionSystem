import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { PredictionResult } from '@/types';

export async function generatePDF(result: PredictionResult) {
  // 找到报告容器
  const reportContainer = document.querySelector('.pdf-content');
  if (!reportContainer) {
    throw new Error('找不到报告内容');
  }

  try {
    // 生成截图
    const canvas = await html2canvas(reportContainer as HTMLElement, {
      // @ts-ignore scale 属性确实存在，但类型定义可能过时
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
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

    // 保存 PDF
    pdf.save(`${result.name1}与${result.name2}的婚姻契合度分析报告.pdf`);
  } catch (error) {
    console.error('生成PDF时出错:', error);
    throw error;
  }
} 