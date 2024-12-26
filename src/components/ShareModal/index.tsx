'use client';

import { Fragment, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { PredictionResult } from '@/types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareData: {
    title: string;
    text: string;
    url: string;
  };
  result: PredictionResult;
}

export function ShareModal({ isOpen, onClose, shareData, result }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const canShare = typeof navigator !== 'undefined' && !!navigator.share;

  const handleShare = async () => {
    try {
      if (canShare) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error('分享失败:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* 模态框 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                     w-full max-w-md bg-white rounded-2xl shadow-xl z-50 p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">分享结果</h3>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                {shareData.text}
              </p>

              <button
                onClick={handleShare}
                className="w-full py-3 rounded-xl bg-primary text-white 
                         hover:bg-primary/90 transition-colors"
              >
                {canShare ? '分享' : copied ? '已复制' : '复制分享文本'}
              </button>
            </div>
          </motion.div>
        </Fragment>
      )}
    </AnimatePresence>
  );
}
