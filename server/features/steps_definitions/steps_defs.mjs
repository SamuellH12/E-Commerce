import { Given, Then, When } from "@cucumber/cucumber";

// function isItFriday(today) {
//   if (today === "Friday") {
//     return "TGIF";
//   } else {
//     return "Nope";
//   }
// }

// Given("today is Sunday", function () {
//   this.today = "Sunday";
// });

// When("I ask whether it's Friday yet", function () {
//   this.actualAnswer = isItFriday(this.today);
// });

// Then("I should be told {string}", function (expectedAnswer) {
//   assert.strictEqual(this.actualAnswer, expectedAnswer);
// });

// Given("today is Friday", function () {
//   this.today = "Friday";
// });

Given(
  "o usuário {string} com e-mail {string} está logado no sistema com acesso de {string}",
  function (string, string2, string3) {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  }
);

Given("o usuário está na página de {string}", function (string) {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

When(
  "ele insere o nome {string}, descrição {string}, preço {string}, categoria {string}, disponibilidade {string}",
  function (string, string2, string3, string4, string5) {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  }
);

When("ele anexa uma imagem representativa em {string}", function (string) {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Then("o sistema deve validar os dados inseridos", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Then("o item deve ser exibido na lista de itens cadastrados", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Then("o sistema deve exibir a mensagem {string}", function (string) {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});
