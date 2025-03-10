"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getOrderItemsToOrder, getOrders } from "./../api/order-api";
import OrderCard from "./components/order-card";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
        setRecentOrders(data.slice(0, 3));
      } catch (err) {
        setError("Error loading orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleViewOrderDetails = async (orderId: number) => {
    try {
      const items = await getOrderItemsToOrder(orderId);
      alert(JSON.stringify(items, null, 2));
    } catch (err) {
      setError("Error loading order details.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          background: "#f8f8f8",
          borderBottom: "1px solid #ccc",
        }}
      >
        <button
          style={{
            padding: "10px 15px",
            fontSize: "14px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onClick={() => router.push("/home")}
        >
          Main Menu
        </button>
        <button
          style={{
            padding: "10px 15px",
            fontSize: "14px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onClick={() => router.push("/cart")}
        >
          Shopping Cart
        </button>
      </div>

      {/* Order History */}
      <div style={{ padding: "10px" }}>
        <h1
          style={{
            fontSize: "2em",
            textAlign: "center",
            width: "100%",
            marginTop: "2px 0",
            paddingTop: "2px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Order History
        </h1>
        <h2
          style={{
            fontSize: "1.5em",
            textAlign: "center",
            width: "100%",
            paddingBottom: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Last Orders
        </h2>
        {recentOrders.map((order) => (
          <OrderCard
            key={order.order_id}
            order={order}
            onViewDetails={handleViewOrderDetails}
          />
        ))}

        <button
          style={{
            marginTop: "10px",
            padding: "12px 20px",
            fontSize: "16px",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "0.3s",
            display: "block",
            width: "100%",
            maxWidth: "200px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          onClick={() => setRecentOrders(orders)}
        >
          View All Orders
        </button>

        {orders.length === 0 && <p>You haven't placed any orders yet.</p>}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
