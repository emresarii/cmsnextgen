import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import prisma from '../lib/prisma';
import { User } from '@prisma/client';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import authRouter from '../auth/auth';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());
app.use(helmet());

app.use("/",authRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});