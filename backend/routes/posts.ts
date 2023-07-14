import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import postControllers from "../controllers/postControllers";
import commentControllers from "../controllers/commentController";
import passport from "passport";
const auth = passport.authenticate("jwt", { session: false });

router.get("/", auth, postControllers.posts_get);
router.get("/:postID", auth, postControllers.post_get);
router.post("/:userID", auth, postControllers.post_create);
// Must have update/delete button just on logged in user's posts - state userData
router.put("/:postID/:userID", auth, postControllers.post_update);
router.delete("/:postID/:userID", auth, postControllers.post_delete);
// Comment interactions
router.post("/:postID/:commentatorID", auth, commentControllers.post_comment);
// Like toggles
router.post("/:postID/:userID/like", auth, postControllers.post_like);
router.post(
  "/:postID/:commentID/:userID/like",
  auth,
  commentControllers.comment_like
);
router.delete(
  "/:postID/:commentID/:commentatorID",
  auth,
  commentControllers.comment_delete
);
export default router;
