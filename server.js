import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import YAML from "yaml";
import router from "./src/routes/index.js";
import connectDB from "./src/config/dbconfig.js";
import globalErrorHandler from "./src/controllers/errorController.js";
dotenv.config({ path: "./config.env" });

const file = fs.readFileSync("./api-docs.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

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
app.use(globalErrorHandler);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT, () => {
  console.log(`The server is listening ${PORT}...`);
});
