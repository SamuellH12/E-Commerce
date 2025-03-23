import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProductType } from "@/modules/products/types/product-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";
import CurrencyInput from "@/utils/currency-input";
import { z } from "zod";
import { productEditSchema } from "../schemas/product-edit-schema";
import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosApi } from "@/lib/axios-client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PlusCircle } from "lucide-react";
import React from "react";

function Content({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  const form = useForm<z.infer<typeof productEditSchema>>({
    resolver: zodResolver(productEditSchema),
    defaultValues: { id: "new" },
  });

  const { toast } = useToast();
  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<{ value: string; label: string }[]> => {
      const response = await axiosApi("/category");
      return response.data.map((category: { id: number; name: string }) => ({
        value: category.id.toString(),
        label: category.name,
      }));
    },
  });

  const mutate = useMutation({
    mutationFn: async (values: any) => {
      const response = await axiosApi.post(`/products/new`, values);
      return response.data;
    },
  });

  console.log("categories: ", categories.data);

  async function onSubmit(values: z.infer<typeof productEditSchema>) {
    console.log("resposta: ", values);
    mutate.mutate(
      { ...values, category_id: +values.category_id, id: undefined },
      {
        onSuccess: () => {
          setOpen(false);
          toast({
            title: "Produto criado",
            description: "O produto foi criado com sucesso",
            variant: "default",
          });
        },
        onError: () => {
          form.reset(values);
          toast({
            title: "Erro ao criar produto",
            description: "Ocorreu um erro ao criar o produto",
            variant: "destructive",
          });
        },
      }
    );
  }

  return (
    <>
      <div className="flex flex-col space-y-2 max-h-[80vh] overflow-auto px-0.5 pr-4">
        <Form {...form}>
          <form
            id="product-create-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <CurrencyInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock_quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(+e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      value={field.value}
                      onValueChange={(value: string) => field.onChange(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categorias</SelectLabel>
                          {categories.data?.map((category) => (
                            <SelectItem
                              key={category.value}
                              value={category.value.toString()}
                            >
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagem</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="descrição"
                      className="min-h-40"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <DialogFooter>
        <Button type="submit" className="w-full" form="product-create-form">
          Salvar
        </Button>
      </DialogFooter>
    </>
  );
}

export function DialogCreateProduct() {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button type="button" className="w-full gap-2">
          <PlusCircle /> Adicionar Produto
        </Button>
      </DialogTrigger>
      <DialogContent className="pr-0">
        <DialogHeader className="pr-4">
          <DialogTitle> Adicionar Produto</DialogTitle>
        </DialogHeader>

        <Content setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
