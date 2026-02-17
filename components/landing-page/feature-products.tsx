import SectionHeader from "../common/section-header";
import { ArrowUpRightIcon, StarIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import ProductCard from "../products/product-card";

interface Product {
  id: number;
  name: string;
  description: string;
  tags: string[];
  votes: number;
  isFeatured: boolean;
}

const featuredProducts: Product[] = [
  {
    id: 1,
    name: "ParityKit",
    description: "A toolkit for creating parity products",
    tags: ["SaaS", "Pricing", "Global"],
    votes: 615,
    isFeatured: true,
  },
  {
    id: 2,
    name: "Modern Full Stack Next.js Course",
    description: "Learn to build production-ready full stack apps with Next.js",
    tags: ["Next.js", "Full-Stack", "Course"],
    votes: 124,
    isFeatured: true,
  },
  {
    id: 3,
    name: "ProofyBubble",
    description: "Social proof notifications that convert",
    tags: ["Marketing", "SaaS", "Conversion"],
    votes: 531,
    isFeatured: true,
  },
  {
    id: 4,
    name: "Developer to Leader",
    description: "A course on Engineering Leadership",
    tags: ["Course", "Leadership"],
    votes: 503,
    isFeatured: true,
  },
];

const FeatureProducts = () => {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader
            title="Featured Today"
            icon={StarIcon}
            description="Top picks from our community this week"
          />
          <Button variant="outline" className="hidden sm:flex" asChild>
            <Link href="/explore">
              View All
              <ArrowUpRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureProducts;
