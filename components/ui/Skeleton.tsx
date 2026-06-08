export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded ${className}`}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-[3/4] w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  );
}
