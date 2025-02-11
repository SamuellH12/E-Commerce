import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/product/product-controllers";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:productId", getProduct);
productRouter.post("/", createProduct);
productRouter.put("/:productId", updateProduct);
productRouter.delete("/:productId", deleteProduct);

export { productRouter };
