import express from "express";
import dotenv from "dotenv";
import router from "./src/routes/index.js";
import connectDB from "./src/config/dbconfig.js";
import errorHandler from "./src/middlewares/errorHandler.js";
dotenv.config({ path: "./config.env" });

const DB = process.env.DB_URI || 8000;
const PORT = process.env.PORT;

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
app.listen(PORT, () => {
  console.log(`The server is listening ${PORT}...`);
});
