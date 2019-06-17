const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../keys/key");
const { User } = require("../models/user");

if (process.env.NODE_ENV === "production") {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleclientId,
        clientSecret: keys.googleclientSecret,
        callbackURL: "https://fullstacked.herokuapp.com/auth/google/callback",
        passReqToCallback: true
      },
      async (req, accessToken, refreshToken, profile, done) => {
        let user = User.findOne({ google: { id: profile.id } });
        if (!user) {
          user = new User({
            name: profile.name,
            google: {
              id: profile.id,
              name: profile.name,
              email: profile.emails
            }
          });
          await user.save();
          console.log(user);
          const token = user.AuthToken();
          console.log("jwt token ", token);
          done(null, {
            user: user,
            token: token
          });
        } else {
          user = new User({
            name: profile.name.givenName,
            "Google.id": profile.id,
            "Google.name": profile.name.givenName
          });
          const token = user.AuthToken();
          user = await user.save();
          console.log("new user ", user);
          console.log("jwt token ", token);
          return done(null, { user: user, token: token });
        }
      }
    )
  );
} else {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleclientId,
        clientSecret: keys.googleclientSecret,
        callbackURL: "http://localhost:5000/auth/google/callback",
        passReqToCallback: true
      },
      async (req, accessToken, refreshToken, profile, done) => {
        console.log(profile.name.givenName);
        let user = await User.findOne({
          "Google.id": profile.id
        });
        if (user) {
          console.log("existing user", user);
          const token = user.AuthToken();
          console.log("jwt token ", token);
          done(null, {
            user: user,
            token: token
          });
        } else {
          user = new User({
            name: profile.name.givenName,
            "Google.id": profile.id,
            "Google.name": profile.name.givenName
          });
          const token = user.AuthToken();
          user = await user.save();
          console.log("new user ", user);
          console.log("jwt token ", token);
          return done(null, { user: user, token: token });
        }
      }
    )
  );
}
