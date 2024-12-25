export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4
                 bg-primary text-white px-4 py-2 rounded-lg z-50"
    >
      跳转到主要内容
    </a>
  );
} 