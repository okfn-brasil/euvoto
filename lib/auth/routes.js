/**
 * Module dependencies.
 */

var express = require('express');
var passport = require('passport');
var log = require('debug')('democracyos:auth:routes');

/**
 * Lazy create app
 */

var app;

/**
 * Expose auth app
 */

module.exports = app = express();

/**
 * Local Auth routes
 */

app.post('/login'
  , passport.authenticate('local', { failureRedirect: '/' })
  , function(req, res) {
    res.redirect('/settings');
  }
);

/**
 * Logout
 */

app.post('/logout'
  , function(req, res, next) {
    try {
      req.logout();
      log('Logging out citizen %s', req.user);
      res.send(200);
    } catch (err) {
      log('Failed to logout citizen: %s', err);
      res.send(500);
    }
  }
);

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/signin' }));
