"use client";
import { axiosApi } from "@/lib/axios-client";
import { ItemsCarousel } from "@/modules/home/components/items-carousel";
import { ProductCard } from "@/modules/home/components/product-card";
import { ProductType } from "@/modules/products/types/product-types";
import { useQueries, useQuery } from "@tanstack/react-query";

interface DepartmentType {
  id: number;
  name: string;
  create_at: string;
}

export default function Home() {
  
  const { data : departmentList = [], isLoading : departmentLoading } = useQuery({
    queryKey: ["categoriesQuery"],
    queryFn: async (): Promise<DepartmentType[]> => {
      const response = await axiosApi("/department");
      return response.data;
    },
  });


  const productQueries = useQueries({
    queries: departmentList.map((dep) => ({
      queryKey: ["productsByDepartment", dep.id],
      queryFn: async (): Promise<ProductType[]> => {
        const response = await axiosApi(`/department/${dep.id}/all`);
        return response.data;
      },
    })),
  });
  
  return (
    <main className="m-auto mt-9 flex flex-col gap-6 pb-20">
    
    { departmentList?.map((dep, index) => {
       
       const depProducts = productQueries[index]?.data;
       const isLoading = productQueries[index]?.isLoading;

       if(!depProducts || depProducts.length === 0) return (<div key={dep.id}></div>);

       return (
         <section key={dep.id} className="flex flex-col gap-6 m-auto">
           
           <h2 className="text-3xl font-bold">{dep.name}</h2>
           
           <div className="flex justify-center items-center w-full">
                <ItemsCarousel
                  items={depProducts.map((item) => (
                    <ProductCard key={item.id} product={item} />
                  ))}
                />
           </div>

        </section>
      );
      
    })}
      
    </main>
  );
}
