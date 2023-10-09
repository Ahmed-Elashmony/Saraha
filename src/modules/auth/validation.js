import joi from "joi";

export const SignUp = joi
  .object({
    userName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi
      .string()
      .min(8)
      .max(50)
      .pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/))
      .required(),
    cPassword: joi.string().valid(joi.ref("password")).required(),
    age: joi.number().integer().min(18).max(60).required(),
    phone: joi.string().empty(""),
    gender: joi.string().valid("male", "female").required(),
  })
  .required();

export const LogIn = joi
  .object({
    email: joi.string().email().required(),
    password: joi
      .string()
      .min(8)
      .max(50)
      .pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/))
      .required(),
  })
  .required();

export const changePassword = joi
  .object({
    oldPassword: joi.string().required(),
    newPassword: joi
      .string()
      .min(8)
      .max(50)
      .pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/))
      .required(),
    cPassword: joi.string().valid(joi.ref("newPassword")).required(),
  })
  .required();
