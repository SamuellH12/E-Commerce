import { Given, Then, When } from "@cucumber/cucumber";
import axios from "axios";
import { expect } from "chai";

Given(
  "o usuário {string} com e-mail {string} está logado no sistema com acesso de {string}",
  function (string, string2, string3) {
    // Write code here that turns the phrase above into concrete actions
  }
);

Given(
  "que o  usuário {string} está na página {string}",
  function (string, string2) {
    // Write code here that turns the phrase above into concrete actions
  }
);
When(
  "ele insere o nome {string}, descrição {string},  preço {string}, categoria {string}, disponibilidade {string}, imagem {string}",
  async function (name, description, price, category, stock_quantity, img_url) {
    const response = await axios.post(`http://localhost:3000/products/new`, {
      name: name,
      price: +price, // Fix: price should be assigned correctly
      stock_quantity: Number(stock_quantity),
      is_active: true,
      description: description,
      image_url: img_url,
    });
    this.productId = response.data.id;
    this.productCreateData = response.data;
  }
);

Then("o sistema deve validar os dados inseridos", async function () {
  // Write code here that turns the phrase above into concrete actions

  const response = await axios.get(
    `http://localhost:3000/products/${this.productId}`
  );

  expect(JSON.stringify(response.data)).to.be.eql(
    JSON.stringify(this.productCreateData)
  );
});

Then(
  "o item deve ser exibido na lista de itens cadastrados",
  async function () {
    // Write code here that turns the phrase above into concrete actions

    const response = await axios.get(`http://localhost:3000/products`);

    const idx = response.data.findIndex((item) => item.id === this.productId);

    expect(idx).to.be.greaterThan(-1);

    await axios.delete(`http://localhost:3000/products/${this.productId}`);
  }
);

Given(
  "o item com o nome {string}, descrição {string}, preço {string}, categoria {string}, disponibilidade {string}, imagem {string} está registrado no sistema",
  async function (name, description, price, category, stock_quantity, img_url) {
    const response = await axios.post(`http://localhost:3000/products/new`, {
      name: name,
      price: +price,
      stock_quantity: Number(stock_quantity),
      is_active: true,
      description: description,
      image_url: img_url,
    });
    this.productId = response.data.id;
    this.productCreateData = response.data;
  }
);

When("ele altera o preço para {string}", async function (string) {
  await axios.put(`http://localhost:3000/products/${this.productId}`, {
    price: 1000,
  });
});

Then(
  "o sistema deve registrar a data e hora da atualização",
  async function () {
    await axios.put(`http://localhost:3000/products/${this.productId}`, {
      updated_at: new Date(),
    });
  }
);

Then("o item deve ser atualizado", async function () {
  // Write code here that turns the phrase above into concrete actions
  const response = await axios.get(
    `http://localhost:3000/products/${this.productId}`
  );
  await axios.delete(`http://localhost:3000/products/${this.productId}`);
  expect(this.productCreateData.updated_at).to.not.eq(response.data.updated_at);
});
