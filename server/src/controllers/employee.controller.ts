import type { Request, Response, NextFunction } from "express";
import {Router} from "express";
import Joi from "joi";
import {validateRequest} from "../_middleware/validateRequest";
import {authorizeRole, authenticateToken} from "../_middleware/auth.middleware";
import {Role} from "../_helpers/role";
import {employeeService} from "../services/employee.service";


const router = Router();
router.get('/', authenticateToken, authorizeRole(Role.Admin), getAll);
router.get('/getById/:id', authenticateToken, authorizeRole(Role.Admin), getById);
router.post('/create', authenticateToken, authorizeRole(Role.Admin), createSchema, create);
router.put('/edit/:id', authenticateToken, authorizeRole(Role.Admin), updateSchema, update);
router.delete('/delete/:id', authenticateToken, authorizeRole(Role.Admin), deleteEmployee); 

function getAll(req: Request, res: Response, next: NextFunction): void {
    employeeService.getAll()
        .then((employees) => res.status(200).json({message: "Employees retrieved successfully", data: employees}))
        .catch(next);
}

function getById(req: Request, res: Response, next: NextFunction): void {
    const id = Number(req.params.id);
    employeeService.getById(id)
        .then((employee) => res.status(200).json({message: "Employee retrieved successfully", data: employee}))
        .catch(next);
}

function create(req: Request, res: Response, next:NextFunction): void {
    employeeService.create(req.body)
        .then(() => res.status(201).json({message: "Employee created successfully"}))
        .catch(next);
}   

function update(req: Request, res: Response, next: NextFunction): void {
    const id = Number(req.params.id);
    employeeService.update(id, req.body)
        .then(() => res.json({message: "Employee updated successfully"}))
        .catch(next);
}

function deleteEmployee(req: Request, res: Response, next: NextFunction): void {
    const id = Number(req.params.id);
    employeeService.deleteEmployee(id)
        .then(() => res.json({message: "Employee deleted successfully"}))
        .catch(next);
}

function createSchema(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object({
        position: Joi.string().required(),
        email: Joi.string().email().required(),
        deptId: Joi.number().integer().required(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object({
        position: Joi.string(),
        email: Joi.string().email(),
        deptId: Joi.number().integer(),
    });
    validateRequest(req, next, schema);
}


export default router;