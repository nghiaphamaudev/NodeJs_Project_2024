import Joi from "joi";

export const createCategory = Joi.object({
  name: Joi.string().empty().min(6).messages({
    "string.empty": " The {{#label}} cannot be left blank",
    "string.min": "The {{#label}} minimum {#min} letter ",
  }),
  desc: Joi.string().empty().min(6).messages({
    "string.empty": " The {{#label}} cannot be left blank",
  }),
});
export const updateCategory = Joi.object({
  name: Joi.string().empty().min(6).messages({
    "string.empty": " The {{#label}} cannot be left blank",
    "string.min": "The {{#label}} minimum {#min} letter ",
  }),
  desc: Joi.string().empty().min(6).messages({
    "string.empty": " The {{#label}} cannot be left blank",
  }),
});
