"use cache";

import SectionHeader from "@/components/common/section-header";
import ProductExplorer from "@/components/products/product-explorer";
import { getAllProducts } from "@/lib/products/products-select";
import { CompassIcon } from "lucide-react";

export default async function Explore() {
  const product = await getAllProducts();
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="mb-12">
          <SectionHeader
            title="Explore All Products"
            icon={CompassIcon}
            description="Browse and discover amazing projects from our community"
          />
        </div>
        <ProductExplorer product={product} />
      </div>
    </div>
  );
}
