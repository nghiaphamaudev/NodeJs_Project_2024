import express from "express";
import UserController from "../controllers/userController.js";
import checkPermisson from "../middlewares/checkPermisson.js";

const userRouter = express.Router();
const userController = new UserController();

userRouter.route("/signup").post(userController.signUp);
userRouter.route("/login").post(userController.login);

userRouter.route("/").get(userController.getALlUser);
userRouter
  .route("/:id")
  .get(checkPermisson, userController.getUser)
  .delete(checkPermisson, userController.deleteUser)
  .patch(checkPermisson, userController.updateUser);

export default userRouter;
