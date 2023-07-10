import mongoose from "mongoose";
const Schema = mongoose.Schema;

enum Workouts {
  Cardio,
  Strength,
  // more to add here?
}

const workoutSchema = new Schema(
  {
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    // sets?
    // muscle groups targetted?
  },
  { timestamps: true }
);

export default mongoose.models.Workout || mongoose.model('Workout', workoutSchema)