// Arquivo: /product-order-history/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { getOrderItemsToOrder } from "../api/order-api";
import ProductOrderCard from "./components/product-order-card";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { axiosApi } from "@/lib/axios-client";


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
  const searchParams = useSearchParams();
  const order_id = searchParams.get("order_id");
  const [items, setItems] = useState<OrderItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchProductDetails = async (productId: string) => {
    try {
      const response = await axiosApi(`/products/${productId}`);
  
      return await response.data;
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      return null;
    }
  };

  const handleViewOrderDetails = async (orderId: number) => {
    try {
      // Primeiro busca os itens do pedido
      const orderItems = await getOrderItemsToOrder(orderId);
      
      // Busca detalhes dos produtos em paralelo
      const itemsWithDetails = await Promise.all(
        orderItems.map(async (item: any) => {
          const productDetails = await fetchProductDetails(item.product_id);
          return {
            ...item,
            product_name: productDetails?.name || "Nome não disponível",
            image_url: productDetails?.image_url || ""
          };
        })
      );

      setItems(itemsWithDetails);
    } catch (err) {
      setError("Erro ao carregar detalhes do pedido");
    }
  };

  useEffect(() => {
    if (order_id && !isNaN(Number(order_id))) {
      handleViewOrderDetails(Number(order_id));
    }
  }, [order_id]);

  if (!order_id || isNaN(Number(order_id))) {
    return <p>ID do pedido inválido</p>;
  }

  return (
    <div>
      {/* Cabeçalho */}
      <div className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300">
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
          onClick={() => router.push("/home")}
        >
          Main Menu
        </button>
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
          onClick={() => router.push("/cart")}
        >
          Shopping Cart
        </button>
      </div>
  
      {/* Conteúdo principal */}
      <div className="p-4">
        <button
          className="mb-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
          onClick={() => router.push("/order-history")}
        >
          Back
        </button>
  
        <h1 className="text-2xl font-bold text-center mb-4">
          Itens by Order #{order_id}
        </h1>
  
        {error && <p className="text-red-500 text-center">{error}</p>}
  
        {items.length > 0 ? (
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
          <p className="text-gray-600 text-center">Nenhum item encontrado neste pedido</p>
        )}
      </div>
    </div>
  );
};

export default ProductOrderHistoryPage;