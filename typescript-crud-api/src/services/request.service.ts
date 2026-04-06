import { db } from "../_helpers/db";
import { Request, RequestStatus, RequestType } from "../models/request.model";
import { RequestItem } from "../models/request-Item.model";
import { AppError } from "../_helpers/AppError";

interface RequestItemInput {
  name: string;
  qty: number;
}

interface CreateRequestParams {
  type: RequestType;
  employeeEmail: string;
  items: RequestItemInput[];
}

export const requestService = {
  create,
  getAll,
  updateStatus,
};

async function create(params: CreateRequestParams): Promise<void> {
  const { type, employeeEmail, items } = params;
  if (!items.length) {
    throw new AppError("At least one request item is required", 400);
  }

  const sequelize = db.Request.sequelize;
  if (!sequelize) {
    throw new AppError("Database connection is not ready", 500);
  }

  await sequelize.transaction(async (transaction) => {
    const request = await db.Request.create(
      {
        type,
        status: RequestStatus.Pending,
        employeeEmail,
      },
      { transaction },
    );

    await db.RequestItem.bulkCreate(
      items.map((item) => ({
        requestId: request.requestId,
        itemName: item.name,
        quantity: item.qty,
      })),
      { transaction },
    );
  });
}
async function getAll(employeeEmail?: string): Promise<Request[]> {
  const queryOptions: any = {
    include: [
      {
        association: "items",
        model: db.RequestItem,
        required: false,
      },
    ],
    order: [["createdAt", "DESC"]],
    raw: false,
    subQuery: false,
  };

  if (employeeEmail) {
    queryOptions.where = { employeeEmail };
  }

  return db.Request.findAll(queryOptions);
}
async function updateStatus(id: number, status: RequestStatus): Promise<void> {
  const request = await db.Request.findByPk(id);
  if (!request) {
    throw new AppError("Request not found", 404);
  }
  await request.update({ status });
}
