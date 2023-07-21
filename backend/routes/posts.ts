import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import PC from "../controllers/postControllers";
import CC from "../controllers/commentController";
import passport from "passport";
const auth = passport.authenticate("jwt", { session: false });

router.get("/", auth, PC.posts_get);
router.get("/:postID", auth, PC.post_get);
router.post("/:userID", auth, PC.post_create);
// Must have update/delete button just on logged in user's posts - state userData
router.put("/:postID/:userID", auth, PC.post_update);
router.delete("/:postID/:userID", auth, PC.post_delete);
// Comment interactions
router.post("/:postID/:commentatorID", auth, CC.post_comment);
// Like toggles
router.post("/:postID/:userID/like", auth, PC.post_like);
router.post("/:postID/:userID/:commentID/like", auth, CC.comment_like);
router.delete("/:postID/:commentatorID/:commentID/", auth, CC.comment_delete);
export default router;
