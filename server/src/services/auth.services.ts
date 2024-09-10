import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NotFoundError";
import { User } from "../interfaces/user.interface";
import * as UserServices from "../services/user.services";

export const getUserByEmail = async (email: string, routes: string) => {
  const existingUser = await UserServices.getUserByEmail(email);

  console.log(`returned back at auth service with existing user`, existingUser);

  if (!existingUser && routes === "login") {
    throw new NotFoundError("user with that email doesn't exist");
  }
  if (existingUser && routes === "signup") {
    throw new BadRequestError("user with that email already exists");
  }
  return existingUser;
};

export const signUp = (body: Omit<User, "id">) => {
  console.log(`came inside auth service`);

  return UserServices.signUp(body);
};
