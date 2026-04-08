

import { DataTypes, Model, Optional } from "sequelize";
import type { Sequelize } from "sequelize";

export enum RequestStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

export enum RequestType {
  Equipment = "Equipment",
  Tool = "Tool",
  Leave = "Leave",
}

export interface RequestAttributes {
  requestId: number;
  type: RequestType;
  status: RequestStatus;
  employeeEmail: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RequestCreationAttributes extends Optional<
  RequestAttributes,
  "requestId" | "createdAt" | "updatedAt"
> {}

export class Request
  extends Model<RequestAttributes, RequestCreationAttributes>
  implements RequestAttributes
{
  public requestId!: number;
  public type!: RequestType;
  public status!: RequestStatus;
  public employeeEmail!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // ✅ Association declared inside the class
  static associate(db: any) {
    Request.hasMany(db.RequestItem, {
      foreignKey: "requestId",
      as: "items",
    });

    Request.belongsTo(db.User, {
      foreignKey: "employeeEmail",
      targetKey: "email",
      as: "employee",
    });
  }
}

export default function (sequelize: Sequelize): typeof Request {
  Request.init(
    {
      requestId: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: DataTypes.ENUM(...Object.values(RequestType)),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(...Object.values(RequestStatus)),
        allowNull: false,
        defaultValue: RequestStatus.Pending,
      },
      employeeEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Request",
      tableName: "requests",
      timestamps: true,
      underscored: true,
    },
  );

  return Request;
}
