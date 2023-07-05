import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true, minLength: 1 }, //min-max length to be added?
    likes: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", commentSchema);
