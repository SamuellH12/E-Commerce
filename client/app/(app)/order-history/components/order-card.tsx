// app/(app)/order-history/components/order-card.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface OrderCardProps {
  order: {
    order_id: number;
    order_data: string;
    destination: string;
    status: string;
    total_value: number | string; // Aceita tanto número quanto string
  };
  onViewDetails: (orderId: number) => void;
}


const OrderCard: React.FC<OrderCardProps> = ({ order, onViewDetails }) => {
  // Converte total_value para número, se necessário
  const router = useRouter();
  const totalValue = typeof order.total_value === "string" ? parseFloat(order.total_value) : order.total_value;
  const navigateToOrderDetails = () => {
    router.push(`/product-order-history?order_id=${order.order_id}`);
  };
  return (
    <div style={{ border: "1px solid #ccc", padding: "16px", margin: "8px 0", borderRadius: "8px" }}>
      <p>Order ID: {order.order_id}</p>
      <p>Date: {order.order_data}</p>
      <p>Destination: {order.destination}</p>
      <p>Status: {order.status}</p>
      <p>Total Value: R$ {totalValue.toFixed(2)}</p> {/* Usa o valor convertido */}
      <button onClick={navigateToOrderDetails}>Ver Detalhes</button>    </div>
  );
};

export default OrderCard;