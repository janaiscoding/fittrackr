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
    pfp: {
      data: {
        type: Buffer,
        default:
          "[137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,0,0,0,31,0,0,0,16,8,6,0,0,0,238,248,164,236,0,0,0,9,112,72,89,115,0,0,11,19,0,0,11,19,1,0,154,156,24,0,0,0,1,115,82,71,66,0,174,206,28,233,0,0,0,4,103,65,77,65,0,0,177,143,11,252,97,5,0,0,0,189,73,68,65,84,120,1,197,211,33,18,194,48,16,5,208,221,164,120,142,16,137,201,192,21,122,2,176,200,30,1,89,133,236,12,112,135,10,96,144,28,161,28,161,18,153,35,224,105,179,204,162,217,160,54,253,118,197,251,147,249,1,80,140,63,157,55,171,230,230,164,187,1,69,24,34,222,163,141,157,84,64,13,183,118,120,0,81,32,32,39,21,80,195,251,93,245,122,199,161,76,21,64,80,206,162,105,221,204,20,29,32,58,4,12,102,52,101,95,111,67,22,60,85,32,11,46,21,64,127,184,16,76,144,111,1,152,40,68,17,178,61,59,47,157,23,207,203,231,31,192,63,33,11,254,11,126,214,149,254,224,36,152,111,170,120,10,86,197,255,193,28,181,181,143,69,92,166,96,245,248,227,117,237,246,237,92,186,127,0,186,52,149,222,229,253,107,37,0,0,0,0,73,69,78,68,174,66,96,130]",
      },
      contentType: { type: String, default: "image/png" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
