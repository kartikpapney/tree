import Joi from 'joi'
import { HTTP } from '../constant.js';

const validate = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body)
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      res
        .status(HTTP.badRequest)
        .json(
          {
            error: message
          }
        )
    }
  }
}

export default validate;