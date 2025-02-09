"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productOrderHistoryRouter = void 0;
const express_1 = require("express");
const productOrderHistory_controllers_1 = require("../controllers/productOrderHistory/productOrderHistory-controllers");
const productOrderHistoryRouter = (0, express_1.Router)();
exports.productOrderHistoryRouter = productOrderHistoryRouter;
// Define a rota GET para buscar os itens de um pedido
productOrderHistoryRouter.get("/", productOrderHistory_controllers_1.getProductOrderHistory);
