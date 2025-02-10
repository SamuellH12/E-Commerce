import { Request, Response } from "express";

import supabase from "../../supabase/supabase";


export const getOrderHistory = async (req: Request, res: Response) => {
  try {

    
    const { data, error } = await supabase
     .from("order-history")
     .select("*");
     
     if(error) throw error;
     
     res.json(data)
    
  } catch (error) {
    console.error("Erro inesperado:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};