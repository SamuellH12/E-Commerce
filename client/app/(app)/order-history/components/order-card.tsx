"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface OrderCardProps {
  order: {
    order_id: number;
    order_data: string;
    destination: string;
    status: string;
    total_value: number | string;
  };
  onViewDetails: (orderId: number) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onViewDetails }) => {
  const router = useRouter();
  const totalValue = typeof order.total_value === "string" ? parseFloat(order.total_value) : order.total_value;
  const navigateToOrderDetails = () => {
    router.push(`/product-order-history?order_id=${order.order_id}`);
  };

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #ddd",
      padding: "16px",
      margin: "8px 0",
      borderRadius: "12px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "0.3s",
      cursor: "pointer"
    }}>
      <h3 style={{ marginBottom: "8px", color: "#333" }}>Order #{order.order_id}</h3>
      <p style={{ color: "#666", fontSize: "14px" }}>Date: {order.order_data}</p>
      <p style={{ color: "#666", fontSize: "14px" }}>Destination: {order.destination}</p>
      <p style={{ color: "#666", fontSize: "14px" }}>Status: <strong style={{ color: order.status === 'Delivered' ? "#28a745" : "#dc3545" }}>{order.status}</strong></p>
      <p style={{ fontWeight: "bold", fontSize: "16px", color: "#000" }}>Total Value: R$ {totalValue.toFixed(2)}</p>
      <button style={{
        marginTop: "10px",
        padding: "10px 15px",
        fontSize: "14px",
        background: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "0.3s"
      }} onClick={navigateToOrderDetails}>
        View Details
      </button>
    </div>
  );
};

export default OrderCard;