export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center" role="status">
      <div className="animate-spin rounded-full h-6 w-6 border-2 
                    border-primary border-t-transparent" 
           aria-label="加载中">
      </div>
    </div>
  );
} 