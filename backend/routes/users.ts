import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import postControllers from "../controllers/postControllers";
import userController from "../controllers/userControllers";
import passport from "passport";

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  userController.get_users
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  userController.get_profile
);

export default router;
