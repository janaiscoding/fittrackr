import express from "express";
const router = express.Router();
import postControllers from "../controllers/postControllers";
import authControllers from "../controllers/authControllers";
import passport from "passport";
const auth = passport.authenticate("jwt", { session: false });

router.get("/", auth, postControllers.posts_get);
router.post("/signup", authControllers.create_user);
router.post("/login", authControllers.login_post);
router.post("/verify", authControllers.verify_token);

export default router;
