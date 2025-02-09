import { Request, Response } from "express";
import supabase from "../../supabase/supabase";

export async function getAllProducts(req: Request, res: Response) {
  const { data, error } = await supabase.from("products").select("*");

  if (error) res.status(500).json(error);

  res.json(data);
}
