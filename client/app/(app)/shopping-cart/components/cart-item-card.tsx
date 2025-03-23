import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './shopping-cart.module.css';
import CartItem from './cart-Interface';
import { axiosApi } from '@/lib/axios-client';

interface ShoppingCartItemProps {
  product: CartItem;
  setError: (message: string | null) => void; 
  updateCart: () => void;
  managing: string | null;
  setManaging: (managing: string | null) => void;
}

const ShoppingCartItem: React.FC<ShoppingCartItemProps> = ({ product, setError, updateCart, managing, setManaging}) => {
  const { id, name, price, image_url } = product.products;
  const { amount } = product;
  const [newAmount, setNewAmount] = useState<number>(amount);

  useEffect(() => {
    setNewAmount(amount);
  }, [managing]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAmount(Number(e.target.value));
  };

  // Handle confirm update
  const confirmUpdate = async () => {
    if (newAmount < 1) {
      setError('Quantity must be at least 1');
      return;
    }

    try {
      await axiosApi.put(`/shopping-cart/`, { id: id, amount: newAmount });

      // Update state
      setManaging(null)
      updateCart()
      setError(null);
    } catch (error) {
      setError('Failed to update quantity');
    }
  };

  const confirmRemove = async () => {
    try {
      await axiosApi.delete(`/shopping-cart/id`);

      // Update state
      setManaging(null);
      setError(null);
    } catch (error) {
      setError('Failed to remove item');
    }
  };

  return (
    <div className={styles.shoppingCartItem}>
      <div className={styles.productInfo}>
        <img src={image_url} alt={name} className={styles.productImage} />
        <h2>{name}</h2>
      </div>
      <div className={styles.buttonsContainer}>
        {managing != "edit" ? (
            <button onClick={() => {setManaging("edit"); setError(null);}} title="Alterar" className={styles.editButton}>
            ⚙️
            </button>
        ) : (
          <>
            <div className={styles.confirmCancelContainer}>
              <button onClick={confirmUpdate} title="Confirmar" className={styles.confirmButton}>
              ✔
              </button>
              <button onClick={() => {setManaging(null); setError(null)}} title="Cancelar" className={styles.cancelButton}>
              ✖
              </button>
            </div>
          </>
        )}
        {managing != "remove" ? (
            <button onClick={() => {setManaging("remove"); setError(null)}} title="Remover" className={styles.removeButton}>
            🗑
            </button>
        ) : (
          <>
            <div className={styles.confirmCancelContainer}>
              <button onClick={confirmRemove} title="Confirmar" className={styles.confirmButton}>
              ✔
              </button>
              <button onClick={() => {setManaging(null); setError(null)}}  title="Cancelar" className={styles.cancelButton}>
              ✖
              </button>
            </div>
          </>
        )
        }
      </div>
      

      <div className={styles.prQtDetails}>
        <p>Price: ${price.toFixed(2)}</p>
        <div className='flex'>
          <p>
            Quantity:{' '}
            {managing == "edit" ? (
              <input
                type="number"
                value={newAmount}
                onChange={handleInputChange}
                min="1"
                className={styles.inputBox}
              />
            ) : (
              <span>{amount}</span>
            )}
          </p>
        </div>
        <p className={styles.total}>Total: ${(price * amount).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ShoppingCartItem;
