// Arquivo: /product-order-history/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { getOrderItemsToOrder } from "../api/order-api";
import ProductOrderCard from "./components/product-order-card";
import { useSearchParams } from "next/navigation";


const fetchProductDetails = async (productId: string) => {
    const response = await fetch(`/products/${productId}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar detalhes do produto");
    }
    const data = await response.json();
    return data.image_url; // Supondo que a coluna no Supabase seja `image_url`
  };


const ProductOrderHistoryPage = () => {
  const searchParams = useSearchParams();
  const order_id = searchParams.get("order_id"); // Captura o parâmetro de consulta `order_id`
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleViewOrderDetails = async (orderId: number) => {
    try {
      const fetchedItems = await getOrderItemsToOrder(orderId);
      setItems(fetchedItems); // Atualiza o estado com os itens do pedido
    } catch (err) {
      setError("Erro ao carregar detalhes do pedido.");
    }
  };

  useEffect(() => {
    const orderId = Number(order_id); 
    if (order_id && !isNaN(Number(order_id))) {
      handleViewOrderDetails(orderId); // Chama a função com o `orderId` correto
    }
    
  }, [order_id]);

  if (!order_id || isNaN(Number(order_id))) {
    return <p>ID do pedido inválido.</p>;
  }

  return (
    <div>
      <h1>Itens do Pedido #{order_id}</h1>
      {error && <p>{error}</p>}
      {items.length > 0 ? (
        items.map((item) => (
          <ProductOrderCard
            key={item.id}
            id={item.id}
            createdAt={item.created_at}
            productId={item.product_id}
            pricePaid={item.price_paid}
            amount={item.amount}
          />
        ))
      ) : (
        <p>Nenhum item encontrado para este pedido.</p>
      )}
    </div>
  );
};

export default ProductOrderHistoryPage;