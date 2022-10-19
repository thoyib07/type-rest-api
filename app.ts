import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import { orderRouter } from "./routes/orderRouter";
import { customerRouter } from "./routes/customerRouter";
import api from "./routes";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use("/orders",orderRouter);
app.use("/customers",customerRouter);
app.use("/api",api);

app.listen(process.env.PORT, () => {
    console.log("Node server is running");
})