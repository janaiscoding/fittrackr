import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import authControllers from "../controllers/authControllers";
import postControllers from "../controllers/postControllers";
import workoutControllers from "../controllers/workoutControllers";
import userController from "../controllers/userControllers";
import passport from "passport";
const auth = passport.authenticate("jwt", { session: false });

router.get("/", auth, userController.get_users); // gets all users
router.post("/", authControllers.create_user); // NEW USER
router.get("/:userID", auth, userController.get_profile); // gets a specific profile with a profile _id
router.post("/:userID", auth, userController.create_post); // you will make one new post on your acc
router.put("/:userID", auth, userController.update_account);
router.delete("/:userID", auth, userController.delete_account);

export default router;
