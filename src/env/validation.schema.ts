import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('local', 'dev', 'prod').required(),
  SERVER_PORT: Joi.number().default(3000),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(3306),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
});
