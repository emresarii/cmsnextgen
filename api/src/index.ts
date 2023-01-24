import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import prisma from "../lib/prisma";
import { User } from "@prisma/client";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import authRouter from "../auth/auth";

import "../auth/passport";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());
app.use(helmet());

passport.serializeUser((user, done) => {
  console.log(user);
  return done(null, user);
});

passport.deserializeUser((id: string, done) => {
  console.log(id);

  return done(null, prisma.user.findFirst({ where: { email: id } }));
});

app.use("/", authRouter);
app.use('/user', passport.authenticate('jwt', { session: false }), (req,res) => {res.send("Not expired")});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
