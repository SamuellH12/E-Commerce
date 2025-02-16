import { Router } from "express";

const categoriesRouter = Router();

categoriesRouter.get("/"); //get all categories
categoriesRouter.post("/"); //create a new category 

categoriesRouter.put("/:categoryId") //update a category
categoriesRouter.delete("/:categoryId"); //delete a category
categoriesRouter.get("/:categoryId"); //get category data
categoriesRouter.get("/:categoryId/all"); //get all products from a category


export { categoriesRouter };