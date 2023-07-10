import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true, minLength: 1 }, //min-max length to be added?
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    likes: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);
