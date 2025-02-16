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
  if (isNaN(+req.params.couponID)) {
    const {error} = await supabase
    .from('coupons')
    .delete()
    .eq('codename', req.params.couponID)
    if (error) res.status(500).json(error);
    else res.json("DELETED NAME " + req.params.couponID);
  } else {
    const { error } = await supabase
    .from('coupons')
    .delete()
    .eq('id', +req.params.couponID)
    if (error) res.status(500).json(error);
    else res.json("DELETED ID " + req.params.couponID);
  }
}

export async function readAllCoupons(req: Request, res: Response) {  
  
  let { data, error } = await supabase
  .from('coupons')
  .select('*')
  
  if (error) res.status(500).json(error);
  else res.json(data);
}

export async function updateCoupons(req: Request, res: Response) {
  const { data: dd, error: ee } = await supabase
  .from('coupons')
  .select('codename')
  .eq('codename', req.body.name)

  if (!dd || dd.length === 0) {
    res.status(404).json({ error: "Coupon not found" });
    return;
  }
  if (ee) res.status(500).json(ee);

  const { data, error } = await supabase
  .from('coupons')
  .update({ percentage: req.body.percentage, expiration_date: req.body.expiration_date || null })
  .eq('codename', req.body.name)
  .select()

  if (error) res.status(500).json(error);
  else res.json(data);
}
