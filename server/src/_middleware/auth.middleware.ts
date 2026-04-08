import jwt from "jsonwebtoken";
import "dotenv/config";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  role: string;
  [key: string]: unknown;
}

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Access token required" });
    return;
  }

  jwt.verify(token, process.env.SECRET_KEY as string, (err, decoded) => {
    if (err) {
      res.status(403).json({ error: "Invalid or expired token" });
      return;
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export const authorizeRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (req.user?.role !== role) {
      res.status(403).json({ error: "Access denied: insufficient permission" });
      return;
    }
    next();
  };
};

export const authorizeSelfOrAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const requesterId = Number(req.user?.sub);
  const targetId = Number(req.params.id);
  const isAdmin = req.user?.role === "Admin";

  if (!Number.isFinite(requesterId) || !Number.isFinite(targetId)) {
    res.status(400).json({ error: "Invalid user id" });
    return;
  }

  if (!isAdmin && requesterId !== targetId) {
    res.status(403).json({ error: "Access denied" });
    return;
  }

  next();
};
