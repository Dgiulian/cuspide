import { Skeleton } from "@/components/ui/skeleton";

export default function DetalleLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title skeleton */}
      <div className="mb-6 flex items-center justify-between">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-10 w-10" />
      </div>

      {/* Image carousel skeleton */}
      <Skeleton className="h-[400px] w-full rounded-lg mb-8" />

      {/* Content grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Property details skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-32 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
          </div>
        </div>

        {/* Map skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-[400px] w-full rounded-lg" />
          <Skeleton className="h-6 w-48" />
        </div>
      </div>

      {/* CTA button skeleton */}
      <div className="mt-8 flex justify-center">
        <Skeleton className="h-12 w-48" />
      </div>
    </div>
  );
}
