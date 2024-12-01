"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import Image from "next/image";
import { CircleCheck, MoreHorizontal, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { deleteProdcut } from "@/server/actions/delete-product";
import { toast } from "@/hooks/use-toast";
import { useAction } from "next-safe-action/hook";
import Link from "next/link";
import { VariantsWithImagesTags } from "@/lib/infer-types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ProductVariant from "./productvariant";

type ProductColumn = {
  title: string;
  price: number;
  image: string;
  variants: VariantsWithImagesTags[];
  id: number;
};

const ActionCell = ({ row }: { row: Row<ProductColumn> }) => {
  const product = row.original;

  const { execute, status } = useAction(deleteProdcut, {
    onSuccess: (data) => {
      if (data.success) {
        toast({
          variant: "success",
          title: "Success",
          description: (
            <div className=" flex gap-2 flex-row items-start justify-center">
              {" "}
              <CircleCheck /> {data.success}
            </div>
          ),
        });
      }

      if (data.error) {
        toast({
          variant: "destructive",
          title: data.error,
        });
      }
    },

    onExecute: () => {
      toast({
        variant: "default",
        title: "Deleting the product",
      });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="h-8 w-8">
          <MoreHorizontal className="h-4" />{" "}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="dark:bg-primary focus:bg-primary/50 cursor-pointer">
          <Link href={`/dashboard/add-product?id=${product.id}`}>
            Edit Product{" "}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => execute({ id: product.id })}
          className="dark:bg-destructive focus:bg-destructive/50 cursor-pointer"
        >
          Delete Product
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<ProductColumn>[] = [
  // ...
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "variants",
    header: "Variants",
    cell: ({ row }) => {
      const variants = row.getValue("variants") as VariantsWithImagesTags[];

      return (
        <div className="flex gap-2">
          {variants.map((variant) => (
            <div key={variant.id}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ProductVariant
                      ProductID={variant.productID}
                      variant={variant}
                      editMode={true}
                    >
                      <div
                        className="w-5 h-5 rounded-full"
                        key={variant.id}
                        style={{ background: variant.color }}
                      />
                    </ProductVariant>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{variant.productType}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                <ProductVariant   editMode={false} ProductID={row.original.id}>
                  <PlusCircle />
                </ProductVariant>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a New Product Variant</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        currency: "LKR",
        style: "currency",
      }).format(price);

      return <div className="font-medium text-sm">{formatted}</div>;
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const cellImage = row.getValue("image") as string;
      const celltitle = row.getValue("title") as string;

      return (
        <div>
          <Image
            className="rounded-md"
            src={cellImage}
            alt={celltitle}
            width={50}
            height={50}
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ActionCell,
  },
];
