"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OrderCard from "./components/order-card";
import { useQuery } from "@tanstack/react-query";
import { axiosApi } from "@/lib/axios-client";

interface Order {
  order_id: number;
  order_data: string;
  destination: string;
  status: string;
  total_value: number | string;
}

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [showAll, setShowAll] = React.useState(false);
  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery<Order[]>({
    oonerro,
  });

  useEffect(() => {
    if (data) {
      setOrders(data);
      setRecentOrders(data.slice(0, 3));
    }
  }, [data]);

  const handleViewOrderDetails = async (orderId: number) => {
    try {
      const response = await axiosApi.get(
        `/product-order-history?order_id=${orderId}`
      );
    } catch (err) {
      console.error("Error loading order details.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-4 border-gray border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (isError)
    return (
      <p>{error instanceof Error ? error.message : "Error loading orders."}</p>
    );

  return (
    <div className="container">
      {/* Order History */}
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Order History</h1>
        <h2 className="text-xl font-semibold text-center mb-2">Last Orders</h2>
        {Array.isArray(recentOrders) && recentOrders.length > 0 ? (
          recentOrders.map((order) =>
            order?.order_id ? (
              <OrderCard
                key={order.order_id}
                order={order}
                onViewDetails={handleViewOrderDetails}
              />
            ) : null
          )
        ) : (
          <p className="text-center text-gray-600 mt-4">
            No recent orders available.
          </p>
        )}
        {!showAll && (
          <button
            className="border border-300 mt-4 px-6 py-3 text-lg font-medium text-black bg-primary  rounded hover:bg-secondary hover:text-white transition duration-300 block mx-auto w-full max-w-[200px]"
            onClick={() => {
              setRecentOrders(orders);
              setShowAll(true);
            }} // Atualiza o estado para mostrar todos os pedidos
          >
            View All Orders
          </button>
        )}
        {orders.length === 0 && (
          <p className="text-center text-gray-600 mt-4">
            You haven't placed any orders yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
