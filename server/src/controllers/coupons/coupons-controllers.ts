import { Request, Response } from "express";
import supabase from "../../supabase/supabase";

export async function addCoupon(req: Request, res: Response) {  
  const { data, error } = await supabase.from('coupons')
  .insert([
    { codename: req.body.name, percentage: req.body.percentage, expiration_date: req.body.expiration_date || null },
  ]).select()
  
  if (error) res.status(500).json(error);
  else res.status(201).json(data);
}

export async function deleteCoupon(req: Request, res: Response) {    
  const { error } = await supabase
  .from('coupons')
  .delete()
  .eq('id', +req.params.couponID)
  
  if (error) res.status(500).json(error);
  else res.json("DELETED ID " + req.params.couponID);
}

export async function readAllCoupons(req: Request, res: Response) {  
  
  let { data, error } = await supabase
  .from('coupons')
  .select('*')
  
  if (error) res.status(500).json(error);
  else res.json(data);
}
