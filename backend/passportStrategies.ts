import passportJWT from "passport-jwt";
// const GoogleStrategy = require("passport-google-oidc");
import "dotenv/config";
import User from "./models/user";

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secret;

const jwtStrategy = new JwtStrategy(opts, async (payload: any, done: any) => {
  const user = await User.findById({ _id: payload.userID });
  if (user) {
    return done(null, user);
  }
  return done(null, false, {
    message: "Could not find an account associated with this email.",
  });
});

// const googleStrategy = new GoogleStrategy(
//   {
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: process.env.CALLBACK_URL,
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     console.log("user profile is: ", profile);
//   }
// );
export { jwtStrategy };
