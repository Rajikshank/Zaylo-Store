import AlgoliaSearch from "@/components/products/algolia";
import ProductTags from "@/components/products/product-tags";
import Products from "@/components/products/products";
import { db } from "@/server";
import { productVariants } from "@/server/schema";
import DiscountCarousel from "./dashboard/products/Carousel";

export const revalidate = 3600;

export default async function Home() {
  const data = await db.query.productVariants.findMany({
    with: {
      variantImages: true,
      variantTags: true,
      product: true,
    },
    orderBy: (productVariants, { desc }) => [desc(productVariants.id)],
  });
  return (
    <div>
      {/* <AlgoliaSearch /> */}
      <DiscountCarousel />
      <ProductTags />
      
      <Products variants={data} />
    </div>
  );
}
