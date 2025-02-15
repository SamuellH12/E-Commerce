// Arquivo: /product-order-history/components/product-order-card.tsx
/*
v1
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
      <h3 style={{ marginBottom: "8px", color: "#333" }}>Item ID: {id}</h3>
      <p style={{ color: "#666", fontSize: "14px" }}>Created Date: {createdAt}</p>
      <p style={{ color: "#666", fontSize: "14px" }}>Product ID: {productId}</p>
      <p style={{ color: "#666", fontSize: "14px" }}>Price Paid: R$ {pricePaid}</p>
      <p style={{ color: "#666", fontSize: "14px" }}>Amount: {amount}</p>
    </div>
  );
};

export default ProductOrderCard;*/

"use client";
import React from "react";

interface ProductOrderCardProps {
  id: string;
  createdAt: string;
  productId: string;
  pricePaid: string;
  amount: number;
  productName: string;
  imageUrl: string;
}

const ProductOrderCard: React.FC<ProductOrderCardProps> = ({
  id,
  createdAt,
  productId,
  pricePaid,
  amount,
  productName,
  imageUrl
}) => {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #ddd",
      padding: "16px",
      margin: "8px 0",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      gap: "16px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <img
        src={imageUrl}
        alt={productName}
        style={{
          width: "80px",
          height: "80px",
          objectFit: "cover",
          borderRadius: "8px"
        }}
      />
      <div>
        <h3 style={{ margin: "0 0 8px 0", color: "#333" }}>{productName}</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
          <div>
            <p style={{ margin: "0", fontSize: "0.9em", color: "#666" }}>Item ID: {id}</p>
            <p style={{ margin: "0", fontSize: "0.9em", color: "#666" }}>Date: {new Date(createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p style={{ margin: "0", fontSize: "0.9em", color: "#666" }}>Price: R$ {Number(pricePaid).toFixed(2)}</p>
            <p style={{ margin: "0", fontSize: "0.9em", color: "#666" }}>Quantity: {amount}</p>
          </div>
          <div>
            <p style={{ margin: "0", fontSize: "0.9em", color: "#666" }}>Product ID: {productId}</p>
            <p style={{ margin: "0", fontSize: "0.9em", color: "#666" }}>Created At: {createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOrderCard;