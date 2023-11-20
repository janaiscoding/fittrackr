import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    first_name: { type: String, required: true, minLength: 1 },
    last_name: { type: String, required: true, minLength: 1 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    // birthday: { type: Date, required: true },
    // languages: { type: [] },
    bio: {
      type: String,
      minLength: 1,
      maxLength: 140,
      default: "New user bio!",
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    requestsSent: [{ type: Schema.Types.ObjectId, ref: "User" }],
    requestsReceived: [{ type: Schema.Types.ObjectId, ref: "User" }],
    avatar: {
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dzj44ru2r/image/upload/v1699613615/DEV/gfoqaga92hjrxhsyouz7.jpg",
      },
      alt: { type: String, default: "nasa-Q1p7bh3SHj8-unsplash.jpg" },
    },
    banner: {
      url: {
        type:String, 
        default: "https://res.cloudinary.com/dzj44ru2r/image/upload/c_limit,w_700/f_auto/q_auto/v1700484710/DEV/sjaewhr5gqq7vlbppc0x?_a=BAVADNGd0"
      },
      alt: {type: String, default: "pexels-antonio-batinić-4164418.jpg"}
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
