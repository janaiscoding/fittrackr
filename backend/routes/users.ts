import express from "express";
import UC from "../controllers/userControllers";
import passport from "passport";
import { rulesUpdateAcc } from "../middleware/rules";
import { valUpdateAcc } from "../middleware/validators";

const router = express.Router();
const auth = passport.authenticate("jwt", { session: false });

router.get("/", auth, UC.get_users);

router.post("/:userID/avatar", auth, UC.update_pfp);
router.post("/:userID/banner", auth, UC.update_banner);
router.get("/:userID", auth, UC.get_profile);
router.get("/:userID/posts", auth, UC.get_user_posts);
router.put("/:userID", auth, rulesUpdateAcc(), valUpdateAcc, UC.update_account);
router.delete("/:userID", auth, UC.delete_account);

router.get("/:userID/friends", auth, UC.get_friends_list);
router.get("/:userID/received", auth, UC.get_fr_received);
router.get("/:userID/sent", auth, UC.get_fr_sent);

router.post("/:receiverID/send", auth, UC.send_request);
router.delete("/:receiverID/cancel", auth, UC.cancel_request);
router.put("/:senderID/accept", auth, UC.accept_request);
router.delete("/:senderID/decline", auth, UC.decline_request);
router.delete("/:removedID/remove", auth, UC.remove_friend);

export default router;
