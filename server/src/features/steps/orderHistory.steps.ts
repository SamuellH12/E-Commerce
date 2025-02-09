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
  const expectedData = dataTable.hashes(); // Converte a tabela para um array de objetos
  response = await axios.get("http://localhost:3000/order-history");
  const actualData = response.data.slice(0, 3); // Pega os 3 primeiros pedidos

  // Valida os dados
  expect(actualData).to.deep.equal(expectedData);
});