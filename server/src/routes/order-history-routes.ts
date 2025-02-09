import { Router } from "express";
import { getOrderHistory } from "../controllers/orderHistory/orderHistory-controllers";

const orderHistoryRouter = Router();

// Define a rota GET para buscar o histórico de pedidos
orderHistoryRouter.get("/", getOrderHistory);

export { orderHistoryRouter };