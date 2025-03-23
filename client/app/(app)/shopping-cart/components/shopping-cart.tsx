"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import CartItem from "./cart-item-interface"
import { axiosApi } from "@/lib/axios-client"
import ShoppingCartItem from "./shopping-cart-card"


export default function CarrinhoDeCompras() {
    const [cartProducts, setCartProducts] = useState<CartItem[]>([])
    const updateCart = async () => {
        try {
            const response = await axiosApi.get<CartItem[]>("/shopping-cart/");
            const activeProducts = response.data.filter(cartItem => cartItem.products.is_active);
            setCartProducts(activeProducts);
          } catch (error) {
            console.error("Error loading cart products")
          }
    };
    updateCart();


    // Cálculos do carrinho
    const subtotal = cartProducts.reduce((total, product) => total + product.products.price * product.amount, 0)
    const frete = subtotal > 300 ? 0 : 19.9
    const total = subtotal + frete

    return (
        <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
            <ShoppingBag className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Meu Carrinho</h1>
        </div>

        {cartProducts.length === 0 ? (
            <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-4">Seu carrinho está vazio</h2>
            <p className="text-muted-foreground mb-6">Adicione produtos ao seu carrinho para continuar comprando</p>
            <Button asChild>
                <Link href="/">Continuar Comprando</Link>
            </Button>
            </div>
        ) : (
            <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
                {cartProducts.map(cartItem => (
                <ShoppingCartItem key={cartItem.products.id} product={cartItem} updateCart={updateCart} />
                ))}
            </div>

            <div>
                <Card>
                <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
                    <div className="space-y-4">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Frete</span>
                        <span>{frete === 0 ? "Grátis" : `R$ ${frete.toFixed(2).replace(".", ",")}`}</span>
                    </div>
                    {frete === 0 && (
                        <div className="text-sm text-green-600">Frete grátis para compras acima de R$ 300,00</div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>R$ {total.toFixed(2).replace(".", ",")}</span>
                    </div>
                    </div>
                </CardContent>
                <CardFooter className="p-6">
                    <Button className="w-full">Finalizar Compra</Button>
                </CardFooter>
                </Card>
            </div>
            </div>
        )}
        </div>
    )
}

