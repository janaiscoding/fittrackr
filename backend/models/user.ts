import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    // Personal Info
    age: { type: Number, min: 1, max: 100 },
    cur_weight: { type: Number, min: 1 },
    goal_weight: { type: Number, min: 1 },
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

    //Images
    avatar: {
      data: { type: Buffer },
      contentType: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
