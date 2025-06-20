// components/ListSkeleton.tsx
export function ListSkeleton() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-6 animate-pulse">
          <div className="w-24 h-24 bg-gray-200 rounded-md"></div>
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}