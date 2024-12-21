import { ResponseError } from "../utils/errorrResponse.js";

export const validate = (schema, request) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (result.errors) {
    throw new ResponseError(400, result.errors.message);
  } else {
    return result.value;
  }
};
