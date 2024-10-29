// SkeletonLoader.tsx
const SkeletonLoader = () => {
    return (
      <div className="animate-pulse flex flex-col space-y-4">
        {/* Header Skeleton */}
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
  
        {/* Skeleton Cards */}
        <div className="flex flex-col space-y-2">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
  
        {/* Button Skeleton */}
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mt-4 w-1/3"></div>
      </div>
    );
  };
  
  export default SkeletonLoader;
  