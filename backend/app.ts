import express, { Express, Request, Response } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import createError from "http-errors";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import RateLimit from "express-rate-limit";
import passport from "passport";
import { localStrategy, jwtStrategy } from "./passportStrategies";

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
const app = express();

app.use(cors());
app.use(limiter);
app.use(compression());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'"],
      // to add my frontend?
    },
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

passport.use(localStrategy);
passport.use(jwtStrategy);
app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (error: any, req: Request, res: Response, next: any) {
  // set locals, only providing error in development
  res.locals.message = error.message;
  res.locals.error = req.app.get("env") === "development" ? error : {};

  // render the error page
  res.status(error.status || 500);
  res.json({ error });
});

// db connection
mongoose
  .connect(process.env.MONGODB_URI ?? "")
  .then(() => {
    console.log("MongoDB: Connection successful!");
  })
  .catch((err) => console.log(err));

// listener
module.exports = app;
