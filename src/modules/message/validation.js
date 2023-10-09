import joi from "joi";

export const sentMessage = joi
  .object({
    email: joi.string().email().required(),
    content: joi.string().min(2).max(250).required(),
  })
  .required();

export const update = joi
  .object({
    content: joi.string().min(2).max(250).required(),
    email: joi.string().email().required(),
    messageId: joi.string().required(),
  })
  .required();
