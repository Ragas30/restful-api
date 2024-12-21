import Joi from "joi";

export class UserValidation {
  static registerUser() {
    return Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
    });
  }
}
