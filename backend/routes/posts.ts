import express from "express";
const router = express.Router();
import PC from "../controllers/postControllers";
import CC from "../controllers/commentController";
import passport from "passport";
import { rulesComment } from "../middleware/rules";
import { valComment } from "../middleware/validators";
const auth = passport.authenticate("jwt", { session: false });

router.get("/", auth, PC.posts_get);
router.post("/", auth, PC.post_create);

router.get("/:postID", auth, PC.post_get);
router.post("/:postID", auth, CC.post_comment);
router.put("/:postID", auth, PC.post_update);
router.delete("/:postID", auth, PC.post_delete);

// Like toggles
router.post("/:postID/like", auth, PC.post_like);
router.post("/:postID/:commentID/like", auth, CC.comment_like);
router.delete("/:postID/:commentID", auth, CC.comment_delete);

export default router;
