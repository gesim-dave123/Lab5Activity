import type {Request, Response, NextFunction} from "express";
import {Router} from "express"
import Joi from "joi";
import {validateRequest} from "../_middleware/validateRequest";
import {authorizeRole, authenticateToken} from "../_middleware/auth.middleware";
import {Role} from "../_helpers/role";
import {departmentService} from "../services/department.service";

const router = Router();

router.get("/", authenticateToken, authorizeRole(Role.Admin), getAll);
router.post("/create", authenticateToken, authorizeRole(Role.Admin), createSchema, create);
router.put("/edit/:id", authenticateToken, authorizeRole(Role.Admin), createSchema, editDepartment);
router.delete("/delete/:id", authenticateToken, authorizeRole(Role.Admin), deleteDepartment);

function getAll(req: Request, res: Response, next: NextFunction): void{
    departmentService.getAll()
        .then((departments) => res.json(departments))
        .catch(next);
}
function create(req: Request, res: Response, next:NextFunction): void {
    departmentService.create(req.body)
        .then(() => res.status(201).json({message: "Department created successfully"}))
        .catch(next);
}

function editDepartment(req: Request, res: Response, next: NextFunction): void {
    const id = Number(req.params.id);
    departmentService.editDepartment(id, req.body)
        .then(() => res.json({message: "Department updated successfully"}))
        .catch(next);
}

function deleteDepartment(req: Request, res: Response, next: NextFunction): void {
    const id = Number(req.params.id);
    departmentService.deleteDepartment(id)
        .then(() => res.json({message: "Department deleted successfully"}))
        .catch(next);
}

function createSchema(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object({
        deptName: Joi.string().required(),
        description: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}   

export default router;