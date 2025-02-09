import { Router } from "express";
import {
  createCard,
  getAllCards,
  parseCardSchema,
} from "../controllers/card/card-controllers";
import { validateCard } from "../controllers/card/utils/card-utils";

const cardRouter = Router();

// Define routes

cardRouter.get("/", getAllCards);
cardRouter.post("/new", parseCardSchema, validateCard, createCard);
export { cardRouter };
