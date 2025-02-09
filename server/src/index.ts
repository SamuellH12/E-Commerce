import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import supabase from "./db";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/products", async (req: express.Request, res: express.Response) => {
  const { data, error } = await supabase.from("products").select("*");

  if (error) res.json(error);

  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
