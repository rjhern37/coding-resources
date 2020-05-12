const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

passport.use(new LocalStrategy(
    function(username, done) {
      db.Users.findOne({ username: username })
        .then(function (user) {
            if (!user) {
                return done(null, false, { 
                    message: 'Incorrect username.' 
                });
            }
            return done(null, user);
      })
      .catch(function(err){
        return done(err);
      });
    }
  ));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
