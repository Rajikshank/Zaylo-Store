"use client";

import { VariantsWithImagesTags } from "@/lib/infer-types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { VariantSchema } from "@/types/variant-schema";
import { InputTags } from "./input-tags";
import VariantImages from "./variant-images";
import { useAction } from "next-safe-action/hooks";
import { createVariant } from "@/server/actions/create-variant";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { deleteVariant } from "@/server/actions/delete-variants";

export default function ProductVariant({
  editMode,
  ProductID,
  variant,
  children,
}: {
  editMode: boolean;
  ProductID: number;
  variant?: VariantsWithImagesTags;
  children: React.ReactNode;
}) {
  const form = useForm<z.infer<typeof VariantSchema>>({
    resolver: zodResolver(VariantSchema),
    defaultValues: {
      tags: [],
      variantImages: [],
      color: "#000000",
      editMode,
      id: undefined,
      ProductID,
      productType: "shovel",
    },
    mode: "onChange",
  });

  const setEdit = () => {
    if (!editMode) {
      form.reset();
      return;
    }

    if (editMode && variant) {
      form.setValue("editMode", true);
      form.setValue("id", variant.id);
      form.setValue("ProductID", variant.productID);
      form.setValue("productType", variant.productType);
      form.setValue("productType", variant.productType);
      form.setValue("color", variant.color);
      form.setValue(
        "tags",
        variant.variantTags.map((tag) => tag.tag)
      );
      form.setValue(
        "variantImages",
        variant.variantImages.map((img) => ({
          name: img.name,
          size: img.size,
          url: img.url,
        }))
      );
    }
  };

  useEffect(() => {
    setEdit();
  }, []);
  const { execute, status } = useAction(createVariant, {
    onExecute() {
      toast({
        variant: "default",
        title: "Creating variant",
      });

      setOpen(false);
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast({
          variant: "success",
          title: data.success,
        });
      }
      if (data?.error) {
        toast({
          variant: "destructive",
          title: data.error,
        });
      }
    },
  });

  const variantAction = useAction(deleteVariant, {
    onExecute() {
      toast({
        variant: "default",
        title: "Deleting variant",
      });
    },
    onSuccess(data) {
      if (data.error) {
        toast({
          variant: "destructive",
          title: data.error,
        });
      }
      if (data.success) {
        toast({
          variant: "success",
          title: data.success,
        });
      }

      form.reset();
    },
  });
  function onSubmit(values: z.infer<typeof VariantSchema>) {
    execute(values);
  }
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-[860px] rounded-md">
        <DialogHeader>
          <DialogTitle>{editMode ? "Edit" : "Create"} Your Variant</DialogTitle>
          <DialogDescription>
            Manage Your Product Variants here.You can add tags.images, and more.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="productType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Pick a title for your variant"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant Color</FormLabel>
                  <FormControl>
                    <Input
                      type="color"
                      placeholder="Pick a Color for your variant"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant Tags</FormLabel>
                  <FormControl>
                    <InputTags {...field} onChange={(e) => field.onChange(e)} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <VariantImages />
            <div className="flex gap-4 items-center justify-center">
              {editMode && variant && (
                <Button
                  variant={"destructive"}
                  type="button"
                  disabled={variantAction.status === "executing"}
                  onClick={(e) => {
                    e.preventDefault();

                    variantAction.execute({ id: variant.id });
                  }}
                >
                  Delete Variant
                </Button>
              )}
              <Button
                disabled={
                  status === "executing" ||
                  !form.formState.isValid ||
                  !form.formState.isDirty
                }
                type="submit"
              >
                {editMode ? "Update Variant" : "Create Variant"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
