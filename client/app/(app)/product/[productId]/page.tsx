"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Minus, Plus, Share, ShoppingCart, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { axiosApi } from "@/lib/axios-client";
import { ProductType } from "@/modules/products/types/product-types";
import { ItemsCarousel } from "@/modules/home/components/items-carousel";
import { ProductCard } from "@/modules/home/components/product-card";

export default function ProductPage() {
  const { productId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["productQuery"],
    queryFn: async (): Promise<ProductType> => {
      const response = await axiosApi(`/products/${productId}`);
      return response.data;
    },
  });
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("m");

  const { data: relatedProducts, isLoading: relatedProductsLoading } = useQuery(
    {
      queryKey: ["productsQuery"],
      queryFn: async (): Promise<ProductType[]> => {
        const response = await axiosApi("/products");

        return response.data;
      },
    }
  );

  const product = {
    name: "Classic Cotton T-Shirt",
    price: 29.99,
    discount: 39.99,
    description:
      "A comfortable and versatile cotton t-shirt that's perfect for everyday wear. Made from 100% organic cotton for breathability and durability.",
    colors: [
      { id: "black", name: "Black", hex: "#000000" },
      { id: "white", name: "White", hex: "#ffffff" },
      { id: "navy", name: "Navy", hex: "#000080" },
    ],
    sizes: ["xs", "s", "m", "l", "xl"],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    rating: 3,
    reviewCount: 128,
    inStock: true,
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-white overflow-hidden rounded-lg border">
            <Image
              src={data?.image_url || "/placeholder.svg"}
              alt={data?.name || ""}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{data?.name ?? "--"}</h1>
            <div className="mt-2 flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(data?.rating ?? 0)
                        ? "fill-primary text-primary"
                        : i < (data?.rating ?? 0)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({data?.reviewCount ?? 0} avaliações)
              </span>
            </div>
          </div>

          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-bold">
              R${data?.price.toFixed(2)}
            </span>
            {data?.discount && (
              <span className="text-lg text-muted-foreground line-through">
                R${data?.discount.toFixed(2)}
              </span>
            )}
            {data?.discount && (
              <Badge className="bg-destructive dark:bg-red-500">
                Economize R${(data?.discount - data?.price).toFixed(2)}
              </Badge>
            )}
          </div>

          <p className="text-muted-foreground ">{data?.description}</p>

          <Separator />

          {/* Quantity */}
          <div>
            <h2 className="mb-2 text-lg font-medium">Quantidade</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={incrementQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
            <Button className="flex-1" size="lg">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Adicionar ao carrinho
            </Button>
          </div>

          {/* Product Status */}
          <div className="text-sm">
            {(data?.stock_quantity ?? 0) > 0 ? (
              <span className="text-green-600">Em estoque</span>
            ) : (
              <span className="text-destructive">Sem estoque</span>
            )}
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Descrição</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p>{data?.description}</p>
          </CardContent>
        </Card>
      </div>

      {/* Related Products */}
      <div className="mt-16 container">
        <h2 className="text-2xl font-bold mb-6">Você pode também gostar</h2>
        <ItemsCarousel
          isLoading={relatedProductsLoading}
          items={
            relatedProducts?.map((item) => {
              return <ProductCard product={item} />;
            }) ?? []
          }
        />
      </div>
    </div>
  );
}
