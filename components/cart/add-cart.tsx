"use client";

import { useCartStore } from "@/lib/client-store";
import { useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
 
import { redirect, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function AddCart() {
  const { addtoCart } = useCartStore();
  const {toast}=useToast();
  

  const [quantity, setQuantity] = useState(1);
  const params = useSearchParams();
  const id = Number(params.get("id"));
  const productID = Number(params.get("productID"));
  const title = params.get("title");
  const price = Number(params.get("price"));
  const image = params.get("image");
  const type = params.get("type");

  if (!id || !productID || !title || !price || !image) {
    toast({
      variant: "destructive",
      title: "Product not found",
    });

    return redirect("/");
  }

  return (
    <>
      <div className="flex items-center  justify-stretch  my-4 gap-4  ">
        <Button
          onClick={() => {
            if (quantity > 1) {
              setQuantity(quantity - 1);
            }
          }}
          variant={"secondary"}
          className="text-primary"
        >
          <Minus size={18} strokeWidth={3} />
        </Button>
        <Button className="flex-1">Quantity :{quantity}</Button>
        <Button
          onClick={() => {
            setQuantity(quantity + 1);
          }}
          variant={"secondary"}
          className="text-primary"
        >
          <Plus size={18} strokeWidth={3} />
        </Button>
      </div>
      <Button className="w-full"
        onClick={() => {
          toast({
            variant: "success",
            title: `Added ${title + " " + type} to your cart`,
          });

          addtoCart({
            id: productID,
            variant: { variantID: id, quantity },
            name: title + " " + type!,
            price,
            image,
          });
        }}
      >
        Add to cart
      </Button>
    </>
  );
}
