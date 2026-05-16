import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ListingCardSkeletonProps {
  isGridView?: boolean;
}

export function ListingCardSkeleton({ isGridView = true }: ListingCardSkeletonProps) {
  return (
    <Card className={`overflow-hidden ${isGridView ? "flex flex-col" : "flex flex-col md:flex-row"}`}>
      {/* Image skeleton */}
      <div className={`relative bg-muted ${isGridView ? "h-56" : "h-56 md:w-80 md:h-64 flex-shrink-0"}`}>
        <Skeleton className="w-full h-full" />
        {/* Badge skeletons */}
        <Skeleton className="absolute top-3 left-3 h-5 w-20" />
        <Skeleton className="absolute bottom-3 right-3 h-6 w-24" />
      </div>
      
      {/* Content skeleton */}
      <div className={`flex flex-col flex-1 ${isGridView ? "" : "md:p-6"}`}>
        <CardContent className={`flex-1 ${isGridView ? "p-4" : "p-4 md:p-0 md:pb-0"}`}>
          {/* Title skeleton */}
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-3/4 mb-3" />
          
          {/* Location skeleton */}
          <Skeleton className="h-4 w-2/3 mb-4" />
          
          {/* Features skeleton */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          
          {/* Price per m² skeleton */}
          <Skeleton className="h-3 w-1/3" />
        </CardContent>
        
        {/* Footer skeleton */}
        <CardFooter className={`${isGridView ? "p-4 pt-0" : "p-4 md:p-0"}`}>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </div>
    </Card>
  );
}

interface ListingsListSkeletonProps {
  count?: number;
  isGridView?: boolean;
}

export function ListingsListSkeleton({ count = 6, isGridView = true }: ListingsListSkeletonProps) {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-10" />
      </div>
      <div className={`grid gap-6 ${isGridView ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
        {Array.from({ length: count }).map((_, i) => (
          <ListingCardSkeleton key={i} isGridView={isGridView} />
        ))}
      </div>
    </div>
  );
}
