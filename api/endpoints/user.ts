import { NextFunction, Request, Response, Router } from "express";
import prisma from "../lib/prisma";
import { User } from "@prisma/client";

async function updateUser(req: Request, res: Response, next: NextFunction) {
  const userModel: User = req.body;

  if (userModel.id) {
    const user = await prisma.user.update({
      where: { id: userModel.id },
      data: {
        email: userModel.email,
        admin: userModel.admin,
      },
    });

    return res.status(200).json({ message: "Updated" });
  } else {
    return res.status(401).json({ message: "Not found" });
  }
}

async function getUser(req: Request, res: Response, next: NextFunction) {
  const { email, admin } = req.user as User;

  res.send({ email, admin });
}

const router = Router();
router.post("/", updateUser);
router.get("/", getUser);
export default router;
