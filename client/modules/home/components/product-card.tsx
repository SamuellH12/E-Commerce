"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductType } from "@/modules/products/types/product-types";
import { ShoppingBasket, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

export function ProductCard({ product }: { product?: ProductType }) {
  return (
    <Card className="p-0 cursor-pointer  hover:border-foreground h-[368px]">
      <CardHeader className="p-0">
        <div className="w-full h-[180px]  flex justify-center items-center  rounded-t-lg bg-white ">
          <div className="rounded-t-lg ">
            <Image
              width={200}
              height={200}
              alt="Foto do produto"
              className="  w-full object-contain h-[180px] object-center rounded-t-lg py-2"
              src={product?.image_url ?? ""}
            />
          </div>
        </div>
        <CardTitle className="px-4 py-2 line-clamp-2 font-semibold h-12">
          {product?.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-2  flex flex-col h  gap-2">
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
