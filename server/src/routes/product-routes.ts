import { Router } from "express";
import {
  createProduct,
  disableProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/product/product-controllers";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:productId", getProduct);
productRouter.post("/new", createProduct);
productRouter.put("/:productId", updateProduct);
productRouter.put("/:productId/disable", disableProduct);

export { productRouter };
