import express from "express";
const router = express.Router();
import postControllers from "../controllers/postControllers";
import authControllers from "../controllers/authControllers";
import passport from "passport";
const auth = passport.authenticate("jwt", { session: false });

router.get("/", auth, postControllers.posts_get);
router.post("/login", authControllers.login_post);

export default router;
