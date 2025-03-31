import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('estou na página de departamentos', () => {
  cy.visit('/admin/departments');
  cy.contains('h2', 'Departamentos').should('be.visible');
});

// Listagem
Then('devo ver os departamentos cadastrados', () => {
  cy.get('[data-testid^="department-"]').should('have.length.gt', 0);
});

// Criação
When('clico no botão para adicionar novo departamento', () => {
  cy.get('[data-testid="add-department-button"]').click();
  cy.get('[data-testid="department-name-input"]').should('be.visible');
});

When('preencho o nome com {string}', (nome : string) => {
  cy.get('[data-testid="department-name-input"]').clear().type(nome);
});

When('confirmo a criação', () => {
  cy.get('[data-testid="save-department-button"]').click();
});

Then('devo ver a mensagem {string}', (mensagem : string) => {
  cy.on('window:alert', (text) => {
    expect(text).to.contains(mensagem);
  });
});

Then('o departamento {string} deve aparecer na lista', (nome : string) => {
  cy.contains('[data-testid^="department-"]', nome).should('exist');
});

// Cenário negativo
Then('devo ver a mensagem de erro {string}', (mensagem : string) => {
  cy.on('window:alert', (text) => {
    expect(text).to.contains(mensagem);
  });
});

// Edição
Given('existe um departamento chamado {string}', (nome : string) => {
  cy.contains('[data-testid^="department-"]', nome).should('exist');
});

When('clico no departamento {string}', (nome : string) => {
  cy.contains('[data-testid^="department-"]', nome).click();
});

When('altero o nome para {string}', (novoNome : string) => {
  cy.get('input#name').clear().type(novoNome);
});

When('confirmo a edição', () => {
  cy.contains('button', 'Save changes').click();
});

// Exclusão
When('clico para excluir', () => {
  cy.get('[data-testid="delete-department-button"]').click();
});

When('confirmo a exclusão', () => {
  cy.on('window:confirm', () => true);
});

Then('o departamento {string} não deve mais aparecer na lista', (nome : string) => {
  cy.contains('[data-testid^="department-"]', nome).should('not.exist');
});