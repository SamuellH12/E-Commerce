"use client";

import { Store } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavHeader() {
  const { isMobile, toggleSidebar } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          asChild
          className="cursor-pointer"
          onClick={() => toggleSidebar()}
        >
          <div>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg  text-foreground">
              <Store />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">E-commerce</span>
              <span className="truncate text-xs">Enterprise</span>
            </div>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
