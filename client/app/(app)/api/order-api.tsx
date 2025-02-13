// /cliente/app/(app)/api/order-api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // URL do back-end
});

export const getOrders = async () => {
  const response = await api.get("/order-history");
  return response.data;
};

export const getOrderItemsToOrder = async (orderId: number) => {
  const response = await api.get(`/product-order-history?order_id=${orderId}`);
  return response.data;
};

export const getOrderItems = async (orderId: string) => {
    const response = await fetch(
      `http://localhost:3000/product-order-history?order_id=${orderId}`
    );
    console.log(response);
    if (!response.ok) throw new Error('Erro ao buscar itens');
    return response.json();
  };

  export const getOrderItemsTest = async (orderId: string): Promise<any[]> => {
    if (orderId === "1") {
      return [
        {
          id: 1,
          created_at: "2025-02-09T18:43:41.634825+00:00",
          order_id: 1,
          product_id: "ae5abaa3-fd1b-4f74-85bd-45fbcebeb3db",
          price_paid: 500,
          amount: 1,
        },
        {
          id: 2,
          created_at: "2025-02-09T18:54:58.26036+00:00",
          order_id: 1,
          product_id: "a52f3649-aad8-4338-a263-f3393ecc1a93",
          price_paid: 50,
          amount: 1,
        },
      ];
    }
    return [];
  };