import AppError from "../utils/APIError";

const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOpenRational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(400).json({
      status: "error",
      message: "Somthing went wrong",
    });
  }
};

export default globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if ((process.env.NODE_ENV = "production")) {
    let error = { ...err };
    if (err.name === "CastError") error = handleCastError(error);
    sendErrorProd(error, res);
  }
};
