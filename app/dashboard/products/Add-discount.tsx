"use client";

import { useAction } from "next-safe-action/hooks";
import { createDiscount } from "@/server/actions/create-Discount";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { discountSchema } from "@/types/discount-schema";
import { UploadDropzone } from "@/app/api/uploadthing/upload";
import { toast } from "@/hooks/use-toast";

export default function AddDiscountForm({ productID }: { productID: number }) {
  const form = useForm<z.infer<typeof discountSchema>>({
    resolver: zodResolver(discountSchema),
    defaultValues: {
      url: "",
      discount: 0,
      productID: productID,
    },
    mode: "onChange",
  });

  const { execute, status } = useAction(createDiscount, {
    onSuccess(data) {
      if (data?.error) {
        console.log(data.error);
      }
      if (data?.success) {
        console.log(data.success);
        toast({variant:"success",
          title:data.success
        })
      }
    },
    onError(error) {
      console.log(error);
    },
  });

  async function onSubmit(values: z.infer<typeof discountSchema>) {
    console.log("executing...");

    execute(values);
  }
  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add your Discount Amount of your product</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Your price in LKR"
                  step="0.1"
                  min={0}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add your Discount Amount of your product</FormLabel>
              <FormControl>
                <UploadDropzone
                config={{mode:"auto"}}
                  onClientUploadComplete={(file) => {
                    form.setValue("url", file[0].url);
                  }}
                  className="ut-allowed-content:text-secondary-foreground ut-label:text-primary
              ut-upload-icon:text-primary/50 hover:bg-primary/10 transition-all duration-500 ease-in-out border-secondary ut-button:bg-primary/75 ut-button:ut-readying:bg-secondary"
                  endpoint="dicountUploader"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center w-full justify-center"> <Button type="submit">Submit</Button></div>

        
      </form>
    </Form>
  );
}
