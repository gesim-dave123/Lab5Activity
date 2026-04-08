
import { DataTypes, Model, Optional } from "sequelize";
import type { Sequelize } from "sequelize";

export interface RequestItemAttributes {
  itemId: number;
  itemName: string;
  quantity: number;
  requestId: number;
}

export interface RequestItemCreationAttributes extends Optional<
  RequestItemAttributes,
  "itemId"
> {}

export class RequestItem
  extends Model<RequestItemAttributes, RequestItemCreationAttributes>
  implements RequestItemAttributes
{
  public itemId!: number;
  public itemName!: string;
  public quantity!: number;
  public requestId!: number;

  static associate(db: any) {
    RequestItem.belongsTo(db.Request, {
      foreignKey: "requestId",
      as: "request",
      onDelete: "CASCADE",
    });
  }
}

export default function (sequelize: Sequelize): typeof RequestItem {
  RequestItem.init(
    {
      itemId: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      itemName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      requestId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "requests",
          key: "request_id",
        },
      },
    },
    {
      sequelize,
      modelName: "RequestItem",
      tableName: "request_items",
      timestamps: true,
      underscored: true,
    },
  );

  return RequestItem;
}
