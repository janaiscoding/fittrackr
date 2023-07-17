import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import authControllers from "../controllers/authControllers";
import postControllers from "../controllers/postControllers";
import workoutControllers from "../controllers/workoutControllers";
import UC from "../controllers/userControllers";
import passport from "passport";
const auth = passport.authenticate("jwt", { session: false });

router.get("/", auth, UC.get_users);
router.post("/:userID/upload", auth, UC.update_pfp);
router.get("/:userID", auth, UC.get_profile); // gets a specific profile with a profile _id
router.put("/:userID", auth, UC.update_account);
router.delete("/:userID", auth, UC.delete_account);
router.get("/:userID/friends", auth, UC.get_friends_list);
router.get("/:userID/friends/received", auth, UC.get_fr_received);
router.get("/:userID/friends/sent", auth, UC.get_fr_sent);
router.post("/send/:senderID/:receiverID", auth, UC.send_request);
router.delete("/cancel/:senderID/:receiverID", auth, UC.cancel_request);
router.put("/accept/:receiverID/:senderID", auth, UC.accept_request);
router.delete("/decline/:receiverID/:senderID", auth, UC.decline_request);
router.delete("/remove/:removerID/:removedID", auth, UC.remove_friend);

export default router;

//testing
// router.get("/:userID/upload", (req, res) =>
//   res.render("upload", {
//     userID: "64ac67f43160129f5024cb24",
//   })
// );
