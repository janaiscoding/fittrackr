import express from "express";
const router = express.Router();
import wC from "../controllers/workoutControllers";
import passport from "passport";
import { rulesWorkout } from "../middleware/rules";
import { valWorkout } from "../middleware/validators";
const auth = passport.authenticate("jwt", { session: false });

router.get("/", auth, wC.get_workouts);
router.post("/", auth, rulesWorkout(), valWorkout, wC.create_workout);
router.get("/users/:userID", auth, wC.get_user_workout);
router.delete("/:workoutID", auth, wC.delete_workout);

export default router;
