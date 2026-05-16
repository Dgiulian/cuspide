import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ListingCardSkeletonProps {
  isGridView?: boolean;
}

export function ListingCardSkeleton({ isGridView = true }: ListingCardSkeletonProps) {
  return (
    <Card className={isGridView ? "flex flex-col" : "flex flex-col md:flex-row"}>
      <div className={`relative ${isGridView ? "h-56" : "h-full md:w-1/3 md:h-56"}`}>
        <Skeleton className="w-full h-full rounded-t-lg" />
      </div>
      <div className={isGridView ? "p-4" : "p-4 md:w-2/3"}>
        <CardHeader className="p-0 pb-4">
          <Skeleton className="h-6 w-3/4" />
        </CardHeader>
        <CardContent className="p-0 pb-4">
          <Skeleton className="h-8 w-1/2 mb-2" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
        <CardFooter className="p-0">
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
