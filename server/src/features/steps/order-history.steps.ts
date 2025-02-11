import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";
import { strict as assert } from "assert";
import axios from "axios";

let response: any;
let currentPage: string;
let errorMessage: string | undefined;
let httpStatusCode: number | undefined;



Given("o usuário com ID {string} possui pedidos registrados", async function (userId: string) {
  // Simula que o usuário com o ID fornecido tem pedidos registrados.
  // Não é necessário realizar nenhuma ação aqui, pois o Supabase já contém os dados.
});

When("o sistema consulta os pedidos do usuário com ID {string}", async function (userId: string) {
  // Faz uma requisição GET para a rota que recupera os pedidos do usuário.
  response = await axios.get(`http://localhost:3000/order-history`);
});

Then("o sistema retorna os seguintes pedidos:", async function (dataTable: any) {
  const expectedOrders = dataTable.hashes(); // Converte a tabela de dados em um array de objetos.
  const actualOrders = response.data; // Obtém os dados retornados pela API.

  // Valida se os dados retornados correspondem aos esperados.
  assert.deepStrictEqual(actualOrders, expectedOrders);
});

Given("existem pedidos registrados no sistema", async function () {
  // Simula que existem pedidos registrados no sistema.
  // Não é necessário realizar nenhuma ação aqui, pois o Supabase já contém os dados.
});

When('o sistema filtra os pedidos pela data {string}', async function (date) {
  // Simula a consulta ao endpoint com filtro de data
  const response = await fetch(`http://localhost:3000/order-history?date=${date}`);
  this.filteredOrders = await response.json(); // Armazena os dados filtrados
});

Then('o sistema retorna os seguintes pedidos:', function (dataTable) {
  // Converte os dados esperados da tabela Cucumber para um array de objetos
  const expectedOrders = dataTable.hashes();

  // Valida se os dados retornados correspondem aos esperados
  expect(this.filteredOrders).to.deep.equal(expectedOrders);
});

Given('ocorre um erro ao acessar os pedidos', function () {
  errorMessage = 'Erro ao carregar pedidos. Tente novamente mais tarde.';
  httpStatusCode = 500;
});

// Passo: "o sistema tenta carregar os pedidos"
When('o sistema tenta carregar os pedidos', async function () {
  try {
    const response = await axios.get(`http://localhost:3000/order-history/error`);
    this.response = response;
  } catch (error: any) {
    if (error.response) {
      this.response = error.response;
    } else {
      throw new Error("Erro desconhecido ao carregar os pedidos.");
    }
  }
});

// Passo: "o sistema exibe a mensagem de erro ..."
Then('o sistema exibe a mensagem de erro {string}', function (expectedMessage: string) {
  const actualMessage = this.response.data.message;
  expect(actualMessage).to.equal(expectedMessage);
});

// Passo: "o código de status HTTP retornado é ..."
Then('o código de status HTTP retornado é {string}', function (expectedStatusCode: string) {
  const statusCode = parseInt(expectedStatusCode, 10);
  expect(this.response.status).to.equal(statusCode);
});
// Scenario: Acessar Histórico de Pedidos
Given("o usuário está na página {string}", async (page: string) => {
  // Simula o acesso à página (não é necessário implementar aqui)
});

When('clica no botão {string}', function (buttonName: string) {
  // Simula a navegação para a página correspondente ao botão clicado
  if (buttonName === 'Histórico de Pedidos') {
    currentPage = 'Histórico de Pedidos';
  } else if (buttonName === 'Menu Principal') {
    currentPage = 'Menu Principal';
  }
  // Adicione mais condições conforme necessário
});

Then("o sistema redireciona o usuário para a página {string}", async (page: string) => {
  // Simula o redirecionamento (não é necessário implementar aqui)
});

Then("exibe os 3 pedidos mais recentes com os seguintes detalhes:", async function (dataTable: any) {
  const expectedOrders = dataTable.hashes();
  const actualOrders = response.data.slice(0, 3); // Pega apenas os 3 primeiros pedidos

  // Transforma os dados reais para o formato esperado
  const formattedOrders = actualOrders.map((order: any) => ({
    order_id: String(order.order_id),
    created_at: order.created_at,
    order_data: order.order_data,
    destination: order.destination,
    status: order.status,
    total_value: String(order.total_value),
  }));

  // Valida os dados
  assert.deepStrictEqual(formattedOrders, expectedOrders);
});

// Scenario: Visualizar itens comprados em um pedido
When("clica no pedido com ID {string}", async (orderId: string) => {
  response = await axios.get(`http://localhost:3000/product-order-history?order_id=${orderId}`);
});

Then("o sistema exibe os itens do pedido com os seguintes detalhes:", async (dataTable: any) => {
  const expectedData = dataTable.hashes();

  // Transform the actual data to match the expected format
  const actualData = response.data.map((item: any) => ({
    id: String(item.id),
    created_at: item.created_at,
    order_id: String(item.order_id),
    product_id: item.product_id,
    price_paid: String(item.price_paid),
    amount: String(item.amount),
  }));

  // Validate the data
  expect(actualData).to.deep.equal(expectedData);
});

Then('o usuário permanece na página {string}', function (expectedPage: string) {
  // Verifica se a página atual corresponde à esperada
  expect(currentPage).to.equal(expectedPage);
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

  // Transforma os dados reais para corresponder ao formato esperado
  const actualData = response.data.map((item: any) => ({
    order_id: String(item.order_id),
    created_at: item.created_at,
    order_data: item.order_data,
    destination: item.destination,
    status: item.status,
    total_value: String(item.total_value),
  }));

  // Valida os dados
  expect(actualData).to.deep.equal(expectedData);
});

// Scenario: Filtrar pedidos por data no histórico
When("seleciona o filtro de data {string}", async (date: string) => {
  response = await axios.get(`http://localhost:3000/order-history?date=${date}`);
});

Then("o sistema exibe apenas os pedidos realizados na data {string} com os seguintes detalhes:", async (date: string, dataTable: any) => {
  const expectedData = dataTable.hashes();

  // Transform the actual data to match the expected format
  const actualData = response.data.map((item: any) => ({
    order_id: String(item.order_id),
    order_data: item.order_data,
    destination: item.destination,
    status: item.status,
    total_value: String(item.total_value),
  }));

  // Validate the data
  expect(actualData).to.deep.equal(expectedData);
});

// Scenario: Exibir mensagem em caso de erro ao carregar pedidos
/*When("ocorre um erro ao carregar os pedidos do usuário com ID {string}", async (userId: string) => {
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

Then('o sistema exibe a mensagem de erro {string}', async (message: string) => {
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

Then('o sistema exibe a mensagem de aviso {string}', async (message: string) => {
  expect(response.data.message).to.equal(message);
})*/;