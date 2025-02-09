import { Router } from "express";
import { getAllProducts } from "../controllers/product-controllers";

const productRouter = Router();

// Define routes

productRouter.get("/", getAllProducts);

export { productRouter };
