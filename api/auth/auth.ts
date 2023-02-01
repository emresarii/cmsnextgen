import passport from "passport";
const localStrategy = require("passport-local").Strategy;
import { NextFunction, Request, Response, Router } from "express";
import prisma from "../lib/prisma";
import { hash, verify } from "argon2";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

async function signup(req: Request, res: Response, next: NextFunction) {
  const userModel: User = req.body;
  const isUserExist = await prisma.user.findFirst({
    where: { OR: { email: userModel.email } },
  });
  if (isUserExist) {
    return res.status(400).send({ message: "User already exists" });
  } else {
    const hashedPass = await hash(req.body.password, {
      salt: Buffer.from("123123123"),
    });
    const result = await prisma.user.create({
      data: {
        password: hashedPass.toString(),
        email: userModel.email,
        name: userModel.name,
      },
    });
    return res.status(201).send({ message: "Account created" });
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, "your_jwt_secret", {expiresIn:"30m"});
      return res.json({ email: user.email, token });
    });
  })(req, res);
}

const router = Router();
router.post("/signup", signup);
router.post("/login", login);

export default router;
