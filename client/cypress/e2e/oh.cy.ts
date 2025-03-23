describe('Teste - Verificar Loading e Voltar com "← Back"', () => {
    it('Deve exibir "Loading..." ao clicar em "See details" e retornar com "← Back"', () => {
      // Acessa a página de Histórico de Pedidos
      cy.visit('http://localhost:4000/order-history');
  
      // Localiza o card do pedido #1 usando regex para evitar conflito com Order #10
      cy.contains('h3', /^Order #1$/).then(($el) => {
        // Encontra o botão "See details" dentro do mesmo card
        cy.wrap($el).parent().find('button').contains('See details').click();
      });
  
      // Verifica se a mensagem "Loading..." é exibida
      cy.contains('p', 'Loading...');
  
      // Clica no botão "← Back"
      cy.get('button')
        .contains('← Back')
        .click();
  
      // Verifica se o usuário foi redirecionado para a página "Order History"
      cy.url().should('include', '/order-history');
  
      // Valida que o título da página "Order History" está visível
      cy.contains('h1', 'Order History');
    });
  });
  
/// <reference types="cypress" />

describe('Verificar Página de Histórico de Pedidos', () => {
    it('Verifica se todos os detalhes dos pedidos estão presentes', () => {
      // Acessa a página de Histórico de Pedidos
      cy.visit('http://localhost:4000/order-history');
  
      // Verifica o título da página
      cy.contains('h1', 'Order History');
  
      // Verifica os detalhes do primeiro pedido (Order #10)
      cy.contains('h3', 'Order #10')
      cy.contains('p', 'Destination: Rua G, 201');
      cy.contains('p', 'Status: processing');
      cy.contains('p', 'Total Value: $ 2049.00');
  
      // Verifica os detalhes do segundo pedido (Order #1)
      cy.contains('h3', 'Order #1');
      cy.contains('p', 'Destination: Rua A, 123');
      cy.contains('p', 'Status: delivered');
      cy.contains('p', 'Total Value: $ 550.00');
  
      // Verifica os detalhes do terceiro pedido (Order #2)
      cy.contains('h3', 'Order #2');
      cy.contains('p', 'Destination: Rua B, 456');
      cy.contains('p', 'Status: shipped');
      cy.contains('p', 'Total Value: $ 200.00');
    });
  });

/// <reference types="cypress" />

describe('Visualizar Todos os Pedidos', () => {
    it('Deve clicar em "View All Orders" e visualizar os detalhes dos pedidos adicionais', () => {
      // Acessa a página de Histórico de Pedidos
      cy.visit('http://localhost:4000/order-history');
  
      // Clica no botão "View All Orders"
      cy.contains('button', 'View All Orders').click();
  
      // Verifica os detalhes do pedido com ID "Order #2"
      cy.contains('h3', 'Order #2');
      cy.contains('p', 'Destination: Rua B, 456');
      cy.contains('p', 'Status: shipped');
      cy.contains('p', 'Total Value: $ 200.00');
  
      // Verifica os detalhes do pedido com ID "Order #3"
      cy.contains('h3', 'Order #3');
      cy.contains('p', 'Destination: Rua C, 789');
      cy.contains('p', 'Status: pending');
      cy.contains('p', 'Total Value: $ 150.00');
  
      // Verifica os detalhes do pedido com ID "Order #4"
      cy.contains('h3', 'Order #4');
      cy.contains('p', 'Destination: Rua D, 101');
      cy.contains('p', 'Status: canceled');
      cy.contains('p', 'Total Value: $ 300.00');
  
      // Verifica os detalhes do pedido com ID "Order #5"
      cy.contains('h3', 'Order #5');
      cy.contains('p', 'Destination: Rua E, 202');
      cy.contains('p', 'Status: delivered');
      cy.contains('p', 'Total Value: $ 100.00');
    });
  });


  /// <reference types="cypress" />

/// <reference types="cypress" />

