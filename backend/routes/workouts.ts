import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import authControllers from "../controllers/authControllers";
import postControllers from "../controllers/postControllers";
import workoutControllers from "../controllers/workoutControllers";
import userController from "../controllers/userControllers";
import passport from "passport";
const auth = passport.authenticate("jwt", { session: false });

router.get("/", auth, workoutControllers.get_workouts); //
router.post("/", auth, workoutControllers.create_workout); //
router.delete('/:id',auth, workoutControllers.delete_workout)


export default router;
