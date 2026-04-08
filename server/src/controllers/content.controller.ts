import type { Request, Response, NextFunction } from "express";
import { Router } from "express";

const router = Router();

// Public guest content endpoint
router.get("/guest", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ message: "Welcome guest, this content is public." });
  } catch (err) {
    next(err);
  }
});

export default router;
