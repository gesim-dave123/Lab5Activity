import { db } from "../_helpers/db";
import { DataTypes, Model, Optional } from "sequelize";
import type { Sequelize } from "sequelize";

export interface UserAttributes {
  // this one mimics the databas structure of the user table
  id: number;
  email: string;
  passwordHash: string;
  title: string;
  firstName: string;
  lastName: string;
  username: string;
  verified: boolean;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes extends Optional<
  UserAttributes,
  "id" | "createdAt" | "updatedAt"
> {} // this one is
// this one is optional because these fields are automatically generated in teh database

export class User // this one is for the actual model that we will use in our application
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public passwordHash!: string;
  public title!: string;
  public firstName!: string;
  public lastName!: string;
  public username!: string;
  public verified!: boolean;
  public role!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;


  static associate(db:any){
    User.hasMany(db.Request, {
      foreignKey: "employeeEmail",
      sourceKey: "email",
    });

    // User.belongsTo(db.Departments,{
    //     foreignKey: "deptId",
    //     targetKey: "deptId",
    //     as: "department"
    // })
  }
}

export default function (sequelize: Sequelize): typeof User {
  User.init(
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
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
      modelName: "User",
      tableName: "users",
      defaultScope: {
        attributes: { exclude: ["passwordHash"] },
      },
      scopes: {
        withHash: {
          attributes: { include: ["passwordHash"] },
        },
      },
    },
  );

  return User;
}
