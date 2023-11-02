import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import validator from "validator";

const valSignup = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  const { first_name, last_name } = req.body;
  if (errors.isEmpty()) return next();

  return res.status(400).json({
    errors: errors.array(),
    first_name: validator.unescape(first_name),
    last_name: validator.unescape(last_name),
  });
};

const valLogin = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  return res.status(401).json({ errors: errors.array() });
};

const valComment = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return res.status(400).json({
    errors: errors.array(),
    text: validator.unescape(req.body.text),
  });
};
const valUpdateAcc = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return res.status(400).json({ errors: errors.array() });
};

export { valSignup, valLogin, valComment, valUpdateAcc };
