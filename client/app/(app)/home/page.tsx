"use client";

import { useFetchProducts } from "@/modules/products/hooks/use-fetch-products";

export default function Page() {
  const { data } = useFetchProducts();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-6xl">Home</h1>
      {data?.data.map((item) => {
        return <div key={item.id}>{item.name} </div>;
      })}
    </div>
  );
}
