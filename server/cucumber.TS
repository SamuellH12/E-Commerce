import { BeforeAll, AfterAll, setDefaultTimeout } from "@cucumber/cucumber";

// Define o tempo limite padrão para 60 segundos
setDefaultTimeout(60 * 1000);

// Hooks opcionais
BeforeAll(async () => {
  console.log("Iniciando os testes...");
});

AfterAll(async () => {
  console.log("Todos os testes concluídos.");
});