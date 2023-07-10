import express, { Express, NextFunction, Request, Response } from "express";
import User from "../models/user";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import passport from "passport";
import validator from "validator";
import jwt from "jsonwebtoken";
import "dotenv/config";

const get_users = (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "get all user list" });
};

const get_profile = (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "get profile", id: req.params.id });
};

export default {
  get_users,
  get_profile,
};
