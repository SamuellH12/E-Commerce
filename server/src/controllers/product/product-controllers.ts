import { Request, Response } from "express";
import supabase from "../../supabase/supabase";

export async function getAllProducts(req: Request, res: Response) {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    res.status(400).json(error);
    return;
  }

  res.json(data);
}
export async function getProduct(req: Request, res: Response) {
  const id: string = req.params.productId;

  const { error, data } = await supabase.from("products").select().eq("id", id);

  if (error) {
    res.status(400).json(error);
    return;
  }

  res.json(data?.[0] ?? null);
}
export async function createProduct(req: Request, res: Response) {
  const { error } = await supabase.from("products").insert(req.body);

  if (error) {
    res.status(400).json(error);
    return;
  }

  res.send("Product created successfully");
}
export async function updateProduct(req: Request, res: Response) {
  const id: string = req.params.productId;

  const { error } = await supabase
    .from("products")
    .update(req.body)
    .eq("id", id);

  if (error) {
    res.status(400).json(error);
    return;
  }

  res.send("Product updated successfully");
}

export async function disableProduct(req: Request, res: Response) {
  const id: string = req.params.productId;

  const { error } = await supabase
    .from("products")
    .update({ is_active: false })
    .eq("id", id);

  if (error) {
    res.status(400).json(error);
    return;
  }

  res.send("Product disabled successfully");
}
