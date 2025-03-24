"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type JSX } from "react";
import mastercard from "../../../../public/mastercard.png";
import visa from "../../../../public/visa.png";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axiosApi } from "@/lib/axios-client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { CreditCard, DollarSign, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Dialog,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { queryClient } from "@/providers/tanstack-query-provider";

import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

enum CardType {
    MasterCard = "MasterCard",
    Visa = "VISA",
}

const cardType: Record<CardType, JSX.Element> = {
  MasterCard: (
    <Image
      src={mastercard}
      alt="Picture of MasterCard"
      className="inline-block size-15"
    />
  ),
  VISA: (
    <Image src={visa} alt="Picture of VISA" className="inline-block" />
  ),
};

interface CardAPI {
    id: number;
    nickname: string;
    name: string;
    code_last4: string;
    card_type: CardType;
    transaction_type: string;
}

export default function SelecionarCartao() {
    const [cardSelected, setCardSelected] = useState(0);
    const [dialogSelecionarAberto, setDialogSelecionarAberto] = useState(false);

    const { data:cards, isLoading } = useQuery({
        queryKey: ["cardsQuery"],
        queryFn: async (): Promise<CardAPI[]> => {
            const response = await axiosApi("/cards");
            return response.data;
        },
    });

    if (isLoading || !cards) return "Carregando...";

    return (
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
                Selecionar Cartão
            </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md h-2/3 overflow-auto">
            <DialogHeader>
                <DialogTitle>Selecionar Cartão</DialogTitle>
                <DialogDescription>
                Escolha um cartão para pagamento
                </DialogDescription>
            </DialogHeader>
            <div className="py-4">
                <RadioGroup>
                    {cards.map((card) => (
                        <div
                        key={card.id}
                        className="flex items-center space-x-2 border rounded-md p-3"
                        >
                        <RadioGroupItem
                            value={card.id.toString()}
                            id={`cartao-${card.id}`}
                        />
                        <Label
                            htmlFor={`cartao-${card.id}`}
                            className="cursor-pointer flex space-x-6 items-center justify-items-center"
                            onClick={() => setCardSelected(card.id)}
                        >
                            <div className="font-medium ">
                                {cardType[card.card_type]}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                <strong>{card.nickname}</strong>
                                <h4>{card.name}</h4>
                                <h4>**** **** **** {card.code_last4}</h4>
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
                >
                    Confirmar
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}