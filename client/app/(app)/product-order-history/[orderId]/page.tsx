"use client";
import React from "react";
import ProductOrderCard from "../components/product-order-card";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { axiosApi } from "@/lib/axios-client";
import { useQuery } from "@tanstack/react-query";

interface OrderItem {
  id: string;
  created_at: string;
  product_id: string;
  price_paid: string;
  amount: number;
  product_name: string;
  image_url: string;
}

const ProductOrderHistoryPage = () => {
  const searchParams = useParams();
  const order_id = searchParams?.orderId;
  const router = useRouter();
  const defaultImage =
    "https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg";

  if (!order_id || isNaN(Number(order_id))) {
    return <div>
      <button
          className="mb-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
          onClick={() => router.push("/order-history")}
        >
          Back
        </button>
        <p>ID do pedido inválido</p>
    </div>;
  }

  const { data: items, isLoading, isError, error } = useQuery<OrderItem[]>({
    queryKey: ["orderItems", order_id],
    queryFn: async () => {
      const response = await axiosApi.get(
        `/product-order-history?order_id=${order_id}`
      );
      const orderItems = response.data;
      const itemsWithDetails = await Promise.all(
        orderItems.map(async (item: any) => {
          try {
            const productResponse = await axiosApi.get(
              `/products/${item.product_id}`
            );
            return {
              ...item,
              product_name:
                productResponse.data.name || "Produto não disponível",
              image_url: productResponse.data.image_url || defaultImage,
            };
          } catch (error) {
            return {
              ...item,
              product_name: "Produto não disponível",
              image_url: defaultImage,
            };
          }
        })
      );
      return itemsWithDetails;
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <button
          className="mb-6 px-4 py-2 text-sm font-medium text-white bg-secondary rounded-md hover:bg-primary hover:text-black transition duration-300"
          onClick={() => router.back()}
        >
          ← Back
        </button>
  
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-4 border-gray border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }
  

  if (isError) {
    return (
      <div>
        <button
          className="mb-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
          onClick={() => router.push("/order-history")}
        >
          Back
        </button>
         <p>
        {(error as Error)?.message ||
          "Erro ao carregar detalhes do pedido"}
      </p>
      </div>
     
    );
  }

  return (
    <div>
      <div className="p-4">
        <button
          className="mb-4 px-4 py-2 text-sm font-medium text-white bg-secondary rounded-md hover:bg-primary hover:text-black transition duration-300"
          onClick={() => router.push("/order-history")}
        >
          ← Back
        </button>

        <h1 className="text-2xl font-bold text-center mb-4">
          Itens by Order #{order_id}
        </h1>

        <div className="grid gap-4">
          {items && items.length > 0 ? (
            items.map((item) => (
              <ProductOrderCard
                key={item.id}
                id={item.id}
                createdAt={item.created_at}
                productId={item.product_id}
                pricePaid={item.price_paid}
                amount={item.amount}
                productName={item.product_name}
                imageUrl={item.image_url}
              />
            ))
          ) : (
            <p className="text-gray-600 text-center">
              Nenhum item encontrado neste pedido
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductOrderHistoryPage;
