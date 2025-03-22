import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('o usuário {string} com e-mail {string} está logado no sistema com acesso de {string}', (nome: string, email: string, role: string) => {
  // Mock login - you should implement your actual login logic here


});

Given('o usuário está na página de {string}', (pagina: string) => {
  if (pagina === "Gerenciamento de Itens") {
    
    cy.visit('/admin/products');
  
  }
});

When('ele insere o nome {string}, descrição {string}, preço {string}, categoria {string}, disponibilidade {string}', 
  (nome: string, descricao: string, preco: string, categoria: string, disponibilidade: string) => {
    cy.get('[data-cy=create-product-button]').click();

    cy.get('[data-cy=product-name]').type(nome);
    cy.get('[data-cy=product-description]').type(descricao);
    cy.get('[data-cy=product-price]').type(preco);
    cy.get('[data-cy=product-category]').select(categoria);
    cy.get('[data-cy=product-availability]').select(disponibilidade);
});

When('ele anexa uma imagem representativa em {string}', (campo: string) => {
  cy.get('[data-cy=product-image]').attachFile('product-image.jpg');
});

Then('o sistema deve validar os dados inseridos', () => {
  cy.get('[data-cy=submit-button]').click();
  cy.get('[data-cy=form-errors]').should('not.exist');
});

Then('o item deve ser exibido na lista de itens cadastrados', () => {
  cy.get('[data-cy=products-list]').should('contain', 'Redmi Note 13 pro');
});

Then('o sistema deve exibir a mensagem {string}', (mensagem: string) => {
  cy.get('[data-cy=toast-message]').should('contain', mensagem);
});

Given('o item {string} está associado a pedidos em andamento', (item: string) => {
  // Mock API response for item with active orders
  cy.intercept('GET', '/api/products/*', {
    statusCode: 200,
    body: {
      name: item,
      hasActiveOrders: true
    }
  });
});

When('ele solicita a exclusão do item da lista {string}', (lista: string) => {
  cy.get('[data-cy=delete-button]').first().click();
});

Then('o sistema deve exibir a mensagem de erro {string}', (mensagem: string) => {
  cy.get('[data-cy=error-message]').should('contain', mensagem);
});

Then('o item {string} deve permanecer na lista {string}', (item: string, lista: string) => {
  cy.get('[data-cy=products-list]').should('contain', item);
});

Then('o sistema deve redirecionar o usuário para a página de {string}', (pagina: string) => {
  cy.url().should('include', '/admin/products');
});
