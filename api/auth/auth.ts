const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
import { NextFunction, Request, Response, Router } from "express";
import prisma from "../lib/prisma";
import { hash, verify } from "argon2";
import { User } from "@prisma/client";


async function signup(req: Request, res: Response, next: NextFunction) {
  const userModel: User = req.body;
  const isUserExist = await prisma.user.findFirst({
    where: { OR: { email: userModel.email } },
  });
  if (isUserExist) {
    return res.status(400).send({ message: "User already exists" });
  } else {
    const hashedPass = await hash(req.body.password);
    const result = await prisma.user.create({
      data: {
        password: hashedPass,
        email: userModel.email,
        name: userModel.name,
      },
    });
    return res.status(201).send({ message: "Account created" });
  }
}

async function signin(req: Request, res: Response, next: NextFunction) {
    const userModel: User = req.body;
    const user = await prisma.user.findFirst({
        where: { OR: { email: userModel.email } },
      });

      if(user !== null){
        const isValidPassword= await verify(user.password, userModel.password)
        if(!isValidPassword){
            return res.status(401).send("Unauthorized")
        }
        else{
            return res.status(201).send("Authorized")
        }
      } 

}

const router = Router();
router.post("/signup", signup);

export default router;