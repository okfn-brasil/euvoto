/*
 * Module dependencies
 */
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy
  , LocalStrategy = require('passport-local').Strategy
  , utils = require('lib/utils')
  , log = require('debug')('democracyos:auth:strategy')
  , User = require('lib/models').User
  , config = require('lib/config')
  ;

/**
 * Expose AuthStrategy
 */

module.exports = AuthStrategy;

/**
 * Register Auth Strategies for app
 */

function AuthStrategy (app) {

  /**
   * Passport Serialization of logged
   * User to Session from request
   */

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  /**
   * Passport Deserialization of logged
   * User by Session into request
   */

  passport.deserializeUser(function(userId, done) {
    User
    .findById(userId)
    .exec(function(err, user) {
      done(null, user);
    });
  });

  /**
   * Register Local Strategy
   */

  passport.use(new LocalStrategy(User.authenticate()));

  passport.use(new FacebookStrategy({
      clientID: config["facebook_passport_clientID"],
      clientSecret: config["facebook_passport_clientSecret"],
      callbackURL: config["facebook_passport_callbackURL"],
      profileFields: ['name', 'emails'],
      scope: ['email']
    },
    function(accessToken, refreshToken, profile, done) {
       console.log(accessToken);
       console.log(refreshToken);
       User 
            .findByProvider(profile, 
                    function (err, user) {
                      if (err) return;
                      if (!user) {
            
                        var citizen = new User({profiles: {facebook: profile}});
                        citizen.firstName = profile.name.givenName; 
                        citizen.lastName = profile.name.familyName;
			citizen.emailValidated = true;
            
                        if (profile.emails[0].value)
                          citizen.email = profile.emails[0].value;
                      
                        citizen.save();
                        log('new citizen [%s] from Local signup [%s]', citizen.id, profile.email);
                        return done(null, citizen);
                       } else {
                        return done(null, user);
                       }
                    });
    }
  ));

}
