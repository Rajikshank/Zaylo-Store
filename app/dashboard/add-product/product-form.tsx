"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProductSchema, ZProducstSchema } from "@/types/products-schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";
import Tiptap from "./tiptap";
import { useAction } from "next-safe-action/hook";
import { createProduct } from "@/server/actions/create-product";

import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { getProduct } from "@/server/actions/get-product";
import { useEffect } from "react";

export default function ProductForm() {
  const form = useForm<ZProducstSchema>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
    },
    mode: "onChange",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const editMode = searchParams.get("id");

  const checkProduct = async (id: number) => {
    if (editMode) {
      const data = await getProduct(id);
      console.log("product id is ", editMode);
      if (data.error) {
        toast({
          variant: "destructive",
          title: data.error,
        });
        router.push("/dashboard/products");
        return;
      }

      if (data.success) {
        const id = parseInt(editMode);

        form.setValue("title", data.success.title);
        form.setValue("price", data.success.price);
        form.setValue("description", data.success.description);
        form.setValue("id", data.success.id);
      }
    }
  };

  useEffect(() => {
    if (editMode) {
      checkProduct(parseInt(editMode));
    }
  }, []);

  const { execute, status } = useAction(createProduct, {
    onSuccess: (data) => {
      if (data?.success) {
        router.push("/dashboard/products");
        toast({
          variant: "success",
          title: data.success,
        });
      }
      if (data?.error) {
        toast({
          variant: "destructive",
          title: "Something Went Wrong...",
        });
      }
    },
    onExecute: () => {
      toast({
        variant: "default",
        title: editMode ? "Saving the Changes... " : "Adding the product....",
      });
    },
  });

  async function onSubmit(values: ZProducstSchema) {
    execute(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {editMode ? <span> Edit Product</span> : <span> Create Product</span>}
        </CardTitle>
        <CardDescription>
          {editMode ? "Edit your products" : "Add a New Product"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Steel shovel" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Tiptap val={field.value} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <DollarSign
                        size={36}
                        className="p-2 bg-muted rounded-md"
                      />
                      <Input
                        {...field}
                        type="number"
                        placeholder="Your price in LKR"
                        step="0.1"
                        min={0}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={
                status === "executing" ||
                !form.formState.isValid ||
                !form.formState.isDirty
              }
              className="w-full"
              type="submit"
            >
              {editMode ? "Save Changes" : "Create Product"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
