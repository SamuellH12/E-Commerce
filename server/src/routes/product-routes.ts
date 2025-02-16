import { Router } from "express";
import {
  createProduct,
  disableProduct,
  getAllProducts,
  getProduct,
  getProductImageUrl,
  updateProduct,
} from "../controllers/product/product-controllers";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:productId", getProduct);
productRouter.post("/new", createProduct);
productRouter.put("/:productId", updateProduct);
productRouter.put("/:productId/disable", disableProduct);
productRouter.get('/:productId/image-url', getProductImageUrl);

export { productRouter };
