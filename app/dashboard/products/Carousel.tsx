"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import { type CarouselApi } from "@/components/ui/carousel";
import { VariantsWithProduct } from "@/lib/infer-types";
import { useEffect, useState } from "react";
import placholder from "@/public/placholder.png";

type ProductTyoes = {
  variants: VariantsWithProduct[];
};

export default function DiscountCarousel({ variants }: ProductTyoes) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    let id_2;
    let id = setInterval(() => {
      if (api?.canScrollNext()) {
        api.scrollNext();
        return;
      }

      if (api?.canScrollNext() === false) {
        id_2 = setTimeout(() => api.scrollTo(0), 4000);
      }
    }, 4000);

    return () => {
      clearInterval(id);
      clearTimeout(id_2);
      return;
    };
  }, [api]);

  let images = variants.map((item) => (
    <CarouselItem key={item.id} className="flex items-center  justify-center">
      <Image
        className="object-contain h-[400px] w-full"
        loading="lazy"
        src={
          item.product.discounts[0] ? item.product.discounts[0].url : placholder
        }
        alt="Discounts"
        height={400}
        width={600}
      />
    </CarouselItem>
  ));
  return (
    <div className="rounded my-4">
      <Carousel setApi={setApi}>
        <CarouselContent>{images}</CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {images.map((item,id) => {
          
              return (
                <div
                  key={id}
                  onClick={() => api?.scrollTo(id)}
                  className="h-3 w-3 rounded-full bg-white/50 cursor-pointer hover:bg-white transition-colors"
                />
              );
           

        
          })}
          {/* <div className="h-3 w-3 rounded-full bg-white/50 hover:bg-white transition-colors" />
          <div className="h-3 w-3 rounded-full bg-white/50 hover:bg-white transition-colors" />
          <div className="h-3 w-3 rounded-full bg-white/50 hover:bg-white transition-colors" />
          <div className="h-3 w-3 rounded-full bg-white/50 hover:bg-white transition-colors" />
          <div className="h-3 w-3 rounded-full bg-white/50 hover:bg-white transition-colors" /> */}
        </div>
      </Carousel>
    </div>
  );
}
