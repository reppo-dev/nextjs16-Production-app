"use cache";

import SectionHeader from "../common/section-header";
import { CalendarIcon, RocketIcon } from "lucide-react";
import ProductCard from "../products/product-card";
import EmptyState from "../common/empty-state";
import { getRecentlyLaunchedProducts } from "@/lib/products/products-select";

const RecentlyLaunchedProducts = async () => {
  const recentlyLaunchedProducts = await getRecentlyLaunchedProducts();
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12 ">
        <SectionHeader
          title="Recently Launched"
          icon={RocketIcon}
          description="Discover the latest products from our community"
        />
        {recentlyLaunchedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentlyLaunchedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            message="No products launched in the last week. Check back soon for new launches"
            icon={CalendarIcon}
          />
        )}
      </div>
    </section>
  );
};

export default RecentlyLaunchedProducts;
