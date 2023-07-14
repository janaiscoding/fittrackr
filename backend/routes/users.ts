import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import authControllers from "../controllers/authControllers";
import postControllers from "../controllers/postControllers";
import workoutControllers from "../controllers/workoutControllers";
import userControllers from "../controllers/userControllers";
import passport from "passport";
const auth = passport.authenticate("jwt", { session: false });

router.get("/", auth, userControllers.get_users); // gets all users
router.post("/", authControllers.create_user); // NEW USER
router.get("/:userID", auth, userControllers.get_profile); // gets a specific profile with a profile _id
router.put("/:userID", auth, userControllers.update_account);
router.delete("/:userID", auth, userControllers.delete_account);
router.get("/:userID/friends", auth, userControllers.get_friends_list);
router.get("/:userID/friends/received", auth, userControllers.get_fr_received);
router.get("/:userID/friends/sent", auth, userControllers.get_fr_sent);
router.put("/send/:senderID/:receiverID", auth, userControllers.send_request);
router.put("/accept/:receiverID/:senderID", auth, userControllers.accept_request);

export default router;
