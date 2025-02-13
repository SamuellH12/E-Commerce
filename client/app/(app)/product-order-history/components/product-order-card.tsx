// Arquivo: /product-order-history/components/product-order-card.tsx
"use client";
import React from "react";

interface ProductOrderCardProps {
  id: string;
  createdAt: string;
  productId: string;
  pricePaid: string;
  amount: number;
}

const ProductOrderCard: React.FC<ProductOrderCardProps> = ({
  id,
  createdAt,
  productId,
  pricePaid,
  amount,
}) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
      <p><strong>ID do Item:</strong> {id}</p>
      <p><strong>Data de Criação:</strong> {createdAt}</p>
      <p><strong>ID do Produto:</strong> {productId}</p>
      <p><strong>Valor Pago:</strong> R$ {pricePaid}</p>
      <p><strong>Quantidade:</strong> {amount}</p>
    </div>
  );
};

export default ProductOrderCard;