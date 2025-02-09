import { Router } from "express";
import {
  createCard,
  getAllCards,
  parseCard,
} from "../controllers/card/card-controllers";

const cardRouter = Router();

// Define routes

cardRouter.get("/", getAllCards);
cardRouter.post("/new", parseCard, createCard);
export { cardRouter };
