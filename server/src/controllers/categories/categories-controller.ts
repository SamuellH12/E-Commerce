import { Request, Response } from "express";
import supabase from "../../supabase/supabase";


export async function getAllCategories(req: Request, res: Response) {
    const { data, error } = await supabase.from("categories").select("*");
  
    if (error) res.status(400).json(error);
    else res.json(data);
}


export async function createCategory(req: Request, res: Response) {
    const { error, data } = await supabase
      .from("categories")
      .insert(req.body)
      .select();
    
    if(error) res.status(500).json(error);
    else res.json(data[0]);
}


export async function updateCategory(req: Request, res: Response) {
    let dataToUpdate = <any>{};

    if(req.body.name) 
            dataToUpdate["name"] = req.body.name;
    if(req.body.department_id) 
            dataToUpdate["department_id"] = req.body.department_id;

    if(Object.keys(dataToUpdate).length === 0){
        res.status(500).json("No name or department_id found");
        return;
    }

    const { data, error } = await supabase
        .from('categories')
        .update(dataToUpdate)
        .eq('id', +req.params.categoryId)
        .select()
    
    if(error) res.status(500).json(error);
    else res.json(data[0]);
}


export async function deleteCategory(req: Request, res: Response) {    
    const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', +req.params.categoryId)
    
    if(error) res.status(500).json(error);
    else res.json("Category with ID " + req.params.categoryId + " deleted");
}


export async function getCategory(req: Request, res: Response) {
    const { data, error } = await supabase
        .from('categories')
        .select("*")
        .eq('id', +req.params.categoryId);
    
    if(error) res.status(500).json(error);
    else if(data.length === 0) res.status(404).json("not found");
    else res.json(data[0]);
}


export async function getProductsFromCategory(req: Request, res: Response) {
    const { data, error } = await supabase
        .from('products')
        .select("*")
        .eq('category_id', +req.params.categoryId);
    
    if(error) res.status(500).json(error);
    else res.json(data);
}