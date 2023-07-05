import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    // Personal Info 
    age: Number,
    weightCurrent: Number,
    weightGoal: Number,
    workouts: [{ type: Schema.Types.ObjectId, ref: "Workout" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    //For auth only
    username: { type: String, required: true, minLength: 2, maxLength: 24 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minLength: 8 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
