'use client';

interface ErrorPageProps {
  error?: Error;
  reset?: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps = {}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-background">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          抱歉，出现了一些问题
        </h2>
        <p className="text-text-secondary mb-8 max-w-md">
          {error?.message || '页面加载出错了，请稍后再试'}
        </p>
        <div className="space-x-4">
          <button
            onClick={reset || (() => window.location.reload())}
            className="px-6 py-2 bg-primary text-white rounded-lg 
                     hover:bg-primary/90 transition-colors"
          >
            重试
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 bg-neutral/10 text-foreground rounded-lg 
                     hover:bg-neutral/20 transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    </div>
  );
} 