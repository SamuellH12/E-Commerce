"use client";

// /cliente/app/(app)/order-history/page.tsx
import React, { useEffect, useState } from "react";
import { getOrders, getOrderItems, getOrderItemsToOrder } from "./../api/order-api";
import OrderCard from "./components/order-card";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        console.log(data);
        setOrders(data);
        setRecentOrders(data.slice(0, 3)); // Exibe apenas os 3 pedidos mais recentes
      } catch (err) {
        setError("Erro ao carregar pedidos.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleViewOrderDetails = async (orderId: number) => {
    try {
      const items = await getOrderItemsToOrder(orderId);
      alert(JSON.stringify(items, null, 2)); // Exibe os itens em um alerta (pode ser substituído por uma modal)
    } catch (err) {
      setError("Erro ao carregar detalhes do pedido.");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Order History</h1>

      {/* Exibe os 3 pedidos mais recentes */}
      <h2>Last Orders</h2>
      {recentOrders.map((order) => (
        <OrderCard key={order.order_id} order={order} onViewDetails={handleViewOrderDetails} />
      ))}

      {/* Botão para ver todos os pedidos */}
      <button onClick={() => setRecentOrders(orders)}>All Orders</button>

      {/* Mensagem caso não haja pedidos */}
      {orders.length === 0 && <p>You haven't placed any orders yet.</p>}
    </div>
  );
};

export default OrderHistoryPage;