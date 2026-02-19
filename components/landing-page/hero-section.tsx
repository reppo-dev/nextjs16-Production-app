import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  ArrowRightIcon,
  EyeIcon,
  RocketIcon,
  SparklesIcon,
  UserIcon,
} from "lucide-react";
import StatsCard from "./stats-card";

const statsData = [
  {
    icon: RocketIcon,
    value: "2.5K+",
    label: "Projects Shared",
  },
  {
    icon: UserIcon,
    value: "10K+",
    label: "Active Creators",
    hasBorder: true,
  },
  {
    icon: EyeIcon,
    value: "50K+",
    label: "Monthly Visitors",
  },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center lg:py-24 py-12 text-center">
          <Badge
            variant="outline"
            className="px-4 py-2 mb-8 text-sm backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-muted-foreground">
              Join thousands of creators their work
            </span>
          </Badge>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-5xl">
            Share what You&apos;ve Built,
            <br /> Discover what&apos;s Launching
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            A community platform for creators to showcase their apps, AI tools,
            SaaS products, and creative projects. Authentic launches, real
            builders, genuine feedback.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button size="lg" className="text-base px-8 shadow-lg" asChild>
              <Link href="/submit">
                <SparklesIcon className="size-5" /> Link Your Project
              </Link>
            </Button>
            <Button
              size="lg"
              className="text-base px-8 shadow-lg"
              variant="secondary"
              asChild
            >
              <Link href="/explore">
                Explore Projects <ArrowRightIcon size={5} />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-2xl w-full">
            {statsData.map((stat) => (
              <StatsCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
