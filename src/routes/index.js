import express from "express";
import AppError from "../utils/APIError.js";
import categoryRouter from "./categoryRoutes.js";
import tourRouter from "./tourRoutes.js";
import userRouter from "./userRoutes.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Home");
});

router.use("/users", userRouter);
router.use("/tours", tourRouter);
router.use("/categories", categoryRouter);

router.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`));
});

export default router;
