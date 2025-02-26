"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type JSX } from "react";
import mastercard from "../../../public/mastercard.png";
import visa from "../../../public/visa.png";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { axiosApi } from "@/lib/axios-client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { CreditCard, DollarSign, Plus } from "lucide-react";

interface Card {
  id: number;
  created_at: string;
  nickname: string;
  name: string;
  code_last4: string;
  expiration: string;
  card_type: CardType;
  code_iv: string;
  expiration_iv: string;
  code: string;
}

enum CardType {
  MasterCard = "MasterCard",
  Visa = "VISA",
}

const cardType: Record<CardType, JSX.Element> = {
  MasterCard: (
    <Image
      src={mastercard}
      alt="Picture of MasterCard"
      className="inline-block"
    />
  ),
  VISA: (
    <Image src={visa} alt="Picture of MasterCard" className="inline-block" />
  ),
};

export default function Payment() {
  const [optionSelected, setOptionSelected] = useState(0);
  const [cardSelected, setCardSelected] = useState(0);
  const [menuOpen, setMenuOpen] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["cardsQuery"],
    queryFn: async (): Promise<Card[]> => {
      const response = await axiosApi("/cards");
      return response.data;
    },
  });

  if (isLoading) return <p>Carregando...</p>;

  function atualizarMenu(id: number) {
    if (menuOpen === id) {
      setMenuOpen(0);
    } else {
      setMenuOpen(id);
    }
  }

  async function confirmarRemocao(id: number) {
    const answer = window
      .prompt("TEM CERTEZA QUE DESEJA REMOVER ESSE CARTÃO? (S/N)")
      ?.toUpperCase();

    if (answer === "S") {
      const response = await axiosApi(`/cards/${id}`, {
        method: "DELETE",
      });
      if (response.status === 200) window.alert("Cartão deletado com sucesso!");
      location.reload();
    }
    return;
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-lg mt-10">
      <h1 className="font-extrabold mb-2 text-2xl">PAGAMENTO</h1>
      <p className="text-gray-500 mb-10">
        Selecione o método de pagamento da compra
      </p>

      <form>
        <div className="flex justify-between gap-4 px-4">
          <button
            type="button"
            onClick={() => setOptionSelected(1)}
            className={`h-20 items-center justify-center border-2 rounded-lg bg-white shadow-md w-1/2 flex gap-2 ${
              optionSelected === 1 ? "border-black" : "border-gray-300"
            }`}
          >
            <CreditCard />
            <h2>Cartão</h2>
          </button>
          <button
            type="button"
            onClick={() => setOptionSelected(2)}
            className={`h-20 items-center justify-center border-2 rounded-lg bg-white shadow-md w-1/2 flex gap-2 ${
              optionSelected === 2 ? "border-black" : "border-gray-300"
            }`}
          >
            <DollarSign />
            <h2>Pix</h2>
          </button>
        </div>

        {optionSelected === 1 && (
          <div className="mt-10 gap-4">
            <Link href="/payment/new_card">
              <button
                type="button"
                className="h-20 items-center justify-center border-2 rounded-lg bg-white w-full hover:bg-gray-200 mb-4 flex gap-2"
              >
                <Plus />
                <h2>Adicionar cartão</h2>
              </button>
            </Link>
            <div className="grid">
              {data?.map((card: Card) => (
                <div key={card.id} className="grid">
                  <Card
                    onClick={() => {
                      setCardSelected(card.id);
                    }}
                    className={`cursor-pointer h-32 shadow-md px-4 rounded flex justify-between items-center mx-4 mb-4 ${
                      cardSelected === card.id
                        ? "bg-muted-foreground/30"
                        : "bg-white"
                    }`}
                  >
                    {cardType[card.card_type]}
                    <h3>
                      {card.nickname} - {card.code_last4}
                    </h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          onClick={() => atualizarMenu(card.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") atualizarMenu(card.id);
                          }}
                          variant={"outline"}
                          className="w-12 h-12"
                        >
                          <DotsHorizontalIcon className="w-16 h-16" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Ação</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => confirmarRemocao(card.id)}
                          >
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-right align-bottom mt-4">
          <button
            type="button"
            className="rounded-lg p-4 shadow-md bg-red-500 text-white"
            onClick={() => history.back()}
          >
            <h2>Cancelar</h2>
          </button>
          <button
            type="submit"
            className="rounded-lg p-4 shadow-md bg-blue-950 text-white ml-4 mr-2"
          >
            <h2>Finalizar Compra</h2>
          </button>
        </div>
      </form>
    </div>
  );
}
