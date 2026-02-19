import FeatureProducts from "@/components/landing-page/feature-products";
import HeroSection from "@/components/landing-page/hero-section";
import RecentlyLaunchedProducts from "@/components/landing-page/recently-launched-products";
import ProductSkeleton from "@/components/products/product-skeleton";
import { Suspense } from "react";

const Home = () => {
  return (
    <div>
      <HeroSection />

      <FeatureProducts />

      <Suspense fallback={<ProductSkeleton />}>
        <RecentlyLaunchedProducts />
      </Suspense>
    </div>
  );
};

export default Home;
