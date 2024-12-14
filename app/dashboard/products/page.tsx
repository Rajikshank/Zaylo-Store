import { db } from "@/server";

import placeholder from "@/public/placholder.png";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function Products() {
  const products = await db.query.products.findMany({
    with: {
      discounts: true,
      productVariants: { with: { variantImages: true, variantTags: true } },
    },
    orderBy: (products, { desc }) => [desc(products.id)],
  });

  console.log("product found", products);
  if (!products) throw new Error("No Products Found");
  const dataTable = products.map((product) => {
    if (product.productVariants.length === 0) {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        variants: [],
        image: placeholder.src,
        discount: product.discounts[0]?.discount?? 0,
      };
    }

    const image = product.productVariants[0].variantImages[0].url;
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      variants: product.productVariants,
      image,
      discount: product.discounts[0]?.discount ?? 0,
    };
  });

  return (
    <div>
      <DataTable columns={columns} data={dataTable} />
    </div>
  );
}
