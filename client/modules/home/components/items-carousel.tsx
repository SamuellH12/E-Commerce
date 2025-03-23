import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselSkeleton,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode } from "react";
export function ItemsCarousel({
  items,
  isLoading,
}: {
  items: ReactNode[];
  isLoading?: boolean;
}) {
  return (
    <Carousel>
      <CarouselContent className="w-[80vw]">
        {isLoading ? (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem
                key={index}
                className=" basis sm:basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
              >
                <Skeleton className="w-full h-[368px]" />
              </CarouselItem>
            ))}
          </>
        ) : (
          <>
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
          </>
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
