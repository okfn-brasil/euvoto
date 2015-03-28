/**
 * Module dependencies.
 */

var page = require('page');
var sidebar = require('sidebar');
var CustomView = require('./view');
var classes = require('classes');
var lawsFilter = require('laws-filter');
var t = require('t');

page('/', sidebarready, function(ctx, next) {
  // Build signin view with options
  
  var laws = lawsFilter.items();
  var customView = new CustomView(laws);
 
  // Display section content
  classes(document.body).add("custom-view");

  // Render signin-page into content section
  customView.replace('#content');

});

function sidebarready(ctx, next) {
  sidebar.ready(next);
}
