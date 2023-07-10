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

<<<<<<< HEAD
export default mongoose.model("comment", commentSchema);
=======
export default mongoose.model("Comment", commentSchema);
>>>>>>> 9a310d8e421caf5d474f534afd786aa57e7301d4
