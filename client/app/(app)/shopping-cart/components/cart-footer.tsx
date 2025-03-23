import React, { useState } from 'react';
import axios from 'axios';
import styles from './shopping-cart.module.css';
import CartItem from "./cart-Interface"
import { axiosApi } from '@/lib/axios-client';

interface ShoppingCartFooterProp {
    cartProducts: CartItem[];
    setError: (message: string | null) => void;
    error: string | null;
    updateCart: () => void;
    managing: string | null;
    setManaging: (managing: string | null) => void;
}

const ShoppingCartFooter: React.FC<ShoppingCartFooterProp> = ({ cartProducts, setError, updateCart, error, managing, setManaging }) => {
    // Set total price
    const totalPrice = cartProducts.reduce((sum, item) => sum + item.products.price * item.amount, 0);

    // Handle confirm update
    const emptyCart = async () => {
        try {
            const response = await axiosApi.delete(`/shopping-cart/`);

            // Update state
            updateCart()
            setError(null);
        } catch (error) {
            setError('Failed to empty');
        }
    };

    const checkout = async () => {
        try {
            setError(await axiosApi.post(`/shopping-cart/`));
            
            // Update state
            updateCart()
            setError(null);
        } catch (error) {
            setError('Failed to checkout');
        }
    };

    return(
        <div className={styles.cartFooter}>
            {managing != "empty" ? (
                <button onClick={() => {setManaging("empty"); setError(null)}} title="Esvaziar Carrinho" className={styles.emptyCartButton}>
                🧹 Empty Cart
                </button>
            ) : (
            <>
                <div className={styles.confirmCancelContainer}>
                    <button onClick={emptyCart} title="Confirmar" className={styles.confirmButton}>
                    ✔
                    </button>
                    <button onClick={() => {setManaging(null); setError(null)}} title="Cancelar" className={styles.cancelButton}>
                    ✖
                    </button>
                </div>
            </>
            )}
            <p className={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</p>
            {managing != "checkout" ? (
                <button onClick={() => {setManaging("checkout"); setError(null)}} title="Finalizar Compra" className={styles.checkoutButton}>
                🛒 Checkout
                </button>
            ) : (
            <>
                <div className={styles.confirmCancelContainer}>
                    <button onClick={checkout} title="Confirmar" className={styles.confirmButton}>
                    ✔
                    </button>
                    
                    <button onClick={() => {setManaging(null); setError(null)}}  title="Cancelar" className={styles.cancelButton}>
                    ✖
                    </button>
                </div>
            </>
            )}
        </div>
    )
}

export default ShoppingCartFooter;

