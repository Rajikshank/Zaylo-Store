"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { ZProducstSchema} from "@/types/products-schema"
export default function ProductForm() {

  const form = useForm<ZProducstSchema>({
    defaultValues: {
        
        title:"",
        description:"",
        price:0

    },
  });

  return <div></div>;
}
