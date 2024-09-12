import { NextFunction, Response } from "express";
import { Request } from "../interfaces/auth.interface";
import { verify } from "jsonwebtoken";
import config from "../config";
import { User } from "../interfaces/user.interface";
import { UnauthenticatedError } from "../error/UnauthorizedError";

/**
 * Middleware to authenticate user based on JWT token in Authorization header.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next function to call in the middleware chain.
 * @throws {UnauthenticatedError} Throws error if token is not found, invalid, or authentication fails.
 */
export function authenticate(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new UnauthenticatedError("Unauthorized"));
    return;
  }

  const token = authorization.split(" ");

  if (token.length !== 2 || token[0] !== "Bearer") {
    next(new UnauthenticatedError("Invalid token"));

    return;
  }
  try {
    const user = verify(token[1], config.jwt.secret!) as User;

    req.user = user;

    next();
  } catch (error) {
    next(new UnauthenticatedError("Unauthenticated"));
  }
}
