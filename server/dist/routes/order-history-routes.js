"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderHistoryRouter = void 0;
const express_1 = require("express");
const orderHistory_controllers_1 = require("../controllers/orderHistory/orderHistory-controllers");
const orderHistoryRouter = (0, express_1.Router)();
exports.orderHistoryRouter = orderHistoryRouter;
// Define a rota GET para buscar o histórico de pedidos
orderHistoryRouter.get("/", orderHistory_controllers_1.getOrderHistory);
