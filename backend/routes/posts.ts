import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import authControllers from "../controllers/authControllers";
import postControllers from "../controllers/postControllers";
import workoutControllers from "../controllers/workoutControllers";
import userController from "../controllers/userControllers";
import passport from "passport";
const auth = passport.authenticate("jwt", { session: false });

router.get("/", auth, postControllers.posts_get);
router.post("/:postID/:userID", auth, postControllers.post_comment); //on individual post, post a comment
// must have update/delete button just on logged in user's posts
router.put("/:postID/:userID", auth, postControllers.post_update);
router.delete("/:postID/:userID", auth, postControllers.post_delete);

export default router;
