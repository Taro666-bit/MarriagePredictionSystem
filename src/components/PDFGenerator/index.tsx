'use client';

import dynamic from 'next/dynamic';

// 动态导入 PDF 生成相关组件
const PDFGenerator = dynamic(() => import('./PDFGenerator'), {
  ssr: false,
  loading: () => <p>正在加载...</p>
});

export default PDFGenerator; 