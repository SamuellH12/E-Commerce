import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Given('estou na página de categorias', () => {
  cy.visit('/admin/categories');
  cy.contains('h2', 'Categorias').should('be.visible');
});

When('seleciono o departamento {string}', (depName: string) => {
  cy.get('[data-testid="department-select"]').click();
  cy.contains('[data-testid="department-option"]', depName).click();  
});


When('não seleciono um departamento', () => {
  //  o campo já está vazio vazio
});

Then('a categoria {string} deve aparecer associada a {string}', (catName : string, depName : string) => {
  cy.contains('[data-testid="category-item"]', catName).should('exist');
  cy.contains('[data-testid="category-item"]', catName).click();
  cy.get('[data-testid="department-select"]').find('span').should('contain.text', depName);;
});

Then('a categoria {string} não deve aparecer na lista', (catName : string) => {
  cy.contains('[data-testid="category-item"]', catName).should('not.exist');
});

When('clico na categoria {string}', (catName : string) => {
  cy.contains('[data-testid="category-item"]', catName).click();
});

When('clico para adicionar nova categoria', () => {
  cy.get('[data-testid="add-category-button"]')
    .should('be.visible')
    .and('not.be.disabled')
    .click();
  
  cy.get('[role="dialog"]').should('be.visible');
  cy.contains('Criar Categoria').should('be.visible');
});

Given('existe a categoria {string}', (catName : string) => {
  cy.contains('[data-testid="category-item"]', catName).should('exist');
});