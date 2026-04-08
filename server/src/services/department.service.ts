import {db} from "../_helpers/db";
import {Request, RequestCreationAttributes} from "../models/request.model";
import {Departments, } from "../models/department.model";
import {AppError} from "../_helpers/AppError";
import JOI from "joi";


export const departmentService = {
    getAll,
    create,
    editDepartment,
    deleteDepartment,
};

async function getAll(): Promise<Departments[]> {
    const departments = await db.Departments.findAll();
    if (!departments.length) {
        throw new AppError("No departments found", 404);
    }
    return departments;
}

async function create(params: { deptName: string, description: string }): Promise<void> {
    const existingDepartment = await db.Departments.findOne({where: {deptName: params.deptName}});
    if (existingDepartment) {
        throw new AppError("Department already exists", 400);
    }
    await db.Departments.create(params);
}

async function editDepartment(id: number, params: { deptName?: string, description?: string }): Promise<void> {
    const department = await db.Departments.findByPk(id);
    if (!department) {
        throw new AppError("Department not found", 404);
    }
    if (params.deptName !== department.deptName) {
        const existingDepartment = await db.Departments.findOne({where: {deptName: params.deptName}});
        if (existingDepartment) {
            throw new AppError("Department name already exists", 400);
        }
    }
    await department.update(params);
}

async function deleteDepartment(id: number): Promise<void> {
    const department = await db.Departments.findByPk(id);
    if (!department) {
        throw new AppError("Department not found", 404);
    }
    await department.destroy();
}