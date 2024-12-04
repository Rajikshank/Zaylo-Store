"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import { useCartStore } from "@/lib/client-store";
import { formatPricetoLKR } from "@/lib/format-price";
import { MinusCircle, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";
import { createId } from "@paralleldrive/cuid2";
import { AnimatePresence, motion } from "framer-motion";
import emptycart from "@/public/emptycart.json";
import Lottie from "lottie-react";
import { Button } from "../ui/button";

export default function CartItems() {
  const { cart, addtoCart, removeFromCart, setCheckoutProgress } =
    useCartStore();

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      return acc + item.price! * item.variant.quantity;
    }, 0);
  }, [cart]);

  const priceInLetters = useMemo(() => {
    return [...totalPrice.toFixed(2).toString()].map((letter) => {
      return { letter, id: createId() };
    });
  }, [totalPrice]);
  return (
    <motion.div className="flex flex-col items-center">
      {cart.length === 0 && (
        <div className="flex-col  flex w-full items-center justify-center">
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-2xl text-muted-foreground text-center">
              {" "}
              Your cart is empty
            </h1>
            <Lottie classID="h-64" animationData={emptycart} />
          </motion.div>
        </div>
      )}
      {cart.length > 0 && (
        <div className="max-h-80 w-full overflow-y-auto">
          <Table className="max-w-2xl  mx-auto">
            <TableHeader>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={(item.id + item.variant.variantID).toString()}>
                  <TableCell>{item.name} </TableCell>
                  <TableCell>{formatPricetoLKR(item.price)} </TableCell>
                  <TableCell>
                    <div>
                      <Image
                        className="rounded-md"
                        width={48}
                        height={48}
                        src={item.image}
                        alt={item.name}
                      />
                    </div>{" "}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center  gap-8">
                      <MinusCircle
                        onClick={() => {
                          removeFromCart({
                            ...item,
                            variant: {
                              quantity: 1,
                              variantID: item.variant.variantID,
                            },
                          });
                        }}
                        className="cursor-pointer"
                        size={14}
                      />
                      <p className="text-md font-bold">
                        {item.variant.quantity}
                      </p>

                      <PlusCircle
                        className="cursor-pointer"
                        onClick={() =>
                          addtoCart({
                            ...item,
                            variant: {
                              quantity: 1,
                              variantID: item.variant.variantID,
                            },
                          })
                        }
                        size={14}
                      />
                    </div>{" "}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <motion.div className=" flex  items-center my-4 justify-center relative overflow-hidden">
        <span className="text-md ">Total : LKR </span>
        <AnimatePresence mode="popLayout">
          {priceInLetters.map((letter, i) => (
            <motion.div key={letter.id}>
              <motion.span
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ delay: i * 0.1 }}
                className="text-md inline-block"
              >
                {letter.letter}
              </motion.span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <Button
        onClick={() => setCheckoutProgress("payment-page")}
        className="max-w-md w-full"
        disabled={cart.length === 0}
      >
        Checkout
      </Button>
    </motion.div>
  );
}
