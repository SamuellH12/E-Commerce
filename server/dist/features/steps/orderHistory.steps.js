"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const chai_1 = require("chai");
const axios_1 = __importDefault(require("axios"));
let response;
// Scenario: Acessar Histórico de Pedidos
(0, cucumber_1.Given)("o usuário está na página {string}", (page) => __awaiter(void 0, void 0, void 0, function* () {
    // Simula o acesso à página (não é necessário implementar aqui)
}));
(0, cucumber_1.When)("clica no botão {string}", (button) => __awaiter(void 0, void 0, void 0, function* () {
    // Simula o clique no botão (não é necessário implementar aqui)
}));
(0, cucumber_1.Then)("o sistema redireciona o usuário para a página {string}", (page) => __awaiter(void 0, void 0, void 0, function* () {
    // Simula o redirecionamento (não é necessário implementar aqui)
}));
(0, cucumber_1.Then)("exibe os 3 pedidos mais recentes com os seguintes detalhes:", (dataTable) => __awaiter(void 0, void 0, void 0, function* () {
    const expectedData = dataTable.hashes(); // Converte a tabela para um array de objetos
    response = yield axios_1.default.get("http://localhost:3000/order-history");
    const actualData = response.data.slice(0, 3); // Pega os 3 primeiros pedidos
    // Valida os dados
    (0, chai_1.expect)(actualData).to.deep.equal(expectedData);
}));
// Scenario: Visualizar itens comprados em um pedido
(0, cucumber_1.When)("clica no pedido com ID {string}", (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    response = yield axios_1.default.get(`http://localhost:3000/product-order-history?order_id=${orderId}`);
}));
(0, cucumber_1.Then)("o sistema exibe os itens do pedido com os seguintes detalhes:", (dataTable) => __awaiter(void 0, void 0, void 0, function* () {
    const expectedData = dataTable.hashes();
    const actualData = response.data;
    // Valida os dados
    (0, chai_1.expect)(actualData).to.deep.equal(expectedData);
}));
