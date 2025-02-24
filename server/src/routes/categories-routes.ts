import { Router } from "express";
import {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getProductsFromCategory
} from "../controllers/categories/categories-controller"

const categoriesRouter = Router();

categoriesRouter.get("/", getAllCategories);
categoriesRouter.post("/", createCategory);

categoriesRouter.put("/:categoryId", updateCategory);
categoriesRouter.delete("/:categoryId", deleteCategory);
categoriesRouter.get("/:categoryId", getCategory);
categoriesRouter.get("/:categoryId/all", getProductsFromCategory);


export { categoriesRouter };