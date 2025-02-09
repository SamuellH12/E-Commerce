import { Router } from "express";
import { getAllProducts } from "../controllers/product/product-controllers";

const productRouter = Router();

// Define routes

productRouter.get("/", getAllProducts);

export { productRouter };
