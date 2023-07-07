import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import postControllers from "../controllers/postControllers";
import authControllers from "../controllers/authControllers";
import passport from "passport";

router.get(
  "/",
  passport.authenticate("jwt", { session: false, failureRedirect: "/failure" }),
  postControllers.posts_get
);
router.get("/failure", (req, res) => {
  res.json({ message: "Redirected from auth fail" });
});
router.post("/signup", authControllers.signup_post);
router.post("/login", authControllers.login_post);

export default router;
