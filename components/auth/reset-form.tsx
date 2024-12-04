"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AuthCard } from "./auth-card";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

import { useAction } from "next-safe-action/hooks";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";

import { ResetScehma } from "@/types/reset-schema";
import { reset } from "@/server/actions/password-reset";

export const ResetForm = () => {
  const form = useForm<z.infer<typeof ResetScehma>>({
    resolver: zodResolver(ResetScehma),
    defaultValues: {
      email: "",
    },
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { execute, status } = useAction(reset, {
    onSuccess(data) {
      if (data?.success) setSuccess(data.success);

      if (data?.error) setError(data.error);
    },
  });
  const onSubmit = (values: z.infer<typeof ResetScehma>) => {
    execute(values);
  };

  return (
    <AuthCard
      cardTitle="Forgot your password? "
      backButtonHref="/auth/register"
      backButtonLabel="Create a new Account"
      showSocials
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Password </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="example@email.com"
                        type="email"
                        disabled={status === "executing"}
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormSuccess message={success} />
              <FormError message={error} />
              <Button variant={"link"}>
                <Link href="/auth/reset">Forgot Yout Password</Link>
              </Button>
            </div>
            <Button
              type="submit"
              className={cn(
                "w-full my-2",
                status === "executing" ? "animate-pulse" : ""
              )}
            >
              {"Reset Password"}
            </Button>
          </form>
        </Form>
      </div>
    </AuthCard>
  );
};
