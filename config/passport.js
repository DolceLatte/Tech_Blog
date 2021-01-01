var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
    clientID:  '334318319409-bmsiefd9kq822rmqch6881vi4cul3446.apps.googleusercontent.com',
    clientSecret: 'DxF7FZ1zQYa41JrZ3JjisrJT',
    callbackURL: "/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log('profile: ', profile);
    var user = profile
    return done(null, user);
  }
));

passport.serializeUser(function(user, done) {
    done(null,user);
});

passport.deserializeUser(function(id, done) {

    done(null, id);
});

module.exports = passport;
