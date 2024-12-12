import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { db } from "@/server";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

export default async function DiscountCarousel() {
  let data = await db.query.variantImages.findMany();

  console.log("products", data);

  return (
    <div className="bg-slate-300 rounded my-4">
      <Carousel>
        <CarouselContent>
          {data.map((item) => (
            <CarouselItem
              key={item.id}
              className="flex items-center justify-center"
            >
              <Image
                className="object-contain h-[400px] w-[600px]"
                loading="lazy"
                src={item.url}
                alt="Discounts"
                height={400}
                width={600}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
