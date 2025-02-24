import { Given, Then, When } from "@cucumber/cucumber";
import axios from "axios";
import { expect } from "chai";
import { parse } from "path";


const BASE_URL = process.env.BASE_URL;

Given('{string} não tem uma entrada {string}', async function (db, db_entry) {
  try {
    let response = await axios.get("http://localhost:3000/"+db);
    
    if (response.data.some(entry => entry.codename === db_entry)) {
      let entry = response.data.find(entry => entry.codename === db_entry);
      let id = entry ? entry.id : null;
      await axios.delete("http://localhost:3000/"+db+"/"+id);
    }
    
    response = await axios.get("http://localhost:3000/"+db);
    
    expect(response.data.some(entry => entry.codename === db_entry)).to.be.false;

  } catch (error) {
    throw new Error("Fail on request");
  }
});

let getminbody = (db) => {
  switch (db) {
    case "Coupons":
      return "{'name': 'name_','percentage': 10}";
    }
}

Given('{string} tem uma entrada {string}', async function (db, db_entry) {
  let body = getminbody(db).replace(/'/g, '"').replace("name_", db_entry);
  let parsedBody = JSON.parse(body);
  
  try {
    let response = await axios.get("http://localhost:3000/"+db);
    
    if (!response.data.some(entry => entry.codename === db_entry)) {
      await axios.post("http://localhost:3000/"+db, parsedBody);
    }
    
    response = await axios.get("http://localhost:3000/"+db);
    
    expect(response.data.some(entry => entry.codename === db_entry)).to.be.true;

  } catch (error) {
    throw new Error("Fail on request");
  }
});

When('uma requisição {string} for enviada para {string} com o body: {string}', async function (type, db, body) {
  let response;
  let parsedBody;
  
  switch (type) {
    case "GET":
      response = await axios.get("http://localhost:3000"+db);
      expect(response.status).to.equal(200);
      break;
      case "POST":  
      parsedBody = JSON.parse(body.replace(/'/g, '"'));
      response = await axios.post("http://localhost:3000/coupons", parsedBody);  
      expect(response.status).to.equal(201);
      
      break;
      case "PUT": 
      parsedBody = JSON.parse(body.replace(/'/g, '"'));
      response = await axios.put("http://localhost:3000"+db, parsedBody);
      expect(response.status).to.equal(200);
      break;
      case "DELETE":
        response = await axios.delete("http://localhost:3000"+db);
        expect(response.status).to.equal(200);
      break;
    default:
      throw new Error("Invalid request type");
  }  
});

Then('{string} agora tem uma entrada {string}', async function (db, db_entry) {  
  try {
    let response = await axios.get("http://localhost:3000/"+db);
    
    expect(response.data.some(entry => entry.codename === db_entry)).to.be.true;

  } catch (error) {
    throw new Error("Fail on request");
  }
});

Then('{string} agora não tem uma entrada {string}', async function (db, db_entry) {  
  try {
    let response = await axios.get("http://localhost:3000/"+db);
    
    expect(response.data.some(entry => entry.codename === db_entry)).to.be.false;

  } catch (error) {
    throw new Error("Fail on request");
  }
});

Then('a entrada {string} de {string} tem no body: {string}', async function (db_entry, db, body) {
  let parsedBody = JSON.parse(body.replace(/'/g, '"'));
  
  let response = await axios.get("http://localhost:3000/"+db);
  let entry = response.data.find(entry => entry.codename === db_entry);

  expect(entry).to.deep.include(parsedBody);
});






Given("o usuário está na página de {string}", function (string) {
  switch (string) {
    case "Cadastro de cartão":
      this.cenario = "Cadastrar";
      break;
    case "Atualização de cartão":
      this.cenario = "Atualizar";
      break;
    default:
      // this given isn't necessary to this service scenario
      break;
  }
});

Given(
  "o usuário tem os cartões de apelido {string} e {string} cadastrados",
  async function (string, string2) {
    const data = new Date();
    let mes = data.getMonth() + 1;
    const ano = data.getFullYear();

    if (mes < 10) mes = `0${mes}`;

    const response1 = await axios.post("http://localhost:3000/cards/new", {
      nickname: string,
      name: "John Doe",
      code: "5197952644616116",
      expiration: `${ano}/${mes}`,
      cvc: "123",
    });

    const response2 = await axios.post("http://localhost:3000/cards/new", {
      nickname: string2,
      name: "John Doe",
      code: "4485168778187659",
      expiration: `${ano}/${mes}`,
      cvc: "456",
    });

    this.card1 = response1.data;
    this.card2 = response2.data;

    await axios.get("http://localhost:3000/cards").then((response) => {
      const cards = response.data;
      const card = cards.find((card) => card.id === this.card1.id);

      this.id1 = card.id;
    });

    await axios.get("http://localhost:3000/cards").then((response) => {
      const cards = response.data;
      const card = cards.find((card) => card.id === this.card2.id);

      this.id2 = card.id;
    });

    if (!this.card1 || !this.card2) {
      throw new Error("Erro ao criar cartões");
    }
  }
);

When(
  "o usuário seleciona a opção {string} o cartão {string}",
  async function (string, string2) {
    switch (string) {
      case "Remover":
        this.cenario = "Remover";
        switch (string2) {
          case this.card1.nickname:
            await axios.delete(`http://localhost:3000/cards/${this.id1}`);
            break;
          case this.card2.nickname:
            await axios.delete(`http://localhost:3000/cards/${this.id2}`);
            break;
          default:
            throw new Error("Cartão não encontrado");
        }
        break;
      case "Atualizar":
        // This step is not necessary for this service scenario
        break;
      default:
        return "pending";
    }
  }
);

Then(
  "o cartão de apelido {string} é removido da lista de cartões",
  async function (string) {
    await axios.get("http://localhost:3000/cards").then((response) => {
      const cards = response.data;
      const card = cards.find((card) => card.id === this.id1 && card.nickname === string);
      
      expect(card).to.be.undefined;
    });
  }
);

Then(
  "o usuário tem os cartões de apelido {string} cadastrados",
  async function (string) {
    const data = new Date();
    let mes = data.getMonth() + 1;
    const ano = data.getFullYear();

    if (mes < 10) mes = `0${mes}`;

    let response;

    switch (this.cenario) {
      case "Remover":
        await axios.get("http://localhost:3000/cards").then((response) => {
          const cards = response.data;
          const card = cards.find((card) => card.id === this.id2);

          expect(card.nickname).to.equal(string);
        });

        await axios.delete(`http://localhost:3000/cards/${this.id2}`);
        break;

      default:
        response = await axios.post("http://localhost:3000/cards/new", {
          nickname: string,
          name: "John Doe",
          code: "5197952644616116",
          expiration: `${ano}/${mes}`,
          cvc: "123",
        });

        this.card = response.data;
        expect(response.status).to.equal(200);

        response = await axios
          .get("http://localhost:3000/cards")
          .then((response) => {
            const cards = response.data;
            const card = cards.find((card) => card.id === this.card.id);

            expect(card.nickname).to.equal(string);
            expect(response.status).to.equal(200);
            this.id = card.id;
          });
        break;
    }
  }
);

When(
  "o usuário preenche o apelido {string}, o nome {string}, o código {string}, o vencimento {string} e o cvc {string}",
  async function (string1, string2, string3, string4, string5) {
    let response;
    let card;

    switch (this.cenario) {
      case "Cadastrar":
        response = await axios.post("http://localhost:3000/cards/new", {
          nickname: string1,
          name: string2,
          code: string3,
          expiration: string4,
          cvc: string5,
        });

        card = response.data;
        expect(card.nickname).to.equal(string1);
        expect(card.name).to.equal(string2);
        expect(card.code_last4).to.equal(string3.slice(-4));

        this.id = response.data.id;
        break;

      case "Atualizar":
        response = await axios.put(`http://localhost:3000/cards/${this.id}`, {
          nickname: string1,
          name: string2,
          code: string3,
          expiration: string4,
          cvc: string5,
        });

        this.nickname = string1;
        this.name = string2;
        this.code = string3;
        break;
      default:
        break;
    }
    expect(response.status).to.equal(200);
  }
);

Then(
  "o cartão é salvo na conta com o apelido {string}, o nome {string}, os quatro últimos dígitos {string} e o tipo {string}",
  async function (string, string2, string3, string4) {
    // Write code here that turns the phrase above into concrete actions

    await axios.get("http://localhost:3000/cards").then((response) => {
      const cards = response.data;
      const card = cards.find((card) => card.id === this.id);

      expect(card.nickname).to.equal(string);
      expect(card.name).to.equal(string2);
      expect(card.code_last4).to.equal(string3);
      expect(card.card_type).to.equal(string4);
    });

    axios.delete(`http://localhost:3000/cards/${this.id}`);
  }
);


Given('o usuário está na página {string}', async function (type, db, body) {
    
});


Given('não existe a categoria {string}', function (categoria) {
  
});

When('o usuário seleciona a opção {string}', function (opcao) {
  
});


When('o usuário tenta cadastrar a Categoria com nome {string} e o departamento {string}', function () {

});


Then('aparece uma mensagem de confirmação', function () {
  
});

Then('o usuário consegue ver {string} na lista de categorias', function (string) {
  
});
