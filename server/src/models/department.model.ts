import {DataTypes, Model, Optional} from "sequelize";
import type {Sequelize} from "sequelize";

export interface DepartmentsAttributes {
    deptId: number;
    deptName: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface DepartmentsCreationAttributes extends Optional<DepartmentsAttributes, "deptId" | "createdAt" | "updatedAt"> {}

export class Departments extends Model<DepartmentsAttributes, DepartmentsCreationAttributes> implements DepartmentsAttributes {
    public deptId!: number;
    public deptName!: string;
    public description!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // static associate(db: any){
    //     Departments.hasMany(db.User, {
    //         foreignKey: "deptId",
    //         as: "users",
    //     })
    // }
}

export default function (sequelize: Sequelize): typeof Departments {
    Departments.init(
        {
            deptId: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,

            },
            deptName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: "Departments",
            tableName: "departments",
            timestamps: true,
            underscored: true,
        }
    );
    return Departments;
}