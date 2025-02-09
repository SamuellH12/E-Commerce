"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardRouter = void 0;
const express_1 = require("express");
const card_controllers_1 = require("../controllers/card/card-controllers");
const card_utils_1 = require("../controllers/card/utils/card-utils");
const cardRouter = (0, express_1.Router)();
exports.cardRouter = cardRouter;
// Define routes
cardRouter.get("/", card_controllers_1.getAllCards);
cardRouter.post("/new", card_utils_1.parseCardSchema, card_utils_1.validateCard, card_controllers_1.createCard);
