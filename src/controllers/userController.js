import User from "../models/userModel.js";
import bycryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  loginValidate,
  signValidate,
  updateValidate,
} from "../validator/auth.validator.js";
import APIError from "../utils/APIError.js";
import {
  checkEmailExist,
  checkIdUserExist,
  checkPassword,
  validateHandler,
} from "../services/user.service.js";

export default class UserController {
  getALlUser = async (req, res, next) => {
    try {
      const users = await User.find(req.query);
      return res.status(200).json({
        status: "success",
        users: users,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  };

  getUser = async (req, res, next) => {
    try {
      const user = await checkIdUserExist(req.params.id);
      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      await checkIdUserExist(req.params.id);
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const findUser = await checkIdUserExist(req.params.id);
      await validateHandler(updateValidate, req.body);
      const { oldPassword, newPassword, username } = req.body;
      const checkPass = await bycryptjs.compare(oldPassword, findUser.password);
      if (!checkPass) {
        throw new APIError(404, "The old password not match with password ");
      }
      const hassPassword = await bycryptjs.hash(newPassword, 12);
      const checkNewPass = await bycryptjs.compare(
        newPassword,
        findUser.password
      );
      if (checkNewPass) {
        throw new APIError(
          404,
          "The new password must be different old password"
        );
      }
      const reUser = {
        password: hassPassword,
        username,
      };

      await User.findByIdAndUpdate(req.params.id, reUser, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        status: "success",
        data: reUser,
      });
    } catch (error) {
      next(error);
    }
  };

  signUp = async (req, res, next) => {
    try {
      await validateHandler(signValidate, req.body);
      const { username, email, password, role } = req.body;
      await checkEmailExist(email);
      const hassPassword = await bycryptjs.hash(password, 12);
      const newUser = {
        username,
        email,
        password: hassPassword,
        role,
      };
      await User.create(newUser);
      res.status(201).json({
        status: "success",
        user: {
          ...newUser,
          password: undefined,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      await validateHandler(loginValidate, req.body);
      const { email, password } = req.body;
      const findExistEmail = await User.findOne({ email });
      if (!findExistEmail) {
        throw new APIError(400, "The account not exist!");
      }
      await checkPassword(password, findExistEmail.password);
      const token = jwt.sign(
        { data: findExistEmail },
        process.env.SECRET_TOKEN,
        { expiresIn: "1w" }
      );
      res.status(200).json({
        status: "Login success",
        accessToken: token,
      });
    } catch (error) {
      next(error);
    }
  };
}