describe('Teste - Clicar em "See details" e verificar redirecionamento', () => {
    it('Deve clicar em "See details" do pedido #1 e verificar os detalhes dos itens', () => {
      // Acessa a página de Histórico de Pedidos
      cy.visit('http://localhost:4000/order-history');
  
      // Localiza o card do pedido #1 pelo título "Order #1"
      cy.contains('h3', /^Order #1$/).then(($el) => {
        // Encontra o botão "See details" dentro do mesmo card
        cy.wrap($el).parent().find('button').contains('See details').click();
      });
  
      // Verifica se o usuário é redirecionado para a página correta
      cy.url().should('include', '/product-order-history/1');
  
      // Valida os detalhes dos itens na nova página
      cy.contains('h1', 'Itens by Order #1');
      cy.contains('h3', 'Redmi Note 13 5g');
      cy.contains('p', 'Item ID: 1');
      cy.contains('p', 'Date: 09/02/2025');
      cy.contains('p', 'Price: R$ 500.00');
      cy.contains('p', 'Quantity: 1');
      cy.contains('p', 'Product ID: ae5abaa3-fd1b-4f74-85bd-45fbcebeb3db');
      cy.contains('p', 'Created At: 2025-02-09T18:43:41.634825+00:00');
  
      cy.contains('h3', 'Capa Protetora 2');
      cy.contains('p', 'Item ID: 2');
      cy.contains('p', 'Date: 09/02/2025');
      cy.contains('p', 'Price: R$ 50.00');
      cy.contains('p', 'Quantity: 1');
      cy.contains('p', 'Product ID: a52f3649-aad8-4338-a263-f3393ecc1a93');
      cy.contains('p', 'Created At: 2025-02-09T18:54:58.26036+00:00');
    });
  });

  /// <reference types="cypress" />

describe('Teste - Voltar para a Página Anterior', () => {
    it('Deve voltar para a página "Order History" ao clicar no botão "← Back"', () => {
      // Acessa a página de detalhes do pedido #1
      cy.visit('http://localhost:4000/product-order-history/1');
  
      // Verifica se o título da página de detalhes do pedido está presente
      cy.contains('h1', 'Itens by Order #1');
  
      // Clica no botão "← Back"
      cy.contains('button', '← Back').click();
  
      // Verifica se o usuário foi redirecionado para a página "Order History"
      cy.url().should('include', '/order-history');
  
      // Valida que o título da página "Order History" está visível
      cy.contains('h1', 'Order History');
    });
  });

/// <reference types="cypress" />

describe('Teste - Navegar para a Página Inicial via "E-commerce"', () => {
    it('Deve clicar em "E-commerce" e verificar o redirecionamento para a página inicial', () => {
      // Acessa a página atual (pode ser qualquer página do sistema)
      cy.visit('http://localhost:4000/order-history');
  
      // Clica no elemento "E-commerce"
      cy.get('span.text-3xl.hover\\:bg-muted\\/60.cursor-pointer')
        .contains('E-commerce')
        .click();
  
      // Verifica se o usuário foi redirecionado para a página inicial
      cy.url().should('include', '/home');
  
      // Valida que o texto "Eletrônicos" está presente na página
      cy.get('h2.text-3xl.font-bold').contains('Eletrônicos');
    });
  });

/// <reference types="cypress" />

describe('Teste - Voltar para a Página Inicial via "E-commerce" (a partir de /product-order-history/1)', () => {
    it('Deve voltar para a página inicial ao clicar em "E-commerce"', () => {
      // Acessa a página de detalhes do pedido #1
      cy.visit('http://localhost:4000/product-order-history/1');
  
      // Verifica se o título da página de detalhes do pedido está presente
      cy.contains('h1', 'Itens by Order #1');
  
      // Clica no elemento "E-commerce"
      cy.get('span.text-3xl.hover\\:bg-muted\\/60.cursor-pointer')
        .contains('E-commerce')
        .click();
  
      // Verifica se o usuário foi redirecionado para a página inicial
      cy.url().should('include', '/home');
  
      // Valida que o texto "Eletrônicos" está visível na página inicial
      cy.get('h2.text-3xl.font-bold').contains('Eletrônicos');
    });
  });

  /// <reference types="cypress" />

