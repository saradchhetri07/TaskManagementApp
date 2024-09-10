import { Schema } from "joi";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../error/BadRequestError";

export function validateReqQuery(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.query);

    if (error) {
      next(new BadRequestError(error.message));
    }
    req.query = value;
    next();
  };
}

export function validateReqBody(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      console.log("inside  validator.ts");

      next(new BadRequestError(error.message));
    }
    req.body = value;
    next();
  };
}
