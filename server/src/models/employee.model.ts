import { DataTypes, Model, Optional } from "sequelize";
import type { Sequelize } from "sequelize";

export interface EmployeeAttributes {
  id: number;
  email: string;
  position: string;
  deptId: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface EmployeeCreationAttributes extends Optional<
  EmployeeAttributes,
  "id" | "updatedAt" | "createdAt"
> {}

export class Employee
  extends Model<EmployeeAttributes, EmployeeCreationAttributes>
  implements EmployeeAttributes
{
  public id!: number;
  public deptId!: number;
  public email!: string;
  public position!: string;
  public createdAt!: Date;
  public updatedAt?: Date;

  static associate(db: any) {
    Employee.belongsTo(db.Departments, {
      foreignKey: "deptId",
      targetKey: "deptId",
      as: "department",
    });

    Employee.belongsTo(db.User, {
      foreignKey: "email",
      as: "user",
      onDelete: "CASCADE",
    });
  }
}

export default function (sequilize: Sequelize): typeof Employee {
  Employee.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        references: {
          model: "users",
          key: "email",
        },
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deptId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "departments",
          key: "deptId",
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize: sequilize,
      tableName: "employees",
      modelName: "Employee",
      underscored: true,
      timestamps: true,
    },
  );
  return Employee;
}
