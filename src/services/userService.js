import { prismaClient } from "../app/database.js";
import { UserValidation } from "../validation/userValidation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";

export const register = async (request) => {
  const registersRequest = validate(UserValidation.registerUser(), request);
  const emailCheck = await prismaClient.user.findUnique({
    where: {
      email: registersRequest.email,
    },
  });

  if (emailCheck) {
    throw new ResponseError(400, "Email Already Exists");
  }

  registersRequest.password = await bcrypt.hash(registersRequest.password, 10);

  const user = await prismaClient.user.create({
    data: registersRequest,
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return user;
};
