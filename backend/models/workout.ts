import mongoose from "mongoose";
const Schema = mongoose.Schema;

enum Workouts {
  Cardio,
  Strength,
  // more to add here?
}

const workoutSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    description: { type: String, required: true, minLength: 2, maxLength: 100 },
    duration: { type: Number, min: 1, max: 600 },
    sets: { type: Number, min: 1 },
    // sets?
    // muscle groups targetted?
  },
  { timestamps: true }
);

export default mongoose.model("Workout", workoutSchema);
