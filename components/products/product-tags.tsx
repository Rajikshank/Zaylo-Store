"use client";

import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

import { useRouter, useSearchParams } from "next/navigation";

export default function ProductTags() {
  const router = useRouter();
  const params = useSearchParams();
  const tag = params.get("tag");
 

  const setFilter = (tag: string) => {
    if (tag) {
      router.push(`?tag=${tag}`);
    }

    if (!tag) {
      router.push("/");
    }
  };
  return (
    <div className="my-12 flex gap-4 items-center justify-center">
      <Badge
        onClick={() => setFilter("")}
        className={cn(
          "cursor-pointer bg-black  hover:bg-black/75 hover:opacity-100",
          !tag ? "opacity-100" : "opacity-50"
        )}
      >
        All
      </Badge>
      <Badge
        onClick={() => setFilter("HomeTools")}
        className={cn(
          "cursor-pointer bg-blue-500 hover:bg-blue-600 hover:opacity-100",
          tag === "HomeTools" && tag ? "opacity-100" : "opacity-50"
        )}
      >
        Home Tools
      </Badge>
      <Badge
        onClick={() => setFilter("Shovels")}
        className={cn(
          "cursor-pointer bg-green-500 hover:bg-green-600 hover:opacity-100",
          tag === "Shovels" && tag ? "opacity-100" : "opacity-50"
        )}
      >
        Shovels
      </Badge>
    </div>
  );
}
