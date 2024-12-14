import AlgoliaSearch from "@/components/products/algolia";
import ProductTags from "@/components/products/product-tags";
import Products from "@/components/products/products";
import { db } from "@/server";
import { productVariants } from "@/server/schema";
import DiscountCarousel from "./dashboard/products/Carousel";
import ProductListSingle from "@/components/products/Product-list-single";

export const revalidate = 3600;

export default async function Home() {
  const data = await db.query.productVariants.findMany({
    with: {
      variantImages: true,
      variantTags: true,
      product: { with: { discounts: true } },
    },
    orderBy: (productVariants, { desc }) => [desc(productVariants.id)],
  });
  return (
    <div>
      {/* <AlgoliaSearch /> */}
      <DiscountCarousel variants={data} />
      <ProductTags />

      <ProductListSingle data={data} />
      <Products variants={data} />
    </div>
  );
}
