"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CreditCard,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  PlusIcon,
} from "lucide-react";
import placeholder from "../../../public/placeholder.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Dados mockados dos produtos no carrinho
const produtosMock = [
  {
    id: 1,
    nome: "Camiseta Básica",
    preco: 49.9,
    quantidade: 2,
    imagem: placeholder,
  },
  {
    id: 2,
    nome: "Tênis Esportivo",
    preco: 199.9,
    quantidade: 1,
    imagem: placeholder,
  },
  {
    id: 3,
    nome: "Calça Jeans",
    preco: 129.9,
    quantidade: 1,
    imagem: placeholder,
  },
];

// Dados mockados dos cartões
const cartoesMock = [
  {
    id: 1,
    numero: "**** **** **** 1234",
    bandeira: "Visa",
    titular: "João Silva",
    validade: "12/25",
  },
  {
    id: 2,
    numero: "**** **** **** 5678",
    bandeira: "Mastercard",
    titular: "João Silva",
    validade: "08/26",
  },
];

export default function ShoppingCart() {
  const [produtos, setProdutos] = useState(produtosMock);
  const [cartoes, setCartoes] = useState(cartoesMock);
  const [cartaoSelecionado, setCartaoSelecionado] = useState<number | null>(
    null
  );
  const [dialogSelecionarAberto, setDialogSelecionarAberto] = useState(false);
  const [dialogAdicionarAberto, setDialogAdicionarAberto] = useState(false);
  const isMobile = useIsMobile();
  const [metodoPagamento, setMetodoPagamento] = useState<"cartao" | "pix">(
    "cartao"
  );

  // Função para atualizar a quantidade de um produto
  const atualizarQuantidade = (id: number, novaQuantidade: number) => {
    if (novaQuantidade < 1) return;

    setProdutos(
      produtos.map((produto) =>
        produto.id === id ? { ...produto, quantidade: novaQuantidade } : produto
      )
    );
  };

  // Função para remover um produto do carrinho
  const removerProduto = (id: number) => {
    setProdutos(produtos.filter((produto) => produto.id !== id));
  };

  // Função para adicionar um novo cartão
  const adicionarCartao = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const novoCartao = {
      id: cartoes.length + 1,
      numero: `**** **** **** ${formData.get("ultimos-digitos")}`,
      bandeira: formData.get("bandeira") as string,
      titular: formData.get("titular") as string,
      validade: `${formData.get("mes")}/${formData.get("ano")}`,
    };

    setCartoes([...cartoes, novoCartao]);
    setCartaoSelecionado(novoCartao.id);
    setDialogAdicionarAberto(false);
  };

  // Cálculos do carrinho
  const subtotal = produtos.reduce(
    (total, produto) => total + produto.preco * produto.quantidade,
    0
  );
  const frete = subtotal > 300 ? 0 : 19.9;
  const total = subtotal + frete;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingBag className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Meu Carrinho</h1>
      </div>

      {produtos.length === 0 ? (
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
              <CardContent className="p-6">
                <div className="grid gap-6">
                  {produtos.map((produto) => (
                    <div key={produto.id} className="grid gap-4">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <Image
                            src={produto.imagem || placeholder}
                            alt={produto.nome}
                            width={80}
                            height={80}
                            className="rounded-md object-cover"
                          />
                        </div>
                        <div className="flex-1 grid gap-1">
                          <h3 className="font-medium">{produto.nome}</h3>
                          <p className="text-muted-foreground">
                            R$ {produto.preco.toFixed(2).replace(".", ",")}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                atualizarQuantidade(
                                  produto.id,
                                  produto.quantidade - 1
                                )
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">
                              {produto.quantidade}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                atualizarQuantidade(
                                  produto.id,
                                  produto.quantidade + 1
                                )
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 ml-auto"
                              onClick={() => removerProduto(produto.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {!isMobile && (
                          <div className="flex items-start justify-end w-24">
                            <p className="font-medium">
                              R${" "}
                              {(produto.preco * produto.quantidade)
                                .toFixed(2)
                                .replace(".", ",")}
                            </p>
                          </div>
                        )}
                      </div>
                      <Separator />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-6">
                <Button variant="outline" asChild>
                  <Link href="/">Continuar Comprando</Link>
                </Button>
                <Button variant="ghost" onClick={() => setProdutos([])}>
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

                  {/* Adicione os botões e dialogs aqui */}
                  <div className="mt-4 space-y-3">
                    <Tabs
                      defaultValue="cartao"
                      className="w-full"
                      onValueChange={(value) =>
                        setMetodoPagamento(value as "cartao" | "pix")
                      }
                    >
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="cartao">Cartão</TabsTrigger>
                        <TabsTrigger value="pix">PIX</TabsTrigger>
                      </TabsList>
                      <TabsContent value="cartao" className="space-y-3 mt-3">
                        <Dialog
                          open={dialogSelecionarAberto}
                          onOpenChange={setDialogSelecionarAberto}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full flex items-center justify-center gap-2"
                            >
                              <CreditCard className="h-4 w-4" />
                              {cartaoSelecionado
                                ? `Cartão ${
                                    cartoes.find(
                                      (c) => c.id === cartaoSelecionado
                                    )?.numero
                                  }`
                                : "Selecionar Cartão"}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Selecionar Cartão</DialogTitle>
                              <DialogDescription>
                                Escolha um cartão para pagamento
                              </DialogDescription>
                            </DialogHeader>

                            <div className="py-4">
                              <RadioGroup
                                value={cartaoSelecionado?.toString()}
                                onValueChange={(value) =>
                                  setCartaoSelecionado(Number.parseInt(value))
                                }
                                className="space-y-3"
                              >
                                {cartoes.map((cartao) => (
                                  <div
                                    key={cartao.id}
                                    className="flex items-center space-x-2 border rounded-md p-3"
                                  >
                                    <RadioGroupItem
                                      value={cartao.id.toString()}
                                      id={`cartao-${cartao.id}`}
                                    />
                                    <Label
                                      htmlFor={`cartao-${cartao.id}`}
                                      className="flex-1 cursor-pointer"
                                    >
                                      <div className="font-medium">
                                        {cartao.bandeira}
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        {cartao.numero}
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        {cartao.titular} • Validade:{" "}
                                        {cartao.validade}
                                      </div>
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </div>

                            <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setDialogSelecionarAberto(false)}
                              >
                                Cancelar
                              </Button>
                              <Button
                                type="button"
                                onClick={() => setDialogSelecionarAberto(false)}
                                disabled={!cartaoSelecionado}
                              >
                                Confirmar
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <Dialog
                          open={dialogAdicionarAberto}
                          onOpenChange={setDialogAdicionarAberto}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              className="w-full flex items-center justify-center gap-2"
                            >
                              <PlusIcon className="h-4 w-4" />
                              Adicionar Novo Cartão
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Adicionar Novo Cartão</DialogTitle>
                              <DialogDescription>
                                Preencha os dados do seu cartão
                              </DialogDescription>
                            </DialogHeader>

                            <form
                              onSubmit={adicionarCartao}
                              className="space-y-4 py-4"
                            >
                              <div className="grid gap-2">
                                <Label htmlFor="titular">Nome do Titular</Label>
                                <Input
                                  id="titular"
                                  name="titular"
                                  placeholder="Nome como está no cartão"
                                  required
                                />
                              </div>

                              <div className="grid gap-2">
                                <Label htmlFor="numero">Número do Cartão</Label>
                                <Input
                                  id="numero"
                                  placeholder="**** **** **** ****"
                                  required
                                />
                              </div>

                              <div className="grid gap-2">
                                <Label htmlFor="ultimos-digitos">
                                  Últimos 4 dígitos
                                </Label>
                                <Input
                                  id="ultimos-digitos"
                                  name="ultimos-digitos"
                                  placeholder="1234"
                                  maxLength={4}
                                  required
                                />
                              </div>

                              <div className="grid gap-2">
                                <Label htmlFor="bandeira">Bandeira</Label>
                                <Select
                                  name="bandeira"
                                  required
                                  defaultValue="Visa"
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione a bandeira" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Visa">Visa</SelectItem>
                                    <SelectItem value="Mastercard">
                                      Mastercard
                                    </SelectItem>
                                    <SelectItem value="American Express">
                                      American Express
                                    </SelectItem>
                                    <SelectItem value="Elo">Elo</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="mes">Mês</Label>
                                  <Select name="mes" required defaultValue="01">
                                    <SelectTrigger>
                                      <SelectValue placeholder="Mês" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {Array.from({ length: 12 }, (_, i) => {
                                        const month = (i + 1)
                                          .toString()
                                          .padStart(2, "0");
                                        return (
                                          <SelectItem key={month} value={month}>
                                            {month}
                                          </SelectItem>
                                        );
                                      })}
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="grid gap-2">
                                  <Label htmlFor="ano">Ano</Label>
                                  <Select name="ano" required defaultValue="24">
                                    <SelectTrigger>
                                      <SelectValue placeholder="Ano" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {Array.from({ length: 10 }, (_, i) => {
                                        const year = (
                                          new Date().getFullYear() + i
                                        )
                                          .toString()
                                          .slice(-2);
                                        return (
                                          <SelectItem key={year} value={year}>
                                            {year}
                                          </SelectItem>
                                        );
                                      })}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="grid gap-2">
                                <Label htmlFor="cvv">CVV</Label>
                                <Input
                                  id="cvv"
                                  placeholder="123"
                                  maxLength={4}
                                  required
                                />
                              </div>

                              <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2 pt-4">
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() =>
                                    setDialogAdicionarAberto(false)
                                  }
                                >
                                  Cancelar
                                </Button>
                                <Button type="submit">Adicionar Cartão</Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </TabsContent>
                      <TabsContent value="pix" className="space-y-4 mt-3">
                        <div className="border rounded-md p-4 text-center">
                          <div className="mb-4">
                            <Image
                              src="/placeholder.svg?height=150&width=150"
                              alt="QR Code PIX"
                              width={150}
                              height={150}
                              className="mx-auto"
                            />
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            Escaneie o QR Code acima com o aplicativo do seu
                            banco
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                              <span className="text-sm font-medium">
                                Código PIX:
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground truncate max-w-[150px]">
                                  00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-copy"
                                  >
                                    <rect
                                      width="14"
                                      height="14"
                                      x="8"
                                      y="8"
                                      rx="2"
                                      ry="2"
                                    />
                                    <path d="M4 16c0-1.1.9-2 2-2h2" />
                                    <path d="M4 12c0-1.1.9-2 2-2h2" />
                                    <path d="M4 8c0-1.1.9-2 2-2h2" />
                                  </svg>
                                </Button>
                              </div>
                            </div>
                            <Button variant="outline" className="w-full">
                              Copiar Código PIX
                            </Button>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>
                            • O pagamento via PIX é processado instantaneamente
                          </p>
                          <p>
                            • Após o pagamento, você receberá a confirmação por
                            e-mail
                          </p>
                          <p>• O código PIX expira em 30 minutos</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>R$ {total.toFixed(2).replace(".", ",")}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6">
                <Button
                  className="w-full"
                  disabled={metodoPagamento === "cartao" && !cartaoSelecionado}
                >
                  Finalizar Compra
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
