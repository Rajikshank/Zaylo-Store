"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { ZProducstSchema } from "@/types/products-schema";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";

export default function ProductForm() {
  const form = useForm<ZProducstSchema>({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
    },
  });

  const onSubmit = () => {};

  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
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
                    {/* <Input placeholder="Steel shovel" {...field} /> */}
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
                    <DollarSign size={36} className="p-2 bg-muted rounded-md"/> 
                    <Input {...field} type="number" placeholder="Your price in LKR" step="0.1" min={0}/>
                   </div>
                   
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
       
    </Card>
  );
}
