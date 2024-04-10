import express from "express";
import dotenv from "dotenv";
import router from "./src/routes";
import connectDB from "./src/config/dbconfig";
import errorHandler from "./src/middlewares/errorHandler";
dotenv.config({ path: "./config.env" });

const DB = process.env.DB_URI;
console.log(DB);

const app = express();

connectDB(DB);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/api/v1", router);
app.use(errorHandler);
export const viteNodeApp = app;
