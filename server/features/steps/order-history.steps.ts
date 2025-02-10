import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";
import axios from "axios";

let response: any;

// Scenario: Acessar Histórico de Pedidos
Given("o usuário está na página {string}", async (page: string) => {
  // Simula o acesso à página (não é necessário implementar aqui)
});

When("clica no botão {string}", async (button: string) => {
  // Simula o clique no botão (não é necessário implementar aqui)
});

Then("o sistema redireciona o usuário para a página {string}", async (page: string) => {
  // Simula o redirecionamento (não é necessário implementar aqui)
});

Then("exibe os 3 pedidos mais recentes com os seguintes detalhes:", async (dataTable: any) => {
  const expectedData = dataTable.hashes();
  response = await axios.get("http://localhost:3000/order-history");
  const actualData = response.data.slice(0, 3);

  // Valida os dados
  expect(actualData).to.deep.equal(expectedData);
});

// Scenario: Visualizar itens comprados em um pedido
When("clica no pedido com ID {string}", async (orderId: string) => {
  response = await axios.get(`http://localhost:3000/product-order-history?order_id=${orderId}`);
});

Then("o sistema exibe os itens do pedido com os seguintes detalhes:", async (dataTable: any) => {
  const expectedData = dataTable.hashes();
  const actualData = response.data;

  // Valida os dados
  expect(actualData).to.deep.equal(expectedData);
});

// Scenario: Exibir todos os pedidos realizados
Then("o sistema exibe todos os pedidos realizados pelo usuário", async () => {
  // Simula a verificação de que todos os pedidos foram carregados
});

Then("exibe o total de pedidos como {string}", async (totalOrders: string) => {
  expect(response.data.length).to.equal(parseInt(totalOrders));
});

Then("exibe os pedidos com os seguintes detalhes:", async (dataTable: any) => {
  const expectedData = dataTable.hashes();
  const actualData = response.data;

  // Valida os dados
  expect(actualData).to.deep.equal(expectedData);
});

// Scenario: Filtrar pedidos por data no histórico
When("seleciona o filtro de data {string}", async (date: string) => {
  response = await axios.get(`http://localhost:3000/order-history?date=${date}`);
});

Then("o sistema exibe apenas os pedidos realizados na data {string} com os seguintes detalhes:", async (date: string, dataTable: any) => {
  const expectedData = dataTable.hashes();
  const actualData = response.data;

  // Valida os dados
  expect(actualData).to.deep.equal(expectedData);
});

// Scenario: Exibir mensagem em caso de erro ao carregar pedidos
When("ocorre um erro ao carregar os pedidos do usuário com ID {string}", async (userId: string) => {
    try {
      response = await axios.get(`http://localhost:3000/order-history?user_id=${userId}`);
    } catch (error) {
      if (error instanceof Error && "response" in error) {
        response = error.response; // Acessa a propriedade `response`
      } else {
        throw new Error("Erro desconhecido ao carregar os pedidos.");
      }
    }
  });

Then("o sistema exibe a mensagem {string}", async (message: string) => {
  expect(response.data.message).to.equal(message);
});

Then("redireciona o usuário para a página {string}", async (page: string) => {
  // Simula o redirecionamento para a página especificada
});

// Scenario: Exibir mensagem quando não houver pedidos no histórico
Given("não existem pedidos registrados para o usuário com ID {string}", async (userId: string) => {
  response = await axios.get(`http://localhost:3000/order-history?user_id=${userId}`);
});

When("o sistema tenta carregar os pedidos", async () => {
  // Simula a tentativa de carregar os pedidos
});

Then("o sistema exibe a mensagem {string}", async (message: string) => {
  expect(response.data.message).to.equal(message);
});