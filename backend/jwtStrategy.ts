import JWTpassport, { ExtractJwt } from "passport-jwt"
import User from "./models/user";
import "dotenv/config";

const JWTStrategy = JWTpassport.Strategy;
const opts:any = {}; // ??

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secret;

const jwtStrategy = new JWTStrategy(opts, async (payload, done) => {
  const user = await User.findOne({ email: payload.email });
  if (user) {
    return done(null, user);
  }
  return done(null, false, { message: "User does not exist" });
});
export default jwtStrategy;