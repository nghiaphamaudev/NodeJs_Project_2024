import express from "express";
import UserController from "../controllers/userController";
import checkPermisson from "../middlewares/checkPermisson";

const userRouter = express.Router();
const userController = new UserController();

userRouter.route("/signup").post(userController.signUp);
userRouter.route("/login").post(userController.login);

userRouter.route("/").get(userController.getALlUser);
userRouter
  .route("/:id")
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .patch(userController.updateUser);

export default userRouter;
