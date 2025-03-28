"use client";

import { PropsWithChildren } from "react";
import { TanstackQueryClientProvider } from "./tanstack-query-provider";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/toaster";

export function AppRootLayout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TanstackQueryClientProvider>{children}</TanstackQueryClientProvider>
      <Toaster />
    </ThemeProvider>
  );
}
