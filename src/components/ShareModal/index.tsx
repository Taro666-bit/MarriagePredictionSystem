'use client';

import { useState } from 'react';
import { 
  XMarkIcon, 
  ClipboardDocumentIcon, 
  CheckIcon 
} from '@heroicons/react/24/outline';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareData: {
    title: string;
    text: string;
    url: string;
  };
}

export function ShareModal({ isOpen, onClose, shareData }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${shareData.title}\n${shareData.text}\n查看详情：${shareData.url}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        {/* 背景遮罩 */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* 弹窗内容 */}
        <div
          className="relative transform overflow-hidden rounded-lg bg-white text-left 
                   shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg w-[90%]"
          onClick={e => e.stopPropagation()}
        >
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">分享结果</h3>
              <button
                onClick={onClose}
                className="rounded-md p-2 hover:bg-gray-100 transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-gray-600 mb-2">{shareData.title}</p>
              <p className="text-gray-600 break-words">{shareData.text}</p>
            </div>

            <div className="mt-5 sm:mt-6">
              <button
                onClick={handleCopy}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 
                         bg-primary text-white rounded-lg hover:bg-primary/90 
                         transition-colors"
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-5 h-5" />
                    <span>已复制</span>
                  </>
                ) : (
                  <>
                    <ClipboardDocumentIcon className="w-5 h-5" />
                    <span>复制分享文本</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
