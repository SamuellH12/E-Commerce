import { BeforeAll, AfterAll, setDefaultTimeout } from "@cucumber/cucumber";


setDefaultTimeout(60 * 1000);


BeforeAll(async () => {
  console.log("Iniciando os testes...");
});

AfterAll(async () => {
  console.log("Todos os testes concluídos.");
});