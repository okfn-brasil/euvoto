/**
 * Module dependencies.
 */

var page = require('page');
var Frontpage = require('./view');
var classes = require('classes');
var t = require('t');

page('/frontpage-msg', function(ctx, next) {
  // Build signin view with options
  
  var frontpageView = new Frontpage();
 
  console.log(frontpageView);
  // Render signin-page into content section
  frontpageView.replace('#content');

});

