import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { signValidate, loginValidate } from "../validator/auth.validator";

export class AuthController {
  signup = async (req, res, next) => {
    try {
      const error = signValidate.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => err.message);
        res.status(200).json({
          status: "failed",
          message: errors,
        });
        const { username, email, password } = req.body;
        const findUser = await User.findOne({ email });
        if (findUser) {
          return res.status(400).json({
            status: "failed",
            message: "The account has already existed",
          });
        }
        const hassPassword = bcryptjs.hash(password, 12);
        const newUser = {
          username,
          email,
          password: hassPassword,
        };
        await User.create(newUser);
        res.status(201).json({
          status: "success",
          data: {
            ...newUser.toObject(),
            password: undefined,
          },
        });
      }
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  };

  login = async (req, res, next) => {
    const error = loginValidate.validate(req.body, {
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
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json({
        status: "failed",
        message: "The account not existed",
      });
    }
    const checkPassword = bcryptjs.compare(password, findUser.password);
    if (!checkPassword) {
      return res.status(400).json({
        status: "failed",
        message: "The password is not correct",
      });
    }
    const token = jwt.sign({ user: findUser }, process.env.SECRET_TOKEN, {
      expiresIn: "1w",
    });

    res.status(200).json({
      status: "success",
      data: {
        ...findUser.toObject(),
        password: undefined,
        token: token,
      },
    });
  };
}
