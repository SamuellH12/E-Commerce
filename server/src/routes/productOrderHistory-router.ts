import { Router } from "express";
import { RequestHandler } from "express";
import { getProductOrderHistory } from "../controllers/productOrderHistory/productOrderHistory-controllers";

const productOrderHistoryRouter = Router();

// Define a rota GET para buscar os itens de um pedido
productOrderHistoryRouter.get("/", getProductOrderHistory);

export { productOrderHistoryRouter };