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

function Content({ item }: { item?: ProductType }) {
  const defaultValues = {
    id: item?.id ?? "",
    name: item?.name,
    description: item?.description,
    price: item?.price,
    stock_quantity: item?.stock_quantity,
    image_url: item?.image_url,
  };

  const form = useForm<z.infer<typeof productEditSchema>>({
    resolver: zodResolver(productEditSchema),
    defaultValues: defaultValues,
  });

  async function onSubmit(values: z.infer<typeof productEditSchema>) {
    console.log("resposta: ", values);
  }

  return (
    <>
      <div className="flex flex-col space-y-2 max-h-[80vh] overflow-auto px-0.5 pr-4">
        <Form {...form}>
          <form
            id="product-edit-form"
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
                    <Input type="number" {...field} />
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
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
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
        <Button type="submit" className="w-full" form="product-edit-form">
          Salvar
        </Button>
      </DialogFooter>
    </>
  );
}

export function DialogEditProduct({
  open,
  setOpen,
  item,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  item?: ProductType;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="pr-0">
        <DialogHeader className="pr-4">
          <DialogTitle> Editar Produto</DialogTitle>
        </DialogHeader>

        <Content item={item} />
      </DialogContent>
    </Dialog>
  );
}
