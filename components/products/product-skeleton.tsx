import { getRecentlyLaunchedProducts } from "@/lib/products/products-select";
import { Skeleton } from "../ui/skeleton";

const ProductSkeleton = async () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12 ">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <Skeleton className="size-6" />
            <Skeleton className="h-9 w-64" />
          </div>
          <Skeleton className="h-7 w-96" />
        </div>
        <div className="grid grid-cols-1 ">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="border rounded-lg p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-1">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-26" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSkeleton;
