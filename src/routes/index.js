import express from "express";
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

export default router;
