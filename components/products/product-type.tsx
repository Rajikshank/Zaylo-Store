"use client";

import { VariantsWithImagesTags } from "@/lib/infer-types";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

export default function ProductType({
  variants,
}: {
  variants: VariantsWithImagesTags[];
}) {
  const searchParams = useSearchParams();
  const selectedType = searchParams.get("type") || variants[0].productType;

  console.log("selected type", selectedType);
  return variants.map((variant) => {
    if (variant.productType === selectedType) {
      return (
        <motion.div
          key={variant.id}
          animate={{ y: 0, opacity: 1 }}
          initial={{ opacity: 0, y: 6 }}
        >
          {selectedType}
        </motion.div> 
      );
    }
  });
}
