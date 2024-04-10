import Joi from "joi";
export const signValidate = Joi.object({
  username: Joi.string().empty().messages({
    "string.empty": " The {{#label}} cannot be left blank",
  }),
  email: Joi.string().email().lowercase().messages({
    "string.email": "The {{#label}} is not format",
    "string.empty": "The {{#label}} cannot be left blank",
  }),
  password: Joi.string().min(6).max(12).required().messages({
    "string.min": "The {{#label}} minimum {#min} letter ",
    "string.max": "The {{#label}} maxium {#max} letter",
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.invalid": " The {{#label}} must be match password field",
    "any.required": "The {{#label}} required",
  }),
  role: Joi.string().empty().messages({
    "string.empty": " The {{#label}} cannot be left blank",
  }),
});

export const loginValidate = Joi.object({
  email: Joi.string().required().email().empty().messages({
    "string.email": "{{#label}} is not format",
    "string.empty": "The {{#label}} cannot be left blank",
    "any.required": "The {{#label}} required",
  }),
  password: Joi.string().required().empty().min(6).max(12).messages({
    "string.empty": " The {{#label}} cannot be left blank",
    "string.min": "The {{#label}} minimum {#min} letter ",
    "string.max": "The {{#label}} maxium {#max} letter",
    "any.required": "The {{#label}} required",
  }),
});
