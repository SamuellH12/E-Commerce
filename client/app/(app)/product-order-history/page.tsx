"use client";

export default function Page() {
  return <></>;
}

// // Arquivo: /product-order-history/page.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import { getOrderItemsToOrder } from "../api/order-api";
// import ProductOrderCard from "./components/product-order-card";
// import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/navigation";

// /*
// V1
// const fetchProductDetails = async (productId: string) => {
//     const response = await fetch(`/products/${productId}`);
//     if (!response.ok) {
//       throw new Error("Error fetching product details");
//     }
//     const data = await response.json();
//     return data.image_url; // Supondo que a coluna no Supabase seja `image_url`
//   };

// const ProductOrderHistoryPage = () => {
//   const searchParams = useSearchParams();
//   const order_id = searchParams.get("order_id"); // Captura o parâmetro de consulta `order_id`
//   const [items, setItems] = useState<any[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const handleViewOrderDetails = async (orderId: number) => {
//     try {
//       const fetchedItems = await getOrderItemsToOrder(orderId);
//       setItems(fetchedItems); // Atualiza o estado com os itens do pedido
//     } catch (err) {
//       setError("Error loading order details.");
//     }
//   };

//   useEffect(() => {
//     const orderId = Number(order_id);
//     if (order_id && !isNaN(Number(order_id))) {
//       handleViewOrderDetails(orderId); // Chama a função com o `orderId` correto
//     }

//   }, [order_id]);

//   if (!order_id || isNaN(Number(order_id))) {
//     return <p>Invalid order ID.</p>;
//   }

//   return (
//     <div>

//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "#f8f8f8", borderBottom: "1px solid #ccc" }}>
//         <button style={{ padding: "10px 15px", fontSize: "14px", background: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", transition: "0.3s" }} onClick={() => router.push("/home")}>Main Menu</button>
//         <button style={{ padding: "10px 15px", fontSize: "14px", background: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", transition: "0.3s" }} onClick={() => router.push("/cart")}>Shopping Cart</button>
//       </div>
//       <div>
//       <button style={{ alignItems: "center",padding: "10px 15px", fontSize: "14px", background: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", transition: "0.3s" }} onClick={() => router.push("/order-history")}>Back</button>
//       <h1>Order Itens #{order_id}</h1>
//       {error && <p>{error}</p>}
//       {items.length > 0 ? (
//         items.map((item) => (
//           <ProductOrderCard
//             key={item.id}
//             id={item.id}
//             createdAt={item.created_at}
//             productId={item.product_id}
//             pricePaid={item.price_paid}
//             amount={item.amount}
//           />
//         ))
//       ) : (
//         <p>No items found for this order.</p>
//       )}
//       </div>
//     </div>
//   );
// };

// export default ProductOrderHistoryPage;*/

// interface OrderItem {
//   id: string;
//   created_at: string;
//   product_id: string;
//   price_paid: string;
//   amount: number;
//   product_name: string;
//   image_url: string;
// }

// const ProductOrderHistoryPage = () => {
//   const searchParams = useSearchParams();
//   const order_id = searchParams.get("order_id");
//   const [items, setItems] = useState<OrderItem[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const fetchProductDetails = async (productId: string) => {
//     try {
//       const response = await fetch(`http://localhost:3000/products/${productId}`);
//       if (!response.ok) throw new Error("Produto não encontrado");
//       return await response.json();
//     } catch (error) {
//       console.error("Erro ao buscar produto:", error);
//       return null;
//     }
//   };

//   const handleViewOrderDetails = async (orderId: number) => {
//     try {
//       // Primeiro busca os itens do pedido
//       const orderItems = await getOrderItemsToOrder(orderId);

//       // Busca detalhes dos produtos em paralelo
//       const itemsWithDetails = await Promise.all(
//         orderItems.map(async (item: any) => {
//           const productDetails = await fetchProductDetails(item.product_id);
//           return {
//             ...item,
//             product_name: productDetails?.name || "Nome não disponível",
//             image_url: productDetails?.image_url || ""
//           };
//         })
//       );

//       setItems(itemsWithDetails);
//     } catch (err) {
//       setError("Erro ao carregar detalhes do pedido");
//     }
//   };

//   useEffect(() => {
//     if (order_id && !isNaN(Number(order_id))) {
//       handleViewOrderDetails(Number(order_id));
//     }
//   }, [order_id]);

//   if (!order_id || isNaN(Number(order_id))) {
//     return <p>ID do pedido inválido</p>;
//   }

//   return (
//     <div>
//       {/* Cabeçalho mantido igual */}
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "#f8f8f8", borderBottom: "1px solid #ccc" }}>
//         <button style={{ padding: "10px 15px", fontSize: "14px", background: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", transition: "0.3s" }} onClick={() => router.push("/home")}>Main Menu</button>
//         <button style={{ padding: "10px 15px", fontSize: "14px", background: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", transition: "0.3s" }} onClick={() => router.push("/cart")}>Shopping Cart</button>
//       </div>

//       <div style={{ padding: "16px"}}>
//         <button style={{ padding: "10px 15px", fontSize: "14px", background: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", transition: "0.3s" }} onClick={() => router.push("/order-history")}>Back</button>
//         <h1 style={{
//             fontSize: "2em",
//             textAlign: "center",
//             width: "100%",
//             margin: "10px 0",
//             padding: "16px",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center"
//           }}>
//             Itens by Order #{order_id}
//           </h1>
//         {error && <p>{error}</p>}

//         {items.length > 0 ? (
//           items.map((item) => (
//             <ProductOrderCard
//               key={item.id}
//               id={item.id}
//               createdAt={item.created_at}
//               productId={item.product_id}
//               pricePaid={item.price_paid}
//               amount={item.amount}
//               productName={item.product_name}
//               imageUrl={item.image_url}
//             />
//           ))
//         ) : (
//           <p>Nenhum item encontrado neste pedido</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductOrderHistoryPage;
