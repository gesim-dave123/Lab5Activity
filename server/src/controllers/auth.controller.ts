import type { Request, Response, NextFunction } from "express";
import { Router } from "express";
import Joi from "joi";
import { Role } from "../_helpers/role";
import { validateRequest } from "../_middleware/validateRequest";
import { authService } from "../services/auth.service";

const router = Router();

router.post("/register", registerSchema, registerUser);
router.post("/login", loginSchema, login);
router.post("/verifyEmail", verifyEmailSchema, verifyEmail);


export default router;

function registerUser(req: Request, res: Response, next: NextFunction): void {
    authService.registerUser(req.body)
        .then(() => res.status(201).json({ message: "User registered successfully" }))
        .catch(next);
}

function login(req: Request, res: Response, next: NextFunction): void {
    authService.login(req.body)
        .then((authResponse) => res.json(authResponse))
        .catch(next);
}

function verifyEmail(req: Request, res: Response, next: NextFunction): void {
    authService.verifyEmail(req.body)
        .then(() => res.status(200).json({ message: "Email verified successfully" }))
        .catch(next);
}

function verifyEmailSchema(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });
    validateRequest(req, next, schema);
}

function loginSchema(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
    validateRequest(req, next, schema);
}

function registerSchema(req: Request, res: Response, next: NextFunction): void {
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