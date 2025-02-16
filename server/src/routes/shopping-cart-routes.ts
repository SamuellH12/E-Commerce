import { Router } from "express";
import {
  addToCart,
  deleteFromCart,
  getAllCart,
  updateCartProduct,
  emptyShoppingCart,
  getCartProduct
} from "../controllers/shopping-cart/shopping-cart-controllers";

const shoppingCartRouter = Router();

shoppingCartRouter.get("/", getAllCart);
shoppingCartRouter.get("/:productId", getCartProduct);
shoppingCartRouter.post("/add", addToCart);
shoppingCartRouter.put("/", updateCartProduct);
shoppingCartRouter.delete('/:productId', deleteFromCart);
shoppingCartRouter.delete('/', emptyShoppingCart);

export { shoppingCartRouter };
