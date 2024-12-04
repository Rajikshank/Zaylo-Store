"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductPick({
  id,
  color,
  productType,
  title,
  price,
  ProductID,
  image,
}: {
  id: number;
  color: string;
  productType: string;
  title: string;
  price: number;
  ProductID: number;
  image: string;
}) {
  const router = useRouter();
  const searchparams = useSearchParams();
  const selectedparams = searchparams.get("type" )|| productType;

  return (
    <div
      style={{ background: color }}
      className={cn(
        "w-8 h-8 rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:opacity-75",
        selectedparams === productType ? "opacity-100" : "opacity-50"
      )}
      onClick={() =>
        router.push(
          `/products/${id}?id=${id}&price=${price}&productID=${ProductID}&title=${title}&type=${productType}&image=${image}&color=${color}`,
          { scroll: false }
        )
      }
    ></div>
  );
}
