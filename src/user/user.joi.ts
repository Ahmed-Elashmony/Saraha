import * as joi from 'joi';

export const signUpSchema = {
  body: joi
    .object({
      name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
      cPassword: joi.string().valid(joi.ref('password')).required(),
    })
    .required(),
  // query: joi
  //   .object({
  //     q: joi.string().required(),
  //   })
  //   .required(),
};

export const signInSchema = {
  body: joi
    .object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    })
    .required(),
};

export const updateSchema = {
  body: joi
    .object({
      age: joi.number().max(100).min(4),
      name: joi.string(),
      gender: joi.string().valid('male', 'female'),
      phone: joi.string(),
    })
    .required(),
};
