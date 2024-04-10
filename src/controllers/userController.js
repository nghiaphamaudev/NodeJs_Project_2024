import User from "../models/userModel";
import bycryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginValidate, signValidate } from "../validator/auth";
import APIError from "../utils/APIError";

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
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new APIError(400, "User not exsist!");
      }
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
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new APIError(400, "User not exsist!");
      }
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
      const findUser = await User.findById(req.params.id);
      if (!findUser) {
        throw new APIError(400, "User not exsist!");
      }
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  signUp = async (req, res, next) => {
    try {
      console.log(req.body);
      const { error } = signValidate.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({
          status: "failed",
          message: errors,
        });
      }

      const { username, email, password, role } = req.body;
      const findExistEmail = await User.findOne({ email });
      if (findExistEmail) {
        return res.status(400).json({
          message: "The email has already existed",
        });
      }
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
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  };

  login = async (req, res, next) => {
    try {
      const { error } = loginValidate.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({
          status: "failed",
          message: errors,
        });
      }
      const { email, password } = req.body;
      const findExistEmail = await User.findOne({ email });
      if (!findExistEmail) {
        throw new APIError(400, "The account not exist!");
      }
      const checkPass = await bycryptjs.compare(
        password,
        findExistEmail.password
      );
      if (!checkPass) {
        throw new APIError(400, "Pass word not match");
      }
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
