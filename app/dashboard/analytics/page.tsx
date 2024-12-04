import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/server";
import { orderProduct } from "@/server/schema";
import { desc } from "drizzle-orm";
import Sales from "./sales";
import Earnings from "./earnings";
export const revalidate = 0;
export default async function Page() {
  const totalOrder = await db.query.orderProduct.findMany({
    orderBy: [desc(orderProduct.id)],
    limit: 12,
    with: {
      order: { with: { user: true } },
      product: true,
      productVariants: { with: { variantImages: true } },
    },
  });

  if (totalOrder.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Orders 😪😪😪</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  if (totalOrder)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Analytics</CardTitle>
          <CardDescription>
            Check your sales , new customers and more
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col lg:flex-row gap-8 ">
          <Sales totalOrders={totalOrder} />
          <Earnings totalOrders={totalOrder} />
        </CardContent>
      </Card>
    );
}
