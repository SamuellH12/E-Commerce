import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { cardRouter } from "./routes/card-routes";
import { productRouter } from "./routes/product-routes";
import { orderHistoryRouter } from "./routes/order-history-routes";
import { productOrderHistoryRouter } from "./routes/product-order-history-routes";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/products", cors(), productRouter);
app.use("/cards", cors(), cardRouter);
app.use("/order-history", orderHistoryRouter);
app.use("/product-order-history", productOrderHistoryRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
