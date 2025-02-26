"use client";
import { axiosApi } from "@/lib/axios-client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getOrderItemsToOrder } from "../../api/order-api";

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

interface OrderItem {
  id: string;
  created_at: string;
  product_id: string;
  price_paid: string;
  amount: number;
  product_name: string;
  image_url: string;
}

const fetchProductDetails = async (productId: string) => {
  try {
    const response = await axiosApi(`/products/${productId}`);

    return await response.data;
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return null;
  }
};

const OrderCard: React.FC<OrderCardProps> = ({ order, onViewDetails }) => {
  const router = useRouter();
  const [items, setItems] = useState<OrderItem[]>([]);
  const totalValue =
    typeof order.total_value === "string"
      ? parseFloat(order.total_value)
      : order.total_value;

  // Função para carregar os itens do pedido e os detalhes dos produtos
  const loadOrderItems = async () => {
    try {
      // Busca os itens do pedido
      const orderItems = await getOrderItemsToOrder(order.order_id);

      // Busca detalhes dos produtos em paralelo
      const itemsWithDetails = await Promise.all(
        orderItems.map(async (item: any) => {
          const productDetails = await fetchProductDetails(item.product_id);
          return {
            ...item,
            product_name: productDetails?.name || "Produto não disponível",
            image_url:
              productDetails?.image_url ||
              "https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg",
          };
        })
      );

      // Limita a 4 itens para exibição
      setItems(itemsWithDetails.slice(0, 4));
    } catch (err) {
      console.error("Erro ao carregar itens do pedido:", err);
    }
  };

  // Carrega os itens quando o componente é montado
  useEffect(() => {
    loadOrderItems();
  }, []);

  const navigateToOrderDetails = () => {
    router.push(`/product-order-history?order_id=${order.order_id}`);
  };

  return (
    <div className="bg-white border border-gray-300 p-4 m-2 rounded-lg shadow-sm hover:shadow-md transition duration-300 ease-in-out cursor-pointer">
      <div className="flex justify-between">
        {/* Detalhes do pedido */}
        <div>
          <h3 className="mb-2 text-lg font-medium text-gray-800">Order #{order.order_id}</h3>
          <div className="flex items-center mb-1 text-sm text-gray-600">
            <p className="mr-2">Order placed: {order.order_data}</p>
            <p>Destination: {order.destination}</p>
          </div>
          <p className="mb-2 text-sm text-gray-600">
            Status:{" "}
            <strong
              className={`font-bold ${
                order.status === "delivered" ? "text-green-600" : "text-red-600"
              }`}
            >
              {order.status}
            </strong>
          </p>
          <p className="mb-2 text-base font-bold text-black">
            Valor Total: R$ {totalValue.toFixed(2)}
          </p>
          <button
            className="mt-1 px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
            onClick={navigateToOrderDetails}
          >
            See details
            See details
          </button>
        </div>
  
        {/* Imagens dos produtos */}
        <div className="flex gap-2">
          {items.length > 0 ? (
            items.map((item, index) => (
              <img
                key={index}
                src={item.image_url}
                alt={item.product_name}
                className="w-20 h-20 object-cover rounded-md"
              />
            ))
          ) : (
            <img
              src="https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg"
              alt="Imagem padrão"
              className="w-20 h-20 object-cover rounded-md"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
