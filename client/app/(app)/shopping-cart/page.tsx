"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import ShoppingCartItem from "./components/cart-item-card";
import ShoppingCartFooter from "./components/cart-footer";
import CartItem from "./components/cart-Interface";


const ShoppingCart: React.FC = () => {
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);
  const [managing, setManaging] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
   
  const updateCart = async () => {
    try {
        const response = await axios.get<CartItem[]>("http://localhost:3000/shopping-cart/");
        const activeProducts = response.data.filter(cartItem => cartItem.products.is_active);
        setCartProducts(activeProducts);
      } catch (error) {
        setError("Failed to load shopping cart. Please try again.");
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    updateCart();
  }, []);



  if (loading) return <p className="text-center text-gray-500">Loading cart...</p>;

  return (
    <div>
        <div>    
        {cartProducts.length > 0 ? (
            cartProducts.map(cartItem => (
            <ShoppingCartItem key={cartItem.products.id} product={cartItem} setError={setError} updateCart={updateCart} managing={managing} setManaging={setManaging} />
            ))
        ) : (
            <p className="text-center text-gray-500">No items on your cart.</p>
        )}
        </div>
            <ShoppingCartFooter cartProducts={cartProducts} setError={setError} updateCart={updateCart} error={error} managing={managing} setManaging={setManaging} />
        <div>
        </div>        
    </div>
  );
};

export default ShoppingCart;
