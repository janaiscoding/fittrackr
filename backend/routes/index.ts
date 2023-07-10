import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import postControllers from "../controllers/postControllers";
import authControllers from "../controllers/authControllers";
import passport from "passport";

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  postControllers.posts_get
);


router.post("/login", authControllers.login_post);

export default router;
