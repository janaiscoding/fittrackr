import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    // Personal Info
    age: Number,
    cur_weight: Number,
    goal_weight: Number,
    workouts: [{ type: Schema.Types.ObjectId, ref: "Workout" }],
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    //For auth only
    first_name: { type: String, required: true, minLength: 2 },
    last_name: { type: String, required: true, minLength: 2 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minLength: 8 },
    //Social ?? 
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    requestsSent: [{ type: Schema.Types.ObjectId, ref: "User" }],
    requestsReceived: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
