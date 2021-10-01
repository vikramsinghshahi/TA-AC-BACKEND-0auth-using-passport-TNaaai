var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('../models/User');

//github strategy

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      var profileData = {
        name: profile.displayName,
        username: profile.username,
        email: profile._json.email,
        photo: profile._json.avatar_url,
      };
      User.findOne({ email: profile._json.email }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          User.create(profileData, (err, addedUser) => {
            if (err) return done(err);
            return done(null, addedUser);
          });
        }
        return done(null, user);
      });
    }
  )
);

//google strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: '/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);

      let userData = {
        name: profile._json.given_name + ' ' + profile._json.family_name,
        username: profile._json.name,
        email: profile._json.sub,
        image: profile._json.picture,
      };
      console.log('google userdata', userData);

      User.findOne({ email: profile._json.sub }, (err, user) => {
        if (err) return done(err);

        if (!user) {
          User.create(userData, (err, created) => {
            if (err) return done(err);
            // console.log('google user created', created);
            return done(null, created);
          });
        }
        return done(null, user);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});