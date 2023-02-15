import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import prisma from "../lib/prisma";
import { User } from "@prisma/client";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import authRouter from "../auth/auth";
import cookieParser from 'cookie-parser'

import "../auth/passport";
import userRouter from "../endpoints/user";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(cookieParser())
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }))
app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(helmet());

passport.serializeUser((user, done) => {
  console.log(user);
  return done(null, user);
});

passport.deserializeUser((id: string, done) => {
  console.log("------------", id);

  return done(null, prisma.user.findFirst({ where: { email: id } }));
});

app.use("/", authRouter);

app.use(
  "/users",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const user = req.user as User;

    if (!user.admin) {
      res.json("Aasdf");
    }
    next();
  },
  async (req, res) => {
    const users = await prisma.user.findMany({
      select: { email: true, id: true, name: true, admin: true },
    });

    res.send({ users });
  }
);

app.use(
  "/session",
  passport.authenticate("jwt", { session: false }),
  userRouter
);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
