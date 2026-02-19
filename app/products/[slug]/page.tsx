import SectionHeader from "@/components/common/section-header";
import VotingButton from "@/components/products/voting-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getFeaturedProducts,
  getProductBySlug,
} from "@/lib/products/products-select";
import { ArrowLeftIcon, CalendarIcon, StarIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export const generateStaticParams = async () => {
  const product = await getFeaturedProducts();

  return product.map((products) => ({
    slug: products.slug.toString(),
  }));
};

const Product = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  const { name, tagline, websiteUrl, voteCount } = product;

  const tags = Array.isArray(product.tag) ? product.tag : [];
  const hasVoted = false;
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link (full-width row) */}
        <div className="mb-8">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {/* replace with correct icon component; use h-4 w-4 for size */}
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Explore
          </Link>
        </div>

        {/* Main grid: main content (2 cols) + sidebar (1 col) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-6 bg-transparent">
              <div className="flex items-start gap-6">
                <div className="flex-1 min-w-0">
                  <SectionHeader
                    title={name}
                    description={tagline ?? ""}
                    icon={StarIcon}
                  />
                  {/* tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {Array.isArray(tags) &&
                      tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                  </div>
                </div>
              </div>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <h2 className="text-lg font-semibold mb-4">Product Details</h2>
                <div className="space-y-3">
                  {[
                    {
                      label: "Launched:",
                      value: new Date(
                        product.createdAt?.toISOString() ?? "",
                      ).toLocaleDateString(),
                      icon: CalendarIcon,
                    },
                    {
                      label: "Submitted by:",
                      value: product.submittedBy ?? "—",
                      icon: UserIcon,
                    },
                  ].map(({ label, value, icon: Icon }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 text-sm"
                    >
                      {Icon && (
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 flex flex-col gap-4">
              <div className="border rounded-lg p-6 bg-background">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    Support this product
                  </p>

                  <VotingButton
                    productId={product.id}
                    voteCount={voteCount}
                    hasVoted={hasVoted}
                  />
                </div>

                {voteCount > 100 && (
                  <div className="pt-6 border-t">
                    <Badge className="w-full justify-center py-2">
                      🔥 Featured Product
                    </Badge>
                  </div>
                )}
              </div>

              {websiteUrl && (
                <Button asChild className="w-full rounded-lg" variant="outline">
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
