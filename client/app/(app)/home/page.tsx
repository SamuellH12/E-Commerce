"use client";
import { axiosApi } from "@/lib/axios-client";
import { ItemsCarousel } from "@/modules/home/components/items-carousel";
import { ProductCard } from "@/modules/home/components/product-card";
import { ProductType } from "@/modules/products/types/product-types";
import { useQuery } from "@tanstack/react-query";

function Items() {}

export default function Home() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["productsQuery"],
    queryFn: async (): Promise<ProductType[]> => {
      const response = await axiosApi("/products");

      return response.data;
    },
  });

  return (
    <main className="m-auto mt-9 flex flex-col gap-6 pb-20">
      <section className="flex flex-col gap-6 m-auto">
        <h2 className="text-3xl font-bold">Livros</h2>
        <div className=" flex justify-center items-center w-full">
          <ItemsCarousel
            isLoading={isLoading}
            items={data?.map((item) => {
              return <ProductCard product={item} />;
            })}
          />
        </div>
      </section>
      <section className="flex flex-col gap-6 m-auto">
        <h2 className="text-3xl font-bold">Eletrônicos</h2>
        <div className=" flex justify-center items-center w-full">
          <ItemsCarousel
            isLoading={isLoading}
            items={data?.map((item) => {
              return <ProductCard product={item} />;
            })}
          />
        </div>
      </section>
    </main>
  );
}
