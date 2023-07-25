import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    first_name: { type: String, required: true, minLength: 1 },
    last_name: { type: String, required: true, minLength: 1 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    birthday: { type: Date, required: true },
    bio: { type: String, minLength: 1, maxLength: 140, default: "Default user bio here!" },
    current_weight: { type: Number, min: 3 },
    goal_weight: { type: Number, min: 3 },
    workouts: [{ type: Schema.Types.ObjectId, ref: "Workout" }],
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    requestsSent: [{ type: Schema.Types.ObjectId, ref: "User" }],
    requestsReceived: [{ type: Schema.Types.ObjectId, ref: "User" }],
    avatar: {
      data: { type: Buffer, default: "buffer here" },
      contentType: { type: String, default: "image/png" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
