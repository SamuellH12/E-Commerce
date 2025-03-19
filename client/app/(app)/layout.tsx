"use client";

import { MenuNav } from "@/components/menu-nav";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <MenuNav />
      {children}
    </>
  );
}
