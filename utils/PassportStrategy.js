const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); 

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Here, you will typically find or create a user in your database
    //   const existingUser = await User.findOne({ 'google.id': profile.id });

    //   if (existingUser) {
    //     return done(null, existingUser);
    //   }

    //   const newUser = new User({
    //     google: {
    //       id: profile.id,
    //       email: profile.emails[0].value
    //     }
    //   });

    //   await newUser.save();
    //   done(null, newUser);
    } catch (error) {
      done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
