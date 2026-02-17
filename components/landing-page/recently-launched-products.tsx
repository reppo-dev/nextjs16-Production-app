import React from "react";
import SectionHeader from "../common/section-header";
import { RocketIcon } from "lucide-react";
import ProductCard from "../products/product-card";

interface Product {
  id: number;
  name: string;
  description: string;
  tags: string[];
  votes: number;
  isFeatured: boolean;
}

const recentlyLaunchedProducts: Product[] = [
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

const RecentlyLaunchedProducts = () => {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Recently Launched"
          icon={RocketIcon}
          description="Discover the latest products from our community"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentlyLaunchedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyLaunchedProducts;
