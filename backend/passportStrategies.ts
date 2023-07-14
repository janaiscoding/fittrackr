import passportLocal from "passport-local";
import passportJWT from "passport-jwt";
// const GoogleStrategy = require("passport-google-oidc");
import "dotenv/config";
import User from "./models/user";
import bcrypt from "bcryptjs";

const LocalStrategy = passportLocal.Strategy;
const localStrategy = new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  async (email, password, done) => {
    const user = await User.findOne({ email }).exec();
    if (!user)
      return done(null, false, {
        message: "Could not find an account associated with this email.",
      });
    bcrypt.compare(password, user.password, (err: any, res: any) => {
      if (err) return done(err);
      if (res) {
        return done(null, user);
      } else
        return done(null, false, { message: "Your password is incorrect." });
    });
  }
);

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secret;

const jwtStrategy = new JwtStrategy(opts, async (payload: any, done: any) => {
  const user = await User.findById({ _id: payload.userId }).exec();
  if (user) {
    return done(null, user);
  }
  return done(null, false, {
    message: "Could not find an account associated with this email",
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
export { localStrategy, jwtStrategy };
