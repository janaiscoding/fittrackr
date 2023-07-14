import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import postControllers from "../controllers/postControllers";
import commentControllers from "../controllers/commentController";
import passport from "passport";
const auth = passport.authenticate("jwt", { session: false });

router.get("/", auth, postControllers.posts_get);
router.post("/:userID", auth, postControllers.post_create); // you will make one new post on your acc
router.post("/:postID/:commentatorID", auth, commentControllers.post_comment); //on individual post, post a comment
// Must have update/delete button just on logged in user's posts
router.put("/:postID/:userID", auth, postControllers.post_update);
router.delete("/:postID/:userID", auth, postControllers.post_delete);
// Like toggles
router.put("/:postID/:likerID/like", auth, postControllers.post_like);
router.put("/:postID/:userID/:commentID/like", auth, commentControllers.comment_like)
export default router;
