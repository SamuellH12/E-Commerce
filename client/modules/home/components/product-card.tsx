"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductType } from "@/modules/products/types/product-types";
import { ShoppingBasket, ShoppingCart } from "lucide-react";
import Image from "next/image";

export function ProductCard({ product }: { product?: ProductType }) {
  return (
    <Card className="p-0 cursor-pointer  hover:border-foreground">
      <CardHeader className="p-0">
        <div className="w-full h-[150px]  flex justify-center items-center my-2 rounded-lg bg-white ">
          <div className="rounded-lg">
            <Image
              width={200}
              height={200}
              alt="Foto do produto"
              className="  w-full object-contain h-[150px] object-center rounded-lg"
              src={product?.image_url ?? ""}
            />
          </div>
        </div>
        <CardTitle className="px-4 py-2 line-clamp-2 font-semibold">
          {product?.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-2  flex flex-col gap-2">
        <span className="text-xl font-bold">{`R$${product?.price.toFixed(
          2
        )}`}</span>
        <Button className="gap-2" variant="secondary">
          Adicionar ao carrinho <ShoppingCart />
        </Button>
        <Button className="gap-2">
          Comprar <ShoppingBasket />
        </Button>
      </CardContent>
    </Card>
  );
}
