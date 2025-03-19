describe("feature 1 payment sucess", async () => {
	/*
	Scenario 1: Navegar para página de métodos de pagamento com sucesso
		Given o usuário está na página de "Pagamento"
		When o usuário seleciona a opção "Adicionar novo cartão"
		Then o usuário está na página de "Cadastro de cartão"
	*/

	it("passes", () => {
		cy.visit("http://localhost:4000/payment");
		cy.get("#select-card").click();
		cy.get("#button-add-card").click();
		cy.url().should("include", "/payment/new_card");
	});
});

describe("feature 2 payment sucess", () => {
	/*
	Scenario 2: Cadastro de cartão concluído com sucesso
		Given o usuário está na página de "Cadastro de cartão"
		When o usuário preenche o apelido "Cartão de teste de painho", a transação "Crédito", o nome "Wilson F Torres", o código "5356614114927905", o vencimento "08/32" e o cvc "123"
		Then o cartão é salvo na conta com o apelido "Cartão de painho", a transação "Crédito", o nome "Wilson F Torres", o código "5356614114927905", o vencimento "08/32", o cvc "123" e o tipo "MasterCard"
		And o usuário está para página de "Pagamento"
	*/

	it("passes", async () => {
		cy.visit("http://localhost:4000/payment/new_card");
		cy.get("#select-debit").click();
		cy.get("#nickname").type("Cartão de teste de painho");
		cy.get("#name").type("Wilson F Torres");
		cy.get("#code").type("5356614114927905");
		cy.get("#year").type("2032");
		cy.get("#cvc").type("123");
		cy.get("#month").click();
		cy.get("#Agosto").click();
		cy.get("#cadastrar").click();
		cy.url().should("eq", "http://localhost:4000/payment");
	});
});

describe("feature 3 payment sucess", () => {
	/*
	Scenario 3: Remoção de cartão cadastrado com sucesso
		Given o usuário está na página de "Pagamento"
		And o usuário tem o cartão de apelido "Cartão de teste de painho" cadastrado
		When o usuário seleciona a opção "Remover" o cartão "Cartão de painho"
		Then o usuário está na página de "Pagamento"
		And o usuário não tem o cartão "Cartão de teste de painho" cadastrado
	*/

	it("passes", async () => {
		cy.visit("http://localhost:4000/payment");

		cy.get("#select-card").click();
		cy.get('[data-name="Cartão de teste de painho"] button').click();
		cy.get('[data-name="delete Cartão de teste de painho"]').click();

		cy.url().should("eq", "http://localhost:4000/payment");
	});
});
