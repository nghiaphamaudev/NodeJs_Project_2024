import express from "express";
import categoryRouter from "./categoryRoutes";
import tourRouter from "./tourRoutes";
import userRouter from "./userRoutes";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Home");
});

router.use("/users", userRouter);
router.use("/tours", tourRouter);
router.use("/categories", categoryRouter);

export default router;
