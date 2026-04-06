import config from "../../config.json";
import mysql from "mysql2/promise";
import { Sequelize } from "sequelize";
import { User } from "../models/user.model";
import { Request } from "../models/request.model";
import { RequestItem } from "../models/request-Item.model";
import { Departments } from "../models/department.model";
import { Employee } from "../models/employee.model";

export interface Database {
  User: typeof User;
  Request: typeof Request;
  RequestItem: typeof RequestItem;
  Departments: typeof Departments;
  Employee: typeof Employee;
}

export const db: Database = {} as Database;

export async function initialize(): Promise<void> {
  const { host, port, user, password, database } = config.database;

  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
  await connection.end();

  const sequelize = new Sequelize(database, user, password, {
    dialect: "mysql",
  });

  // ✅ Step 1: Initialize all models first
  const { default: userModel } = await import("../models/user.model");
  db.User = userModel(sequelize);

  const { default: requestModel } = await import("../models/request.model");
  db.Request = requestModel(sequelize);

  const { default: requestItemModel } =
    await import("../models/request-Item.model");
  db.RequestItem = requestItemModel(sequelize);

  const { default: departmentModel } =
    await import("../models/department.model");
  db.Departments = departmentModel(sequelize);

  const { default: employeeModel } =
    await import("../models/employee.model");
  db.Employee = employeeModel(sequelize);

  // ✅ Step 2: Run all associations AFTER all models are loaded
  Object.values(db).forEach((model: any) => {
    if (typeof model.associate === "function") {
      model.associate(db);
    }
  });

  await sequelize.sync();
  console.log("Database initialized and models synced");
}
