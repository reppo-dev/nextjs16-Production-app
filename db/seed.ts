import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { products } from "./schema";
import { allProducts } from "./data";

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  console.log("🌱 Seeding database...");

  await db.delete(products);
  console.log("✅ Cleared existing data");

  for (const product of allProducts) {
    await db.insert(products).values({
      name: product.name,
      slug: product.slug,
      tagline: product.tagline,
      description: product.description,
      websiteUrl: product.websiteUrl,
      tag: product.tags,
      voteCount: product.voteCount,
      createdAt: product.createdAt,
      approvedAt: product.approvedAt,
      status: product.status,
      submittedBy: product.submittedBy,
    });
    console.log(
      `✅ Added product:${product.name} (${product.voteCount || 0} votes)`,
    );
  }

  const insertedProducts = await db.select().from(products);
  console.log(`\n🎊 Successfully seeded`);

  console.log("Products in database:");
  insertedProducts.forEach((product) => {
    console.log(
      `-${product.name} (${product.slug}) - ${product.voteCount} votes`,
    );
  });
}
main()
  .catch((error) => {
    console.error("❌ Error seeding databas:", error);
    process.exit(1);
  })
  .finally(() => {
    console.log("\n✨ Seeding complete!");
    process.exit(0);
  });
