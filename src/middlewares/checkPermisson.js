import jwt from "jsonwebtoken";
import User from "../models/userModel";
const checkPermisson = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).json({
        status: "failed",
        message: "Must to have a token",
      });
    }
    const data = jwt.verify(token, process.env.SECRET_TOKEN);
    console.log(data);
    if (!data) {
      return res.status(400).json({
        status: "failed",
        message: "Not Authorization",
      });
    }

    const findUser = await User.findById(data.data._id);
    if (!findUser) {
      return res.status(400).json({
        status: "failed",
        message: "User not existed",
      });
    }
    if (findUser.role === "admin") {
      return next();
    }
    return res.status(400).json({
      status: "failed",
      message: "You not have authoration",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

export default checkPermisson;
