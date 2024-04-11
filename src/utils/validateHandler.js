import APIError from "./APIError.js";

export const validateHandler = async (methodValidate, formData) => {
  const { error } = methodValidate.validate(formData, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((err) => err.message);
    throw new APIError(404, errors);
  }
};
