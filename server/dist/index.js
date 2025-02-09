"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const card_routes_1 = require("./routes/card-routes");
const product_routes_1 = require("./routes/product-routes");
const order_history_routes_1 = require("./routes/order-history-routes");
const productOrderHistory_router_1 = require("./routes/productOrderHistory-router");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/products", (0, cors_1.default)(), product_routes_1.productRouter);
app.use("/cards", (0, cors_1.default)(), card_routes_1.cardRouter);
app.use("/order-history", order_history_routes_1.orderHistoryRouter);
app.use("/product-order-history", productOrderHistory_router_1.productOrderHistoryRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
