class APIError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = "APIError";
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default APIError;