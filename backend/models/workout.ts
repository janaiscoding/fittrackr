import mongoose from "mongoose";
const Schema = mongoose.Schema;

enum Workouts {
  Cardio,
  Strength,
  // more to add here?
}

const workoutSchema = new Schema(
  {
    type: { type: String, enum: Workouts, required: true },
    duration: { type: Number, required: true },
    // sets?
    // muscle groups targetted?
  },
  { timestamps: true }
);

export default mongoose.model("Workout", workoutSchema);
