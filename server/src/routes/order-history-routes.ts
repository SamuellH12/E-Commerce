import { Router } from "express";
import { getOrderHistory } from "../controllers/orderHistory/orderHistory-controllers";

const orderHistoryRouter = Router();


orderHistoryRouter.get("/", getOrderHistory);

export { orderHistoryRouter };