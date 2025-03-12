import { AppRootLayout } from "@/providers/app-root-layout";
import { mount } from "cypress/react";
import Home from "./page";

describe("Home Component", () => {
  it("Renderiza corretamente", () => {
    mount(
      <AppRootLayout>
        <Home />
      </AppRootLayout>
    );

    cy.contains("h2", "Livros").should("be.visible");
    cy.contains("h2", "Eletrônicos").should("be.visible");
  });
});
