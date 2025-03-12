import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ReactNode } from "react";
export function ItemsCarousel({ items }: { items: ReactNode[] }) {
  return (
    <Carousel>
      <CarouselContent className="w-[80vw]">
        {items.map((item, index) => {
          return (
            <CarouselItem
              key={`${index}`}
              className=" basis sm:basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
            >
              {item}
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
