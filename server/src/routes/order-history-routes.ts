import { Router } from "express";
import { getOrderHistory } from "../controllers/order-history/order-history-controllers";

const orderHistoryRouter = Router();


orderHistoryRouter.get("/", getOrderHistory);

export { orderHistoryRouter };