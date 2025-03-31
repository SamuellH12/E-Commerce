import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("o usuário está na página {string}", (page: string) => {
  cy.visit(`/${page.toLowerCase()}`);
});

When("o usuário tenta cadastrar a Categoria com nome {string}", (categoryName: string) => {
  cy.get('[data-cy="add-category"]').click();
  cy.get('[data-cy="category-name"]').type(categoryName);
  cy.get('[data-cy="submit-category"]').click();
});

Then("o sistema deve exibir a mensagem de sucesso", () => {
  cy.contains("Categoria cadastrada com sucesso").should("be.visible");
});