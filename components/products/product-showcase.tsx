"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { VariantsWithImagesTags } from "@/lib/infer-types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductShowcase({
  variants,
}: {
  variants: VariantsWithImagesTags[];
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeThumnail, setActiveThumnail] = useState([0]);
  const searchParams = useSearchParams();
  const selectedColor = searchParams.get("type") || variants[0].productType;

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("slidesInView", (e) => setActiveThumnail(e.slidesInView()));
  }, [api]);

  const updatePreview =(index:number)=>{
    api?.scrollTo(index)
  }
  return (
    <Carousel setApi={setApi} opts={{ loop: true }}>
      <CarouselContent>
        {variants.map(
          (variant) =>
            variant.productType === selectedColor &&
            variant.variantImages.map((img) => {
              return (
                <CarouselItem key={img.url}>
                  {img.url ? (
                    <Image
                      priority
                      className="rounded-md"
                      width={1280}
                      height={720}
                      alt={img.name}
                      src={img.url}
                    />
                  ) : null}
                </CarouselItem>
              );
            })
        )}
      </CarouselContent>
      <div className="flex overflow-clip py-2 gap-4">
        {variants.map(
          (variant) =>
            variant.productType === selectedColor &&
            variant.variantImages.map((img, index) => {
              return (
                <div className="flex overflow-clip py-2" key={img.url}>
                  {img.url ? (
                    <Image
                    onClick={()=>updatePreview(index)}
                      priority
                      className={cn(
                        index === activeThumnail[0]
                          ? "opacity-100"
                          : "opacity-75",
                        "rounded-md transition-all duration-300 ease-in-out cursor-pointer hover:opacity-75"
                      )}
                      width={72}
                      height={48}
                      alt={img.name}
                      src={img.url}
                    />
                  ) : null}
                </div>
              );
            })
        )}
      </div>
    </Carousel>
  );
}
