import { db } from "@/server";
import { products } from "@/server/schema";
import placeholder from "@/public/placholder.png";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async  function Products() {
  const products = await db.query.products.findMany({
    with:{
      productVariants:{with:{variantImages:true,variantTags:true}}
    },
    orderBy: (products, { desc }) => [desc(products.id)],
  });
  if (!Products) throw new Error("No Products Found");
  const dataTable = products.map((product) => {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      variants: [],
      image: placeholder.src,
    };
  });

  
  return (
    <div>
      <DataTable columns={columns} data={dataTable} />
    </div>
  );
}
