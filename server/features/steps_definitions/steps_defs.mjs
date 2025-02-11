import { Given, Then, When } from "@cucumber/cucumber";
import axios from "axios";
import { expect } from "chai";

Given("o usuário está na página de {string}", (string) => {
  // This isn't necessary to service scenario
});

Given('o usuário tem os cartões de apelido {string} e {string} cadastrados', (string, string2) => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('o usuário seleciona a opção {string} o cartão {string}', (string, string2) => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('o cartão de apelido {string} é removido da lista de cartões', (string) => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('o usuário tem os cartões de apelido {string} cadastrados', (string) => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When(
  "o usuário preenche o apelido {string}, o nome {string}, o código {string}, o vencimento {string} e o cvc {string}",
  async (string1, string2, string3, string4, string5) => {
    try {
      // Debug para verificar os dados enviados
      const response = await axios.post("http://localhost:3000/cards/new", {
        nickname: string1,
        name: string2,
        code: string3,
        expiration: string4,
        cvc: string5,
      });

      expect(response.status).to.equal(200);
    } catch (error) {
      console.error(
        "Erro na requisição:",
        error.response?.status,
        error.response?.data || error.message
      );
      throw new Error("Falha ao cadastrar o cartão");
    }
  }
);


When('o usuário seleciona a opção {string} com sucesso', (string) => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('o cartão é salvo na conta com o apelido {string}, o nome {string}, os quatro últimos dígitos {string} e o tipo {string}', async (string, string2, string3, string4) => {
  // Write code here that turns the phrase above into concrete actions
  try {
    await axios.get("http://localhost:3000/cards").then((response) => {
      const cards = response.data;
      const card = cards.find((card) => card.nickname === string);

      expect(card.name).to.equal(string2);
      expect(card.code_last4).to.equal(string3);
      expect(card.card_type).to.equal(string4);
    });
  } catch (error) {
    console.error(
      "Erro na requisição:",
      error.response?.status,
      error.response?.data || error.message
    );
    throw new Error("Falha ao verificar o cartão");
  }
});

Then('o cartão é validado', () => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('o cartão é salvo com a figura do tipo {string} ou {string}', (string, string2) => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Given('o usuário está na página {string}', (string) => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('o número do cartão salvo está protegido como {string} por questões de segurança', (string) => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});
