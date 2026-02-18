import { getFeaturedProducts } from "@/lib/products/products-select";

export const generateStaticParams = async () => {
  const product = await getFeaturedProducts();

  return product.map((products) => ({
    id: products.id.toString(),
  }));
};

const Product = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div>
      <h1>Product {id}</h1>
    </div>
  );
};

export default Product;
