class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOpenRational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
