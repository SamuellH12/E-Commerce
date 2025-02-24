import { Request, Response } from "express";
import supabase from "../../supabase/supabase";


export async function getAllDepartments(req: Request, res: Response) {
    const { data, error } = await supabase.from("departments").select("*");
  
    if (error) res.status(400).json(error);
    else res.json(data);
}

export async function getDepartment(req: Request, res: Response) {
    const { data, error } = await supabase
        .from("departments")
        .select("*")
        .eq("id", +req.params.departmentId);
  
    if(error) res.status(400).json(error);
    else if(data.length === 0) res.status(404).json("not found");
    else res.json(data[0]);
}


function validateDepartmentName(name : string) : boolean {
    if(!name) return false;
    const regex = /^[^!@#$%^&*]+$/;
    return regex.test(name);
}

export async function createDepartment(req: Request, res: Response) {
    if(validateDepartmentName(req.body.name) == false){
        res.status(400).json("invalid name");
        return;
    }

    const { error, data } = await supabase
      .from("departments")
      .insert(req.body)
      .select();
    
    if(error) res.status(500).json(error);
    else res.status(201).json(data[0]);
}


export async function updateDepartment(req: Request, res: Response) {
    if(validateDepartmentName(req.body.name) == false){
        res.status(400).json("invalid name");
        return;
    }

    const { data, error } = await supabase
        .from('departments')
        .update({ "name" : req.body.name })
        .eq('id', +req.params.departmentId)
        .select()
    
    if(error) res.status(500).json(error);
    else if(data.length === 0) res.status(404).json("not found");
    else res.status(201).json(data[0]);
}


export async function deleteDepartment(req: Request, res: Response) {    
    const { error } = await supabase
        .from('departments')
        .delete()
        .eq('id', +req.params.departmentId)
    
    if(error) res.status(500).json(error);
    else res.json("Department with ID " + req.params.departmentId + " deleted");
}