import { Request, Response } from "express";
import supabase from "../../supabase/supabase";

export async function getAllCart(req: Request, res: Response) {
    const { data, error } = await supabase
      .from('shopping-cart')
      .select(`
        products(id, name, price, image_url, stock_quantity, is_active),
        amount
      `)

    if (error) {
      res.status(400).json(error);
    }
    else {
    res.json(data);
    }
}

export async function getCartProduct(req: Request, res: Response) {
    const id: string = req.params.productId;
    const { data, error } = await supabase
      .from("shopping-cart")
      .select(`
        product(id, name, description, price, image_url, stock_quantity, is_active),
        amount
      `)
      .eq("id",id); 

    if (error) {
      res.status(400).json(error);
    }
    else {
    res.json(data);
    }
}

export async function addToCart(req: Request, res: Response) {
    const product_id: string = req.body.product_id;

    const { error, data } = await supabase
        .from("shopping-cart")
        .insert(req.body)
        .select(`
          products(name)
        `)
        .single();
    
    if (error) {
        res.status(400).json(error);
    }
    else {
    res.send("Product "+ data.products.name +" successfully added to cart");
    }
};
  

export async function deleteFromCart(req: Request, res: Response) {
    const id: string = req.params.productId;
    
    const { data, error } = await supabase
        .from('shopping-cart')
        .delete()
        .eq('id', id)
        .select(`
          products(name)
        `)
        .single();
    
    if (error) {
      res.status(500).json(error)
    }
    else { 
      res.send("Product "+ data.products.name +" removed from shopping cart successfully");
    }
}
  
export async function emptyShoppingCart(req: Request, res: Response) {    
    const { error } = await supabase
        .from('shopping-cart')
        .delete()
        .neq("amount",-1)
    
    if (error) {
      res.status(500).json(error)
    }
    else {
      res.send("Shopping cart emptied successfully");

    }
}

export async function updateCartProduct(req: Request, res: Response) {
    const id: string = req.body.id;

    const { data, error } = await supabase
      .from("shopping-cart")
      .update(req.body)
      .eq("id", id)
      .select(`
        products(name)
      `)
      .single();

    if (error) {
      res.status(400).json(error);
    }
    else {
      res.send("Product "+ data.products.name +" updated successfully");

    }
}
