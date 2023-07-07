const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
import "dotenv/config";
import { NextFunction } from "express";
import User from "./models/user";

const opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secret;

const Strategy = new JwtStrategy(
  opts,
  async (payload: any, done:any) => {
    console.log(payload);
    const user = await User.findOne({ email: payload.email });
    if (user) {
      return done(null, user);
    }
    return done(null, false, { message: "User does not exist" });
  }
);

export default Strategy;
