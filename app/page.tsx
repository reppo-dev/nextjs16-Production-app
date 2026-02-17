import FeatureProducts from "@/components/landing-page/feature-products";
import HeroSection from "@/components/landing-page/hero-section";
import RecentlyLaunchedProducts from "@/components/landing-page/recently-launched-products";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeatureProducts />
      <RecentlyLaunchedProducts />
    </div>
  );
};

export default Home;
