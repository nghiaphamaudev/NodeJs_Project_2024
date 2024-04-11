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
  } else {
    throw new APIError(400, "The account not exist!");
  }
};

export const validateHandler = async (methodValidate, formData) => {
  const { error } = methodValidate.validate(formData, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((err) => err.message);
    throw new APIError(404, errors);
  }
};

export const checkPassword = async (userPassword, dbPassword) => {
  const checkPass = await bycryptjs.compare(userPassword, dbPassword);
  if (!checkPass) {
    throw new APIError(400, "Password not match");
  }
};
