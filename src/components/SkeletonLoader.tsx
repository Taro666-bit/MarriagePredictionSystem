export function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-8">
      {/* Hero区域骨架屏 */}
      <div className="h-[70vh] bg-neutral/10 rounded-2xl" />
      
      {/* 表单区域骨架屏 */}
      <div className="max-w-md mx-auto space-y-4">
        <div className="h-12 bg-neutral/10 rounded-xl" />
        <div className="h-12 bg-neutral/10 rounded-xl" />
        <div className="h-12 bg-neutral/10 rounded-xl" />
      </div>
      
      {/* 特性区域骨架屏 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-64 bg-neutral/10 rounded-2xl" />
        ))}
      </div>
    </div>
  );
} 