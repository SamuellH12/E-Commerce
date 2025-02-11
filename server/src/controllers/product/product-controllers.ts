import { Request, Response } from "express";
import supabase from "../../supabase/supabase";

export async function getAllProducts(req: Request, res: Response) {
  const { data, error } = await supabase.from("products").select("*");

  if (error) res.status(500).json(error);

  res.json(data);
}

export async function updateProduct(req: Request, res: Response) {
  const id: string = req.body.id;

  if (!id) res.status(400).send("id is required!");

  const { error } = await supabase
    .from("products")
    .update(req.body)
    .eq("id", id);

  if (error) res.status(400).json(error);

  res.send("Product updated successfully");
}

export async function createProduct(req: Request, res: Response) {
  const { error } = await supabase.from("products").insert(req.body);

  if (error) res.status(400).json(error);

  res.send("Product created successfully");
}

export async function deleteProduct(req: Request, res: Response) {
  const id: string = req.body.id;

  if (!id) res.status(400).send("id is required!");

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("some_column", id);

  if (error) res.status(400).json(error);

  res.send("Product deleted successfully");
}

export async function getProduct(req: Request, res: Response) {
  const id: string = req.body.id;

  if (!id) res.status(400).send("id is required!");

  const { error, data } = await supabase.from("products").select().eq("id", id);

  if (error) res.status(400).json(error);

  res.json(data?.[0] ?? null);
}
