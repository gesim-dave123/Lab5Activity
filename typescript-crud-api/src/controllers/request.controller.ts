import type { Request, Response, NextFunction } from "express";
import { Router } from "express";
import Joi from "joi";
import { validateRequest } from "../_middleware/validateRequest";
import { requestService } from "../services/request.service";
import {
  authorizeRole,
  authenticateToken,
} from "../_middleware/auth.middleware";
import { Role } from "../_helpers/role";
import { db } from "../_helpers/db";
import { AppError } from "../_helpers/AppError";

const router = Router();

router.post("/", authenticateToken, createSchema, create);
router.get("/getAll", authenticateToken, getAll);
router.patch(
  "/updateStatus/:id",
  authenticateToken,
  authorizeRole(Role.Admin),
  updateStatusSchema,
  updateStatus,
);

function getAll(req: Request, res: Response, next: NextFunction): void {
  const role = req.user?.role;
  const requesterId = Number(req.user?.sub);

  if (role === Role.Admin) {
    requestService
      .getAll()
      .then((requests) =>
        res
          .status(200)
          .json({ message: "Requests retrieved successfully", data: requests }),
      )
      .catch(next);
    return;
  }

  db.User.findByPk(requesterId)
    .then((user) => {
      if (!user) {
        throw new AppError("User not found", 404);
      }
      return requestService.getAll(user.email);
    })
    .then((requests) =>
      res
        .status(200)
        .json({ message: "Requests retrieved successfully", data: requests }),
    )
    .catch(next);
}

function create(req: Request, res: Response, next: NextFunction): void {
  const requesterId = Number(req.user?.sub);

  db.User.findByPk(requesterId)
    .then((user) => {
      if (!user) {
        throw new AppError("User not found", 404);
      }
      return requestService.create({
        type: req.body.type,
        items: req.body.items,
        employeeEmail: user.email,
      });
    })
    .then(() =>
      res.status(201).json({ message: "Request created successfully" }),
    )
    .catch(next);
}

function updateStatus(req: Request, res: Response, next: NextFunction): void {
  const id = Number(req.params.id);
  const { status } = req.body;
  requestService
    .updateStatus(id, status)
    .then(() =>
      res.status(200).json({ message: "Request status updated successfully" }),
    )
    .catch(next);
}

function updateStatusSchema(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const schema = Joi.object({
    status: Joi.string().valid("Approved", "Rejected").required(),
  });
  validateRequest(req, next, schema);
}

function createSchema(req: Request, res: Response, next: NextFunction): void {
  const schema = Joi.object({
    type: Joi.string().valid("Equipment", "Tool", "Leave").required(),
    items: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().trim().required(),
          qty: Joi.number().integer().min(1).required(),
        }),
      )
      .min(1)
      .required(),
  });
  validateRequest(req, next, schema);
}

export default router;
