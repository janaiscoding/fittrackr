import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    first_name: { type: String, required: true, minLength: 2 },
    last_name: { type: String, required: true, minLength: 2 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minLength: 8 },
    birthday: { type: Date, required: true },
    current_weight: { type: Number, min: 1 },
    goal_weight: { type: Number, min: 1 },
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
