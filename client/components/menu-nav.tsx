"use client";
import { useRouter } from "next/navigation";

import { MenuBarDropdown } from "./menu-bar-dropdown";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

const appRoutes = {};

export const MenuNav = () => {
  const router = useRouter();
  return (
    <main className="container">
      <nav className="flex  justify-between items-center h-20">
        <div className="flex-1">
          <div>
            <header
              className="text-3xl "
              onClick={() => {
                router.push("/");
              }}
            >
              <span
                className="text-3xl hover:bg-muted/60 cursor-pointer"
                onClick={() => {
                  router.push("/");
                }}
              >
                E-commerce
              </span>
            </header>
          </div>
        </div>
        <div className="flex-1  hidden lg:flex justify-end space-x-4">
          <Button
            variant="link"
            onClick={() => {
              router.push("/payment");
            }}
          >
            Pagamentos
          </Button>
          <Button
            variant="link"
            onClick={() => {
              router.push("/coupons");
            }}
          >
            Cupons
          </Button>
          <Button
            variant="link"
            onClick={() => {
              router.push("/shop-cart");
            }}
          >
            Carrinho de compras
          </Button>
          <Button
            variant="link"
            onClick={() => {
              router.push("/order-history");
            }}
          >
            Histórico de pedidos
          </Button>

          <ModeToggle />
        </div>
        <MenuBarDropdown />
      </nav>
    </main>
  );
};
