import express from "express";
const router = express.Router();
import postControllers from "../controllers/postControllers";
import authControllers from "../controllers/authControllers";
import passport from "passport";
import { valLogin, valSignup } from "../middleware/validators";
import { loginRules, signupRules } from "../middleware/rules";
const auth = passport.authenticate("jwt", { session: false });

router.get("/", auth, postControllers.posts_get);
router.post("/signup", signupRules(), valSignup, authControllers.create_user);
router.post("/login", loginRules(), valLogin, authControllers.login_post);
router.post("/verify", authControllers.verify_token);

export default router;
