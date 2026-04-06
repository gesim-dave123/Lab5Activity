import { db } from "../_helpers/db";
import { Request, Response, NextFunction } from "express";
import { Employee, EmployeeCreationAttributes } from "../models/employee.model";
import { AppError } from "../_helpers/AppError";

export const employeeService = {
  getAll,
  getById,
  create,
  update,
  deleteEmployee: _delete,
};

async function getAll(): Promise<Employee[]> {
  const employees = await db.Employee.findAll({
    include: [
      {
        model: db.Departments,
        as: "department",
        attributes: ["deptId", "deptName"],
        required: false,
      },
    ],
  });

  return employees;
}
async function getById(id: number): Promise<Employee> {
  const employee = await db.Employee.findByPk(id);
  if (!employee) {
    throw new AppError("Employee not found", 404);
  }
  return employee;
}

async function create(params: EmployeeCreationAttributes): Promise<void> {
  const existingEmployee = await db.Employee.findOne({
    where: { email: params.email },
  });
  if (existingEmployee) {
    throw new AppError(`Email "${params.email}" is already taken`, 400);
  }
  await db.Employee.create(params);
}

async function update(
  id: number,
  params: Partial<EmployeeCreationAttributes>,
): Promise<void> {
  const employee = await getById(id);
  if (params.email && params.email !== employee.email) {
    const emailTaken = await db.Employee.findOne({
      where: { email: params.email },
    });
    if (emailTaken) {
      throw new AppError(`Email "${params.email}" is already taken`, 400);
    }
  }
  await employee.update(params);
}

async function _delete(id: number): Promise<void> {
  const employee = await getById(id);
  await employee.destroy();
}
