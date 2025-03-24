"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CartItem from "./cart-item-interface";
import { axiosApi } from "@/lib/axios-client";
import ShoppingCartItem from "./shopping-cart-card";
import { useQueries, useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/providers/tanstack-query-provider";

export default function CarrinhoDeCompras() {
  const {
    data: cartProducts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["shopping-cart-products"],
    queryFn: async (): Promise<CartItem[]> => {
      const response = await axiosApi.get(`/shopping-cart/`);
      return response.data;
    },
  });

  // Função para remover um produto do carrinho
  const removeItemMutate = useMutation({
    mutationFn: async (productId: string) => {
      await axiosApi.delete(`/shopping-cart/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shopping-cart-products"],
      });
    },
  });

  // Função para atualizar a quantidade de um produto
  const alterItemMutate = useMutation({
    mutationFn: async ({
      productId,
      amount,
    }: {
      productId: string;
      amount: number;
    }) => {
      await axiosApi.put(`/shopping-cart/`, { id: productId, amount: amount });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shopping-cart-products"],
      });
    },
  });

  // Função para limpar o carrinho
  const emptyCartMutate = useMutation({
    mutationFn: async () => {
      await axiosApi.delete(`/shopping-cart/`);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["shopping-cart-products"],
      });
    },
  });

  // Cálculos do carrinho
  const subtotal =
    cartProducts?.reduce(
      (total, product) => total + product.products.price * product.amount,
      0
    ) ?? 0;
  const frete = subtotal > 300 ? 0 : 19.9;
  const total = subtotal + frete;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingBag className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Meu Carrinho</h1>
      </div>
      {cartProducts.length === 0 && !isLoading ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-4">Seu carrinho está vazio</h2>
          <p className="text-muted-foreground mb-6">
            Adicione produtos ao seu carrinho para continuar comprando
          </p>
          <Button asChild>
            <Link href="/">Continuar Comprando</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              {cartProducts.map((cartItem) => (
                <ShoppingCartItem
                  key={cartItem.products.id}
                  product={cartItem}
                  removeFn={removeItemMutate.mutate}
                  alterFn={alterItemMutate.mutate}
                  isLoading={
                    removeItemMutate.isPending || alterItemMutate.isPending
                  }
                />
              ))}
              <CardFooter className="flex justify-between p-6">
                <Button variant="outline" asChild>
                  <Link href="/">Continuar Comprando</Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => emptyCartMutate.mutate()}
                >
                  Limpar Carrinho
                </Button>
              </CardFooter>
            </Card>
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
                    <span>
                      {frete === 0
                        ? "Grátis"
                        : `R$ ${frete.toFixed(2).replace(".", ",")}`}
                    </span>
                  </div>
                  {frete === 0 && (
                    <div className="text-sm text-green-600">
                      Frete grátis para compras acima de R$ 300,00
                    </div>
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
  );
}
