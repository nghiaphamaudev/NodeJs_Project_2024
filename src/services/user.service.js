import User from "../models/userModel.js";
import APIError from "../utils/APIError.js";
import bycryptjs from "bcryptjs";

export const checkIdUserExist = async (id) => {
  const userFindById = await User.findById(id);
  if (!userFindById) {
    throw new APIError(400, "ID User not exsist!");
  }
  return userFindById;
};

export const checkEmailExist = async (email) => {
  const findExistEmail = await User.findOne({ email });
  if (findExistEmail) {
    throw new APIError(404, "The email has already existed");
  }
  return findExistEmail;
};

export const checkPassword = async (userPassword, dbPassword) => {
  const checkPass = await bycryptjs.compare(userPassword, dbPassword);
  if (!checkPass) {
    throw new APIError(400, "Password not match");
  }
};
