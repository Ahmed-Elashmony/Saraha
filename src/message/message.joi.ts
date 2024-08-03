import * as joi from 'joi';

export const sendSchema = {
  body: joi
    .object({
      to: joi.string().required(),
      message: joi.string().required(),
    })
    .required(),
};
