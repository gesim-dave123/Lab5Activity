import type { Request, Response, NextFunction } from "express";
import { Router } from "express";
import Joi from "joi";
import { Role } from "../_helpers/role";
import { validateRequest } from "../_middleware/validateRequest";
import { userService } from "../services/user.service";
import {
  authorizeRole,
  authenticateToken,
  authorizeSelfOrAdmin,
} from "../_middleware/auth.middleware";

const router = Router();

router.get("/", authenticateToken, authorizeRole(Role.Admin), getAll);
router.get("/profile/:id", authenticateToken, authorizeSelfOrAdmin, getById);
router.post(
  "/addAccount",
  authenticateToken,
  authorizeRole(Role.Admin),
  createSchema,
  create,
);
router.put(
  "/profile/:id",
  authenticateToken,
  authorizeSelfOrAdmin,
  updateSchema,
  update,
);
router.delete("/profile/:id", authenticateToken, authorizeSelfOrAdmin, _delete);

export default router;

function getAll(req: Request, res: Response, next: NextFunction): void {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch(next);
}

function getById(req: Request, res: Response, next: NextFunction): void {
  userService
    .getById(Number(req.params.id))
    .then((user) => res.json(user))
    .catch(next);
}

function create(req: Request, res: Response, next: NextFunction): void {
  userService
    .create(req.body)
    .then(() => res.json({ message: "User created successfully" }))
    .catch(next);
}

function update(req: Request, res: Response, next: NextFunction): void {
  userService
    .update(Number(req.params.id), req.body)
    .then(() => res.json({ message: "User updated successfully" }))
    .catch(next);
}

function _delete(req: Request, res: Response, next: NextFunction): void {
  userService
    .delete(Number(req.params.id))
    .then(() => res.json({ message: "User deleted successfully" }))
    .catch(next);
}

function createSchema(req: Request, res: Response, next: NextFunction): void {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    title: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    role: Joi.string().valid(Role.Admin, Role.User).required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  });
  validateRequest(req, next, schema);
}

function updateSchema(req: Request, res: Response, next: NextFunction): void {
  const schema = Joi.object({
    title: Joi.string().empty(""),
    email: Joi.string().email().empty(""),
    firstName: Joi.string().empty(""),
    lastName: Joi.string().empty(""),
    username: Joi.string().empty(""),
    role: Joi.string().valid(Role.Admin, Role.User).empty(""),
    password: Joi.string().min(6).empty(""),
    confirmPassword: Joi.string().valid(Joi.ref("password")).empty(""),
  }).with("password", "confirmPassword");
  validateRequest(req, next, schema);
}
