"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import React from 'react';
import { axiosApi } from "@/lib/axios-client"
import CartItem from "./cart-item-interface"



interface ShoppingCartItemProps {
    product: CartItem;
    updateCart: () => void;
}


const ShoppingCartItem: React.FC<ShoppingCartItemProps> = ({ product, updateCart}) => {
    
    const { id, name, price, image_url } = product.products;
    const { amount } = product;
    const [newAmount, setNewAmount] = useState<number>(amount);

    // Função para limpar o carrinho
    const emptyCart = async () => {
        try {
            const response = await axiosApi.delete(`/shopping-cart/`);

            // Update state
            updateCart()
        } catch (error) {
            console.log('Failed to empty shopping cart');
        }
    };
    
    // Função para remover um produto do carrinho
    const removeProduct = async () => {
        try {
            await axiosApi.delete(`/shopping-cart/{id}`);
            // Update state
            updateCart();
        } catch (error) {
            console.error("Error removing cart product")
            return;
        }
    };

    // Função para atualizar a quantidade de um produto
    const alterAmount = async () => {
    if (newAmount < 1) {
        console.error('Quantity must be at least 1');
        return;
    }    
    try {
        await axiosApi.put(`/shopping-cart/`, { id: id, amount: newAmount });
    } catch (error) {
        console.error('Failed to update quantity');
    }
    };

    useEffect(() => {
        if (!newAmount) return;
        
        const timeout = setTimeout(()=>{
            alterAmount();
        }, 1000)
    }, [newAmount]);
    return (
        <Card>
        <CardContent className="p-6">
          <div className="grid gap-6">
              <div key={product.products.id} className="grid gap-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={product.products.image_url || "/placeholder.svg"}
                      alt={product.products.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-1 grid gap-1">
                    <h3 className="font-medium">{product.products.name}</h3>
                    <p className="text-muted-foreground">R$ {product.products.price.toFixed(2).replace(".", ",")}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setNewAmount(amount - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{newAmount}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setNewAmount(amount +1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-auto"
                        onClick={() => removeProduct()}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {(
                    <div className="flex items-start justify-end w-24">
                      <p className="font-medium">
                        R$ {(product.products.price * newAmount).toFixed(2).replace(".", ",")}
                      </p>
                    </div>
                  )}
                </div>
                <Separator />
              </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-6">
          <Button variant="outline" asChild>
            <Link href="/">Continuar Comprando</Link>
          </Button>
          <Button variant="ghost" onClick={() => emptyCart()}>
            Limpar Carrinho
          </Button>
        </CardFooter>
      </Card>
    )
    }
export default ShoppingCartItem;
