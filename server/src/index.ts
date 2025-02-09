import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { productRouter } from "./routes/product-routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/products", cors(), productRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
