import type { Request, Response, NextFunction } from "express";
import { Router } from "express";
import {
  authenticateToken,
  authorizeRole,
} from "../_middleware/auth.middleware";
import { Role } from "../_helpers/role";
import { dashboardService } from "../services/dashboard.service";

const router = Router();

router.get("/", authenticateToken, authorizeRole(Role.Admin), getStats);

function getStats(req: Request, res: Response, next: NextFunction): void {
  dashboardService
    .getStats()
    .then((stats) => res.status(200).json(stats))
    .catch(next);
}

export default router;
