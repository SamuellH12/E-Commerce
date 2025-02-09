"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const product_controllers_1 = require("../controllers/product/product-controllers");
const productRouter = (0, express_1.Router)();
exports.productRouter = productRouter;
// Define routes
productRouter.get("/", product_controllers_1.getAllProducts);
