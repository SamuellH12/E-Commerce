import { Router } from "express";
import {
    getAllDepartments, 
    getDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    getProductsFromDepartment,
} from "../controllers/categories/department-controllers"

const departmentRouter = Router();

departmentRouter.get("/", getAllDepartments); //get all departaments
departmentRouter.post("/", createDepartment); //create a new departament 

departmentRouter.put("/:departmentId", updateDepartment) //update a department
departmentRouter.delete("/:departmentId", deleteDepartment); //delete a department
departmentRouter.get("/:departmentId", getDepartment); //get department data
departmentRouter.get("/:departmentId/all", getProductsFromDepartment); //get department data


export { departmentRouter };