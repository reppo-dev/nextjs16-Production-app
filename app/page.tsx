import FeatureProducts from "@/components/landing-page/feature-products";
import HeroSection from "@/components/landing-page/hero-section";
import RecentlyLaunchedProducts from "@/components/landing-page/recently-launched-products";
import { Suspense } from "react";

const Home = () => {
  return (
    <div>
      <HeroSection />

      <FeatureProducts />

      <Suspense fallback={<div>Loading...</div>}>
        <RecentlyLaunchedProducts />
      </Suspense>
    </div>
  );
};

export default Home;
