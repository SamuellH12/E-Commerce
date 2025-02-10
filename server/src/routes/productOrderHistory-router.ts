import { Router } from "express";
import { RequestHandler } from "express";
import { getProductOrderHistory } from "../controllers/productOrderHistory/productOrderHistory-controllers";

const productOrderHistoryRouter = Router();

productOrderHistoryRouter.get("/", getProductOrderHistory);

export { productOrderHistoryRouter };