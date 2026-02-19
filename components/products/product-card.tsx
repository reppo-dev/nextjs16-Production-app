import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { StarIcon } from "lucide-react";
import { InferSelectModel } from "drizzle-orm";
import { products } from "@/db/schema";
import VotingButton from "./voting-button";

type Product = InferSelectModel<typeof products>;

const ProductCard = ({ product }: { product: Product }) => {
  const hasVoted = false;
  const tags = Array.isArray(product.tag) ? product.tag : [];
  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="group hover:bg-primary-foreground/10 border-solid border-gray-400 min-h-45 hover:scale-105 transition-all duration-200">
        <CardHeader className="flex-1">
          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
                {product.voteCount > 100 && (
                  <Badge className="gap-1 bg-primary text-primary-foreground">
                    <StarIcon className="size-3 fill-current" />
                    Featured
                  </Badge>
                )}
              </div>
              <CardDescription>{product.description}</CardDescription>
            </div>
            <VotingButton
              hasVoted={hasVoted}
              voteCount={product.voteCount}
              productId={product.id}
            />
          </div>
        </CardHeader>
        <CardFooter>
          <div className="flex items-center gap-2">
            {tags.map((tags) => (
              <Badge variant="secondary" key={tags}>
                {tags}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
