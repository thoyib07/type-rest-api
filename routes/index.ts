import express, { Request, Response } from "express";
import { orderRouter } from "./orderRouter";
import { customerRouter } from "./customerRouter";

const app = express.Router();

app.use('/customers',customerRouter);
app.use('/orders',orderRouter);

export default app;